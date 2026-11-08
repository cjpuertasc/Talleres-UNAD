// ============================================================
// DATOS DE HERRAMIENTAS
// Agrega una herramienta nueva copiando un bloque y cambiando valores.
// Campos obligatorios: id, nombre, color, categoria, descripcion
// Campos opcionales: badge, icon, plataformas, info, tips, tutoriales, galeria,
//                    queEs, paraQue, comoFunciona, recomendaciones
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
    queEs: 'Es un programa para escribir textos en el computador, como si fuera una hoja de papel digital. Pertenece a Microsoft y es uno de los más usados del mundo para hacer trabajos, cartas e informes.',
    paraQue: 'Sirve para escribir y arreglar la presentación de documentos: cambiar el tipo de letra, poner títulos, insertar imágenes, hacer tablas y numerar las páginas. También avisa cuando hay errores de ortografía.',
    comoFunciona: 'Abres un documento en blanco y escribes; con los botones de la parte de arriba cambias cómo se ve el texto. Al terminar lo guardas como archivo y lo puedes imprimir, enviar por correo o compartir para que otra persona lo edite contigo.',
    recomendaciones: 'Úsalo para trabajos del colegio o la universidad, hojas de vida, cartas e informes. Recomendación: usa los estilos de título del programa en vez de cambiar el tamaño de letra a mano; así luego puedes crear un índice automático con un solo clic. Guarda tus archivos con frecuencia para no perder el trabajo.',
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
    queEs: 'Es un programa de Microsoft parecido a una gran cuadrícula, formada por filas y columnas, donde se escriben números y datos. Cada cuadrito de la cuadrícula se llama celda.',
    paraQue: 'Sirve para hacer cuentas y organizar información: presupuestos, listas de notas, inventarios o control de gastos. También convierte los números en gráficos para entenderlos más fácil.',
    comoFunciona: 'Escribes los datos en las celdas y, para hacer una cuenta, escribes una fórmula que empieza con el signo igual; por ejemplo, =SUMA(A1:A10) suma los números de las celdas de la A1 a la A10. Si cambias un número, el programa actualiza el resultado solo.',
    recomendaciones: 'Úsalo para llevar tus gastos del mes, calcular el promedio de tus notas o ordenar una lista de clientes. Recomendación: empieza aprendiendo cuatro funciones básicas (sumar, promediar, contar y la función SI) y escribe un solo dato por celda para que todo quede ordenado.',
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
    queEs: 'Es un programa de Microsoft para crear presentaciones, es decir, una serie de pantallas llamadas diapositivas que se muestran una tras otra mientras alguien habla. Cada diapositiva puede tener texto, fotos, videos y dibujos.',
    paraQue: 'Sirve para apoyar una exposición, una clase o una propuesta de trabajo. Ayuda a que el público entienda mejor las ideas porque las ve resumidas y con imágenes.',
    comoFunciona: 'Creas una diapositiva por cada idea importante, eliges un diseño ya hecho y le agregas tus textos e imágenes. Cuando presentas, las pantallas se proyectan en grande y las vas pasando con el teclado o el mouse.',
    recomendaciones: 'Úsalo para exposiciones de clase, sustentaciones y reuniones de trabajo. Recomendación: escribe pocas palabras en cada diapositiva, usa imágenes claras, no mezcles muchos colores ni tipos de letra, y practica tu exposición antes de presentarla.',
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
    queEs: 'Es un cuaderno digital de Microsoft. Funciona como una libreta de apuntes organizada en secciones y páginas, pero dentro del computador, la tableta o el celular.',
    paraQue: 'Sirve para tomar apuntes de clase, guardar ideas, pegar fotos, enlaces y archivos, y tener todo ordenado en un solo lugar sin perder hojas.',
    comoFunciona: 'Creas una libreta, la divides en secciones (como las pestañas de un cuaderno real) y en cada una agregas páginas. En cualquier parte de la página puedes escribir, dibujar con el dedo o con un lápiz digital, o pegar imágenes. Lo que escribes se guarda solo y lo puedes ver desde otros aparatos.',
    recomendaciones: 'Úsalo como cuaderno de estudio, para planear un proyecto o guardar información de una investigación. Recomendación: crea una libreta por periodo de estudio y una sección por materia, y usa el buscador para encontrar un apunte rápido.',
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
    queEs: 'Es una herramienta de inteligencia artificial de Google (un programa que puede entender textos y responder preguntas) que se usa como cuaderno de estudio. Lo especial es que solo trabaja con los documentos que tú le entregas.',
    paraQue: 'Sirve para estudiar material largo sin leerlo todo de golpe: le subes tus lecturas y te hace resúmenes, responde tus dudas y crea preguntas de repaso. También puede convertir el contenido en un audio parecido a una charla.',
    comoFunciona: 'Subes tus documentos, páginas web o videos y haces preguntas escritas sobre ellos. La herramienta responde usando únicamente esa información y te muestra de qué parte del documento sacó cada respuesta, para que puedas comprobarla.',
    recomendaciones: 'Úsalo para preparar exámenes, entender lecturas difíciles o comparar varios artículos. Recomendación: sube solo documentos confiables y revisa siempre la parte del texto original que cita; no te quedes solo con el resumen.',
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
    queEs: 'Es el servicio de Microsoft para guardar archivos en internet, lo que se conoce como "la nube". Es como un armario virtual al que puedes entrar desde cualquier aparato con tu cuenta.',
    paraQue: 'Sirve para no perder tus documentos, tenerlos en el computador y en el celular al mismo tiempo, y compartirlos con otras personas sin enviarlos por correo.',
    comoFunciona: 'Subes tus archivos a tu espacio personal en internet. Si cambias algo en un aparato, el cambio aparece en los demás. Para compartir, generas un enlace y decides si la otra persona solo puede ver o también puede editar.',
    recomendaciones: 'Úsalo para guardar trabajos importantes y compartirlos con compañeros. Recomendación: organiza tus carpetas por materia o proyecto, revisa qué permisos das antes de compartir un enlace y vigila cuánto espacio te queda.',
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
    queEs: 'Es el servicio de Google para guardar archivos en internet (la nube). Funciona con tu cuenta de Google, la misma de Gmail, y viene con programas propios para escribir, calcular y hacer presentaciones.',
    paraQue: 'Sirve para guardar fotos, documentos y videos, tenerlos siempre disponibles y trabajar en grupo: varias personas pueden escribir en el mismo documento al mismo tiempo y dejar comentarios.',
    comoFunciona: 'Entras desde el navegador o la aplicación del celular y subes tus archivos. Luego los compartes enviando un correo o un enlace, y eliges si cada persona puede solo ver, comentar o editar. Además, guarda las versiones anteriores por si quieres volver atrás.',
    recomendaciones: 'Úsalo para trabajos en equipo y para tener tus archivos a mano en cualquier lugar. Recomendación: ponle nombres claros a los archivos, crea una carpeta por proyecto y revisa de vez en cuando quién tiene acceso a lo que compartiste.',
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
    queEs: 'Es una aplicación que reúne en un mismo lugar varias herramientas: bloc de notas, lista de tareas, calendario y tablas. Todo se arma como si fueran piezas que puedes mover y acomodar a tu gusto.',
    paraQue: 'Sirve para organizar tu estudio, tu trabajo o un proyecto en grupo: anotar ideas, controlar qué tareas faltan y compartir información con otras personas.',
    comoFunciona: 'Cada página se construye con bloques: un bloque de texto, uno de lista, uno de imagen, etc. También puedes crear tablas de información y verlas como lista, calendario o tablero con columnas (por ejemplo: por hacer, haciendo y terminado). Varias personas pueden editar a la vez.',
    recomendaciones: 'Úsalo para planear el semestre, repartir tareas en un trabajo en grupo o guardar apuntes. Recomendación: empieza con una plantilla sencilla ya hecha y no compliques la organización al principio; es mejor ir agregando cosas poco a poco.',
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
    queEs: 'Es una aplicación para tomar notas que guarda todo en tu propio computador, no en internet. Su idea principal es unir tus apuntes entre sí, como una telaraña de ideas conectadas.',
    paraQue: 'Sirve para estudiar o investigar a largo plazo, porque permite ver cómo se relacionan unos temas con otros. También funciona sin conexión a internet y tus notas son solo tuyas.',
    comoFunciona: 'Cada nota es un archivo de texto sencillo. Si escribes el nombre de otra nota entre dobles corchetes, el programa crea un enlace hacia ella. Además, tiene una vista que dibuja las notas como puntos unidos por líneas, para que veas cómo están conectadas.',
    recomendaciones: 'Úsalo para guardar lo que aprendes, escribir investigaciones o llevar un diario. Recomendación: no necesitas aprender todas sus funciones al comienzo; empieza solo escribiendo y enlazando notas. Haz copia de seguridad de la carpeta (por ejemplo, en OneDrive o Google Drive).',
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
    queEs: 'Es el calendario digital de Google. Muestra los días, semanas y meses, y te permite anotar en él tus citas, clases y compromisos.',
    paraQue: 'Sirve para organizar tu tiempo y no olvidar fechas importantes, como entregas de trabajos, reuniones o cumpleaños. También ayuda a ponerte de acuerdo con otras personas sobre horarios.',
    comoFunciona: 'Creas un evento con su fecha, hora y lugar, y le puedes poner un recordatorio que te avisa en el celular antes de que empiece. Puedes invitar a otras personas y ver varios calendarios a la vez, cada uno de un color distinto.',
    recomendaciones: 'Úsalo para anotar las entregas y las clases en línea del semestre. Recomendación: asigna un color a cada materia, activa avisos con tiempo de anticipación y anota solo lo importante para que no se llene de eventos.',
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
    queEs: 'Es una aplicación sencilla de Google para hacer listas de tareas pendientes, como una lista de cosas por hacer. Se conecta con Gmail y con Google Calendar.',
    paraQue: 'Sirve para anotar lo que tienes que hacer, ponerle fecha límite y tacharlo cuando lo termines. Es ideal para no olvidar actividades pequeñas del día a día.',
    comoFunciona: 'Escribes una tarea, eliges la fecha si quieres y, cuando la terminas, la marcas como hecha. Si una tarea es muy grande, puedes dividirla en pasos más pequeños. Las tareas con fecha también aparecen en el calendario.',
    recomendaciones: 'Úsalo para controlar tareas de estudio y pendientes personales. Recomendación: revisa tu lista cada mañana, pon primero lo más urgente y divide los trabajos grandes en pasos pequeños para no sentirte abrumado.',
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
    queEs: 'Es una página web y aplicación para hacer diseños gráficos fácilmente, aunque no sepas de diseño. Trae miles de plantillas ya hechas, además de imágenes, íconos y tipos de letra.',
    paraQue: 'Sirve para crear afiches, presentaciones, invitaciones, publicaciones para redes sociales, hojas de vida y videos cortos con un aspecto profesional.',
    comoFunciona: 'Eliges una plantilla, cambias los textos y las fotos arrastrando y soltando lo que quieras, y luego descargas el resultado como imagen, PDF o video. Tiene opciones gratuitas y otras de pago.',
    recomendaciones: 'Úsalo para carteles de exposiciones, infografías (dibujos que explican datos de forma visual) y presentaciones llamativas. Recomendación: usa pocos colores y pocos tipos de letra, cuida que el texto se pueda leer bien y revisa que tengas permiso para usar las imágenes.',
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
    queEs: 'Es una pizarra digital en internet donde varias personas pueden dibujar y escribir al mismo tiempo, aunque estén en lugares distintos. La pizarra es tan grande que casi no tiene límites.',
    paraQue: 'Sirve para hacer lluvias de ideas, mapas mentales (dibujos que conectan ideas), esquemas y planes de trabajo en grupo.',
    comoFunciona: 'Abres un tablero y le pegas notas de colores, figuras, flechas, imágenes y textos. Todos los participantes ven los cambios en el momento, pueden dejar comentarios y votar por las mejores ideas.',
    recomendaciones: 'Úsalo para trabajos en equipo, reuniones a distancia y para organizar ideas antes de escribir un trabajo. Recomendación: empieza con una plantilla, elige a una persona que dirija la sesión y guarda el tablero como imagen o PDF al terminar.',
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
    icon: '../icons/genially-icon.svg',
    badge: 'Interactivo',
    categoria: 'presentaciones',
    descripcion: 'Genially es una herramienta para crear contenidos interactivos.',
    plataformas: ['Web'],
    queEs: 'Es una herramienta en internet para crear contenido interactivo, es decir, presentaciones, carteles y juegos en los que la persona puede hacer clic y descubrir más información.',
    paraQue: 'Sirve para que una presentación o un material de clase sea más entretenido y fácil de entender, con botones, ventanas que aparecen y animaciones.',
    comoFunciona: 'Escoges una plantilla y le agregas elementos que reaccionan al hacer clic o al pasar el cursor por encima. Cuando terminas, compartes tu creación con un enlace o la pegas en una página web.',
    recomendaciones: 'Úsalo para trabajos creativos, juegos educativos, líneas de tiempo o portafolios. Recomendación: no uses demasiadas animaciones, comprueba que todos los botones funcionen y revisa que se vea bien también en el celular.',
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
    queEs: 'Es una herramienta para hacer presentaciones diferentes a las de diapositivas tradicionales. En lugar de pasar de una pantalla a otra, toda la presentación está en un lienzo grande y la cámara se acerca y se aleja de cada tema.',
    paraQue: 'Sirve para exponer un tema mostrando cómo se relacionan sus partes, con un efecto de movimiento que ayuda a mantener la atención del público.',
    comoFunciona: 'Colocas tus ideas en distintos lugares del lienzo y defines el recorrido que hará la presentación. Al exponer, la vista viaja de un punto a otro con efectos de acercamiento.',
    recomendaciones: 'Úsalo para exposiciones con una idea principal y varios temas que se desprenden de ella. Recomendación: planea bien el recorrido y no abuses de los acercamientos y movimientos, porque pueden marear a quienes miran.',
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

  // NUEVA: Figma en Presentaciones
  figma: {
    id: 'figma',
    nombre: 'Figma',
    color: '#a259ff',
    icon: '../icons/figma.svg',
    badge: 'Diseño UI',
    categoria: 'presentaciones',
    descripcion: 'Figma es una herramienta para diseñar pantallas de aplicaciones y páginas web.',
    plataformas: ['Web', 'Windows', 'macOS', 'Android', 'iOS'],
    queEs: 'Es una herramienta en internet para diseñar cómo se verá una página web o una aplicación de celular antes de programarla. Es como hacer el plano de una casa antes de construirla.',
    paraQue: 'Sirve para dibujar las pantallas de una aplicación o sitio web, probar cómo se pasa de una pantalla a otra y trabajar en equipo con otros diseñadores y programadores.',
    comoFunciona: 'Dibujas cada pantalla con formas, botones y textos, y luego las unes con enlaces para crear un modelo de prueba (llamado prototipo) que se puede tocar y recorrer como si fuera la aplicación real. Varias personas pueden trabajar en el mismo archivo y dejar comentarios.',
    recomendaciones: 'Úsalo para diseñar páginas web o apps de proyectos de clase. Recomendación: reutiliza los mismos botones y colores en todas las pantallas para que se vea ordenado, ponle nombres claros a cada parte de tu diseño y revisa las plantillas gratuitas que comparte la comunidad.',
    info: {
      deQueTrata: 'Figma es una plataforma de diseño de interfaces.',
      paraQueFunciona: 'Figma sirve para diseñar prototipos y colaborar en tiempo real.',
      comoFunciona: 'Figma funciona en el navegador con archivos compartidos.'
    },
    tips: [
      'Usa componentes reutilizables.',
      'Aprovecha los plugins de la comunidad.',
      'Nombra bien las capas.',
      'Trabaja con estilos de color y texto.',
      'Prototipa antes de programar.'
    ],
    tutoriales: [
      { titulo: 'Video 1', subtitulo: 'Tutorial introductorio' }
    ],
    galeria: ['figma-1.jpg', 'figma-2.jpg']
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
    queEs: 'Es un asistente de inteligencia artificial, es decir, un programa de computador que entiende lo que le escribes y te responde casi como lo haría una persona. Lo creó la empresa Anthropic.',
    paraQue: 'Sirve para ayudarte a escribir y mejorar textos, explicar temas difíciles, resumir documentos, ayudar con programación, analizar información y dar ideas para trabajos y proyectos.',
    comoFunciona: 'Escribes una pregunta o una petición (por ejemplo, "explícame este tema con palabras sencillas") y el programa genera una respuesta a partir de todo lo que aprendió durante su entrenamiento. También puede leer documentos o imágenes que le compartas.',
    recomendaciones: 'Úsalo como apoyo para entender temas, organizar tus ideas y revisar la redacción. Recomendación: explica bien qué necesitas, comprueba los datos importantes en otras fuentes y úsalo como ayuda, no para reemplazar tu propio trabajo, respetando las normas de tu institución.',
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
    queEs: 'Es una empresa de inteligencia artificial de China y también el nombre de su asistente, un programa que conversa por escrito. Se hizo muy conocida por ofrecer un servicio potente a bajo costo.',
    paraQue: 'Sirve para responder preguntas, escribir y traducir textos, resolver problemas de matemáticas o lógica y ayudar a programar, igual que otros asistentes de inteligencia artificial.',
    comoFunciona: 'Escribes lo que necesitas y el programa, que fue entrenado con enormes cantidades de textos, genera una respuesta. Algunos de sus modelos se publican de forma abierta para que otros programadores los puedan usar y adaptar.',
    recomendaciones: 'Úsalo para consultas generales, tareas de razonamiento y programación. Recomendación: no escribas datos personales ni información confidencial, lee su política de privacidad y compara sus respuestas con otras fuentes.',
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
    queEs: 'Es la empresa que creó ChatGPT, uno de los asistentes de inteligencia artificial más conocidos del mundo. También desarrolla otros programas que generan imágenes y audio.',
    paraQue: 'Sirve para conversar con una inteligencia artificial que redacta textos, resume, traduce, explica temas, ayuda a programar y da ideas. Además, otras empresas pueden conectar sus programas a los de OpenAI para crear nuevas aplicaciones.',
    comoFunciona: 'Escribes lo que quieres y el programa responde con base en todo lo que aprendió al ser entrenado con muchísima información. Se usa desde una página web o una aplicación de celular, con una versión gratuita y otras de pago.',
    recomendaciones: 'Úsalo para estudiar, escribir, pensar ideas o ahorrar tiempo en tareas repetitivas. Recomendación: sé claro y detallado al pedir las cosas, revisa lo que responde porque a veces se equivoca, y si lo usas en un trabajo académico, menciónalo según las reglas de tu institución.',
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
    queEs: 'Es el asistente de inteligencia artificial de Microsoft. Está integrado en Windows, en el navegador Edge y en programas como Word, Excel y PowerPoint.',
    paraQue: 'Sirve para que la inteligencia artificial te ayude dentro de los mismos programas que ya usas: escribir o resumir un texto en Word, explicar datos en Excel, armar una presentación en PowerPoint o contestar dudas generales con ayuda de internet.',
    comoFunciona: 'Le escribes una instrucción con tus propias palabras (por ejemplo, "resume este documento en cinco puntos") y Copilot genera el contenido o realiza la acción. Algunas funciones dentro de los programas de Microsoft requieren un plan de pago.',
    recomendaciones: 'Úsalo para ahorrar tiempo en documentos, hojas de cálculo y presentaciones. Recomendación: lee siempre lo que genera antes de entregarlo y no pongas información privada si no conoces las reglas de tu organización.',
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
  },

  // ==================== EDICIÓN DE VIDEO (categoría presentaciones) ====================
  capcut: {
    id: 'capcut',
    nombre: 'CapCut',
    color: '#0a0a0a',
    icon: '../icons/capcut.svg',
    badge: 'Video',
    categoria: 'presentaciones',
    descripcion: 'CapCut es una aplicación de edición de video profesional.',
    plataformas: ['Web', 'Android', 'iOS'],
    queEs: 'Es una aplicación para editar videos desde el celular o el computador. La creó la misma empresa de TikTok y es muy popular para hacer videos cortos.',
    paraQue: 'Sirve para cortar partes de un video, unir varios clips, ponerle música, letreros, subtítulos y efectos, y dejarlo listo para subir a redes sociales o entregar un trabajo.',
    comoFunciona: 'Cargas tus videos y fotos, los acomodas en una línea de tiempo (una barra que muestra el orden en que se verán) y le aplicas los efectos que quieras. Al final lo exportas, es decir, lo guardas como video terminado. Algunas funciones son gratis y otras de pago.',
    recomendaciones: 'Úsalo para videos de exposición, tutoriales o contenido para redes. Recomendación: piensa qué quieres contar antes de editar, cuida que el audio se escuche bien y usa música que tenga permiso de uso.',
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
    queEs: 'Es una aplicación para celular que sirve para editar videos y fotos de forma rápida y sencilla, sin necesidad de un computador.',
    paraQue: 'Sirve para cortar y unir videos, acelerarlos o ponerlos en cámara lenta, agregar música, letras, stickers y filtros, y ajustar el tamaño para redes sociales.',
    comoFunciona: 'Abres tus videos en la aplicación, los acomodas, aplicas los cambios que desees con los botones de la pantalla y guardas el resultado en tu celular. La versión gratuita muestra anuncios y puede dejar una marca de agua, que se quita con el plan de pago.',
    recomendaciones: 'Úsalo para ediciones rápidas desde el celular. Recomendación: elige desde el inicio si el video será vertical (como para historias) u horizontal, y guarda una copia del proyecto antes de terminar por si necesitas cambiar algo.',
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
  }

};

console.log('✅ herramientas-data.js cargado. Total tools:', Object.keys(window.HERRAMIENTAS).length);