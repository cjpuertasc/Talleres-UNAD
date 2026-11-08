// ===== HERRAMIENTAS SCRIPT =====

(function() {
    'use strict';

    console.log('✅ herramientas-script.js cargado');

    // ============================================================
    // 0. FORZAR SCROLL AL INICIO
    // ============================================================
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    document.addEventListener('DOMContentLoaded', () => window.scrollTo(0, 0));
    window.addEventListener('load', () => window.scrollTo(0, 0));

    // ============================================================
    // 1. FONDO DE BURBUJAS
    // ============================================================
    function initBubbles() {
        const canvas = document.getElementById('starfieldCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let width, height, bubbles = [], animationId = null, isVisible = true;
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
        window.addEventListener('resize', () => { resize(); initBubbleData(); });

        function initBubbleData() {
            bubbles = [];
            for (let i = 0; i < numBubbles; i++) {
                bubbles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    r: Math.random() * 180 + 80,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
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
    }

    // ============================================================
    // 2. DATOS DE HERRAMIENTAS
    // ============================================================
    const herramientasData = {
        word: { nombre: 'Microsoft Word', color: '#2b579a', icon: '../icons/microsoft-word.svg', descripcion: 'Word es un procesador de textos profesional que permite crear, editar y dar formato a documentos de manera eficiente.', deQueTrata: 'Word es un procesador de textos que forma parte de Microsoft Office.', paraQueFunciona: 'Word se utiliza para la creación de documentos académicos como ensayos, informes, tesis.', comoFunciona: 'Word funciona con un sistema de "cinta de opciones".', tips: ['Usa estilos predefinidos.', 'Aprende atajos de teclado.', 'La función "Control de cambios" es ideal.', 'Guarda tus documentos en la nube.', 'Usa la herramienta de "Referencias".'], plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'], badge: 'Office', categoria: 'ofimaticas', imagenes: ['word-1.jpg', 'word-2.jpg', 'word-3.jpg'] },
        excel: { nombre: 'Microsoft Excel', color: '#217346', icon: '../icons/microsoft-excel.svg', descripcion: 'Excel es una hoja de cálculo que permite realizar análisis de datos, crear gráficos, tablas dinámicas.', deQueTrata: 'Excel es una hoja de cálculo que forma parte de Microsoft Office.', paraQueFunciona: 'Excel se utiliza para todo tipo de análisis de datos.', comoFunciona: 'Excel funciona con un sistema de celdas donde se ingresan datos y fórmulas.', tips: ['Aprende las fórmulas básicas.', 'Usa formato condicional.', 'Las tablas dinámicas son poderosas.', 'Graba macros.', 'Usa la función "Validación de datos".'], plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'], badge: 'Office', categoria: 'ofimaticas', imagenes: ['excel-1.jpg', 'excel-2.jpg', 'excel-3.jpg'] },
        powerpoint: { nombre: 'Microsoft PowerPoint', color: '#d24726', icon: '../icons/microsoft-powerpoint.svg', descripcion: 'PowerPoint es la herramienta líder para crear presentaciones impactantes.', deQueTrata: 'PowerPoint es una herramienta de presentaciones de Microsoft Office.', paraQueFunciona: 'PowerPoint se utiliza para crear presentaciones visuales.', comoFunciona: 'PowerPoint funciona con diapositivas organizadas secuencialmente.', tips: ['Mantén tus diapositivas limpias.', 'Usa imágenes de alta calidad.', 'Practica tu presentación.', 'Las animaciones deben ser sutiles.', 'Usa plantillas profesionales.'], plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'], badge: 'Office', categoria: 'ofimaticas', imagenes: ['ppt-1.jpg', 'ppt-2.jpg', 'ppt-3.jpg'] },
        onenote: { nombre: 'Microsoft OneNote', color: '#7719aa', icon: '../icons/microsoft-onenote.svg', descripcion: 'OneNote es un cuaderno digital para tomar notas y organizar información.', deQueTrata: 'OneNote es un cuaderno digital.', paraQueFunciona: 'OneNote se utiliza para tomar apuntes en clase.', comoFunciona: 'OneNote funciona con una estructura de cuadernos, secciones y páginas.', tips: ['Usa etiquetas para categorizar.', 'La función de dibujo a mano alzada.', 'Comparte tus cuadernos.', 'Sincroniza OneNote.', 'Usa la función de "Grabación de audio".'], plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'], badge: 'Office', categoria: 'ofimaticas', imagenes: ['onenote-1.jpg', 'onenote-2.jpg'] },
        notebooklm: { nombre: 'NotebookLM', color: '#f59e0b', icon: '../icons/notebooklm.svg', descripcion: 'NotebookLM es un asistente de investigación impulsado por IA de Google.', deQueTrata: 'NotebookLM es una herramienta de investigación basada en IA.', paraQueFunciona: 'NotebookLM se utiliza para investigar y analizar documentos.', comoFunciona: 'NotebookLM funciona subiendo documentos.', tips: ['Sube documentos relacionados.', 'Usa preguntas específicas.', 'La función de resumen automático.', 'NotebookLM es gratuito.', 'Puedes subir múltiples documentos.'], plataformas: ['Web'], badge: 'Google', categoria: 'ofimaticas', imagenes: ['notebooklm-1.jpg', 'notebooklm-2.jpg'] },
        dobot: { nombre: 'Dobot', color: '#00a86b', icon: 'bot', descripcion: 'Dobot es una herramienta de automatización de tareas.', deQueTrata: 'Dobot es una plataforma de automatización.', paraQueFunciona: 'Dobot se utiliza para automatizar tareas.', comoFunciona: 'Dobot funciona con una interfaz visual.', tips: ['Comienza con flujos simples.', 'Dobot se integra con muchas aplicaciones.', 'Automatiza tareas frecuentes.', 'Explora los flujos predefinidos.', 'La programación visual facilita.'], plataformas: ['Web'], badge: 'IA', categoria: 'ofimaticas', imagenes: ['dobot-1.jpg', 'dobot-2.jpg'] },
        onedrive: { nombre: 'Microsoft OneDrive', color: '#0078d4', icon: '../icons/microsoft-onedrive.svg', descripcion: 'OneDrive es el servicio de almacenamiento en la nube de Microsoft.', deQueTrata: 'OneDrive es el servicio de almacenamiento en la nube.', paraQueFunciona: 'OneDrive se utiliza para almacenar archivos en la nube.', comoFunciona: 'OneDrive funciona guardando archivos en una carpeta local.', tips: ['Organiza tus archivos.', 'Comparte archivos con enlaces.', 'La integración con Office.', 'La papelera de reciclaje.', 'Aprovecha el espacio gratuito.'], plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'], badge: 'Microsoft', categoria: 'almacenamiento', imagenes: ['onedrive-1.jpg', 'onedrive-2.jpg'] },
        drive: { nombre: 'Google Drive', color: '#0f9d58', icon: '../icons/google-drive-2026.svg', descripcion: 'Google Drive es el servicio de almacenamiento en la nube de Google.', deQueTrata: 'Google Drive es el servicio de almacenamiento.', paraQueFunciona: 'Google Drive se utiliza para almacenar archivos.', comoFunciona: 'Google Drive funciona desde una cuenta de Google.', tips: ['Usa Documentos de Google.', 'Historial de versiones.', 'Carpetas compartidas.', 'Aprovecha los 15 GB gratuitos.', 'La función de "Sin conexión".'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Google', categoria: 'almacenamiento', imagenes: ['drive-1.jpg', 'drive-2.jpg', 'drive-3.jpg'] },
        notion: { nombre: 'Notion', color: '#000000', icon: '../icons/notion-icon.svg', descripcion: 'Notion es una plataforma todo-en-uno.', deQueTrata: 'Notion es una plataforma de productividad todo-en-uno.', paraQueFunciona: 'Notion se utiliza para organizar información.', comoFunciona: 'Notion funciona con un sistema de bloques.', tips: ['Comienza con una plantilla.', 'Usa bases de datos.', 'Notion es personalizable.', 'Aprovecha las integraciones.', 'La función de "Vistas".'], plataformas: ['Web', 'Windows', 'macOS', 'Android', 'iOS'], badge: 'Todo-en-uno', categoria: 'organizadores', imagenes: ['notion-1.jpg', 'notion-2.jpg'] },
        obsidian: { nombre: 'Obsidian', color: '#7c3aed', icon: '../icons/obsidian-icon.svg', descripcion: 'Obsidian es un editor de notas con enlaces bidireccionales.', deQueTrata: 'Obsidian es un editor de notas.', paraQueFunciona: 'Obsidian se utiliza para crear una red de conocimiento.', comoFunciona: 'Obsidian funciona con archivos Markdown.', tips: ['Crea enlaces entre notas.', 'Usa la visualización de grafos.', 'Las plantillas ayudan.', 'Obsidian funciona offline.', 'Explora los plugins.'], plataformas: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'], badge: 'Notas', categoria: 'organizadores', imagenes: ['obsidian-1.jpg', 'obsidian-2.jpg', 'obsidian-3.jpg'] },
        calendar: { nombre: 'Google Calendar', color: '#4285f4', icon: '../icons/google-calendar-2026.svg', descripcion: 'Google Calendar es un calendario inteligente.', deQueTrata: 'Google Calendar es una aplicación de calendario.', paraQueFunciona: 'Google Calendar se utiliza para gestionar el tiempo.', comoFunciona: 'Google Calendar funciona creando eventos.', tips: ['Crea calendarios separados.', 'Usa recordatorios.', 'Comparte tu calendario.', 'La integración con Gmail.', 'Usa la vista de "Agenda".'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Google', categoria: 'organizadores', imagenes: ['calendar-1.jpg', 'calendar-2.jpg'] },
        tasks: { nombre: 'Google Tasks', color: '#fbbc04', icon: '../icons/google-tasks-2026.svg', descripcion: 'Google Tasks es una aplicación de gestión de tareas.', deQueTrata: 'Google Tasks es una aplicación simple.', paraQueFunciona: 'Google Tasks se utiliza para gestionar tareas.', comoFunciona: 'Google Tasks funciona creando listas de tareas.', tips: ['Crea listas separadas.', 'Fechas límite realistas.', 'Usa subtareas.', 'La integración con Gmail.', 'Revisa tu lista diariamente.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Google', categoria: 'organizadores', imagenes: ['tasks-1.jpg', 'tasks-2.jpg'] },
        canva: { nombre: 'Canva', color: '#00c4cc', icon: '../icons/canva.svg', descripcion: 'Canva es una plataforma de diseño gráfico.', deQueTrata: 'Canva es una plataforma de diseño gráfico.', paraQueFunciona: 'Canva se utiliza para crear presentaciones.', comoFunciona: 'Canva funciona con una interfaz de arrastrar y soltar.', tips: ['Explora las plantillas.', 'Usa elementos gratuitos y premium.', 'La función de colaboración.', 'Guarda tus diseños en carpetas.', 'Canva ofrece herramientas de IA.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Diseño', categoria: 'presentaciones', imagenes: ['canva-1.jpg', 'canva-2.jpg', 'canva-3.jpg'] },
        miro: { nombre: 'Miro', color: '#ffd02b', icon: '../icons/miro.svg', descripcion: 'Miro es una pizarra colaborativa.', deQueTrata: 'Miro es una pizarra digital colaborativa.', paraQueFunciona: 'Miro se utiliza para colaborar visualmente.', comoFunciona: 'Miro funciona con un tablero infinito.', tips: ['Usa notas adhesivas.', 'La función de videochat.', 'Crea marcos para organizar.', 'Comparte el enlace del tablero.', 'Utiliza las plantillas.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Colaboración', categoria: 'presentaciones', imagenes: ['miro-1.jpg', 'miro-2.jpg'] },
        genially: { nombre: 'Genially', color: '#ff6b6b', icon: '../icons/genially-icon.png', descripcion: 'Genially es una herramienta para crear contenidos interactivos.', deQueTrata: 'Genially es una herramienta de contenidos interactivos.', paraQueFunciona: 'Genially se utiliza para contenidos educativos.', comoFunciona: 'Genially funciona con una interfaz visual.', tips: ['Los elementos interactivos.', 'Genially ofrece plantillas.', 'Puedes incrustar tus creaciones.', 'La versión gratuita.', 'Usa la gamificación.'], plataformas: ['Web'], badge: 'Interactivo', categoria: 'presentaciones', imagenes: ['genially-1.jpg', 'genially-2.jpg'] },
        prezi: { nombre: 'Prezi', color: '#d4237a', icon: '../icons/prezi.svg', descripcion: 'Prezi es una herramienta de presentaciones con efectos de zoom.', deQueTrata: 'Prezi es una herramienta de presentaciones.', paraQueFunciona: 'Prezi se utiliza para presentaciones dinámicas.', comoFunciona: 'Prezi funciona con un lienzo.', tips: ['Planifica la estructura.', 'Usa el zoom para destacar.', 'Prezi es ideal para storytelling.', 'Prueba tu presentación.', 'Mantén la simplicidad.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Presentaciones', categoria: 'presentaciones', imagenes: ['prezi-1.jpg', 'prezi-2.jpg'] },
        capcut: { nombre: 'CapCut', color: '#0a0a0a', icon: '../icons/capcut.svg', descripcion: 'CapCut es una aplicación de edición de video profesional.', deQueTrata: 'CapCut es una aplicación de edición de video.', paraQueFunciona: 'CapCut se utiliza para editar videos.', comoFunciona: 'CapCut funciona importando clips de video.', tips: ['Comienza con un proyecto simple.', 'Los efectos con moderación.', 'La música de fondo adecuada.', 'CapCut ofrece tutoriales.', 'Exporta en la calidad adecuada.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Video', categoria: 'presentaciones', imagenes: ['capcut-1.jpg', 'capcut-2.jpg'] },
        inshot: { nombre: 'InShot', color: '#ff6b35', icon: '../icons/inshot-icon.svg', descripcion: 'InShot es una aplicación de edición de video y fotos.', deQueTrata: 'InShot es una aplicación de edición.', paraQueFunciona: 'InShot se utiliza para editar videos y fotos.', comoFunciona: 'InShot funciona importando clips.', tips: ['Ajusta la relación de aspecto.', 'Usa música de fondo.', 'Los efectos de transición.', 'La función de texto.', 'InShot es ideal para ediciones rápidas.'], plataformas: ['Android', 'iOS'], badge: 'Video', categoria: 'presentaciones', imagenes: ['inshot-1.jpg', 'inshot-2.jpg'] },
        claude: { nombre: 'Claude', color: '#d97706', icon: '../icons/claude.svg', descripcion: 'Claude es un asistente de IA con razonamiento avanzado.', deQueTrata: 'Claude es un asistente de inteligencia artificial.', paraQueFunciona: 'Claude se utiliza para obtener asistencia.', comoFunciona: 'Claude funciona a través de una interfaz.', tips: ['Sé específico en tus preguntas.', 'Claude analiza documentos largos.', 'Pide ejemplos.', 'La versión gratuita.', 'Claude es bueno para análisis.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'Anthropic', categoria: 'ia', imagenes: ['claude-1.jpg', 'claude-2.jpg'] },
        deepseek: { nombre: 'DeepSeek', color: '#4d6bfe', icon: '../icons/deepseek.svg', descripcion: 'DeepSeek es un asistente de IA con razonamiento profundo.', deQueTrata: 'DeepSeek es un asistente de inteligencia artificial.', paraQueFunciona: 'DeepSeek se utiliza para tareas complejas.', comoFunciona: 'DeepSeek funciona con una interfaz conversacional.', tips: ['DeepSeek es bueno para tareas técnicas.', 'Pide explicaciones paso a paso.', 'La precisión es su punto fuerte.', 'La versión gratuita.', 'Es útil para validar hipótesis.'], plataformas: ['Web', 'Android', 'iOS'], badge: 'DeepSeek', categoria: 'ia', imagenes: ['deepseek-1.jpg', 'deepseek-2.jpg'] },
        openai: { nombre: 'OpenAI', color: '#10a37f', icon: '../icons/openai.svg', descripcion: 'OpenAI es una plataforma de IA con modelos avanzados.', deQueTrata: 'OpenAI es una plataforma de inteligencia artificial.', paraQueFunciona: 'OpenAI se utiliza para múltiples tareas.', comoFunciona: 'OpenAI funciona a través de la web o API.', tips: ['Especifica claramente lo que necesitas.', 'OpenAI es útil para tareas creativas.', 'Puedes pedir revisiones.', 'La plataforma ofrece documentación.', 'Experimenta con formulaciones.'], plataformas: ['Web'], badge: 'OpenAI', categoria: 'ia', imagenes: ['openai-1.jpg', 'openai-2.jpg'] },
        copilot: { nombre: 'Microsoft Copilot', color: '#6c5ce7', icon: '../icons/microsoft-copilot.svg', descripcion: 'Microsoft Copilot es un asistente de IA integrado en Microsoft 365.', deQueTrata: 'Microsoft Copilot es un asistente de IA.', paraQueFunciona: 'Copilot se utiliza para aumentar la productividad.', comoFunciona: 'Copilot funciona integrado en Office.', tips: ['Copilot se integra con Office.', 'Pide sugerencias de diseño.', 'Copilot puede analizar datos.', 'La integración con Outlook.', 'Aprovecha la generación de resúmenes.'], plataformas: ['Web', 'Windows', 'macOS'], badge: 'Microsoft', categoria: 'ia', imagenes: ['copilot-1.jpg', 'copilot-2.jpg'] }
    };

    // ============================================================
    // 3. TABS DE CATEGORÍAS
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
    // 4. GENERAR TARJETAS
    // ============================================================
    function generarTarjetas() {
        const grids = {
            ofimaticas: document.getElementById('herramientasGridOfimaticas'),
            almacenamiento: document.getElementById('herramientasGridAlmacenamiento'),
            organizadores: document.getElementById('herramientasGridOrganizadores'),
            presentaciones: document.getElementById('herramientasGridPresentaciones'),
            ia: document.getElementById('herramientasGridIA')
        };
        const agrupadas = {};
        Object.keys(herramientasData).forEach(function(key) {
            const tool = herramientasData[key];
            const cat = tool.categoria || 'ofimaticas';
            if (!agrupadas[cat]) agrupadas[cat] = [];
            agrupadas[cat].push({ id: key, ...tool });
        });
        Object.keys(grids).forEach(function(cat) {
            const grid = grids[cat];
            if (!grid) return;
            const tools = agrupadas[cat] || [];
            if (tools.length === 0) {
                grid.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No hay herramientas</p>';
                return;
            }
            let html = '';
            tools.forEach(function(tool) {
                const iconHtml = tool.icon && tool.icon.endsWith('.svg')
                    ? `<img src="${tool.icon}" alt="${tool.nombre}" class="tool-icon-img-full" />`
                    : `<i data-lucide="${tool.icon}" class="icon-lucide-lg" style="color: ${tool.color};"></i>`;
                html += `
                    <button class="herramienta-card-full" data-herramienta="${tool.id}" style="--tool-color: ${tool.color};">
                        <div class="tool-icon-wrapper-full">${iconHtml}</div>
                        <div class="tool-info-full">
                            <h4>${tool.nombre}</h4>
                            <p>${tool.descripcion.substring(0, 70)}...</p>
                            <span class="tool-badge">${tool.badge || 'Herramienta'}</span>
                        </div>
                        <i data-lucide="chevron-right" class="icon-lucide-sm"></i>
                    </button>
                `;
            });
            grid.innerHTML = html;
        });
    }

    // ============================================================
    // 5. DETALLE
    // ============================================================
    function initDetalle() {
        const overlay = document.getElementById('herramientaDetalleOverlay');
        const container = document.getElementById('herramientaDetalleContainer');
        const closeBtn = document.getElementById('detalleClose');
        const content = document.getElementById('detalleContent');
        if (!overlay || !container || !closeBtn || !content) return;

        let scrollTopBtn = document.querySelector('.detalle-scroll-top');
        let isMobile = window.innerWidth <= 820;

        if (!scrollTopBtn) {
            scrollTopBtn = document.createElement('button');
            scrollTopBtn.className = 'detalle-scroll-top';
            scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
            scrollTopBtn.innerHTML = '<i data-lucide="chevron-up" class="icon-lucide-lg"></i>';
            document.body.appendChild(scrollTopBtn);
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }

        scrollTopBtn.addEventListener('click', () => container.scrollTo({ top: 0, behavior: 'smooth' }));

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
            const data = herramientasData[herramientaId];
            if (!data) return;
            const color = data.color || '#2563eb';
            const iconHtml = data.icon && data.icon.endsWith('.svg')
                ? `<img src="${data.icon}" alt="${data.nombre}" class="detalle-icon-img" />`
                : `<i data-lucide="${data.icon}" class="icon-lucide-xl" style="color: ${color};"></i>`;
            const plataformasHtml = data.plataformas.map(p => `<span class="plataforma-tag">${p}</span>`).join('');
            const infoItems = [
                { icon: 'book-open', title: '¿De qué trata?', text: data.deQueTrata || data.descripcion },
                { icon: 'target', title: '¿Para qué funciona?', text: data.paraQueFunciona || data.descripcion },
                { icon: 'settings', title: '¿Cómo funciona?', text: data.comoFunciona || data.descripcion }
            ];
            let infoHtml = infoItems.map(item => `
                <div class="detalle-info-item">
                    <div class="info-icon"><i data-lucide="${item.icon}" class="icon-lucide-sm"></i></div>
                    <div class="info-content"><h4>${item.title}</h4><p>${item.text}</p></div>
                </div>
            `).join('');

            let galleryHtml = '';
            if (data.imagenes && data.imagenes.length > 0) {
                let itemsHtml = data.imagenes.map((img, i) => `<div class="carrusel-item" data-index="${i}"><div class="carrusel-item-content"><i data-lucide="image" class="icon-lucide-xl"></i><span>${img}</span></div></div>`).join('');
                let thumbsHtml = data.imagenes.map((img, i) => `<div class="carrusel-thumb" data-index="${i}"><i data-lucide="image" class="icon-lucide-sm"></i><span class="thumb-label">${i + 1}</span></div>`).join('');
                galleryHtml = `<div class="detalle-gallery"><h4>Galería</h4><div class="carrusel-container"><div class="carrusel-track">${itemsHtml}</div><button class="carrusel-btn carrusel-prev"><i data-lucide="chevron-left" class="icon-lucide-sm"></i></button><button class="carrusel-btn carrusel-next"><i data-lucide="chevron-right" class="icon-lucide-sm"></i></button><div class="carrusel-thumbs">${thumbsHtml}</div></div></div>`;
            }

            const tutorialesHtml = `<div class="detalle-tutoriales-grid">
                <div class="detalle-tutorial-item"><div class="tutorial-icon"><i data-lucide="play-circle" class="icon-lucide-lg"></i><span>Video 1</span></div><div class="tutorial-placeholder"><i data-lucide="play" class="icon-lucide-sm"></i>Tutorial introductorio</div></div>
                <div class="detalle-tutorial-item"><div class="tutorial-icon"><i data-lucide="play-circle" class="icon-lucide-lg"></i><span>Video 2</span></div><div class="tutorial-placeholder"><i data-lucide="play" class="icon-lucide-sm"></i>Funciones avanzadas</div></div>
                <div class="detalle-tutorial-item"><div class="tutorial-icon"><i data-lucide="play-circle" class="icon-lucide-lg"></i><span>Video 3</span></div><div class="tutorial-placeholder"><i data-lucide="play" class="icon-lucide-sm"></i>Tips prácticos</div></div>
                <div class="detalle-tutorial-item"><div class="tutorial-icon"><i data-lucide="play-circle" class="icon-lucide-lg"></i><span>Video 4</span></div><div class="tutorial-placeholder"><i data-lucide="play" class="icon-lucide-sm"></i>Proyecto completo</div></div>
            </div>`;

            let tipsHtml = '';
            if (data.tips && data.tips.length > 0) tipsHtml = data.tips.map(tip => `<li><i data-lucide="check-circle" class="icon-lucide-sm"></i> ${tip}</li>`).join('');

            content.innerHTML = `
                <div class="detalle-header">
                    <div class="detalle-icon-wrapper" style="border-color: ${color};">${iconHtml}</div>
                    <div class="detalle-titulo"><h2 style="color: ${color};">${data.nombre}</h2><p>${data.descripcion}</p></div>
                </div>
                <div class="detalle-plataformas"><h4>Disponible en:</h4><div class="plataformas-list">${plataformasHtml}</div></div>
                <div class="detalle-tabs-nav">
                    <button class="detalle-tab active" data-tab="informacion" style="--tab-color: ${color};"><i data-lucide="info" class="icon-lucide-sm"></i> <span class="tab-label">Información</span></button>
                    <button class="detalle-tab" data-tab="tutoriales" style="--tab-color: ${color};"><i data-lucide="play-circle" class="icon-lucide-sm"></i> <span class="tab-label">Tutoriales</span></button>
                    <button class="detalle-tab" data-tab="tips" style="--tab-color: ${color};"><i data-lucide="lightbulb" class="icon-lucide-sm"></i> <span class="tab-label">Tips</span></button>
                </div>
                <div class="detalle-panels">
                    <div class="detalle-panel active" data-panel="informacion"><div class="detalle-info-grid">${infoHtml}</div>${galleryHtml}</div>
                    <div class="detalle-panel" data-panel="tutoriales">${tutorialesHtml}</div>
                    <div class="detalle-panel" data-panel="tips"><ul class="detalle-tips-list">${tipsHtml}</ul></div>
                </div>
            `;

            setTimeout(function() {
                const tabs = content.querySelectorAll('.detalle-tab');
                const panels = content.querySelectorAll('.detalle-panel');
                if (container) container.style.setProperty('--detalle-divider-color', color);
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
            }, 150);

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
    // 6. MENÚ LATERAL
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
    // 7. BOTÓN DE VOLVER
    // ============================================================
    function initBackButton() {
        const btnBack = document.getElementById('btnBack');
        if (!btnBack) return;
        btnBack.addEventListener('click', function() { window.location.href = '../HTML/etapas.html'; });
    }

    // ============================================================
    // 8. TOGGLE DE DESCRIPCIÓN
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
    // 9. TOGGLE DE TEMA
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
    // 10. INTRO OVERLAY
    // ============================================================
    function initIntro() {
        const intro = document.getElementById('introOverlay');
        if (!intro) return;
        setTimeout(function() {
            intro.classList.add('hidden');
            setTimeout(function() { intro.style.display = 'none'; window.scrollTo(0, 0); }, 800);
        }, 1400);
    }

    // ============================================================
    // 11. SCROLL FEATURES
    // ============================================================
    function initScrollFeatures() {
        const progressBar = document.getElementById('readingProgress');
        const backToTop = document.getElementById('backToTop');
        let ticking = false;
        if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
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
    // 12. GUÍA INTERACTIVA
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
                    if (step.selector === '.side-menu') window.scrollTo({ top: 0, behavior: 'smooth' });
                    else {
                        const y = element.getBoundingClientRect().top + window.scrollY - 120;
                        window.scrollTo({ top: y, behavior: 'smooth' });
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
            setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
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
    // 13. INICIALIZAR
    // ============================================================
    function init() {
        window.scrollTo(0, 0);
        initBubbles();
        initThemeToggle();
        initMenu();
        initBackButton();
        initHeroToggle();
        initIntro();
        initScrollFeatures();
        initTabs();
        generarTarjetas();
        initDetalle();
        initGuide();
        setTimeout(() => { if (typeof lucide !== 'undefined') lucide.createIcons(); }, 100);
        setTimeout(() => window.scrollTo(0, 0), 300);
        setTimeout(() => window.scrollTo(0, 0), 2400);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

})();