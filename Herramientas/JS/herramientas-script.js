// ===== HERRAMIENTAS SCRIPT =====

(function() {
    'use strict';

    console.log('✅ herramientas-script.js cargado');

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
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
        let width, height, bubbles = [], animationId = null, isVisible = true;

        // En móvil, menos burbujas y más pequeñas
        const numBubbles = lowPerformanceMode ? 6 : 20;
        const maxRadius = lowPerformanceMode ? 140 : 180;
        const minRadius = lowPerformanceMode ? 60 : 80;
        const speedFactor = lowPerformanceMode ? 0.25 : 0.4;

        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            // En modo ligero, DPR 1 para aliviar la GPU
            const dpr = lowPerformanceMode ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            if (dpr !== 1) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }
        window.addEventListener('resize', () => { resize(); initBubbleData(); });

        function initBubbleData() {
            bubbles = [];
            for (let i = 0; i < numBubbles; i++) {
                bubbles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * (maxRadius - minRadius) + minRadius,
                    vx: (Math.random() - 0.5) * speedFactor,
                    vy: (Math.random() - 0.5) * speedFactor,
                    color: Math.random() > 0.5 ? 'rgba(37, 99, 235, 0.15)' : 'rgba(96, 165, 250, 0.1)'
                });
            }
        }
        function animate() {
            if (!isVisible) { animationId = null; return; }
            ctx.clearRect(0, 0, width, height);
            bubbles.forEach(b => {
                b.x += b.vx; b.y += b.vy;
                if (b.x < -b.r) b.x = width + b.r;
                if (b.x > width + b.r) b.x = -b.r;
                if (b.y < -b.r) b.y = height + b.r;
                if (b.y > height + b.r) b.y = -b.r;
                const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
                g.addColorStop(0, b.color);
                g.addColorStop(1, 'transparent');
                ctx.fillStyle = g;
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
        resize(); initBubbleData(); animate();

        console.log('[Herramientas] Canvas iniciado ·', lowPerformanceMode ? 'MODO LIGERO' : 'MODO COMPLETO', '· Burbujas:', numBubbles);
    }

    // ============================================================
    // 3. VALIDACIÓN DE DATOS
    // ============================================================
    function validarHerramientas() {
        if (!window.HERRAMIENTAS) {
            console.error('[Herramientas] No se encontró window.HERRAMIENTAS. ¿Cargaste herramientas-data.js?');
            return;
        }
        const req = ['id', 'nombre', 'color', 'categoria', 'descripcion'];
        const cats = ['ofimaticas', 'almacenamiento', 'organizadores', 'presentaciones', 'ia'];
        Object.entries(window.HERRAMIENTAS).forEach(([key, tool]) => {
            req.forEach(f => {
                if (!tool[f]) console.warn(`[Herramientas] "${key}" le falta el campo obligatorio: ${f}`);
            });
            if (tool.categoria && !cats.includes(tool.categoria)) {
                console.warn(`[Herramientas] "${key}" tiene categoría inválida: ${tool.categoria}`);
            }
        });
    }

    // ============================================================
    // 4. TABS DE CATEGORÍAS
    // ============================================================
    function initTabs() {
        const tabs = document.querySelectorAll('.tab-categoria');
        const panels = document.querySelectorAll('.tab-categoria-panel');
        const nav = document.querySelector('.tabs-categorias-nav');
        const scrollInner = document.querySelector('.tabs-scroll-inner');
        if (!tabs.length || !panels.length) return;

        function checkScroll() {
            if (!scrollInner) return;
            const hasScrollLeft = scrollInner.scrollLeft > 10;
            const hasScrollRight = scrollInner.scrollLeft < scrollInner.scrollWidth - scrollInner.clientWidth - 10;
            const hasScroll = scrollInner.scrollWidth > scrollInner.clientWidth;
            scrollInner.classList.toggle('has-scroll', hasScroll);
            if (nav) {
                nav.classList.toggle('has-scroll-left', hasScrollLeft);
                nav.classList.toggle('has-scroll-right', hasScrollRight);
            }
        }

        tabs.forEach(function(tab) {
            tab.addEventListener('click', function() {
                const categoria = this.dataset.categoria;
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));
                this.classList.add('active');
                const targetPanel = document.querySelector('.tab-categoria-panel[data-categoria="' + categoria + '"]');
                if (targetPanel) targetPanel.classList.add('active');
                setTimeout(checkScroll, 100);
            });
        });

        if (scrollInner) scrollInner.addEventListener('scroll', checkScroll);
        setTimeout(checkScroll, 100);
    }

    // ============================================================
    // 5. GENERAR TARJETAS (data-driven, con reintento)
    // ============================================================
    function generarTarjetas(intento) {
        intento = intento || 0;

        const grids = {
            ofimaticas:     document.getElementById('herramientasGridOfimaticas'),
            almacenamiento: document.getElementById('herramientasGridAlmacenamiento'),
            organizadores:  document.getElementById('herramientasGridOrganizadores'),
            presentaciones: document.getElementById('herramientasGridPresentaciones'),
            ia:             document.getElementById('herramientasGridIA')
        };

        const gridsExisten = Object.values(grids).some(g => g);
        if (!gridsExisten) {
            console.error('[Herramientas] No se encontró ningún grid en el HTML. Verifica los IDs.');
            return;
        }

        if (!window.HERRAMIENTAS || !window.HerramientasRender) {
            if (intento < 30) {
                setTimeout(() => generarTarjetas(intento + 1), 100);
                return;
            }
            console.error('[Herramientas] No se pudieron cargar los datos/render tras 3s.');
            console.error('  window.HERRAMIENTAS =', !!window.HERRAMIENTAS);
            console.error('  window.HerramientasRender =', !!window.HerramientasRender);
            Object.values(grids).forEach(grid => {
                if (grid) grid.innerHTML = '<p style="color:#ef4444;text-align:center;padding:1rem;">Error: no se cargaron los datos.</p>';
            });
            return;
        }

        const agrupadas = {};
        Object.values(window.HERRAMIENTAS).forEach(tool => {
            const cat = tool.categoria || 'ofimaticas';
            if (!agrupadas[cat]) agrupadas[cat] = [];
            agrupadas[cat].push(tool);
        });

        let totalPintadas = 0;

        Object.keys(grids).forEach(cat => {
            const grid = grids[cat];
            if (!grid) {
                console.warn('[Herramientas] No existe el grid para categoría:', cat);
                return;
            }
            const tools = agrupadas[cat] || [];
            if (tools.length === 0) {
                grid.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:1rem;">No hay herramientas en esta categoría.</p>';
                return;
            }
            grid.innerHTML = tools.map(t => window.HerramientasRender.card(t)).join('');
            totalPintadas += tools.length;
        });

        console.log('[Herramientas] Tarjetas pintadas:', totalPintadas);

        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 50);
        }
    }

    // ============================================================
    // 6. DETALLE
    // ============================================================
    function initDetalle() {
        const overlay = document.getElementById('herramientaDetalleOverlay');
        const container = document.getElementById('herramientaDetalleContainer');
        const closeBtn = document.getElementById('detalleClose');
        const content = document.getElementById('detalleContent');
        if (!overlay || !container || !closeBtn || !content) return;

        let scrollTopBtn = document.querySelector('.detalle-scroll-top');

        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'detalle-scroll-top';
            scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
            scrollTopBtn.innerHTML = '<i data-lucide="chevron-up" class="icon-lucide-lg"></i>';
            document.body.appendChild(scrollTopBtn);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        scrollTopBtn.addEventListener('click', () => container.scrollTo({
            top: 0,
            behavior: lowPerformanceMode ? 'auto' : 'smooth'
        }));

        // ===== LIGHTBOX =====
        let lightboxEl = null, lightboxImg = null, lightboxStage = null, lightboxCounter = null, lightboxZoomValue = null;
        let lightboxImgs = [], lightboxIndex = 0;
        let lbScale = 1, lbMinScale = 0.5, lbMaxScale = 5, lbOffsetX = 0, lbOffsetY = 0;
        let lbDragging = false, lbDragStartX = 0, lbDragStartY = 0, lbStartOffsetX = 0, lbStartOffsetY = 0;
        let lbTouchStartDist = 0, lbTouchStartScale = 1, lbLastTap = 0;

        function initLightbox() {
            if (lightboxEl) return;
            lightboxEl = document.createElement('div');
            lightboxEl.className = 'lightbox';
            lightboxEl.setAttribute('aria-hidden', 'true');
            lightboxEl.innerHTML = `
                <div class="lightbox-counter" aria-hidden="true">1 / 1</div>
                <button class="lightbox-close" aria-label="Cerrar visor"><i data-lucide="x" class="icon-lucide-lg"></i></button>
                <button class="lightbox-nav lightbox-prev" aria-label="Imagen anterior"><i data-lucide="chevron-left" class="icon-lucide-lg"></i></button>
                <button class="lightbox-nav lightbox-next" aria-label="Imagen siguiente"><i data-lucide="chevron-right" class="icon-lucide-lg"></i></button>
                <div class="lightbox-stage"><img class="lightbox-img" alt="" /></div>
                <div class="lightbox-hint">Rueda del ratón o pinza para zoom · Doble clic para alternar · Arrastra para mover</div>
                <div class="lightbox-controls">
                    <button class="lightbox-ctrl-btn" data-lb-action="zoom-out" aria-label="Reducir zoom"><i data-lucide="zoom-out" class="icon-lucide-sm"></i></button>
                    <span class="lightbox-zoom-value">100%</span>
                    <button class="lightbox-ctrl-btn" data-lb-action="zoom-in" aria-label="Aumentar zoom"><i data-lucide="zoom-in" class="icon-lucide-sm"></i></button>
                    <button class="lightbox-ctrl-btn lightbox-reset-btn" data-lb-action="reset" aria-label="Reiniciar zoom">Reiniciar</button>
                </div>
            `;
            document.body.appendChild(lightboxEl);
            if (typeof lucide !== 'undefined') lucide.createIcons();
            lightboxImg = lightboxEl.querySelector('.lightbox-img');
            lightboxStage = lightboxEl.querySelector('.lightbox-stage');
            lightboxCounter = lightboxEl.querySelector('.lightbox-counter');
            lightboxZoomValue = lightboxEl.querySelector('.lightbox-zoom-value');

            lightboxEl.querySelector('.lightbox-close').addEventListener('click', cerrarLightbox);
            lightboxEl.addEventListener('click', (e) => { if (e.target === lightboxEl || e.target === lightboxStage) cerrarLightbox(); });
            lightboxEl.querySelector('.lightbox-prev').addEventListener('click', (e) => { e.stopPropagation(); irLightbox(-1); });
            lightboxEl.querySelector('.lightbox-next').addEventListener('click', (e) => { e.stopPropagation(); irLightbox(1); });
            lightboxEl.querySelectorAll('.lightbox-ctrl-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const a = btn.dataset.lbAction;
                    if (a === 'zoom-in') zoomLightbox(lbScale + 0.5);
                    else if (a === 'zoom-out') zoomLightbox(lbScale - 0.5);
                    else resetLightboxZoom();
                });
            });

            lightboxStage.addEventListener('wheel', (e) => { e.preventDefault(); zoomLightbox(lbScale + (e.deltaY > 0 ? -0.15 : 0.15)); }, { passive: false });
            lightboxStage.addEventListener('mousedown', (e) => { if (e.button !== 0) return; lbDragging = true; lightboxStage.classList.add('dragging'); lbDragStartX = e.clientX; lbDragStartY = e.clientY; lbStartOffsetX = lbOffsetX; lbStartOffsetY = lbOffsetY; });
            document.addEventListener('mousemove', (e) => { if (!lbDragging) return; lbOffsetX = lbStartOffsetX + (e.clientX - lbDragStartX); lbOffsetY = lbStartOffsetY + (e.clientY - lbDragStartY); applyLightboxTransform(); });
            document.addEventListener('mouseup', () => { if (!lbDragging) return; lbDragging = false; lightboxStage.classList.remove('dragging'); });

            lightboxStage.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    lbDragging = true;
                    lbDragStartX = e.touches[0].clientX; lbDragStartY = e.touches[0].clientY;
                    lbStartOffsetX = lbOffsetX; lbStartOffsetY = lbOffsetY;
                    const now = Date.now();
                    if (now - lbLastTap < 300) { if (lbScale > 1.2) resetLightboxZoom(); else zoomLightbox(2.5); lbLastTap = 0; e.preventDefault(); }
                    else lbLastTap = now;
                } else if (e.touches.length === 2) {
                    lbDragging = false;
                    lbTouchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                    lbTouchStartScale = lbScale;
                    e.preventDefault();
                }
            }, { passive: false });

            lightboxStage.addEventListener('touchmove', (e) => {
                if (e.touches.length === 1 && lbDragging) {
                    lbOffsetX = lbStartOffsetX + (e.touches[0].clientX - lbDragStartX);
                    lbOffsetY = lbStartOffsetY + (e.touches[0].clientY - lbDragStartY);
                    applyLightboxTransform();
                } else if (e.touches.length === 2) {
                    const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
                    zoomLightbox(lbTouchStartScale * (dist / lbTouchStartDist));
                    e.preventDefault();
                }
            }, { passive: false });

            lightboxStage.addEventListener('touchend', () => { lbDragging = false; });
            lightboxStage.addEventListener('dblclick', (e) => { e.preventDefault(); if (lbScale > 1.2) resetLightboxZoom(); else zoomLightbox(2.5); });
            document.addEventListener('keydown', (e) => {
                if (!lightboxEl.classList.contains('active')) return;
                if (e.key === 'Escape') cerrarLightbox();
                if (e.key === 'ArrowLeft') irLightbox(-1);
                if (e.key === 'ArrowRight') irLightbox(1);
                if (e.key === '+' || e.key === '=') zoomLightbox(lbScale + 0.5);
                if (e.key === '-') zoomLightbox(lbScale - 0.5);
                if (e.key === '0') resetLightboxZoom();
            });
        }

        function applyLightboxTransform() {
            if (!lightboxImg) return;
            lightboxImg.style.transform = `translate(${lbOffsetX}px, ${lbOffsetY}px) scale(${lbScale})`;
            if (lightboxZoomValue) lightboxZoomValue.textContent = Math.round(lbScale * 100) + '%';
            if (lightboxStage) lightboxStage.classList.toggle('zoomed', lbScale > 1.02);
        }
        function zoomLightbox(s) { lbScale = Math.max(lbMinScale, Math.min(lbMaxScale, s)); if (lbScale <= 1.02) { lbOffsetX = 0; lbOffsetY = 0; } applyLightboxTransform(); }
        function resetLightboxZoom() { lbScale = 1; lbOffsetX = 0; lbOffsetY = 0; applyLightboxTransform(); }
        function irLightbox(d) {
            if (!lightboxImgs.length) return;
            lightboxIndex = (lightboxIndex + d + lightboxImgs.length) % lightboxImgs.length;
            if (lightboxImg) { lightboxImg.src = lightboxImgs[lightboxIndex]; lightboxImg.alt = 'Imagen ' + (lightboxIndex + 1); }
            if (lightboxCounter) lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImgs.length;
            resetLightboxZoom();
        }
        function abrirLightbox(imgs, idx) {
            initLightbox();
            lightboxImgs = imgs; lightboxIndex = idx || 0;
            if (lightboxImg) { lightboxImg.src = lightboxImgs[lightboxIndex]; lightboxImg.alt = 'Imagen ' + (lightboxIndex + 1); }
            if (lightboxCounter) { lightboxCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxImgs.length; lightboxCounter.style.display = lightboxImgs.length > 1 ? 'block' : 'none'; }
            const p = lightboxEl.querySelector('.lightbox-prev'), n = lightboxEl.querySelector('.lightbox-next');
            if (p) p.style.display = lightboxImgs.length > 1 ? 'flex' : 'none';
            if (n) n.style.display = lightboxImgs.length > 1 ? 'flex' : 'none';
            resetLightboxZoom();
            lightboxEl.classList.add('active');
            lightboxEl.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
        function cerrarLightbox() {
            if (!lightboxEl) return;
            lightboxEl.classList.remove('active');
            lightboxEl.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            resetLightboxZoom();
        }

        // ===== CARRUSEL =====
        function initCarrusel(containerEl) {
            const track = containerEl.querySelector('.carrusel-track');
            const items = containerEl.querySelectorAll('.carrusel-item');
            const thumbs = containerEl.querySelectorAll('.carrusel-thumb');
            if (!track || items.length === 0) return;
            let currentIndex = 0;
            const totalItems = items.length;
            const imgsForLightbox = Array.from(items).map(el => { const s = el.querySelector('.carrusel-item-content span'); return s ? s.textContent.trim() : ''; });
            function update(i, smooth = true) {
                currentIndex = i;
                track.style.transition = smooth ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
                track.style.transform = `translateX(${-i * 100}%)`;
                thumbs.forEach((t, k) => t.classList.toggle('active', k === currentIndex));
            }
            const prev = containerEl.querySelector('.carrusel-prev');
            const next = containerEl.querySelector('.carrusel-next');
            if (prev) prev.addEventListener('click', (e) => { e.stopPropagation(); if (currentIndex > 0) update(currentIndex - 1); });
            if (next) next.addEventListener('click', (e) => { e.stopPropagation(); if (currentIndex < totalItems - 1) update(currentIndex + 1); });
            thumbs.forEach(t => t.addEventListener('click', function(e) { e.stopPropagation(); const i = parseInt(this.dataset.index); if (i !== currentIndex) update(i); }));
            items.forEach((item, idx) => item.addEventListener('click', (e) => { e.stopPropagation(); if (e.target.closest('.carrusel-btn')) return; abrirLightbox(imgsForLightbox, idx); }));
            update(0, false);
        }

        // ===== ABRIR DETALLE =====
        function abrirDetalle(herramientaId) {
            const data = window.HERRAMIENTAS[herramientaId];
            if (!data) {
                console.warn('[Herramientas] No existe la herramienta:', herramientaId);
                return;
            }

            content.innerHTML = window.HerramientasRender.detalle(data);

            setTimeout(function() {
                const color = data.color || '#2563eb';
                const tabs = content.querySelectorAll('.detalle-tab');
                const panels = content.querySelectorAll('.detalle-panel');

                container.style.setProperty('--detalle-divider-color', color);

                tabs.forEach(function(tab) {
                    tab.addEventListener('click', function() {
                        const target = this.dataset.tab;
                        tabs.forEach(t => t.classList.remove('active'));
                        panels.forEach(p => p.classList.remove('active'));
                        this.classList.add('active');
                        const targetPanel = content.querySelector('.detalle-panel[data-panel="' + target + '"]');
                        if (targetPanel) targetPanel.classList.add('active');
                    });
                });

                const carruselContainer = content.querySelector('.detalle-gallery .carrusel-container');
                if (carruselContainer) initCarrusel(carruselContainer);

                if (typeof lucide !== 'undefined') lucide.createIcons();
                container.scrollTop = 0;
                if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
            }, lowPerformanceMode ? 30 : 100);

            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function cerrarDetalle() {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (scrollTopBtn) scrollTopBtn.classList.remove('visible');
        }

        document.addEventListener('click', function(e) {
            const card = e.target.closest('.herramienta-card-full');
            if (card) {
                const herramienta = card.dataset.herramienta;
                if (herramienta) abrirDetalle(herramienta);
            }
        });

        closeBtn.addEventListener('click', cerrarDetalle);
        overlay.addEventListener('click', function(e) { if (e.target === overlay) cerrarDetalle(); });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) cerrarDetalle();
        });
    }

    // ============================================================
    // 7. MENÚ LATERAL
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
        menuToggle.addEventListener('click', function() {
            if (sideMenu.classList.contains('open')) window.closeMenu();
            else window.openMenu();
        });
        menuClose.addEventListener('click', window.closeMenu);
        menuOverlay.addEventListener('click', window.closeMenu);
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sideMenu.classList.contains('open')) window.closeMenu();
        });
    }

    // ============================================================
    // 8. BOTÓN DE VOLVER
    // ============================================================
    function initBackButton() {
        const btnBack = document.getElementById('btnBack');
        if (!btnBack) return;
        btnBack.addEventListener('click', function() { window.location.href = '../HTML/etapas.html'; });
    }

    // ============================================================
    // 9. TOGGLE DE DESCRIPCIÓN
    // ============================================================
    function initHeroToggle() {
        const heroSection = document.getElementById('heroSection');
        const toggleBtn = document.getElementById('heroToggle');
        if (!heroSection || !toggleBtn) return;
        const toggleText = toggleBtn.querySelector('.hero-toggle-text');
        toggleBtn.addEventListener('click', function() {
            heroSection.classList.toggle('collapsed');
            const isCollapsed = heroSection.classList.contains('collapsed');
            toggleText.textContent = isCollapsed ? 'Mostrar descripción' : 'Ocultar descripción';
        });
    }

    // ============================================================
    // 10. TOGGLE DE TEMA
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
        function toggleTheme() {
            const isLight = document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.setAttribute('aria-pressed', isLight ? 'true' : 'false');
        }
        toggle.addEventListener('click', toggleTheme);
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme(); }
        });
    }

    // ============================================================
    // 11. INTRO OVERLAY
    // ============================================================
    function initIntro() {
        const intro = document.getElementById('introOverlay');
        if (!intro) return;
        const delay = lowPerformanceMode ? 700 : 1400;
        const fade = lowPerformanceMode ? 400 : 800;
        setTimeout(function() {
            intro.classList.add('hidden');
            setTimeout(function() { intro.style.display = 'none'; window.scrollTo(0, 0); }, fade);
        }, delay);
    }

    // ============================================================
    // 12. SCROLL FEATURES
    // ============================================================
    function initScrollFeatures() {
        const progressBar = document.getElementById('readingProgress');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;
        if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({
            top: 0,
            behavior: lowPerformanceMode ? 'auto' : 'smooth'
        }));
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.scrollY || document.documentElement.scrollTop;
                    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
                    if (progressBar) progressBar.style.width = Math.min(progress, 100) + '%';
                    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 300);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================================
    // 13. GUÍA INTERACTIVA
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
            { selector: '.hero-section', text: 'Título y descripción: aquí encontrarás la información principal de las Herramientas Digitales.', position: 'bottom', mode: 'normal', before: null, after: null },
            { selector: '.tabs-categorias-nav', text: 'Pestañas de categorías: navega entre Ofimáticas, Almacenamiento, Organizadores, Presentaciones e IA.', position: 'bottom', mode: 'normal', before: null, after: null },
            { selector: '.tabs-categorias-content', text: 'Contenido de la categoría: aquí se muestran las herramientas de la sección seleccionada.', position: 'top', mode: 'normal', before: null, after: null },
            { selector: '.herramienta-card-full', text: 'Haz clic en cualquier tarjeta para abrir la información completa del programa. Se abrirá un panel con todos los detalles.', position: 'top', mode: 'interactive-card', before: null, after: null },
            { selector: '.side-menu', text: 'Menú lateral: aquí puedes cambiar entre Campus Virtual, Herramientas Digitales e Inteligencia Artificial.', position: 'right', mode: 'normal', before: function() { if (window.openMenu) window.openMenu(); }, after: function() { if (window.closeMenu) window.closeMenu(); } }
        ];

        let currentStep = 0;
        let isActive = false;
        let interactiveClickHandler = null;

        function getElement(selector) { return document.querySelector(selector); }

        function positionTooltip(element, position) {
            const rect = element.getBoundingClientRect();
            const tooltipRect = guideTooltip.getBoundingClientRect();
            const padding = 20;
            let top, left;
            switch (position) {
                case 'bottom': top = rect.bottom + padding; left = rect.left + rect.width / 2 - tooltipRect.width / 2; break;
                case 'top': top = rect.top - tooltipRect.height - padding; left = rect.left + rect.width / 2 - tooltipRect.width / 2; break;
                case 'right': top = rect.top + rect.height / 2 - tooltipRect.height / 2; left = rect.right + padding; break;
                case 'left': top = rect.top + rect.height / 2 - tooltipRect.height / 2; left = rect.left - tooltipRect.width - padding; break;
                default: top = rect.bottom + padding; left = rect.left;
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

        function clearInteractiveHandler() {
            if (interactiveClickHandler) {
                document.removeEventListener('click', interactiveClickHandler, true);
                document.removeEventListener('mousedown', interactiveClickHandler, true);
                interactiveClickHandler = null;
            }
        }

        function enableInteractiveClick(element) {
            clearInteractiveHandler();
            guideOverlay.style.pointerEvents = 'none';
            guideTooltip.style.pointerEvents = 'auto';
            interactiveClickHandler = function(ev) {
                const target = ev.target.closest('.herramienta-card-full');
                if (!target) return;
                if (target !== element && !element.contains(target)) return;
                setTimeout(() => {
                    if (isActive && currentStep === 3) closeGuide();
                }, 100);
            };
            document.addEventListener('click', interactiveClickHandler, true);
            document.addEventListener('mousedown', interactiveClickHandler, true);
        }

        function disableInteractiveClick() {
            clearInteractiveHandler();
            guideOverlay.style.pointerEvents = '';
            guideTooltip.style.pointerEvents = '';
        }

        function showStep(index) {
            if (index < 0 || index >= steps.length) return;
            const step = steps[index];
            if (step.before) step.before();
            setTimeout(() => {
                const element = getElement(step.selector);
                if (!element) { console.warn('[Guía] Elemento no encontrado:', step.selector); return; }
                currentStep = index;
                guideStep.textContent = (index + 1) + '/' + steps.length;
                guideText.textContent = step.text;
                disableInteractiveClick();

                setTimeout(() => {
                    if (step.selector === '.side-menu') window.scrollTo({ top: 0, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
                    else {
                        const y = element.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: lowPerformanceMode ? 'auto' : 'smooth' });
                    }
                }, 50);

                setTimeout(() => {
                    updateSpotlight(element);
                    requestAnimationFrame(() => positionTooltip(element, step.position));
                }, 400);

                guidePrev.disabled = index === 0;

                if (step.mode === 'interactive-card') {
                    guideNext.disabled = true;
                    guideNext.innerHTML = '<span>Haz clic en una tarjeta</span><i data-lucide="mouse-pointer-click" class="icon-lucide-sm"></i>';
                    enableInteractiveClick(element);
                } else if (index === steps.length - 1) {
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
            disableInteractiveClick();
            guideOverlay.classList.remove('active');
            guideOverlay.setAttribute('aria-hidden', 'true');
            guideToggle.classList.remove('active');
            guideToggle.setAttribute('aria-pressed', 'false');
            document.body.style.overflow = '';
            if (steps[currentStep].after) steps[currentStep].after();
            setTimeout(() => window.scrollTo({ top: 0, behavior: lowPerformanceMode ? 'auto' : 'smooth' }), 100);
        }

        guideToggle.addEventListener('click', () => { if (isActive) closeGuide(); else openGuide(); });
        guideToggle.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); guideToggle.click(); } });
        guideClose.addEventListener('click', closeGuide);
        guidePrev.addEventListener('click', () => {
            if (currentStep === 0) return;
            if (steps[currentStep].after) steps[currentStep].after();
            showStep(currentStep - 1);
        });
        guideNext.addEventListener('click', () => {
            if (steps[currentStep].mode === 'interactive-card') return;
            if (currentStep === steps.length - 1) { closeGuide(); return; }
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
        window.addEventListener('resize', () => { if (isActive) showStep(currentStep); });
        window.addEventListener('scroll', () => {
            if (isActive) {
                const step = steps[currentStep];
                const element = getElement(step.selector);
                if (element) { updateSpotlight(element); requestAnimationFrame(() => positionTooltip(element, step.position)); }
            }
        }, { passive: true });
    }

    // ============================================================
    // 14. INICIALIZAR
    // ============================================================
    function init() {
        window.scrollTo(0, 0);
        validarHerramientas();
        initBubbles();
        initThemeToggle();
        initMenu();
        initBackButton();
        initHeroToggle();
        initIntro();
        initScrollFeatures();
        initTabs();
        generarTarjetas(0);
        initDetalle();
        initGuide();
        setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 100);
        setTimeout(() => window.scrollTo(0, 0), 300);
        setTimeout(() => window.scrollTo(0, 0), lowPerformanceMode ? 1200 : 2400);

        console.log('[Herramientas] Inicializado · Modo:', lowPerformanceMode ? 'LIGERO' : 'COMPLETO');
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

})();