const cursos = [
  {
    id: 1,
    nombre: "Frenectomías pediátricas avanzadas",
    area: "Cirugía",
    ponente: "Dra. María Fernanda Bello Borrego",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-13.jpg",
    temario: ["Valoración anatómica y diagnóstico", "Indicaciones clínicas en odontopediatría", "Técnica quirúrgica paso a paso", "Cuidados postoperatorios y seguimiento"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Aplicación clínica actualizada"]
  },
  {
    id: 2,
    nombre: "Ortodoncia interceptiva y manejo de espacios en pediátricos",
    area: "Ortodoncia",
    ponente: "Dra. Alejandra Guerrero",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-14.jpg",
    temario: ["Identificación temprana de maloclusiones", "Manejo del espacio en dentición mixta", "Aparatología interceptiva básica", "Criterios de seguimiento clínico"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Enfoque práctico y claro"]
  },
  {
    id: 3,
    nombre: "Endodoncia pediátrica: manejo de canales radiculares en niños",
    area: "Endodoncia",
    ponente: "Dra. Yeniushka Torres",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-15.jpg",
    temario: ["Diagnóstico pulpar en pacientes pediátricos", "Instrumentación y desinfección", "Materiales de obturación en dientes temporales", "Control clínico y radiográfico"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Actualización clínica especializada"]
  },
  {
    id: 4,
    nombre: "Implantología y periimplantitis",
    area: "Implantología",
    ponente: "Dra. Roxana Villanueva",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-16.jpg",
    temario: ["Planificación del caso implantológico", "Factores de riesgo periimplantarios", "Diagnóstico y control de periimplantitis", "Protocolos preventivos y terapéuticos"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Contenido clínico de alta demanda"]
  },
  {
    id: 5,
    nombre: "Prótesis total de alta succión",
    area: "Prótesis",
    ponente: "Dra. Victoria Anabel Silva Ríos",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-17.jpg",
    temario: ["Selección adecuada del paciente", "Impresiones funcionales", "Diseño de sellado periférico", "Ajuste final y control clínico"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Aplicación inmediata en consulta"]
  },
  {
    id: 6,
    nombre: "Técnicas de obturación tridimensional",
    area: "Endodoncia",
    ponente: "Dra. María Elena Castañeda Romero",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-18.jpg",
    temario: ["Principios de sellado endodóntico", "Técnicas termoplastificadas", "Control radiográfico del resultado", "Errores frecuentes y prevención"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Sesión enfocada en práctica clínica"]
  },
  {
    id: 7,
    nombre: "Manejo odontológico en pacientes con diabetes mellitus",
    area: "Medicina",
    ponente: "Dra. Alejandra Guerrero",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-01.jpg",
    temario: ["Interconsulta y valoración médica", "Riesgos odontológicos asociados", "Protocolos de atención segura", "Seguimiento y control del paciente"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Mayor seguridad clínica"]
  },
  {
    id: 8,
    nombre: "Ortodoncia preventiva y tratamiento de maloclusiones",
    area: "Ortodoncia",
    ponente: "Dra. Alejandra Guerrero",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-02.jpg",
    temario: ["Valoración inicial del crecimiento", "Detección de hábitos y factores de riesgo", "Opciones preventivas tempranas", "Plan de seguimiento clínico"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Contenidos claros y actualizados"]
  },
  {
    id: 9,
    nombre: "Mínima invasión en odontopediatría",
    area: "Odontopediatría",
    ponente: "Dra. Anahí Zamudio Sarmina",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-03.jpg",
    temario: ["Filosofía de mínima invasión", "Diagnóstico temprano de lesiones", "Alternativas conservadoras", "Manejo clínico del paciente infantil"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Enfoque preventivo y práctico"]
  },
  {
    id: 10,
    nombre: "Apicectomía: técnicas y materiales",
    area: "Cirugía",
    ponente: "Dra. María Fernanda Bello Borrego",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-04.jpg",
    temario: ["Indicaciones quirúrgicas", "Diseño del colgajo y acceso", "Resección apical y sellado", "Complicaciones y cuidados posteriores"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Actualización en cirugía periapical"]
  },
  {
    id: 11,
    nombre: "Carillas ultrafinas: diseño, tallado y cementado",
    area: "Estética",
    ponente: "Dra. Mariana Cruz Martínez",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-05.jpg",
    temario: ["Selección de casos estéticos", "Preparación conservadora", "Prueba y ajuste de carillas", "Protocolos de cementación adhesiva"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Estética con enfoque clínico"]
  },
  {
    id: 12,
    nombre: "Diseño y elaboración de prótesis bucales removibles parciales",
    area: "Prótesis",
    ponente: "Dra. Victoria Anabel Silva Ríos",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-06.jpg",
    temario: ["Planeación protésica parcial", "Componentes y diseño del aparato", "Secuencia clínica-laboratorio", "Entrega, ajuste y mantenimiento"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Aplicación útil en consulta diaria"]
  },
  {
    id: 13,
    nombre: "Hipomineralización incisivo-molar (MIH)",
    area: "Odontopediatría",
    ponente: "Dra. María Elena Rescalvo",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-07.jpg",
    temario: ["Criterios diagnósticos de MIH", "Clasificación clínica", "Control de sensibilidad y dolor", "Alternativas restauradoras"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Actualización en diagnóstico infantil"]
  },
  {
    id: 14,
    nombre: "Ortopedia dentofacial",
    area: "Ortodoncia",
    ponente: "Dra. Nidia Gabriela Cisneros Martínez",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-08.jpg",
    temario: ["Bases de crecimiento craneofacial", "Selección del paciente", "Aparatos funcionales más utilizados", "Control clínico del tratamiento"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Enfoque actualizado en crecimiento"]
  },
  {
    id: 15,
    nombre: "Técnicas quirúrgicas de terceros molares impactados",
    area: "Cirugía",
    ponente: "Dra. María Fernanda Bello Borrego",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-09.jpg",
    temario: ["Valoración radiográfica previa", "Planeación quirúrgica", "Osteotomía y odontosección", "Manejo de complicaciones comunes"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Contenido altamente solicitado"]
  },
  {
    id: 16,
    nombre: "Incrustaciones: técnicas, estética y adhesión",
    area: "Estética",
    ponente: "Dra. María Elena Castañeda Romero",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-10.jpg",
    temario: ["Selección del caso restaurador", "Preparación cavitaria", "Prueba funcional y estética", "Protocolo adhesivo y cementado"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Restauración indirecta actualizada"]
  },
  {
    id: 17,
    nombre: "Rehabilitación integral del paciente bruxista",
    area: "Rehabilitación",
    ponente: "Dra. Nidia Gabriela Cisneros Martínez",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-11.jpg",
    temario: ["Diagnóstico funcional del bruxismo", "Planeación rehabilitadora", "Control oclusal y protectores", "Seguimiento del caso clínico"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Aplicación integral del conocimiento"]
  },
  {
    id: 18,
    nombre: "Manejo de abscesos periodontales",
    area: "Periodoncia",
    ponente: "Dr. Víctor Martínez Ruiz",
    costo: "$650 MXN",
    img: "assets/img/cursos/curso-12.jpg",
    temario: ["Diferenciación clínica del absceso", "Manejo de urgencia en consulta", "Control antimicrobiano", "Seguimiento y prevención de recaídas"],
    beneficios: ["Certificado con valor curricular", "QR verificable y folio único", "Enfoque práctico y clínico"]
  }
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
  {
    nombre: "Judith Galindo",
    fecha: "7 de octubre de 2025",
    estrellas: 5,
    texto: "Recomiendo los cursos de Odontoteck ya que te ayudan a desarrollar nuevas habilidades profesionales, adquirir nuevos conocimientos además de que nos dan información actualizada, obteniendo una mejor preparación."
  },
  {
    nombre: "Norma Idalia Orozco Orozco",
    fecha: "7 de octubre de 2025",
    estrellas: 5,
    texto: "Excelente plataforma, destaco la flexibilidad de horarios, el ritmo de estudios, la diversidad de recursos y herramientas de interacción, lo que facilita el aprendizaje y la actualización."
  },
  {
    nombre: "Katia Ballesteros",
    fecha: "7 de octubre de 2025",
    estrellas: 5,
    texto: "Excelente curso, siempre están actualizando el contenido y brindan acompañamiento personalizado. Lo mejor es la oportunidad de resolver dudas y analizar casos junto con los docentes. Muy completo y actualizado. ¡Súper recomendado! ✨"
  },
  {
    nombre: "BereQui Ramírez",
    fecha: "4 de septiembre de 2025",
    estrellas: 5,
    texto: "De los mejores cursos y accesibles ya que los podemos ver después si tenemos dudas. Son muy atentos y los cursos muy completos y profesionales, aprendemos muchos. 100% recomendables."
  },
  {
    nombre: "Kari AreRui",
    fecha: "4 de septiembre de 2025",
    estrellas: 5,
    texto: "Excelentes cursos que ofrecen, amplían sin duda conocimientos para poder dar consultas integrales y actualizadas a los pacientes 🌟"
  },
  {
    nombre: "Jorge Chavez",
    fecha: "8 de octubre de 2025",
    estrellas: 5,
    texto: "Información y conocimiento amplio y suficiente para reforzar lo aprendido en la carrera de cirujano dentista e implementar una mejor, actualizada y profesional praxis en nuestros consultorios."
  }
];
