// ============================================================
// RENDER REUTILIZABLE DE HERRAMIENTAS
// ============================================================

window.HerramientasRender = (function() {
  'use strict';

  function esImagen(icon) {
    return icon && /\.(svg|png|jpg|jpeg|webp|gif)$/i.test(icon);
  }

  function iconCard(tool) {
    if (!tool.icon) return '';
    if (esImagen(tool.icon)) {
      return `<img src="${tool.icon}" alt="${tool.nombre}" class="tool-icon-img-full" />`;
    }
    return `<i data-lucide="${tool.icon}" class="icon-lucide-lg" style="color:${tool.color};"></i>`;
  }

  function iconDetalle(tool) {
    if (!tool.icon) return '';
    if (esImagen(tool.icon)) {
      return `<img src="${tool.icon}" alt="${tool.nombre}" class="detalle-icon-img" />`;
    }
    return `<i data-lucide="${tool.icon}" class="icon-lucide-xl" style="color:${tool.color};"></i>`;
  }

  function card(tool) {
    const desc = (tool.descripcion || '').substring(0, 70);
    return `
      <button class="herramienta-card-full" data-herramienta="${tool.id}" style="--tool-color:${tool.color};">
        <div class="tool-icon-wrapper-full">${iconCard(tool)}</div>
        <div class="tool-info-full">
          <h4>${tool.nombre}</h4>
          <p>${desc}...</p>
          ${tool.badge ? `<span class="tool-badge">${tool.badge}</span>` : ''}
        </div>
        <i data-lucide="chevron-right" class="icon-lucide-sm"></i>
      </button>
    `;
  }

  // --- Info items: usa los campos nuevos si existen, si no cae a info.* ---
  function infoItems(tool) {
    const map = [
      {
        icon: 'book-open',
        title: '¿De qué trata?',
        text: tool.queEs || (tool.info && tool.info.deQueTrata)
      },
      {
        icon: 'target',
        title: '¿Para qué sirve?',
        text: tool.paraQue || (tool.info && tool.info.paraQueFunciona)
      },
      {
        icon: 'settings',
        title: '¿Cómo funciona?',
        text: tool.comoFunciona || (tool.info && tool.info.comoFunciona)
      }
    ];
    return map
      .filter(m => m.text)
      .map(m => `
        <div class="detalle-info-item">
          <div class="info-icon"><i data-lucide="${m.icon}" class="icon-lucide-sm"></i></div>
          <div class="info-content"><h4>${m.title}</h4><p>${m.text}</p></div>
        </div>
      `).join('');
  }

  // --- Recomendaciones (bloque destacado aparte) ---
  function recomendaciones(tool) {
    if (!tool.recomendaciones) return '';
    return `
      <div class="detalle-recomendaciones">
        <div class="detalle-recomendaciones-header">
          <i data-lucide="lightbulb" class="icon-lucide-sm"></i>
          <h4>Usos y recomendaciones</h4>
        </div>
        <p>${tool.recomendaciones}</p>
      </div>
    `;
  }

  function plataformas(tool) {
    if (!tool.plataformas || !tool.plataformas.length) return '';
    return `
      <div class="detalle-plataformas">
        <h4>Disponible en:</h4>
        <div class="plataformas-list">
          ${tool.plataformas.map(p => `<span class="plataforma-tag">${p}</span>`).join('')}
        </div>
      </div>
    `;
  }

  function galeria(tool) {
    if (!tool.galeria || !tool.galeria.length) return '';
    const items = tool.galeria.map((img, i) =>
      `<div class="carrusel-item" data-index="${i}">
         <div class="carrusel-item-content">
           <i data-lucide="image" class="icon-lucide-xl"></i>
           <span>${img}</span>
         </div>
       </div>`).join('');
    const thumbs = tool.galeria.map((img, i) =>
      `<div class="carrusel-thumb" data-index="${i}">
         <i data-lucide="image" class="icon-lucide-sm"></i>
         <span class="thumb-label">${i + 1}</span>
       </div>`).join('');
    return `
      <div class="detalle-gallery">
        <h4>Galería</h4>
        <div class="carrusel-container">
          <div class="carrusel-track">${items}</div>
          <button class="carrusel-btn carrusel-prev"><i data-lucide="chevron-left" class="icon-lucide-sm"></i></button>
          <button class="carrusel-btn carrusel-next"><i data-lucide="chevron-right" class="icon-lucide-sm"></i></button>
          <div class="carrusel-thumbs">${thumbs}</div>
        </div>
      </div>
    `;
  }

  function tutoriales(tool) {
    if (!tool.tutoriales || !tool.tutoriales.length) return '';
    return `
      <div class="detalle-tutoriales-grid">
        ${tool.tutoriales.map(t => `
          <div class="detalle-tutorial-item">
            <div class="tutorial-icon">
              <i data-lucide="play-circle" class="icon-lucide-lg"></i>
              <span>${t.titulo}</span>
            </div>
            <div class="tutorial-placeholder">
              <i data-lucide="play" class="icon-lucide-sm"></i>${t.subtitulo}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function tips(tool) {
    if (!tool.tips || !tool.tips.length) return '';
    return `<ul class="detalle-tips-list">
      ${tool.tips.map(t => `<li><i data-lucide="check-circle" class="icon-lucide-sm"></i> ${t}</li>`).join('')}
    </ul>`;
  }

  function detalle(tool) {
    const color = tool.color || '#2563eb';
    return `
      <div class="detalle-header">
        <div class="detalle-icon-wrapper" style="border-color:${color};">${iconDetalle(tool)}</div>
        <div class="detalle-titulo">
          <h2 style="color:${color};">${tool.nombre}</h2>
          <p>${tool.descripcion || ''}</p>
        </div>
      </div>
      ${plataformas(tool)}
      <div class="detalle-tabs-nav">
        <button class="detalle-tab active" data-tab="informacion" style="--tab-color:${color};">
          <i data-lucide="info" class="icon-lucide-sm"></i> <span class="tab-label">Información</span>
        </button>
        <button class="detalle-tab" data-tab="tutoriales" style="--tab-color:${color};">
          <i data-lucide="play-circle" class="icon-lucide-sm"></i> <span class="tab-label">Tutoriales</span>
        </button>
        <button class="detalle-tab" data-tab="tips" style="--tab-color:${color};">
          <i data-lucide="lightbulb" class="icon-lucide-sm"></i> <span class="tab-label">Tips</span>
        </button>
      </div>
      <div class="detalle-panels">
        <div class="detalle-panel active" data-panel="informacion">
          <div class="detalle-info-grid">${infoItems(tool)}</div>
          ${recomendaciones(tool)}
          ${galeria(tool)}
        </div>
        <div class="detalle-panel" data-panel="tutoriales">${tutoriales(tool)}</div>
        <div class="detalle-panel" data-panel="tips">${tips(tool)}</div>
      </div>
    `;
  }

  return { card, detalle };
})();