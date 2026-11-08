// ============================================================
// ===== SCRIPT AUTÓNOMO DE ETAPAS =====
// Desktop-first: en PC se mantiene TODO igual (310 estrellas,
// shooting stars, 60fps, DPR 2). En móvil se ALIGERA la carga
// del canvas (menos estrellas, sin shooting stars, 30fps, DPR 1.5)
// y las animaciones de entrada se omiten vía CSS.
// ============================================================

(function() {
    'use strict';

    console.log('[Etapas] etapas-script.js cargado');

    // ============================================================
    // ===== 0. HELPER LUCIDE =====
    // ============================================================
    function refreshIcons() {
        if (typeof window.lucide !== 'undefined' && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }

    // ============================================================
    // ===== 0b. DETECCIÓN DE DISPOSITIVO / PREFERENCIAS =====
    // ============================================================
    function isAndroidOrMobile() {
        const ua = navigator.userAgent || '';
        const isAndroid = /Android/i.test(ua);
        const isMobileUA = /Mobi|iPhone|iPad|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(ua);
        const isSmallScreen = window.innerWidth <= 768;
        const hasTouch = navigator.maxTouchPoints > 0;
        return isAndroid || isMobileUA || (isSmallScreen && hasTouch);
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPerformanceMode = isAndroidOrMobile() || prefersReducedMotion;

    // ============================================================
    // ===== 1. CANVAS DE ESTRELLAS =====
    // ============================================================
    function initCanvas() {
        const canvas = document.getElementById('etapasCanvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const CONFIG = lowPerformanceMode
            ? {
                layers: [
                    { speed: 0.02, scale: 0.35, count: 30 },
                    { speed: 0.04, scale: 0.6, count: 12 }
                ],
                shootingStars: false,
                targetFPS: 30,
                maxDPR: 1.25
            }
            : {
                layers: [
                    { speed: 0.0195, scale: 0.2, count: 220 },
                    { speed: 0.039, scale: 0.5, count: 60 },
                    { speed: 0.065, scale: 0.75, count: 30 }
                ],
                shootingStars: true,
                targetFPS: 60,
                maxDPR: 2
            };

        let width, height, dpr;
        let stars = [];
        let shootingStars = [];
        let isLightMode = document.body.classList.contains('light-mode');
        let animationId = null;
        let resizeTimeout;
        let isVisible = true;
        let lastFrameTime = 0;
        const frameInterval = 1000 / CONFIG.targetFPS;

        const STARS_ANGLE = 145;
        const SHOOTING_STAR_SPEED = { min: 19.5, max: 26 };
        const SHOOTING_STAR_OPACITY_DELTA = 0.01;
        const TRAIL_LENGTH_DELTA = 0.01;
        const SHOOTING_STAR_EMITTING_INTERVAL = 1200;
        const SHOOTING_STAR_LIFE_TIME = 500;
        const MAX_TRAIL_LENGTH = 300;
        const STAR_BASE_RADIUS = 2;
        const SHOOTING_STAR_RADIUS = 3;

        function resize() {
            dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDPR);
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
            }, 200);
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
            stars = [];
            shootingStars = [];
            CONFIG.layers.forEach(layer => {
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
            if (!CONFIG.shootingStars) return;

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
            } else {
                ctx.fillStyle = `rgba(255, 235, 180, ${0.8 * twinkle})`;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
            ctx.fill();
        }

        function drawShootingStar(p) {
            const x = p.x;
            const y = p.y;
            const currentTrailLength = MAX_TRAIL_LENGTH * p.trailLengthDelta;
            const heading = Math.atan2(p.vy, p.vx);
            const pos = lineToAngle(x, y, -currentTrailLength, heading);

            let color = isLightMode ? '255, 255, 255' : '255, 107, 26';

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
        }

        function animate(timestamp) {
            if (!isVisible) {
                animationId = null;
                return;
            }

            if (timestamp - lastFrameTime < frameInterval) {
                animationId = requestAnimationFrame(animate);
                return;
            }
            lastFrameTime = timestamp;

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

        if (prefersReducedMotion) {
            checkLightMode();
            resize();
            initStars();
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < stars.length; i++) {
                drawStar(stars[i]);
            }
            console.log('[Etapas] Canvas estático (prefers-reduced-motion)');
            return;
        }

        if (CONFIG.shootingStars) {
            setInterval(() => {
                if (isVisible && !document.hidden) createShootingStar();
            }, SHOOTING_STAR_EMITTING_INTERVAL);
        }

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible && !animationId) {
                lastFrameTime = 0;
                animationId = requestAnimationFrame(animate);
            }
        });

        const themeObserver = new MutationObserver(() => checkLightMode());
        themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

        checkLightMode();
        resize();
        initStars();
        animationId = requestAnimationFrame(animate);

        console.log(
            '[Etapas] Canvas iniciado ·',
            lowPerformanceMode ? 'MODO LIGERO' : 'MODO COMPLETO',
            '· Estrellas:', stars.length,
            '· Shooting:', CONFIG.shootingStars,
            '· FPS:', CONFIG.targetFPS,
            '· DPR:', CONFIG.maxDPR
        );
    }

    // ============================================================
    // ===== 2. INTRO OVERLAY =====
    // ============================================================
    function initIntro() {
        const intro = document.getElementById('introOverlay');
        if (!intro) return;

        const delay = lowPerformanceMode ? 700 : 1400;
        const fade = lowPerformanceMode ? 400 : 900;

        setTimeout(() => {
            intro.classList.add('hidden');
            setTimeout(() => {
                intro.style.display = 'none';
            }, fade);
        }, delay);
    }

    // ============================================================
    // ===== 3. TOGGLE DE TEMA =====
    // ============================================================
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        const saved = localStorage.getItem('theme');
        const isLight = saved !== 'dark';
        document.body.classList.toggle('light-mode', isLight);
        toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');

        function toggleTheme() {
            const nowLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', nowLight ? 'light' : 'dark');
            toggle.setAttribute('aria-pressed', nowLight ? 'true' : 'false');
        }

        toggle.addEventListener('click', toggleTheme);
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }

    // ============================================================
    // ===== 4. HOVER / FOCUS / TOUCH DINÁMICO =====
    // ============================================================
    function initHover() {
        const cards = document.querySelectorAll('.etapa-card');
        if (!cards.length) return;

        let hoverTimeout = null;
        const HOLD_TIME = 2000;

        function activarEtapa(etapa) {
            if (!etapa) return;
            document.body.classList.remove('etapa-campus', 'etapa-herramientas', 'etapa-ia');
            document.body.classList.add('etapa-' + etapa);
        }

        function desactivarEtapa() {
            document.body.classList.remove('etapa-campus', 'etapa-herramientas', 'etapa-ia');
        }

        cards.forEach(card => {
            // Mouse (desktop e híbridos con ratón)
            card.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                activarEtapa(this.dataset.etapa);
            });

            card.addEventListener('mouseleave', function() {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(desactivarEtapa, HOLD_TIME);
            });

            // Touch (móvil): mantiene el fondo 1.5s
            card.addEventListener('touchstart', function() {
                clearTimeout(hoverTimeout);
                activarEtapa(this.dataset.etapa);
                hoverTimeout = setTimeout(desactivarEtapa, 1500);
            }, { passive: true });

            // Focus (teclado)
            card.addEventListener('focus', function() {
                clearTimeout(hoverTimeout);
                activarEtapa(this.dataset.etapa);
            });

            card.addEventListener('blur', function() {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(desactivarEtapa, HOLD_TIME);
            });

            // Respaldo con Pointer Events (híbridos raros)
            card.addEventListener('pointerenter', function(e) {
                if (e.pointerType === 'mouse') {
                    clearTimeout(hoverTimeout);
                    activarEtapa(this.dataset.etapa);
                }
            });

            card.addEventListener('pointerleave', function(e) {
                if (e.pointerType === 'mouse') {
                    clearTimeout(hoverTimeout);
                    hoverTimeout = setTimeout(desactivarEtapa, HOLD_TIME);
                }
            });
        });
    }

    // ============================================================
    // ===== 5. CLICK EN ETAPAS =====
    // ============================================================
    function initEtapaClick() {
        const cards = document.querySelectorAll('.etapa-card');

        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const target = this.dataset.target;
                if (target) {
                    window.location.href = target;
                } else {
                    console.warn('[Etapas] Esta etapa no tiene data-target');
                }
            });

            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // ============================================================
    // ===== 6. GUÍA INTERACTIVA (3 pasos) =====
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

        const steps = [
            {
                selector: '.top-controls',
                text: 'Controles de vista: aquí tienes el botón de volver a la presentación, el botón de accesibilidad (esta guía) y el cambio de tema oscuro/claro.',
                position: 'bottom'
            },
            {
                selector: '.etapas-grid',
                text: 'Etapas del taller: aquí se muestran las 3 etapas disponibles (Campus Virtual, Herramientas Digitales e Inteligencia Artificial). Pasa el cursor sobre cada una para ver el fondo cambiar.',
                position: 'top'
            },
            {
                selector: '.etapa-card',
                text: 'Cada tarjeta es seleccionable. Haz clic en cualquiera de las etapas para comenzar su recorrido. La tarjeta resaltada te mostrará el botón "Comenzar".',
                position: 'top'
            }
        ];

        let currentStep = 0;
        let isActive = false;

        function getElement(selector) {
            return document.querySelector(selector);
        }

        function positionTooltip(element, position) {
            const rect = element.getBoundingClientRect();
            const tooltipRect = guideTooltip.getBoundingClientRect();
            const padding = 16;
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

        function showStep(index) {
            if (index < 0 || index >= steps.length) return;

            const step = steps[index];
            const element = getElement(step.selector);
            if (!element) {
                console.warn('[Guía] Elemento no encontrado:', step.selector);
                return;
            }

            currentStep = index;
            guideStep.textContent = (index + 1) + '/' + steps.length;
            guideText.textContent = step.text;

            requestAnimationFrame(() => {
                element.scrollIntoView({
                    behavior: lowPerformanceMode ? 'auto' : 'smooth',
                    block: 'nearest'
                });
                setTimeout(() => {
                    updateSpotlight(element);
                    requestAnimationFrame(() => {
                        positionTooltip(element, step.position);
                    });
                }, 200);
            });

            guidePrev.disabled = index === 0;

            if (index === steps.length - 1) {
                guideNext.disabled = false;
                guideNext.innerHTML = '<span>Cerrar</span><i data-lucide="check" class="icon-lucide-sm"></i>';
            } else {
                guideNext.disabled = false;
                guideNext.innerHTML = '<span>Continuar</span><i data-lucide="chevron-right" class="icon-lucide-sm"></i>';
            }

            refreshIcons();
        }

        function openGuide() {
            isActive = true;
            guideOverlay.classList.add('active');
            guideOverlay.setAttribute('aria-hidden', 'false');
            guideToggle.classList.add('active');
            guideToggle.setAttribute('aria-pressed', 'true');
            showStep(0);
            document.body.style.overflow = 'hidden';
        }

        function closeGuide() {
            isActive = false;
            guideOverlay.classList.remove('active');
            guideOverlay.setAttribute('aria-hidden', 'true');
            guideToggle.classList.remove('active');
            guideToggle.setAttribute('aria-pressed', 'false');
            document.body.style.overflow = '';
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

        guidePrev.addEventListener('click', () => {
            if (currentStep === 0) return;
            showStep(currentStep - 1);
        });

        guideNext.addEventListener('click', () => {
            if (currentStep === steps.length - 1) {
                closeGuide();
                return;
            }
            showStep(currentStep + 1);
        });

        document.addEventListener('keydown', (e) => {
            if (!isActive) return;
            if (e.key === 'Escape') closeGuide();
            if (e.key === 'ArrowLeft' && currentStep > 0) showStep(currentStep - 1);
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

    // ============================================================
    // ===== 7. INICIALIZAR TODO =====
    // ============================================================
    function init() {
        refreshIcons();

        initCanvas();
        initIntro();
        initThemeToggle();
        initHover();
        initEtapaClick();
        initGuide();
        console.log('[Etapas] Inicializado · Modo:', lowPerformanceMode ? 'LIGERO' : 'COMPLETO');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();