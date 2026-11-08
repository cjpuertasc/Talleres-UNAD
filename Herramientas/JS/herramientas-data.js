// ============================================================
// DATOS DE HERRAMIENTAS
// Agrega una herramienta nueva copiando un bloque y cambiando valores.
// Campos obligatorios: id, nombre, color, categoria, descripcion
// Campos opcionales: badge, icon, plataformas, info, tips, tutoriales, galeria
// ============================================================

window.HERRAMIENTAS = {

  // ==================== OFIMÁTICAS ====================
  word: {
    id: 'word',
    nombre: 'Microsoft Word',
    color: '#2b579a',
    icon: '../icons/microsoft-word.svg',
    badge: 'Office',
    categoria: 'ofimaticas',
    descripcion: 'Word es un procesador de textos profesional que permite crear, editar y dar formato a documentos de manera eficiente.',
    plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Word es un procesador de textos que forma parte de Microsoft Office.',
      paraQueFunciona: 'Word se utiliza para la creación de documentos académicos como ensayos, informes, tesis.',
      comoFunciona: 'Word funciona con un sistema de "cinta de opciones".'
    },
    tips: [
      'Usa estilos predefinidos.',
      'Aprende atajos de teclado.',
      'La función "Control de cambios" es ideal.',
      'Guarda tus documentos en la nube.',
      'Usa la herramienta de "Referencias".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' },
      { titulo: 'Video 2', subtitulo: 'Funciones avanzadas' },
      { titulo: 'Video 3', subtitulo: 'Tips prácticos' },
      { titulo: 'Video 4', subtitulo: 'Proyecto completo' }
    ],
    galeria: ['word-1.jpg', 'word-2.jpg', 'word-3.jpg']
  },

  excel: {
    id: 'excel',
    nombre: 'Microsoft Excel',
    color: '#217346',
    icon: '../icons/microsoft-excel.svg',
    badge: 'Office',
    categoria: 'ofimaticas',
    descripcion: 'Excel es una hoja de cálculo que permite realizar análisis de datos, crear gráficos, tablas dinámicas.',
    plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Excel es una hoja de cálculo que forma parte de Microsoft Office.',
      paraQueFunciona: 'Excel se utiliza para todo tipo de análisis de datos.',
      comoFunciona: 'Excel funciona con un sistema de celdas donde se ingresan datos y fórmulas.'
    },
    tips: [
      'Aprende las fórmulas básicas.',
      'Usa formato condicional.',
      'Las tablas dinámicas son poderosas.',
      'Graba macros.',
      'Usa la función "Validación de datos".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' },
      { titulo: 'Video 2', subtitulo: 'Funciones avanzadas' }
    ],
    galeria: ['excel-1.jpg', 'excel-2.jpg', 'excel-3.jpg']
  },

  powerpoint: {
    id: 'powerpoint',
    nombre: 'Microsoft PowerPoint',
    color: '#d24726',
    icon: '../icons/microsoft-powerpoint.svg',
    badge: 'Office',
    categoria: 'ofimaticas',
    descripcion: 'PowerPoint es la herramienta líder para crear presentaciones impactantes.',
    plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'PowerPoint es una herramienta de presentaciones de Microsoft Office.',
      paraQueFunciona: 'PowerPoint se utiliza para crear presentaciones visuales.',
      comoFunciona: 'PowerPoint funciona con diapositivas organizadas secuencialmente.'
    },
    tips: [
      'Mantén tus diapositivas limpias.',
      'Usa imágenes de alta calidad.',
      'Practica tu presentación.',
      'Las animaciones deben ser sutiles.',
      'Usa plantillas profesionales.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' },
      { titulo: 'Video 2', subtitulo: 'Funciones avanzadas' }
    ],
    galeria: ['ppt-1.jpg', 'ppt-2.jpg', 'ppt-3.jpg']
  },

  onenote: {
    id: 'onenote',
    nombre: 'Microsoft OneNote',
    color: '#7719aa',
    icon: '../icons/microsoft-onenote.svg',
    badge: 'Office',
    categoria: 'ofimaticas',
    descripcion: 'OneNote es un cuaderno digital para tomar notas y organizar información.',
    plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'OneNote es un cuaderno digital.',
      paraQueFunciona: 'OneNote se utiliza para tomar apuntes en clase.',
      comoFunciona: 'OneNote funciona con una estructura de cuadernos, secciones y páginas.'
    },
    tips: [
      'Usa etiquetas para categorizar.',
      'La función de dibujo a mano alzada.',
      'Comparte tus cuadernos.',
      'Sincroniza OneNote.',
      'Usa la función de "Grabación de audio".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' },
      { titulo: 'Video 2', subtitulo: 'Funciones avanzadas' }
    ],
    galeria: ['onenote-1.jpg', 'onenote-2.jpg']
  },

  notebooklm: {
    id: 'notebooklm',
    nombre: 'NotebookLM',
    color: '#f59e0b',
    icon: '../icons/notebooklm.svg',
    badge: 'Google',
    categoria: 'ofimaticas',
    descripcion: 'NotebookLM es un asistente de investigación impulsado por IA de Google.',
    plataformas: ['Web'],
    info: {
      deQueTrata: 'NotebookLM es una herramienta de investigación basada en IA.',
      paraQueFunciona: 'NotebookLM se utiliza para investigar y analizar documentos.',
      comoFunciona: 'NotebookLM funciona subiendo documentos.'
    },
    tips: [
      'Sube documentos relacionados.',
      'Usa preguntas específicas.',
      'La función de resumen automático.',
      'NotebookLM es gratuito.',
      'Puedes subir múltiples documentos.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['notebooklm-1.jpg', 'notebooklm-2.jpg']
  },

  dobot: {
    id: 'dobot',
    nombre: 'Dobot',
    color: '#00a86b',
    icon: 'bot',
    badge: 'IA',
    categoria: 'ofimaticas',
    descripcion: 'Dobot es una herramienta de automatización de tareas.',
    plataformas: ['Web'],
    info: {
      deQueTrata: 'Dobot es una plataforma de automatización.',
      paraQueFunciona: 'Dobot se utiliza para automatizar tareas.',
      comoFunciona: 'Dobot funciona con una interfaz visual.'
    },
    tips: [
      'Comienza con flujos simples.',
      'Dobot se integra con muchas aplicaciones.',
      'Automatiza tareas frecuentes.',
      'Explora los flujos predefinidos.',
      'La programación visual facilita.'
    ],
    tutoriales: [],
    galeria: ['dobot-1.jpg', 'dobot-2.jpg']
  },

  // ==================== ALMACENAMIENTO ====================
  onedrive: {
    id: 'onedrive',
    nombre: 'Microsoft OneDrive',
    color: '#0078d4',
    icon: '../icons/microsoft-onedrive.svg',
    badge: 'Microsoft',
    categoria: 'almacenamiento',
    descripcion: 'OneDrive es el servicio de almacenamiento en la nube de Microsoft.',
    plataformas: ['Windows', 'macOS', 'Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'OneDrive es el servicio de almacenamiento en la nube.',
      paraQueFunciona: 'OneDrive se utiliza para almacenar archivos en la nube.',
      comoFunciona: 'OneDrive funciona guardando archivos en una carpeta local.'
    },
    tips: [
      'Organiza tus archivos.',
      'Comparte archivos con enlaces.',
      'La integración con Office.',
      'La papelera de reciclaje.',
      'Aprovecha el espacio gratuito.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['onedrive-1.jpg', 'onedrive-2.jpg']
  },

  drive: {
    id: 'drive',
    nombre: 'Google Drive',
    color: '#0f9d58',
    icon: '../icons/google-drive-2026.svg',
    badge: 'Google',
    categoria: 'almacenamiento',
    descripcion: 'Google Drive es el servicio de almacenamiento en la nube de Google.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Google Drive es el servicio de almacenamiento.',
      paraQueFunciona: 'Google Drive se utiliza para almacenar archivos.',
      comoFunciona: 'Google Drive funciona desde una cuenta de Google.'
    },
    tips: [
      'Usa Documentos de Google.',
      'Historial de versiones.',
      'Carpetas compartidas.',
      'Aprovecha los 15 GB gratuitos.',
      'La función de "Sin conexión".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['drive-1.jpg', 'drive-2.jpg', 'drive-3.jpg']
  },

  // ==================== ORGANIZADORES ====================
  notion: {
    id: 'notion',
    nombre: 'Notion',
    color: '#000000',
    icon: '../icons/notion-icon.svg',
    badge: 'Todo-en-uno',
    categoria: 'organizadores',
    descripcion: 'Notion es una plataforma todo-en-uno.',
    plataformas: ['Web', 'Windows', 'macOS', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Notion es una plataforma de productividad todo-en-uno.',
      paraQueFunciona: 'Notion se utiliza para organizar información.',
      comoFunciona: 'Notion funciona con un sistema de bloques.'
    },
    tips: [
      'Comienza con una plantilla.',
      'Usa bases de datos.',
      'Notion es personalizable.',
      'Aprovecha las integraciones.',
      'La función de "Vistas".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['notion-1.jpg', 'notion-2.jpg']
  },

  obsidian: {
    id: 'obsidian',
    nombre: 'Obsidian',
    color: '#7c3aed',
    icon: '../icons/obsidian-icon.svg',
    badge: 'Notas',
    categoria: 'organizadores',
    descripcion: 'Obsidian es un editor de notas con enlaces bidireccionales.',
    plataformas: ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Obsidian es un editor de notas.',
      paraQueFunciona: 'Obsidian se utiliza para crear una red de conocimiento.',
      comoFunciona: 'Obsidian funciona con archivos Markdown.'
    },
    tips: [
      'Crea enlaces entre notas.',
      'Usa la visualización de grafos.',
      'Las plantillas ayudan.',
      'Obsidian funciona offline.',
      'Explora los plugins.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['obsidian-1.jpg', 'obsidian-2.jpg', 'obsidian-3.jpg']
  },

  calendar: {
    id: 'calendar',
    nombre: 'Google Calendar',
    color: '#4285f4',
    icon: '../icons/google-calendar-2026.svg',
    badge: 'Google',
    categoria: 'organizadores',
    descripcion: 'Google Calendar es un calendario inteligente.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Google Calendar es una aplicación de calendario.',
      paraQueFunciona: 'Google Calendar se utiliza para gestionar el tiempo.',
      comoFunciona: 'Google Calendar funciona creando eventos.'
    },
    tips: [
      'Crea calendarios separados.',
      'Usa recordatorios.',
      'Comparte tu calendario.',
      'La integración con Gmail.',
      'Usa la vista de "Agenda".'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['calendar-1.jpg', 'calendar-2.jpg']
  },

  tasks: {
    id: 'tasks',
    nombre: 'Google Tasks',
    color: '#fbbc04',
    icon: '../icons/google-tasks-2026.svg',
    badge: 'Google',
    categoria: 'organizadores',
    descripcion: 'Google Tasks es una aplicación de gestión de tareas.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Google Tasks es una aplicación simple.',
      paraQueFunciona: 'Google Tasks se utiliza para gestionar tareas.',
      comoFunciona: 'Google Tasks funciona creando listas de tareas.'
    },
    tips: [
      'Crea listas separadas.',
      'Fechas límite realistas.',
      'Usa subtareas.',
      'La integración con Gmail.',
      'Revisa tu lista diariamente.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['tasks-1.jpg', 'tasks-2.jpg']
  },

  // ==================== PRESENTACIONES ====================
  canva: {
    id: 'canva',
    nombre: 'Canva',
    color: '#00c4cc',
    icon: '../icons/canva.svg',
    badge: 'Diseño',
    categoria: 'presentaciones',
    descripcion: 'Canva es una plataforma de diseño gráfico.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Canva es una plataforma de diseño gráfico.',
      paraQueFunciona: 'Canva se utiliza para crear presentaciones.',
      comoFunciona: 'Canva funciona con una interfaz de arrastrar y soltar.'
    },
    tips: [
      'Explora las plantillas.',
      'Usa elementos gratuitos y premium.',
      'La función de colaboración.',
      'Guarda tus diseños en carpetas.',
      'Canva ofrece herramientas de IA.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' },
      { titulo: 'Video 2', subtitulo: 'Funciones avanzadas' }
    ],
    galeria: ['canva-1.jpg', 'canva-2.jpg', 'canva-3.jpg']
  },

  miro: {
    id: 'miro',
    nombre: 'Miro',
    color: '#ffd02b',
    icon: '../icons/miro.svg',
    badge: 'Colaboración',
    categoria: 'presentaciones',
    descripcion: 'Miro es una pizarra colaborativa.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Miro es una pizarra digital colaborativa.',
      paraQueFunciona: 'Miro se utiliza para colaborar visualmente.',
      comoFunciona: 'Miro funciona con un tablero infinito.'
    },
    tips: [
      'Usa notas adhesivas.',
      'La función de videochat.',
      'Crea marcos para organizar.',
      'Comparte el enlace del tablero.',
      'Utiliza las plantillas.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['miro-1.jpg', 'miro-2.jpg']
  },

  genially: {
    id: 'genially',
    nombre: 'Genially',
    color: '#ff6b6b',
    icon: '../icons/genially-icon.png',
    badge: 'Interactivo',
    categoria: 'presentaciones',
    descripcion: 'Genially es una herramienta para crear contenidos interactivos.',
    plataformas: ['Web'],
    info: {
      deQueTrata: 'Genially es una herramienta de contenidos interactivos.',
      paraQueFunciona: 'Genially se utiliza para contenidos educativos.',
      comoFunciona: 'Genially funciona con una interfaz visual.'
    },
    tips: [
      'Los elementos interactivos.',
      'Genially ofrece plantillas.',
      'Puedes incrustar tus creaciones.',
      'La versión gratuita.',
      'Usa la gamificación.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['genially-1.jpg', 'genially-2.jpg']
  },

  prezi: {
    id: 'prezi',
    nombre: 'Prezi',
    color: '#d4237a',
    icon: '../icons/prezi.svg',
    badge: 'Presentaciones',
    categoria: 'presentaciones',
    descripcion: 'Prezi es una herramienta de presentaciones con efectos de zoom.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Prezi es una herramienta de presentaciones.',
      paraQueFunciona: 'Prezi se utiliza para presentaciones dinámicas.',
      comoFunciona: 'Prezi funciona con un lienzo.'
    },
    tips: [
      'Planifica la estructura.',
      'Usa el zoom para destacar.',
      'Prezi es ideal para storytelling.',
      'Prueba tu presentación.',
      'Mantén la simplicidad.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['prezi-1.jpg', 'prezi-2.jpg']
  },

  capcut: {
    id: 'capcut',
    nombre: 'CapCut',
    color: '#0a0a0a',
    icon: '../icons/capcut.svg',
    badge: 'Video',
    categoria: 'presentaciones',
    descripcion: 'CapCut es una aplicación de edición de video profesional.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'CapCut es una aplicación de edición de video.',
      paraQueFunciona: 'CapCut se utiliza para editar videos.',
      comoFunciona: 'CapCut funciona importando clips de video.'
    },
    tips: [
      'Comienza con un proyecto simple.',
      'Los efectos con moderación.',
      'La música de fondo adecuada.',
      'CapCut ofrece tutoriales.',
      'Exporta en la calidad adecuada.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['capcut-1.jpg', 'capcut-2.jpg']
  },

  inshot: {
    id: 'inshot',
    nombre: 'InShot',
    color: '#ff6b35',
    icon: '../icons/inshot-icon.svg',
    badge: 'Video',
    categoria: 'presentaciones',
    descripcion: 'InShot es una aplicación de edición de video y fotos.',
    plataformas: ['Android', 'iOS'],
    info: {
      deQueTrata: 'InShot es una aplicación de edición.',
      paraQueFunciona: 'InShot se utiliza para editar videos y fotos.',
      comoFunciona: 'InShot funciona importando clips.'
    },
    tips: [
      'Ajusta la relación de aspecto.',
      'Usa música de fondo.',
      'Los efectos de transición.',
      'La función de texto.',
      'InShot es ideal para ediciones rápidas.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['inshot-1.jpg', 'inshot-2.jpg']
  },

  // ==================== IA ====================
  claude: {
    id: 'claude',
    nombre: 'Claude',
    color: '#d97706',
    icon: '../icons/claude.svg',
    badge: 'Anthropic',
    categoria: 'ia',
    descripcion: 'Claude es un asistente de IA con razonamiento avanzado.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'Claude es un asistente de inteligencia artificial.',
      paraQueFunciona: 'Claude se utiliza para obtener asistencia.',
      comoFunciona: 'Claude funciona a través de una interfaz.'
    },
    tips: [
      'Sé específico en tus preguntas.',
      'Claude analiza documentos largos.',
      'Pide ejemplos.',
      'La versión gratuita.',
      'Claude es bueno para análisis.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['claude-1.jpg', 'claude-2.jpg']
  },

  deepseek: {
    id: 'deepseek',
    nombre: 'DeepSeek',
    color: '#4d6bfe',
    icon: '../icons/deepseek.svg',
    badge: 'DeepSeek',
    categoria: 'ia',
    descripcion: 'DeepSeek es un asistente de IA con razonamiento profundo.',
    plataformas: ['Web', 'Android', 'iOS'],
    info: {
      deQueTrata: 'DeepSeek es un asistente de inteligencia artificial.',
      paraQueFunciona: 'DeepSeek se utiliza para tareas complejas.',
      comoFunciona: 'DeepSeek funciona con una interfaz conversacional.'
    },
    tips: [
      'DeepSeek es bueno para tareas técnicas.',
      'Pide explicaciones paso a paso.',
      'La precisión es su punto fuerte.',
      'La versión gratuita.',
      'Es útil para validar hipótesis.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['deepseek-1.jpg', 'deepseek-2.jpg']
  },

  openai: {
    id: 'openai',
    nombre: 'OpenAI',
    color: '#10a37f',
    icon: '../icons/openai.svg',
    badge: 'OpenAI',
    categoria: 'ia',
    descripcion: 'OpenAI es una plataforma de IA con modelos avanzados.',
    plataformas: ['Web'],
    info: {
      deQueTrata: 'OpenAI es una plataforma de inteligencia artificial.',
      paraQueFunciona: 'OpenAI se utiliza para múltiples tareas.',
      comoFunciona: 'OpenAI funciona a través de la web o API.'
    },
    tips: [
      'Especifica claramente lo que necesitas.',
      'OpenAI es útil para tareas creativas.',
      'Puedes pedir revisiones.',
      'La plataforma ofrece documentación.',
      'Experimenta con formulaciones.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['openai-1.jpg', 'openai-2.jpg']
  },

  copilot: {
    id: 'copilot',
    nombre: 'Microsoft Copilot',
    color: '#6c5ce7',
    icon: '../icons/microsoft-copilot.svg',
    badge: 'Microsoft',
    categoria: 'ia',
    descripcion: 'Microsoft Copilot es un asistente de IA integrado en Microsoft 365.',
    plataformas: ['Web', 'Windows', 'macOS'],
    info: { 
      deQueTrata: 'Microsoft Copilot es un asistente de IA.',
      paraQueFunciona: 'Copilot se utiliza para aumentar la productividad.',
      comoFunciona: 'Copilot funciona integrado en Office.'
    },
    tips: [
      'Copilot se integra con Office.',
      'Pide sugerencias de diseño.',
      'Copilot puede analizar datos.',
      'La integración con Outlook.',
      'Aprovecha la generación de resúmenes.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['copilot-1.jpg', 'copilot-2.jpg']
  }

};

console.log('✅ herramientas-data.js cargado. Total tools:', Object.keys(window.HERRAMIENTAS).length);