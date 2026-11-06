// ===== FONDO ESTRELLADO =====
const canvas = document.getElementById('starfieldCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;
let width, height, dpr;
let stars = [];
let shootingStars = [];
let isLightMode = false;
let animationId = null;
let resizeTimeout;
let isVisible = true;
let previousFocusedElement = null;
let modalTarget = '';
let focusableElements = [];
let firstFocusable = null;
let lastFocusable = null;

const SPEED_MULTIPLIER = 1.3;

const STAR_LAYERS = [
    { speed: 0.015 * SPEED_MULTIPLIER, scale: 0.2, count: 220 },
    { speed: 0.03 * SPEED_MULTIPLIER, scale: 0.5, count: 60 },
    { speed: 0.05 * SPEED_MULTIPLIER, scale: 0.75, count: 30 }
];

const STARS_ANGLE = 145;
const SHOOTING_STAR_SPEED = { min: 15 * SPEED_MULTIPLIER, max: 20 * SPEED_MULTIPLIER };
const SHOOTING_STAR_OPACITY_DELTA = 0.01;
const TRAIL_LENGTH_DELTA = 0.01;
const SHOOTING_STAR_EMITTING_INTERVAL = 1200;
const SHOOTING_STAR_LIFE_TIME = 500;
const MAX_TRAIL_LENGTH = 300;
const STAR_BASE_RADIUS = 2;
const SHOOTING_STAR_RADIUS = 3;

function resize() {
    if (!canvas) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resize();
        initStars();
    }, 150);
});

function checkLightMode() {
    isLightMode = document.body.classList.contains('light-mode');
}

function randomRange(min, max) {
    return min + Math.random() * (max - min);
}

function degreesToRads(degrees) {
    return degrees / 180 * Math.PI;
}

function lineToAngle(x1, y1, length, radians) {
    const x2 = x1 + length * Math.cos(radians);
    const y2 = y1 + length * Math.sin(radians);
    return { x: x2, y: y2 };
}

function initStars() {
    if (!canvas) return;
    stars = [];
    shootingStars = [];
    STAR_LAYERS.forEach(layer => {
        for (let i = 0; i < layer.count; i++) {
            stars.push({
                x: randomRange(0, width),
                y: randomRange(0, height),
                radius: STAR_BASE_RADIUS * layer.scale,
                speed: layer.speed,
                vx: Math.cos(degreesToRads(STARS_ANGLE)) * layer.speed,
                vy: Math.sin(degreesToRads(STARS_ANGLE)) * layer.speed,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: Math.random() * 0.02 + 0.01
            });
        }
    });
}

function createShootingStar() {
    const shootingStar = {
        x: randomRange(width / 2, width),
        y: randomRange(0, height / 2),
        vx: Math.cos(degreesToRads(STARS_ANGLE)) * randomRange(SHOOTING_STAR_SPEED.min, SHOOTING_STAR_SPEED.max),
        vy: Math.sin(degreesToRads(STARS_ANGLE)) * randomRange(SHOOTING_STAR_SPEED.min, SHOOTING_STAR_SPEED.max),
        radius: SHOOTING_STAR_RADIUS,
        opacity: 0,
        trailLengthDelta: 0,
        isSpawning: true,
        isDying: false,
        isDead: false
    };
    shootingStars.push(shootingStar);

    setTimeout(() => {
        shootingStar.isSpawning = false;
        shootingStar.isDying = true;
    }, SHOOTING_STAR_LIFE_TIME);
}

function drawStar(star) {
    star.twinklePhase += star.twinkleSpeed;
    const twinkle = 0.7 + 0.3 * Math.sin(star.twinklePhase);

    if (isLightMode) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * twinkle})`;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
        ctx.shadowBlur = 4;
    } else {
        ctx.fillStyle = `rgba(255, 235, 180, ${0.8 * twinkle})`;
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

function drawShootingStar(p) {
    const x = p.x;
    const y = p.y;
    const currentTrailLength = MAX_TRAIL_LENGTH * p.trailLengthDelta;
    const heading = Math.atan2(p.vy, p.vx);
    const pos = lineToAngle(x, y, -currentTrailLength, heading);

    let color;
    if (isLightMode) {
        color = '255, 255, 255';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 6;
    } else {
        color = '255, 107, 26';
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
    }

    ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
    const starLength = 5;
    ctx.beginPath();
    ctx.moveTo(x - 1, y + 1);
    ctx.lineTo(x, y + starLength);
    ctx.lineTo(x + 1, y + 1);
    ctx.lineTo(x + starLength, y);
    ctx.lineTo(x + 1, y - 1);
    ctx.lineTo(x, y + 1);
    ctx.lineTo(x, y - starLength);
    ctx.lineTo(x - 1, y - 1);
    ctx.lineTo(x - starLength, y);
    ctx.lineTo(x - 1, y + 1);
    ctx.lineTo(x - starLength, y);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `rgba(${color}, ${p.opacity * 0.7})`;
    ctx.beginPath();
    ctx.moveTo(x - 1, y - 1);
    ctx.lineTo(pos.x, pos.y);
    ctx.lineTo(x + 1, y + 1);
    ctx.closePath();
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
}

function animate() {
    if (!canvas) return;
    if (!isVisible) {
        animationId = null;
        return;
    }

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.x += star.vx;
        star.y += star.vy;

        if (star.x > width) star.x = 0;
        if (star.x < 0) star.x = width;
        if (star.y > height) star.y = 0;
        if (star.y < 0) star.y = height;

        drawStar(star);
    }

    for (let i = 0; i < shootingStars.length; i++) {
        const shootingStar = shootingStars[i];
        if (shootingStar.isSpawning) {
            shootingStar.opacity += SHOOTING_STAR_OPACITY_DELTA;
            if (shootingStar.opacity >= 1.0) shootingStar.isSpawning = false;
        }
        if (shootingStar.isDying) {
            shootingStar.opacity -= SHOOTING_STAR_OPACITY_DELTA;
            if (shootingStar.opacity <= 0.0) {
                shootingStar.isDying = false;
                shootingStar.isDead = true;
            }
        }
        shootingStar.trailLengthDelta += TRAIL_LENGTH_DELTA;
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;

        if (shootingStar.opacity > 0.0 && !shootingStar.isDead) {
            drawShootingStar(shootingStar);
        }
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (shootingStars[i].isDead) shootingStars.splice(i, 1);
    }

    animationId = requestAnimationFrame(animate);
}

setInterval(() => {
    if (isVisible && !document.hidden && canvas) createShootingStar();
}, SHOOTING_STAR_EMITTING_INTERVAL);

document.addEventListener('visibilitychange', () => {
    isVisible = !document.hidden;
    if (isVisible && !animationId && canvas) animationId = requestAnimationFrame(animate);
});

function initStarfield() {
    if (!canvas || !ctx) return;
    checkLightMode();
    resize();
    initStars();
    animate();
}

if (canvas) {
    const themeObserver = new MutationObserver(() => checkLightMode());
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

// ===== INTRO OVERLAY =====
const introOverlay = document.getElementById('introOverlay');
if (introOverlay) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            introOverlay.classList.add('hidden');
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 900);
        }, 1400);
    });
}

// ===== TOGGLE DE TEMA =====
function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');

    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    checkLightMode();
}

function loadTheme() {
    const saved = localStorage.getItem('theme');
    const toggle = document.getElementById('themeToggle');
    if (saved !== 'dark') {
        document.body.classList.add('light-mode');
        if (toggle) toggle.setAttribute('aria-pressed', 'true');
        checkLightMode();
    } else {
        document.body.classList.remove('light-mode');
        if (toggle) toggle.setAttribute('aria-pressed', 'false');
    }
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

// ============================================================
// ===== MODAL =====
// ============================================================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalBtn = document.getElementById('modalBtn');
const modalContainer = document.getElementById('modalContainer');

function openModalFromLink(link) {
    if (!modalOverlay || !modalClose || !modalContainer || !link) return;

    const target = link.dataset.target || 'herramientas.html';
    const color = link.dataset.color || '#0056B3';
    modalTarget = target;

    modalContainer.style.setProperty('--modal-accent', color);

    const modalHeader = modalContainer.querySelector('.modal-header-content');
    const modalHeaderClip = modalContainer.querySelector('.modal-header-clip');
    const modalFooterClip = modalContainer.querySelector('.modal-footer-clip');
    const modalFooterContent = modalContainer.querySelector('.modal-footer-content');

    if (modalHeader) modalHeader.style.background = color;
    if (modalHeaderClip) modalHeaderClip.style.background = color;
    if (modalFooterClip) modalFooterClip.style.background = color;
    if (modalFooterContent) modalFooterContent.style.background = color;

    previousFocusedElement = document.activeElement;

    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');

    setTimeout(() => {
        modalClose.focus();
        focusableElements = modalOverlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            firstFocusable = focusableElements[0];
            lastFocusable = focusableElements[focusableElements.length - 1];
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 150);
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');

    if (previousFocusedElement) {
        setTimeout(() => previousFocusedElement.focus(), 100);
    }
}

if (modalOverlay && modalClose && modalBtn && modalContainer) {
    document.querySelectorAll('.taller-link.active').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModalFromLink(link);
        });

        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModalFromLink(link);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalClose.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    modalOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });

    modalBtn.addEventListener('click', () => {
        if (modalTarget) window.location.href = modalTarget;
    });

    modalBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            modalBtn.click();
        }
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });
}

// ============================================================
// ===== GUÍA INTERACTIVA (FOCO CON AGUJERO REAL) =====
// ============================================================
function initGuide() {
    const guideToggle = document.getElementById('guideToggle');
    const guideOverlay = document.getElementById('guideOverlay');
    const guideSpotlight = document.getElementById('guideSpotlight');
    const guideTooltip = document.getElementById('guideTooltip');
    const guideStep = document.getElementById('guideStep');
    const guideText = document.getElementById('guideText');
    const guideClose = document.getElementById('guideClose');
    const guidePrev = document.getElementById('guidePrev');
    const guideNext = document.getElementById('guideNext');

    if (!guideToggle || !guideOverlay) return;

    // ===== Pasos de la guía =====
    const steps = [
        {
            selector: '.top-controls',
            text: 'Desde aquí puedes acceder a los controles de vista: el botón de accesibilidad (esta guía) y el botón de cambio de tema (oscuro/claro).',
            position: 'bottom',
            mode: 'normal'
        },
        {
            selector: '.container',
            text: 'Este es el menú principal de talleres. Aquí verás el encabezado, la lista de talleres disponibles y el pie con información del taller.',
            position: 'right',
            mode: 'normal'
        },
        {
            selector: '.taller-link.active',
            text: 'Cada uno de estos botones representa un taller. Haz clic en el taller señalado para ver su descripción.',
            position: 'right',
            mode: 'interactive-modal'
        },
        {
            selector: '.modal-container',
            text: 'Este es el panel de descripción del taller. Aquí puedes ver el resumen, las categorías incluidas y un botón para entrar al taller real. Cuando termines, presiona Cerrar.',
            position: 'left',
            mode: 'modal-open'
        }
    ];

    let currentStep = 0;
    let isActive = false;
    let interactiveClickHandler = null;

    function getElement(selector) {
        return document.querySelector(selector);
    }

    function positionTooltip(element, position) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = guideTooltip.getBoundingClientRect();
        const padding = 20;
        let top, left;

        switch (position) {
            case 'bottom':
                top = rect.bottom + padding;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2;
                break;
            case 'top':
                top = rect.top - tooltipRect.height - padding;
                left = rect.left + rect.width / 2 - tooltipRect.width / 2;
                break;
            case 'right':
                top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                left = rect.right + padding;
                break;
            case 'left':
                top = rect.top + rect.height / 2 - tooltipRect.height / 2;
                left = rect.left - tooltipRect.width - padding;
                break;
            default:
                top = rect.bottom + padding;
                left = rect.left;
        }

        const maxLeft = window.innerWidth - tooltipRect.width - padding;
        const maxTop = window.innerHeight - tooltipRect.height - padding;

        left = Math.max(padding, Math.min(left, maxLeft));
        top = Math.max(padding, Math.min(top, maxTop));

        guideTooltip.style.top = top + 'px';
        guideTooltip.style.left = left + 'px';
    }

    function updateSpotlight(element) {
        const rect = element.getBoundingClientRect();
        const pad = 10;

        guideSpotlight.style.top = (rect.top - pad) + 'px';
        guideSpotlight.style.left = (rect.left - pad) + 'px';
        guideSpotlight.style.width = (rect.width + pad * 2) + 'px';
        guideSpotlight.style.height = (rect.height + pad * 2) + 'px';

        const radius = getComputedStyle(element).borderRadius;
        guideSpotlight.style.borderRadius = (radius && radius !== '0px') ? radius : '16px';
    }

    // ===== Limpia el handler de clic interactivo =====
    function clearInteractiveHandler() {
        if (interactiveClickHandler) {
            document.removeEventListener('click', interactiveClickHandler, true);
            interactiveClickHandler = null;
        }
    }

    // ===== Habilita clics sobre el elemento señalado (modo interactivo) =====
    function enableInteractiveClick(element) {
        clearInteractiveHandler();

        // El overlay de la guía tiene pointer-events: auto en el CSS base.
        // Para permitir clics al elemento de debajo, hacemos que el overlay
        // ignore los clics SOLO en el modo interactivo, y los botones del
        // tooltip siguen funcionando porque están por encima con z-index.
        guideOverlay.style.pointerEvents = 'none';
        guideTooltip.style.pointerEvents = 'auto';

        // Capturamos el clic en el elemento señalado para avanzar al paso 4.
        // Usamos capture para interceptarlo antes y evitar que el modal
        // abra y cierre al mismo tiempo.
        interactiveClickHandler = function(ev) {
            const target = ev.target.closest('.taller-link.active');
            if (!target || target !== element) return;

            // Dejamos que el clic siga su curso (abre el modal por su propio listener)
            // y en el siguiente tick avanzamos la guía al paso 4.
            setTimeout(() => {
                if (isActive && currentStep === 2) {
                    showStep(3);
                }
            }, 60);
        };

        document.addEventListener('click', interactiveClickHandler, true);
    }

    function disableInteractiveClick() {
        clearInteractiveHandler();
        // Restauramos el comportamiento normal del overlay
        guideOverlay.style.pointerEvents = '';
        guideTooltip.style.pointerEvents = '';
    }

    function showStep(index) {
        if (index < 0 || index >= steps.length) return;

        const step = steps[index];
        const element = getElement(step.selector);
        if (!element) {
            console.warn('Elemento no encontrado para la guía:', step.selector);
            return;
        }

        currentStep = index;
        guideStep.textContent = (index + 1) + '/' + steps.length;
        guideText.textContent = step.text;

        // Recalcular en el siguiente frame para asegurar geometría correcta
        requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            setTimeout(() => {
                updateSpotlight(element);
                requestAnimationFrame(() => {
                    positionTooltip(element, step.position);
                });
            }, 200);
        });

        // Deshabilitar "Anterior" en el primer paso
        guidePrev.disabled = index === 0;

        // Limpiar modo interactivo por defecto
        disableInteractiveClick();

        // Configurar el botón "Siguiente" y el modo interactivo según el paso
        if (index === steps.length - 1) {
            // Último paso: botón "Cerrar"
            guideNext.disabled = false;
            guideNext.innerHTML = '<span>Cerrar</span><i data-lucide="check" class="icon-lucide-sm"></i>';
        } else if (step.mode === 'interactive-modal') {
            // Paso 3: botón deshabilitado, se debe hacer clic en el taller.
            guideNext.disabled = true;
            guideNext.innerHTML = '<span>Haz clic en el taller</span><i data-lucide="mouse-pointer-click" class="icon-lucide-sm"></i>';
            // Habilitar clic sobre el taller señalado
            enableInteractiveClick(element);
        } else {
            // Pasos normales
            guideNext.disabled = false;
            guideNext.innerHTML = '<span>Continuar</span><i data-lucide="chevron-right" class="icon-lucide-sm"></i>';
        }

        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    // ====== OBSERVADOR DEL MODAL (respaldo por si el clic captura no dispara) ======
    let modalObserver = null;

    function startModalObserver() {
        if (!modalOverlay || modalObserver) return;

        modalObserver = new MutationObserver(() => {
            if (modalOverlay.classList.contains('active') && currentStep === 2 && isActive) {
                showStep(3);
            }
        });

        modalObserver.observe(modalOverlay, { attributes: true, attributeFilter: ['class'] });
    }

    function stopModalObserver() {
        if (modalObserver) {
            modalObserver.disconnect();
            modalObserver = null;
        }
    }

    function openGuide() {
        isActive = true;
        guideOverlay.classList.add('active');
        guideOverlay.setAttribute('aria-hidden', 'false');
        guideToggle.classList.add('active');
        guideToggle.setAttribute('aria-pressed', 'true');
        startModalObserver();
        showStep(0);
        document.body.style.overflow = 'hidden';
    }

    function closeGuide() {
        isActive = false;
        disableInteractiveClick();
        guideOverlay.classList.remove('active');
        guideOverlay.setAttribute('aria-hidden', 'true');
        guideToggle.classList.remove('active');
        guideToggle.setAttribute('aria-pressed', 'false');
        document.body.style.overflow = '';
        stopModalObserver();

        if (modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    }

    guideToggle.addEventListener('click', () => {
        if (isActive) closeGuide();
        else openGuide();
    });

    guideToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            guideToggle.click();
        }
    });

    guideClose.addEventListener('click', closeGuide);

    // ===== Botón Anterior =====
    guidePrev.addEventListener('click', () => {
        if (currentStep === 0) return;

        if (currentStep === 3 && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }

        showStep(currentStep - 1);
    });

    // ===== Botón Siguiente / Cerrar =====
    guideNext.addEventListener('click', () => {
        if (currentStep === steps.length - 1) {
            closeGuide();
            return;
        }

        if (steps[currentStep].mode === 'interactive-modal') {
            // No avanzar por botón: el usuario debe hacer clic en el taller.
            return;
        }

        showStep(currentStep + 1);
    });

    document.addEventListener('keydown', (e) => {
        if (!isActive) return;
        if (e.key === 'Escape') closeGuide();
        if (e.key === 'ArrowLeft' && currentStep > 0) {
            if (currentStep === 3 && modalOverlay && modalOverlay.classList.contains('active')) {
                closeModal();
            }
            showStep(currentStep - 1);
        }
    });

    window.addEventListener('resize', () => {
        if (isActive) showStep(currentStep);
    });

    window.addEventListener('scroll', () => {
        if (isActive) {
            const step = steps[currentStep];
            const element = getElement(step.selector);
            if (element) {
                updateSpotlight(element);
                requestAnimationFrame(() => {
                    positionTooltip(element, step.position);
                });
            }
        }
    }, { passive: true });
}

// ===== APLICAR COLOR DINÁMICO A CADA TALLER =====
document.querySelectorAll('.taller-link').forEach(link => {
    const color = link.dataset.color;
    if (color) link.style.setProperty('--link-color', color);
});

// ===== INICIALIZAR =====
loadTheme();
initStarfield();
initGuide();