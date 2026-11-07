// ===== CAMPUS VIRTUAL SCRIPT =====

(function() {
    'use strict';

    console.log('✅ campus-script.js cargado');

    // ============================================================
    // 0. FORZAR SCROLL AL INICIO AL CARGAR
    //    - Desactiva la restauración automática del navegador
    //    - Fuerza scroll(0,0) varias veces para asegurar
    // ============================================================
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Forzar scroll arriba en cuanto el script se ejecuta
    window.scrollTo(0, 0);

    // Y otra vez cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
        window.scrollTo(0, 0);
    });

    // Y una vez más cuando la página termine de cargar completamente
    window.addEventListener('load', () => {
        window.scrollTo(0, 0);
    });

    // ============================================================
    // 1. FONDO DE BURBUJAS (Canvas 2D Ligero)
    // ============================================================
    function initBubbles() {
        const canvas = document.getElementById('starfieldCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        
        let width, height;
        let bubbles = [];
        let animationId = null;
        let isVisible = true;

        const isMobile = window.innerWidth <= 768;
        const numBubbles = isMobile ? 10 : 20; 

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
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
                    r: Math.random() * 180 + 80,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
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
    }

    // ============================================================
    // 2. MENÚ LATERAL
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
    // 3. BOTÓN DE VOLVER
    // ============================================================
    function initBackButton() {
        const btnBack = document.getElementById('btnBack');
        if (!btnBack) return;
        btnBack.addEventListener('click', () => {
            window.location.href = '../HTML/etapas.html';
        });
    }

    // ============================================================
    // 4. TOGGLE DE DESCRIPCIÓN (HERO)
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
    // 5. TOGGLE DE TEMA
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
    // 6. INTRO OVERLAY
    //    - Al ocultarse, forzamos scroll arriba de nuevo
    // ============================================================
    function initIntro() {
        const intro = document.getElementById('introOverlay');
        if (!intro) return;
        setTimeout(() => {
            intro.classList.add('hidden');
            setTimeout(() => {
                intro.style.display = 'none';
                // Al quitar el intro, volvemos a forzar scroll arriba
                window.scrollTo(0, 0);
            }, 800);
        }, 1400);
    }

    // ============================================================
    // 7. ANIMACIONES REVEAL
    // ============================================================
    function initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        if (!('IntersectionObserver' in window)) {
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
    // 8. BARRA DE PROGRESO Y VOLVER ARRIBA
    // ============================================================
    function initScrollFeatures() {
        const progressBar = document.getElementById('readingProgress');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // 9. TABS PRINCIPALES, SLIDES Y ACORDEONES
    // ============================================================
    function initTabsAndSlides() {
        // Tabs principales
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
                document.getElementById(targetId).classList.add('active');
            });
        });

        // Mini Slides
        const slideTabs = document.querySelectorAll('.slide-tab');
        const slidePanels = document.querySelectorAll('.slide-panel');
        const dots = document.querySelectorAll('.slide-dot');
        const counter = document.getElementById('slidesCounter');
        const prevBtn = document.getElementById('slidesPrev');
        const nextBtn = document.getElementById('slidesNext');
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
        
        window.goToSlide = goToSlide;
        // Inicializamos sin hacer scroll, ya que el scroll lo fuerza init()
        goToSlide(0);

        // Acordeones
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
    // 10. GUÍA INTERACTIVA
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
                text: 'Pestañas principales: desde aquí puedes cambiar entre la sección de Campus Virtual y los Tips y recomendaciones.',
                position: 'bottom',
                before: null,
                after: null
            },
            {
                selector: '.slides-tabs',
                text: 'Mini pestañas: te permiten navegar entre las diferentes secciones dentro del Campus (UNAgenDa, Carrera, etc.).',
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
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                        const y = element.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: 'smooth' });
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

            // Al cerrar la guía, volver arriba de todo
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
    // 11. INICIALIZAR TODO
    // ============================================================
    function init() {
        // Forzar scroll arriba ANTES de inicializar cualquier cosa
        window.scrollTo(0, 0);

        initBubbles();
        initThemeToggle();
        initMenu();
        initBackButton();
        initHeroToggle();
        initIntro();
        initRevealAnimations();
        initScrollFeatures();
        initTabsAndSlides();
        initGuide();

        setTimeout(() => {
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }, 100);

        // Un último empujón por si algo tomó el foco
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 300);

        // Y otro más, tras el intro overlay (1400ms + 800ms fade)
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 2400);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();