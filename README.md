# Havanera Nails Salon

Sitio web para Havanera Nails Salon, construido con Astro y TypeScript.

## 🚀 Tecnologías

- [Astro](https://astro.build/) - Framework web de alto rendimiento
- [TypeScript](https://www.typescriptlang.org/) - Superset tipado de JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitario

## 📋 Requisitos previos

- Node.js (v18.x o superior)
- npm o yarn

## 🔧 Instalación

1. Clona este repositorio:
```bash
git clone https://github.com/tu-usuario/havanera-nails-salon.git
cd havanera-nails-salon
```

2. Instala las dependencias:
```bash
npm install
```

## 🛠️ Desarrollo

Inicia el servidor de desarrollo:
```bash
npm run dev
```

El sitio estará disponible en: `http://localhost:4321`

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Vista previa de la compilación de producción
- `npm run lint` - Ejecuta ESLint para verificar la calidad del código
- `npm run format` - Formatea el código con Prettier
- `npm run typecheck` - Verifica los tipos con TypeScript

## 📦 Estructura del proyecto

```
/
├── public/          # Activos estáticos
├── src/
│   ├── assets/      # Imágenes y otros activos
│   ├── components/  # Componentes reutilizables
│   ├── layouts/     # Diseños de página
│   ├── pages/       # Páginas del sitio
│   ├── scripts/     # Scripts TypeScript
│   └── styles/      # Estilos globales
├── astro.config.ts  # Configuración de Astro
└── tailwind.config.ts # Configuración de Tailwind CSS
```

## 🚀 Despliegue

Para construir el sitio para producción:

```bash
npm run build
```

Los archivos compilados se encontrarán en la carpeta `dist/`.

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).
