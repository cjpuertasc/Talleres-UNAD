// ===== CAMPUS VIRTUAL SCRIPT =====

(function() {
    'use strict';

    console.log('✅ campus-script.js cargado');

    // ============================================================
    // 0. DETECCIÓN DE DISPOSITIVO / PREFERENCIAS
    // ============================================================
    const isMobileDevice = window.matchMedia('(max-width: 768px)').matches ||
        /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPerformanceMode = isMobileDevice || prefersReducedMotion;

    // ============================================================
    // 1. FORZAR SCROLL AL INICIO
    // ============================================================
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
    document.addEventListener('DOMContentLoaded', () => window.scrollTo(0, 0));
    window.addEventListener('load', () => window.scrollTo(0, 0));

    // ============================================================
    // 2. FONDO DE BURBUJAS
    // ============================================================
    function initBubbles() {
        const canvas = document.getElementById('starfieldCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });

        let width, height;
        let bubbles = [];
        let animationId = null;
        let isVisible = true;

        const numBubbles = lowPerformanceMode ? 6 : 20;
        const maxRadius = lowPerformanceMode ? 140 : 180;
        const minRadius = lowPerformanceMode ? 60 : 80;
        const speedFactor = lowPerformanceMode ? 0.25 : 0.4;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            const dpr = lowPerformanceMode ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            if (dpr !== 1) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        window.addEventListener('resize', () => {
            resize();
            initBubbleData();
        });

        function initBubbleData() {
            bubbles = [];
            for (let i = 0; i < numBubbles; i++) {
                bubbles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * (maxRadius - minRadius) + minRadius,
                    vx: (Math.random() - 0.5) * speedFactor,
                    vy: (Math.random() - 0.5) * speedFactor,
                    color: Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 107, 26, 0.1)'
                });
            }
        }

        function animate() {
            if (!isVisible) {
                animationId = null;
                return;
            }

            ctx.clearRect(0, 0, width, height);

            bubbles.forEach(b => {
                b.x += b.vx;
                b.y += b.vy;

                if (b.x < -b.r) b.x = width + b.r;
                if (b.x > width + b.r) b.x = -b.r;
                if (b.y < -b.r) b.y = height + b.r;
                if (b.y > height + b.r) b.y = -b.r;

                const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                gradient.addColorStop(0, b.color);
                gradient.addColorStop(1, 'transparent');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        }

        document.addEventListener('visibilitychange', () => {
            isVisible = !document.hidden;
            if (isVisible && !animationId) animationId = requestAnimationFrame(animate);
        });

        resize();
        initBubbleData();
        animate();

        console.log('[Campus] Canvas iniciado ·', lowPerformanceMode ? 'MODO LIGERO' : 'MODO COMPLETO', '· Burbujas:', numBubbles);
    }

    // ============================================================
    // 3. MENÚ LATERAL
    // ============================================================
    function initMenu() {
        const menuToggle = document.getElementById('menuToggle');
        const sideMenu = document.getElementById('sideMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuClose = document.getElementById('sideMenuClose');

        if (!menuToggle || !sideMenu || !menuOverlay || !menuClose) return;

        window.openMenu = function() {
            sideMenu.classList.add('open');
            menuOverlay.classList.add('active');
            menuToggle.classList.add('open');
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        window.closeMenu = function() {
            sideMenu.classList.remove('open');
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        menuToggle.addEventListener('click', () => {
            if (sideMenu.classList.contains('open')) window.closeMenu();
            else window.openMenu();
        });

        menuClose.addEventListener('click', window.closeMenu);
        menuOverlay.addEventListener('click', window.closeMenu);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sideMenu.classList.contains('open')) window.closeMenu();
        });
    }

    // ============================================================
    // 4. BOTÓN DE VOLVER
    // ============================================================
    function initBackButton() {
        const btnBack = document.getElementById('btnBack');
        if (!btnBack) return;
        btnBack.addEventListener('click', () => {
            window.location.href = '../HTML/etapas.html';
        });
    }

    // ============================================================
    // 5. TOGGLE DE DESCRIPCIÓN (HERO)
    // ============================================================
    function initHeroToggle() {
        const heroSection = document.getElementById('heroSection');
        const toggleBtn = document.getElementById('heroToggle');
        if (!heroSection || !toggleBtn) return;
        const toggleText = toggleBtn.querySelector('.hero-toggle-text');
        toggleBtn.addEventListener('click', () => {
            heroSection.classList.toggle('collapsed');
            const isCollapsed = heroSection.classList.contains('collapsed');
            toggleText.textContent = isCollapsed ? 'Mostrar descripción' : 'Ocultar descripción';
        });
    }

    // ============================================================
    // 6. TOGGLE DE TEMA
    // ============================================================
    function initThemeToggle() {
        const toggle = document.getElementById('themeToggle');

        const saved = localStorage.getItem('theme');
        if (saved === 'dark') {
            document.body.classList.remove('light-mode');
            if (toggle) toggle.setAttribute('aria-pressed', 'false');
        } else {
            document.body.classList.add('light-mode');
            if (toggle) toggle.setAttribute('aria-pressed', 'true');
        }

        document.documentElement.classList.remove('light-mode-preload');

        if (!toggle) return;

        toggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        });
    }

    // ============================================================
    // 7. INTRO OVERLAY
    // ============================================================
    function initIntro() {
        const intro = document.getElementById('introOverlay');
        if (!intro) return;

        const delay = lowPerformanceMode ? 700 : 1400;
        const fade = lowPerformanceMode ? 400 : 800;

        setTimeout(() => {
            intro.classList.add('hidden');
            setTimeout(() => {
                intro.style.display = 'none';
                window.scrollTo(0, 0);
            }, fade);
        }, delay);
    }

    // ============================================================
    // 8. ANIMACIONES REVEAL
    // ============================================================
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        if (lowPerformanceMode || !('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = parseInt(el.dataset.delay || '0', 10);
                    setTimeout(() => el.classList.add('revealed'), delay);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // ============================================================
    // 9. BARRA DE PROGRESO Y VOLVER ARRIBA
    // ============================================================
    function initScrollFeatures() {
        const progressBar = document.getElementById('readingProgress');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
            });
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

                    if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';

                    if (backToTop) {
                        if (scrollTop > 300) {
                            backToTop.classList.add('visible');
                        } else {
                            backToTop.classList.remove('visible');
                        }
                    }

                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================================
    // 10. TABS PRINCIPALES
    // ============================================================
    function initMainTabs() {
        const mainTabs = document.querySelectorAll('.campus-main-tab');
        const mainPanels = document.querySelectorAll('.campus-main-panel');

        mainTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.dataset.panel;
                mainTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                mainPanels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const target = document.getElementById(targetId);
                if (target) target.classList.add('active');
            });
        });
    }

    // ============================================================
    // 11. SLIDES DE CAMPUS VIRTUAL
    // ============================================================
    function initCampusSlides() {
        const slideTabs = document.querySelectorAll('#miniTabs .slide-tab');
        const slidePanels = document.querySelectorAll('#slidesContent .slide-panel');
        const dots = document.querySelectorAll('#slidesDots .slide-dot');
        const counter = document.getElementById('slidesCounter');
        const prevBtn = document.getElementById('slidesPrev');
        const nextBtn = document.getElementById('slidesNext');
        if (!slideTabs.length) return;

        let currentSlide = 0;
        const totalSlides = slideTabs.length;

        function goToSlide(index) {
            if (index < 0) index = 0;
            if (index >= totalSlides) index = totalSlides - 1;

            currentSlide = index;
            slideTabs.forEach((t, i) => {
                t.classList.toggle('active', i === index);
                t.setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
            slidePanels.forEach((p, i) => p.classList.toggle('active', i === index));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));

            const pad = n => n < 10 ? '0' + n : '' + n;
            if (counter) counter.textContent = `${pad(index + 1)} / ${pad(totalSlides)}`;
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
        }

        slideTabs.forEach((tab, i) => tab.addEventListener('click', () => goToSlide(i)));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
        if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

        window.goToCampusSlide = goToSlide;
        goToSlide(0);
    }

    // ============================================================
    // 12. SLIDES DE TIPS Y RECOMENDACIONES
    // ============================================================
    function initTipsSlides() {
        const tipTabs = document.querySelectorAll('#tipsTabs .slide-tab');
        const tipPanels = document.querySelectorAll('#tipsSlidesContent .slide-panel');
        const dots = document.querySelectorAll('#tipsDots .slide-dot');
        const counter = document.getElementById('tipsCounter');
        const prevBtn = document.getElementById('tipsPrev');
        const nextBtn = document.getElementById('tipsNext');
        if (!tipTabs.length) return;

        let currentTip = 0;
        const totalTips = tipTabs.length;

        function goToTip(index) {
            if (index < 0) index = 0;
            if (index >= totalTips) index = totalTips - 1;

            currentTip = index;
            tipTabs.forEach((t, i) => {
                t.classList.toggle('active', i === index);
                t.setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
            tipPanels.forEach((p, i) => p.classList.toggle('active', i === index));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));

            const pad = n => n < 10 ? '0' + n : '' + n;
            if (counter) counter.textContent = `${pad(index + 1)} / ${pad(totalTips)}`;
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === totalTips - 1;
        }

        tipTabs.forEach((tab, i) => tab.addEventListener('click', () => goToTip(i)));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToTip(i)));
        if (prevBtn) prevBtn.addEventListener('click', () => goToTip(currentTip - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToTip(currentTip + 1));

        window.goToTip = goToTip;
        goToTip(0);
    }

    // ============================================================
    // 13. SLIDES DE INFORMACIÓN UNAD
    // ============================================================
    function initInfoSlides() {
        const infoTabs = document.querySelectorAll('#infoTabs .slide-tab');
        const infoPanels = document.querySelectorAll('#infoSlidesContent .slide-panel');
        const dots = document.querySelectorAll('#infoDots .slide-dot');
        const counter = document.getElementById('infoCounter');
        const prevBtn = document.getElementById('infoPrev');
        const nextBtn = document.getElementById('infoNext');
        if (!infoTabs.length) return;

        let currentInfo = 0;
        const totalInfo = infoTabs.length;

        function goToInfo(index) {
            if (index < 0) index = 0;
            if (index >= totalInfo) index = totalInfo - 1;

            currentInfo = index;
            infoTabs.forEach((t, i) => {
                t.classList.toggle('active', i === index);
                t.setAttribute('aria-selected', i === index ? 'true' : 'false');
            });
            infoPanels.forEach((p, i) => p.classList.toggle('active', i === index));
            dots.forEach((d, i) => d.classList.toggle('active', i === index));

            const pad = n => n < 10 ? '0' + n : '' + n;
            if (counter) counter.textContent = `${pad(index + 1)} / ${pad(totalInfo)}`;
            if (prevBtn) prevBtn.disabled = index === 0;
            if (nextBtn) nextBtn.disabled = index === totalInfo - 1;
        }

        infoTabs.forEach((tab, i) => tab.addEventListener('click', () => goToInfo(i)));
        dots.forEach((dot, i) => dot.addEventListener('click', () => goToInfo(i)));
        if (prevBtn) prevBtn.addEventListener('click', () => goToInfo(currentInfo - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goToInfo(currentInfo + 1));

        window.goToInfo = goToInfo;
        goToInfo(0);
    }

    // ============================================================
    // 14. ACORDEONES
    // ============================================================
    function initAccordions() {
        const accordions = document.querySelectorAll('.campus-accordion');
        accordions.forEach(acc => {
            const header = acc.querySelector('.campus-accordion-header');
            if (!header) return;
            header.addEventListener('click', () => {
                const isOpen = acc.classList.contains('open');
                const parentGroup = acc.closest('.campus-accordion-group');
                if (parentGroup) {
                    parentGroup.querySelectorAll('.campus-accordion.open').forEach(other => {
                        if (other !== acc) {
                            other.classList.remove('open');
                            const otherHeader = other.querySelector('.campus-accordion-header');
                            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
                        }
                    });
                }
                if (!isOpen) {
                    acc.classList.add('open');
                    header.setAttribute('aria-expanded', 'true');
                } else {
                    acc.classList.remove('open');
                    header.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // ============================================================
    // 15. GUÍA INTERACTIVA
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
                selector: '.hero-section',
                text: 'Título y descripción: aquí encontrarás la información principal del Campus Virtual.',
                position: 'bottom',
                before: null,
                after: null
            },
            {
                selector: '.campus-main-tabs',
                text: 'Pestañas principales: desde aquí puedes cambiar entre Campus Virtual, Tips y recomendaciones e Información UNAD.',
                position: 'bottom',
                before: null,
                after: null
            },
            {
                selector: '.slides-tabs',
                text: 'Mini pestañas: te permiten navegar entre las diferentes secciones dentro de cada pestaña principal.',
                position: 'bottom',
                before: null,
                after: null
            },
            {
                selector: '.slides-content',
                text: 'Información de la mini pestaña: aquí se muestra el contenido detallado de la sección seleccionada.',
                position: 'top',
                before: null,
                after: null
            },
            {
                selector: '.side-menu',
                text: 'Menú lateral: aquí puedes cambiar entre Campus Virtual, Herramientas Digitales e Inteligencia Artificial.',
                position: 'right',
                before: function() { if (window.openMenu) window.openMenu(); },
                after: function() { if (window.closeMenu) window.closeMenu(); }
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

        function showStep(index) {
            if (index < 0 || index >= steps.length) return;

            const step = steps[index];

            if (step.before) step.before();

            setTimeout(() => {
                const element = getElement(step.selector);
                if (!element) {
                    console.warn('[Guía] Elemento no encontrado:', step.selector);
                    return;
                }

                currentStep = index;
                guideStep.textContent = (index + 1) + '/' + steps.length;
                guideText.textContent = step.text;

                setTimeout(() => {
                    if (step.selector === '.side-menu') {
                        window.scrollTo({ top: 0, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
                    } else {
                        const y = element.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
                    }
                }, 50);

                setTimeout(() => {
                    updateSpotlight(element);
                    requestAnimationFrame(() => {
                        positionTooltip(element, step.position);
                    });
                }, 400);

                guidePrev.disabled = index === 0;

                if (index === steps.length - 1) {
                    guideNext.disabled = false;
                    guideNext.innerHTML = '<span>Cerrar</span><i data-lucide="check" class="icon-lucide-sm"></i>';
                } else {
                    guideNext.disabled = false;
                    guideNext.innerHTML = '<span>Continuar</span><i data-lucide="chevron-right" class="icon-lucide-sm"></i>';
                }

                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, step.before ? 500 : 0);
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

            if (steps[currentStep].after) steps[currentStep].after();

            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
            }, 100);
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
            if (steps[currentStep].after) steps[currentStep].after();
            showStep(currentStep - 1);
        });

        guideNext.addEventListener('click', () => {
            if (currentStep === steps.length - 1) {
                closeGuide();
                return;
            }
            if (steps[currentStep].after) steps[currentStep].after();
            showStep(currentStep + 1);
        });

        document.addEventListener('keydown', (e) => {
            if (!isActive) return;
            if (e.key === 'Escape') closeGuide();
            if (e.key === 'ArrowLeft' && currentStep > 0) {
                if (steps[currentStep].after) steps[currentStep].after();
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

    // ============================================================
    // 16. LIGHTBOX DE IMÁGENES (ZOOM)
    // ============================================================
    function initLightbox() {
        const imgs = Array.from(document.querySelectorAll('.campus-img-figure img'));
        if (!imgs.length) return;

        let lb = document.querySelector('.lightbox');
        if (!lb) {
            lb = document.createElement('div');
            lb.className = 'lightbox';
            lb.setAttribute('role', 'dialog');
            lb.setAttribute('aria-modal', 'true');
            lb.setAttribute('aria-label', 'Visor de imágenes');
            lb.innerHTML = `
                <button class="lightbox-close" aria-label="Cerrar visor">
                    <i data-lucide="x" class="icon-lucide-lg"></i>
                </button>
                <div class="lightbox-counter" aria-hidden="true">1 / 1</div>
                <button class="lightbox-nav lightbox-prev" aria-label="Imagen anterior">
                    <i data-lucide="chevron-left" class="icon-lucide-lg"></i>
                </button>
                <button class="lightbox-nav lightbox-next" aria-label="Imagen siguiente">
                    <i data-lucide="chevron-right" class="icon-lucide-lg"></i>
                </button>
                <div class="lightbox-stage">
                    <img class="lightbox-img" alt="" />
                </div>
                <div class="lightbox-hint">Rueda del ratón o pinza para zoom · Doble clic para alternar · Arrastra para mover · Esc para cerrar</div>
                <div class="lightbox-controls">
                    <button class="lightbox-ctrl-btn" data-lb-action="zoom-out" aria-label="Reducir zoom">
                        <i data-lucide="zoom-out" class="icon-lucide-sm"></i>
                    </button>
                    <span class="lightbox-zoom-value">100%</span>
                    <button class="lightbox-ctrl-btn" data-lb-action="zoom-in" aria-label="Aumentar zoom">
                        <i data-lucide="zoom-in" class="icon-lucide-sm"></i>
                    </button>
                    <button class="lightbox-ctrl-btn lightbox-reset-btn" data-lb-action="reset" aria-label="Reiniciar zoom">Reiniciar</button>
                </div>
            `;
            document.body.appendChild(lb);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        const stage = lb.querySelector('.lightbox-stage');
        const lbImg = lb.querySelector('.lightbox-img');
        const counter = lb.querySelector('.lightbox-counter');
        const zoomValue = lb.querySelector('.lightbox-zoom-value');
        const btnClose = lb.querySelector('.lightbox-close');
        const btnPrev = lb.querySelector('.lightbox-prev');
        const btnNext = lb.querySelector('.lightbox-next');

        let group = [];
        let index = 0;
        let scale = 1;
        const MIN = 0.5;
        const MAX = 5;
        let offsetX = 0, offsetY = 0;
        let dragging = false;
        let dragStartX = 0, dragStartY = 0;
        let startOffsetX = 0, startOffsetY = 0;
        let lastTap = 0;
        let touchStartDist = 0, touchStartScale = 1;

        function applyTransform() {
            lbImg.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
            if (zoomValue) zoomValue.textContent = Math.round(scale * 100) + '%';
            stage.classList.toggle('zoomed', scale > 1.02);
        }

        function resetZoom() {
            scale = 1; offsetX = 0; offsetY = 0;
            applyTransform();
        }

        function zoomTo(s) {
            scale = Math.max(MIN, Math.min(MAX, s));
            if (scale <= 1.02) { offsetX = 0; offsetY = 0; }
            applyTransform();
        }

        function goTo(i) {
            if (!group.length) return;
            index = (i + group.length) % group.length;
            const img = group[index];
            lbImg.src = img.currentSrc || img.src;
            lbImg.alt = img.alt || 'Imagen';
            counter.textContent = (index + 1) + ' / ' + group.length;
            counter.style.display = group.length > 1 ? 'block' : 'none';
            btnPrev.style.display = group.length > 1 ? 'flex' : 'none';
            btnNext.style.display = group.length > 1 ? 'flex' : 'none';
            resetZoom();
        }

        function abrir(imgsGroup, startIndex) {
            group = imgsGroup;
            index = startIndex;
            goTo(index);
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => btnClose.focus(), 50);
        }

        function cerrar() {
            lb.classList.remove('active');
            document.body.style.overflow = '';
            resetZoom();
        }

        imgs.forEach((img) => {
            img.addEventListener('click', () => {
                const panel = img.closest('.slide-panel');
                const parent = panel || img.closest('.campus-main-panel') || document;
                const imgsGroup = Array.from(parent.querySelectorAll('.campus-img-figure img'));
                const idx = imgsGroup.indexOf(img);
                abrir(imgsGroup, idx >= 0 ? idx : 0);
            });
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', 'Ampliar imagen: ' + (img.alt || ''));
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    img.click();
                }
            });
        });

        btnClose.addEventListener('click', cerrar);
        lb.addEventListener('click', (e) => {
            if (e.target === lb || e.target === stage) cerrar();
        });
        btnPrev.addEventListener('click', (e) => { e.stopPropagation(); goTo(index - 1); });
        btnNext.addEventListener('click', (e) => { e.stopPropagation(); goTo(index + 1); });

        lb.querySelectorAll('.lightbox-ctrl-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const a = btn.dataset.lbAction;
                if (a === 'zoom-in') zoomTo(scale + 0.5);
                else if (a === 'zoom-out') zoomTo(scale - 0.5);
                else resetZoom();
            });
        });

        stage.addEventListener('wheel', (e) => {
            e.preventDefault();
            zoomTo(scale + (e.deltaY > 0 ? -0.15 : 0.15));
        }, { passive: false });

        stage.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            dragging = true;
            stage.classList.add('dragging');
            dragStartX = e.clientX; dragStartY = e.clientY;
            startOffsetX = offsetX; startOffsetY = offsetY;
        });
        document.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            offsetX = startOffsetX + (e.clientX - dragStartX);
            offsetY = startOffsetY + (e.clientY - dragStartY);
            applyTransform();
        });
        document.addEventListener('mouseup', () => {
            if (!dragging) return;
            dragging = false;
            stage.classList.remove('dragging');
        });

        stage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                dragging = true;
                dragStartX = e.touches[0].clientX;
                dragStartY = e.touches[0].clientY;
                startOffsetX = offsetX; startOffsetY = offsetY;
                const now = Date.now();
                if (now - lastTap < 300) {
                    if (scale > 1.2) resetZoom(); else zoomTo(2.5);
                    lastTap = 0;
                    e.preventDefault();
                } else {
                    lastTap = now;
                }
            } else if (e.touches.length === 2) {
                dragging = false;
                touchStartDist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                touchStartScale = scale;
                e.preventDefault();
            }
        }, { passive: false });

        stage.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1 && dragging) {
                offsetX = startOffsetX + (e.touches[0].clientX - dragStartX);
                offsetY = startOffsetY + (e.touches[0].clientY - dragStartY);
                applyTransform();
            } else if (e.touches.length === 2) {
                const dist = Math.hypot(
                    e.touches[0].clientX - e.touches[1].clientX,
                    e.touches[0].clientY - e.touches[1].clientY
                );
                zoomTo(touchStartScale * (dist / touchStartDist));
                e.preventDefault();
            }
        }, { passive: false });

        stage.addEventListener('touchend', () => { dragging = false; });

        stage.addEventListener('dblclick', (e) => {
            e.preventDefault();
            if (scale > 1.2) resetZoom(); else zoomTo(2.5);
        });

        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('active')) return;
            if (e.key === 'Escape') cerrar();
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
            if (e.key === '+' || e.key === '=') zoomTo(scale + 0.5);
            if (e.key === '-') zoomTo(scale - 0.5);
            if (e.key === '0') resetZoom();
        });
    }

    // ============================================================
    // 17. INICIALIZAR TODO
    // ============================================================
    function init() {
        window.scrollTo(0, 0);

        initBubbles();
        initThemeToggle();
        initMenu();
        initBackButton();
        initHeroToggle();
        initIntro();
        initRevealAnimations();
        initScrollFeatures();
        initMainTabs();
        initCampusSlides();
        initTipsSlides();
        initInfoSlides();
        initAccordions();
        initGuide();
        initLightbox();

        setTimeout(() => {
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 100);

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 300);

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, lowPerformanceMode ? 1200 : 2400);

        console.log('[Campus] Inicializado · Modo:', lowPerformanceMode ? 'LIGERO' : 'COMPLETO');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();