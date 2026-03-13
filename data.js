const cursos = [
  { id: 1, nombre: "Frenectomías Pediátricas Avanzadas", ponente: "Dra. Maria Fernanda Bello Borrego", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-13.jpg", area: "Cirugía",
    temario: ["Anatomía del frenillo labial y lingual", "Indicaciones quirúrgicas en pediatría", "Técnica de frenectomía con bisturí y láser", "Manejo del paciente pediátrico", "Cuidados postoperatorios"] },
  { id: 2, nombre: "Ortodoncia Interceptiva y Manejo de Espacios en Pediátricos", ponente: "Dra. Alejandra Guerrero", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-14.jpg", area: "Ortodoncia",
    temario: ["Diagnóstico temprano de maloclusiones", "Mantenedores de espacio fijos y removibles", "Aparatología interceptiva básica", "Expansión del arco dentario", "Seguimiento y control del paciente"] },
  { id: 3, nombre: "Endodoncia Pediátrica: Manejo de Canales Radioculares en Niños", ponente: "Dra. Yeniushka Torres", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-15.jpg", area: "Endodoncia",
    temario: ["Anatomía pulpar en dientes primarios", "Diagnóstico del compromiso pulpar", "Pulpotomía y pulpectomía en niños", "Materiales de obturación en pediatría", "Criterios de éxito y fracaso"] },
  { id: 4, nombre: "Implantología y Periimplantitis", ponente: "Dra. Roxana Villanueva", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-16.jpg", area: "Implantología",
    temario: ["Selección del paciente implantológico", "Planeación quirúrgica y protésica", "Diagnóstico de periimplantitis", "Protocolo de tratamiento no quirúrgico", "Mantenimiento periimplantario"] },
  { id: 5, nombre: "Prótesis Total de Alta Succión", ponente: "Dra. Victoria Anabel Silva Ríos", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-17.jpg", area: "Prótesis",
    temario: ["Principios de retención y soporte protésico", "Toma de impresiones funcionales", "Registro de relaciones intermaxilares", "Montaje en articulador semiajustable", "Técnica de alta succión paso a paso"] },
  { id: 6, nombre: "Técnicas de Obturación Tridimensional", ponente: "Dra. Maria Elena Castañeda Romero", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-18.jpg", area: "Endodoncia",
    temario: ["Instrumentación rotatoria y reciprocante", "Irrigación y desinfección del sistema de canales", "Técnica de condensación lateral", "Obturación vertical en caliente", "Verificación radiográfica"] },
  { id: 7, nombre: "Manejo Odontológico en Pacientes con Diabetes Mellitus", ponente: "Dra. Alejandra Guerrero", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-01.jpg", area: "Medicina",
    temario: ["Fisiopatología de la diabetes y salud bucal", "Manifestaciones orales de la diabetes", "Protocolo de atención dental seguro", "Interacciones farmacológicas", "Prevención y control periodontal"] },
  { id: 8, nombre: "Ortodoncia Preventiva y Tratamiento de Maloclusiones", ponente: "Dra. Alejandra Guerrero", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-02.jpg", area: "Ortodoncia",
    temario: ["Clasificación de maloclusiones de Angle", "Hábitos orales y su impacto", "Aparatología preventiva", "Planos inclinados y placas de Hawley", "Casos clínicos resueltos"] },
  { id: 9, nombre: "Mínima Invasión en Odontopediatría", ponente: "Dra. Anahí Zamudio Sarmina", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-03.jpg", area: "Odontopediatría",
    temario: ["Filosofía de mínima intervención", "Selladores de fosetas y fisuras", "Técnica de Hall con coronas preformadas", "Restauraciones con ionómero de vidrio", "Prevención y remineralización"] },
  { id: 10, nombre: "Apicectomía: Técnicas y Materiales", ponente: "Dra. Maria Fernanda Bello Borrego", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-04.jpg", area: "Cirugía",
    temario: ["Indicaciones y contraindicaciones", "Diseño del colgajo quirúrgico", "Osteotomía y resección apical", "Preparación y obturación retrógrada", "Materiales biocompatibles: MTA y Biodentine"] },
  { id: 11, nombre: "Carillas Ultrafinas: Diseño, Tallado y Cementado", ponente: "Dra. Mariana Cruz Martinez", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-05.jpg", area: "Estética",
    temario: ["Planificación digital del smile design", "Preparación dental mínimamente invasiva", "Selección de cerámica y materiales", "Cementado adhesivo paso a paso", "Ajuste oclusal y pulido final"] },
  { id: 12, nombre: "Diseño y Elaboración de Prótesis Bucales Removibles Parciales", ponente: "Dra. Victoria Anabel Silva Ríos", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-06.jpg", area: "Prótesis",
    temario: ["Clasificación de Kennedy", "Diseño de conectores mayores y menores", "Apoyos oclusales y retenciones", "Toma de impresiones y modelos de trabajo", "Ajuste y entrega al paciente"] },
  { id: 13, nombre: "Hipomineralización Incisivo-Molar (MIH)", ponente: "Dra. Maria Elena Rescalvo", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-07.jpg", area: "Odontopediatría",
    temario: ["Etiología y prevalencia del MIH", "Criterios diagnósticos EAPD", "Manejo del dolor e hipersensibilidad", "Opciones de restauración según severidad", "Seguimiento a largo plazo"] },
  { id: 14, nombre: "Ortopedia Dentofacial", ponente: "Dra. Nidia Gabriela Cisneros Martínez", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-08.jpg", area: "Ortodoncia",
    temario: ["Crecimiento y desarrollo craneofacial", "Diagnóstico cefalométrico", "Aparatos funcionales: Bionator, Twin-block", "Expansión palatina rápida", "Casos clínicos y seguimiento"] },
  { id: 15, nombre: "Técnicas Quirúrgicas de Terceros Molares Impactados", ponente: "Dra. Maria Fernanda Bello Borrego", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-09.jpg", area: "Cirugía",
    temario: ["Clasificación de Pell-Gregory y Winter", "Valoración radiográfica preoperatoria", "Diseño de colgajos y osteotomía", "Odontosección y extracción", "Manejo de complicaciones"] },
  { id: 16, nombre: "Incrustaciones: Técnicas, Estética y Adhesión", ponente: "Dra. Maria Elena Castañeda Romero", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-10.jpg", area: "Estética",
    temario: ["Indicaciones de incrustaciones inlay y onlay", "Preparación cavitaria para indirectos", "Materiales: resina, cerámica, zirconia", "Protocolo de cementado adhesivo", "Acabado, pulido y control oclusal"] },
  { id: 17, nombre: "Rehabilitación Integral del Paciente Bruxista", ponente: "Dra. Nidia Gabriela Cisneros Martínez", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-11.jpg", area: "Rehabilitación",
    temario: ["Diagnóstico del bruxismo y sus consecuencias", "Análisis oclusal y montaje en articulador", "Férulas oclusales de estabilización", "Plan de rehabilitación por fases", "Selección de materiales resistentes"] },
  { id: 18, nombre: "Manejo de Abscesos Periodontales", ponente: "Dr. Victor Martinez Ruiz", costo: "$650 MX", modalidad: "En vivo", img: "assets/img/cursos/curso-12.jpg", area: "Periodoncia",
    temario: ["Clasificación y diagnóstico del absceso", "Diagnóstico diferencial periodontal vs endodóntico", "Drenaje quirúrgico y no quirúrgico", "Antibioticoterapia sistémica", "Seguimiento y control periodontal"] }
];

const alumnos = [
  "assets/img/alumnos/alumno-01.jpg",
  "assets/img/alumnos/alumno-02.jpg",
  "assets/img/alumnos/alumno-03.jpg",
  "assets/img/alumnos/alumno-04.jpg",
  "assets/img/alumnos/alumno-05.jpg",
  "assets/img/alumnos/alumno-06.jpg",
  "assets/img/alumnos/alumno-07.jpg",
  "assets/img/alumnos/alumno-08.jpg"
];

const resenas = [
  "assets/img/resenas/resena-01.jpg",
  "assets/img/resenas/resena-02.jpg",
  "assets/img/resenas/resena-03.jpg",
  "assets/img/resenas/resena-04.jpg",
  "assets/img/resenas/resena-05.jpg",
  "assets/img/resenas/resena-06.jpg"
];
