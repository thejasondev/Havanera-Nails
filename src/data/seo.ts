// Configuración centralizada de SEO para Havanera Nails
export const siteConfig = {
  name: "Havanera Nails",
  title: "Havanera Nails - Salón de Uñas en Miramar, La Habana",
  description: "Salón de uñas profesional en Miramar, La Habana. Especialistas en manicura y pedicura con gel, rubber base y diseños personalizados. Agenda tu cita hoy.",
  url: "https://havanera-nails.vercel.app",
  ogImage: "/og-image.jpg",
  keywords: [
    "salón de uñas La Habana",
    "manicura Miramar",
    "pedicura Cuba",
    "uñas gel La Habana",
    "rubber base Cuba",
    "diseños de uñas Miramar",
    "nail art La Habana",
    "soft gel Cuba",
    "manicura profesional",
    "pedicura profesional",
    "Havanera Nails",
    "uñas acrílicas La Habana",
    "decoración de uñas",
    "nail salon Havana"
  ],
  author: "Havanera Nails",
  locale: "es_CU",
  type: "website"
};

export const businessInfo = {
  name: "Havanera Nails",
  legalName: "Havanera Nails Salon",
  description: "Salón de uñas profesional especializado en manicura, pedicura, diseños personalizados y tratamientos de belleza para manos y pies.",
  foundingDate: "2023",
  address: {
    streetAddress: "Miramar",
    addressLocality: "La Habana",
    addressRegion: "La Habana",
    postalCode: "",
    addressCountry: "CU"
  },
  geo: {
    latitude: "23.1136",
    longitude: "-82.3666"
  },
  telephone: "+5355118387",
  email: "",
  priceRange: "$$",
  currenciesAccepted: "CUP",
  paymentAccepted: "Efectivo",
  openingHours: [
    "Mo-Fr 09:00-19:00",
    "Sa 09:00-18:00",
    "Su by appointment"
  ]
};

export const socialMedia = {
  instagram: {
    name: "Instagram",
    username: "@havanera_nails_",
    url: "https://www.instagram.com/havanera_nails_/",
    platform: "Instagram"
  },
  whatsapp: {
    name: "WhatsApp",
    number: "+5355118387",
    url: "https://wa.me/+5355118387",
    platform: "WhatsApp"
  }
};

export const services = [
  {
    name: "Manicura con Rubber Base - Uñas Cortas",
    description: "Tratamiento profesional con rubber base para uñas cortas. Incluye diseños sencillos, efectos, decoraciones y francesa.",
    price: "800",
    priceCurrency: "CUP",
    category: "Manicura"
  },
  {
    name: "Manicura con Rubber Base - Uñas Largas",
    description: "Tratamiento especializado con rubber base para uñas largas. Acabado natural y duradero.",
    price: "1000",
    priceCurrency: "CUP",
    category: "Manicura"
  },
  {
    name: "Pedicura con Gel",
    description: "Pedicura profesional con gel, incluye exfoliación, cremas y diseños personalizados.",
    price: "500",
    priceCurrency: "CUP",
    category: "Pedicura"
  },
  {
    name: "Set de Soft Gel",
    description: "Set completo de uñas con soft gel. Máxima durabilidad y acabado elegante.",
    price: "1300",
    priceCurrency: "CUP",
    category: "Manicura"
  }
];

export const faqs = [
  {
    question: "¿Dónde está ubicado Havanera Nails?",
    answer: "Estamos ubicados en Miramar, La Habana, Cuba. Puedes contactarnos por WhatsApp para obtener la dirección exacta."
  },
  {
    question: "¿Cuál es el horario de atención?",
    answer: "Atendemos de lunes a viernes de 9:00 AM a 7:00 PM, sábados de 9:00 AM a 6:00 PM, y domingos con cita previa."
  },
  {
    question: "¿Cuánto dura una manicura con gel?",
    answer: "Una manicura con gel puede durar entre 2 a 3 semanas con el cuidado adecuado."
  },
  {
    question: "¿Ofrecen diseños personalizados?",
    answer: "Sí, ofrecemos diseños personalizados, desde diseños sencillos hasta diseños complejos con relieves y efectos especiales."
  },
  {
    question: "¿Cómo puedo agendar una cita?",
    answer: "Puedes agendar tu cita a través de WhatsApp al +53 5511 8387 o visitando nuestra página de contacto."
  }
];
