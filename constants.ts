import { Project, Skill, Experience, Education, Language, ProcessStep, SkillCategory, CategoryIntro } from './types';

export const HERO_DATA = {
  name: "Juan Carlos Alvarado",
  title: "Odoo Developer | IT & Data Analyst | ERP & Business Intelligence",
  tagline: "Convirtiendo datos en decisiones y código en soluciones.",
  description: "Profesional en Tecnologías de la Información, Ciencia de Datos y Desarrollo ERP, con más de 3 años de experiencia en desarrollo de Odoo (v16-18). Combino un perfil técnico sólido en Python, SQL, JavaScript, HTML/XML y PostgreSQL con experiencia práctica en personalización de Odoo, construcción de dashboards y diseño de pipelines de datos.",
};

export const PROJECTS: Project[] = [
  {
    id: 'odoo-1',
    title: 'Implementación Odoo & Migración',
    description: 'Mapeo funcional de procesos (ventas, compras, stock) y migración a Odoo. Creación de matriz de datos integral para control de inventario.',
    tags: ['Odoo', 'Python', 'ETL', 'Migration'],
    category: 'Odoo',
    imageUrl: '/images/projects/odoo-implementation.png',
    demoUrl: '#',
  },
  {
    id: 'ds-1',
    title: 'Modelado Predictivo de Demanda',
    description: 'Desarrollo de modelos predictivos de demanda utilizando Python (pandas, scikit-learn, K-means, regresión).',
    tags: ['Python', 'Scikit-learn', 'Machine Learning', 'Pandas'],
    category: 'Data Science',
    imageUrl: '/images/projects/predictive-modeling.png',
    githubUrl: '#',
  },
  {
    id: 'bi-1',
    title: 'Sistema de Información Geográfica (SIG)',
    description: 'Diseño y operación de SIG integrando más de 12 áreas temáticas. Pipelines ETL para Snowflake y SQL.',
    tags: ['QGIS', 'SQL', 'Snowflake', 'ETL'],
    category: 'Business Intelligence',
    imageUrl: '/images/projects/gis-system.png',
    demoUrl: '#',
  },
  {
    id: 'bi-2',
    title: 'Dashboards Ejecutivos Urbanos',
    description: 'Desarrollo de dashboards en Power BI y QGIS con KPIs de desempeño territorial y análisis espacial avanzado.',
    tags: ['Power BI', 'Data Visualization', 'KPIs', 'Analysis'],
    category: 'Business Intelligence',
    imageUrl: '/images/projects/dashboards-powerbi.png',
    demoUrl: '#',
  },
  {
    id: 'dev-1',
    title: 'Automatización ETL & Reporting',
    description: 'Automatización de procesos ETL e integración de datos de SAP y Excel para reportes consolidados.',
    tags: ['ETL', 'Automation', 'SAP', 'Excel'],
    category: 'Developer',
    imageUrl: '/images/projects/etl-automation.png',
    githubUrl: '#',
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python / Data Science', level: 95, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Odoo Development', level: 90, icon: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Odoo_logo.svg' },
  { name: 'SQL / Bases de Datos', level: 88, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Power BI / Tableau', level: 85, icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
  { name: 'ETL / Data Engineering', level: 85, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachespark/apachespark-original.svg' },
  { name: 'GIS / Análisis Espacial', level: 80, icon: 'https://upload.wikimedia.org/wikipedia/commons/9/91/QGIS_logo_new.svg' },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "QubiQ",
    role: "Odoo Developer",
    period: "Mayo 2025 – Actualidad",
    description: "Desarrollo de módulos personalizados en Odoo (v16-18): creación y extensión de modelos (models.Model, TransientModel), lógica ORM avanzada (search, browse, mapped), implementación de decoradores (@api.depends, @api.onchange, @api.constrains), personalización de vistas XML/QWeb y desarrollo JavaScript/OWL."
  },
  {
    company: "Marsel",
    role: "IT & Data Operations Lead",
    period: "Julio 2023 – Agosto 2024",
    description: "Evaluación y pruebas funcionales de Odoo para procesos de inventario, ventas y almacén. Elaboración de mapeos funcionales de procesos de negocio para migración a módulos Odoo (Sales, Inventory, Purchase). Modelado predictivo de demanda con Python (pandas, scikit-learn, K-means), automatización ETL en Power BI y Qlik, integración de datos SAP/Excel."
  },
  {
    company: "Alcaldía Miguel Hidalgo",
    role: "Geospatial & Data Analyst Coordinator",
    period: "Marzo 2022 – Julio 2023",
    description: "Diseño y operación del Sistema de Información Geográfica institucional (12+ áreas temáticas). Planificación y ejecución de procesos ETL para integrar información de Excel, CSV, Oracle hacia Snowflake y SQL. Desarrollo de dashboards ejecutivos en Power BI y QGIS con KPIs de desempeño territorial. Análisis espacial avanzado con buffers, mapas de calor y modelos SAR para análisis predictivo. Coordinación de equipo técnico."
  },
  {
    company: "Grupo Fractalia",
    role: "IT Support & Systems Analyst",
    period: "Mayo 2019 – Marzo 2022",
    description: "Soporte técnico de primer y segundo nivel a clientes empresariales. Gestión de incidencias mediante Autotask, Remedy y Jira. Configuración de redes (routers, MikroTik, switches), VPNs y monitoreo con Nagios. Administración de usuarios y políticas en Active Directory y GPO. Manejo funcional básico de Odoo para tareas operativas: consultas de inventario, seguimiento de tickets internos y soporte a usuarios finales."
  },
  {
    company: "Gentera",
    role: "IT Systems & Helpdesk Analyst",
    period: "Febrero 2017 – Abril 2019",
    description: "Soporte IT, administración de Active Directory, gestión de incidencias y mantenimiento de estaciones de trabajo."
  },
  {
    company: "K-neos",
    role: "IT Technician & Network Assistant",
    period: "Julio 2015 – Enero 2017",
    description: "Soporte técnico, migración de equipos con Clonezilla, configuración de redes LAN y gestión de incidencias."
  }
];

export const EDUCATION: Education[] = [
  {
    school: "Universidad Complutense de Madrid (UCM)",
    degree: "Máster en Data Science, Big Data & Business Analytics",
    period: "Septiembre 2024 – Septiembre 2025",
    description: "Python, SQL, Machine Learning, Big Data, Visualización Avanzada."
  },
  {
    school: "Universidad Nacional Autónoma de México (UNAM)",
    degree: "Maestría en Gobierno y Asuntos Públicos",
    period: "Junio 2022 – Junio 2024",
    description: "Análisis institucional, políticas públicas, modelos econométricos y Machine Learning."
  },
  {
    school: "Universidad Nacional Autónoma de México (UNAM)",
    degree: "Especialidad en Finanzas Públicas",
    period: "Junio 2020 – Junio 2021",
    description: "Presupuestos públicos, contabilidad gubernamental, análisis financiero, macroeconomía, microeconomía y modelos econométricos."
  },
  {
    school: "Universidad Nacional Autónoma de México (UNAM)",
    degree: "Licenciatura en Administración Pública",
    period: "Agosto 2014 – Mayo 2019",
    description: ""
  },
  {
    school: "CETIS",
    degree: "Técnico en Sistemas informáticos y Redes",
    period: "Agosto 2011 – Julio 2014",
    description: ""
  }
];

export const LANGUAGES: Language[] = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio (B1 MCER)" }
];

export const SOCIAL_LINKS = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  email: "jualvara@ucm.es"
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "INPUT",
    subtitle: "Negocio & Datos",
    icon: "Database",
    description: "Análisis profundo de requisitos y extracción de datos.",
    tags: ["Análisis de Requisitos", "ETL", "SQL", "Business Intelligence"]
  },
  {
    title: "PROCESS",
    subtitle: "Modelado & Lógica",
    icon: "BrainCircuit",
    description: "Transformación de datos en conocimiento mediante algoritmos.",
    tags: ["Algoritmos Python", "Predicción de Ventas", "Arquitectura de Solución", "Machine Learning"]
  },
  {
    title: "OUTPUT",
    subtitle: "Producto & Solución",
    icon: "Box",
    description: "Entrega de valor a través de software y automatización.",
    tags: ["Módulos Odoo", "Apps a Medida", "Automatización de Procesos", "Dashboards"]
  }
];

export const DETAILED_SKILLS: SkillCategory[] = [
  {
    title: "Desarrollo Odoo & ERP",
    icon: "Settings",
    skills: [
      "Python (OOP, lógica de negocio)",
      "Módulos Odoo (v16-18)",
      "ORM, Models, Fields",
      "XML/QWeb Views",
      "JavaScript & OWL",
      "Ventas, Compras, Inventario, Contabilidad"
    ]
  },
  {
    title: "Bases de Datos & ETL",
    icon: "Database",
    skills: [
      "SQL (Joins, Subconsultas)",
      "PostgreSQL",
      "MySQL, Oracle, SQL Server",
      "Snowflake",
      "ETL (CSV/Excel/XML -> SQL)"
    ]
  },
  {
    title: "Data Science & BI",
    icon: "BarChart",
    skills: [
      "Python (Pandas, NumPy, Scikit-learn)",
      "Minería de Datos & Clustering",
      "Modelos Predictivos",
      "Power BI, Qlik, Tableau",
      "QGIS & Análisis Geoespacial",
      "Apache Spark, Databricks"
    ]
  },
  {
    title: "Infraestructura & Redes",
    icon: "Server",
    skills: [
      "Linux, Windows, macOS",
      "Redes (MikroTik, VPN, DNS)",
      "Active Directory & GPO",
      "Docker & Contenedores",
      "Soporte (Jira, Autotask)"
    ]
  },
  {
    title: "Herramientas",
    icon: "Wrench",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Clonezilla",
      "Visio"
    ]
  }
];

export const CATEGORY_INTROS: Record<string, CategoryIntro> = {
  'Odoo': {
    category: 'Odoo',
    title: 'Desarrollo Odoo ERP',
    description: 'Odoo es un framework ERP modular de código abierto escrito en Python que permite personalizar y extender procesos de negocio mediante el desarrollo de módulos personalizados. Mi experiencia abarca desde la arquitectura ORM hasta la integración completa de flujos empresariales.',
    keyPoints: [
      'Desarrollo de módulos personalizados con Python OOP y ORM de Odoo',
      'Diseño de vistas XML/QWeb (form, list, kanban, wizards)',
      'Implementación de lógica de negocio con decoradores (@api.depends, @api.onchange)',
      'Herencia de modelos y extensión de funcionalidad nativa',
      'Integración con PostgreSQL y optimización de consultas'
    ],
    challenges: [
      'Mantener compatibilidad entre versiones (v16-v18)',
      'Optimizar rendimiento en operaciones masivas con ORM',
      'Diseñar arquitecturas escalables y mantenibles',
      'Gestionar dependencias entre módulos personalizados'
    ],
    technologies: ['Python', 'PostgreSQL', 'XML/QWeb', 'JavaScript', 'OWL', 'Docker', 'Git']
  },
  'Data Science': {
    category: 'Data Science',
    title: 'Data Science & Machine Learning',
    description: 'El Data Science combina estadística, programación y conocimiento del negocio para extraer insights de datos y construir modelos predictivos. Mi enfoque se centra en pipelines completos desde la ingesta de datos hasta el deployment de modelos.',
    keyPoints: [
      'Modelado predictivo con scikit-learn (regresión, clustering, clasificación)',
      'Análisis exploratorio de datos (EDA) con pandas y NumPy',
      'Feature engineering y selección de variables',
      'Validación cruzada y optimización de hiperparámetros',
      'Visualización de resultados con seaborn y matplotlib'
    ],
    challenges: [
      'Manejo de datos desbalanceados y outliers',
      'Evitar overfitting en modelos complejos',
      'Escalabilidad de pipelines para grandes volúmenes',
      'Interpretabilidad vs. precisión del modelo'
    ],
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter']
  },
  'Business Intelligence': {
    category: 'Business Intelligence',
    title: 'Business Intelligence & Analytics',
    description: 'BI transforma datos brutos en información accionable mediante procesos ETL, modelado dimensional y visualización estratégica. Mi experiencia incluye desde el diseño de data warehouses hasta la creación de dashboards ejecutivos.',
    keyPoints: [
      'Diseño e implementación de procesos ETL (Extract, Transform, Load)',
      'Modelado dimensional (esquemas estrella y copo de nieve)',
      'Creación de dashboards interactivos en Power BI, Qlik y Tableau',
      'Definición de KPIs y métricas de negocio',
      'Integración de múltiples fuentes de datos (SQL, Excel, APIs)'
    ],
    challenges: [
      'Garantizar calidad y consistencia de datos',
      'Optimizar tiempos de refresco en dashboards',
      'Diseñar visualizaciones efectivas y no engañosas',
      'Escalar soluciones para usuarios concurrentes'
    ],
    technologies: ['Power BI', 'Qlik', 'Tableau', 'SQL', 'Snowflake', 'QGIS', 'Python', 'DAX']
  },
  'Developer': {
    category: 'Developer',
    title: 'Desarrollo & Automatización',
    description: 'El desarrollo de software y automatización busca eliminar tareas repetitivas y construir soluciones eficientes y escalables. Mi enfoque combina buenas prácticas de ingeniería de software con integración continua.',
    keyPoints: [
      'Automatización de procesos ETL con Python',
      'Integración de sistemas (SAP, Excel, bases de datos)',
      'Desarrollo de scripts y herramientas de productividad',
      'Versionado con Git y flujos de trabajo colaborativos',
      'Documentación técnica y testing'
    ],
    challenges: [
      'Mantener código legible y mantenible',
      'Gestionar dependencias y entornos',
      'Garantizar robustez ante errores',
      'Balancear rapidez de desarrollo con calidad'
    ],
    technologies: ['Python', 'Git', 'Docker', 'SQL', 'APIs REST', 'JavaScript', 'Linux']
  }
};