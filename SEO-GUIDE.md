# 📊 Guía de SEO - Havanera Nails

## 🎯 Estructura de Archivos SEO

```
src/
├── data/
│   └── seo.ts                    # Configuración centralizada de SEO
├── components/
│   └── seo/
│       ├── SEOHead.astro         # Meta tags y Open Graph
│       └── StructuredData.astro  # Schema.org JSON-LD
└── pages/
    └── sitemap.xml.ts            # Sitemap dinámico

public/
├── robots.txt                    # Configuración de crawlers
├── manifest.json                 # PWA manifest mejorado
└── .well-known/
    └── security.txt              # Información de seguridad
```

## 🔧 Configuración Centralizada

### `src/data/seo.ts`
Contiene toda la información SEO del negocio:
- **siteConfig**: Configuración general del sitio
- **businessInfo**: Información del negocio (dirección, teléfono, horarios)
- **socialMedia**: Enlaces a redes sociales
- **services**: Lista de servicios ofrecidos
- **faqs**: Preguntas frecuentes

### Ventajas:
✅ Un solo lugar para actualizar toda la información
✅ Consistencia en todos los archivos
✅ Fácil mantenimiento
✅ Reutilizable en cualquier página

## 📄 Componentes SEO

### 1. SEOHead.astro
Maneja todos los meta tags:
- Title y description
- Keywords
- Open Graph (Facebook)
- Twitter Cards
- Canonical URLs
- Robots meta tags

**Uso:**
```astro
<SEOHead 
  title="Título de la página"
  description="Descripción"
  keywords={["palabra1", "palabra2"]}
  canonicalURL={new URL("/ruta", Astro.site)}
/>
```

### 2. StructuredData.astro
Genera datos estructurados Schema.org:
- Organization/LocalBusiness
- Service
- FAQPage
- BreadcrumbList

**Uso:**
```astro
<StructuredData 
  type="localBusiness" 
  data={customData}
/>
```

## 🗺️ Sitemap

El sitemap se genera dinámicamente en `/sitemap.xml`

### Páginas incluidas:
- `/` (Inicio) - Priority: 1.0
- `/Servicio_section` - Priority: 0.9
- `/Catalogo_section` - Priority: 0.8
- `/Contacto` - Priority: 0.9
- `/FAQ_section` - Priority: 0.7

### Actualización:
Edita `src/pages/sitemap.xml.ts` para agregar/modificar páginas.

## 🤖 Robots.txt

Configurado para:
- ✅ Permitir todos los crawlers
- ❌ Bloquear carpetas internas (`/api/`, `/_astro/`)
- 🗺️ Referencia al sitemap
- 🌐 Host principal definido

## 📱 PWA Manifest

Mejorado con:
- Nombre completo y corto optimizado para SEO
- Descripción detallada con keywords
- Iconos en múltiples tamaños
- Shortcuts para acciones rápidas:
  - Agendar cita (WhatsApp)
  - Ver servicios
  - Ver catálogo

## 🎯 Keywords Principales

### Generales:
- salón de uñas La Habana
- manicura Miramar
- pedicura Cuba
- uñas gel La Habana
- rubber base Cuba
- diseños de uñas Miramar
- Havanera Nails

### Por Servicio:
- manicura rubber base La Habana
- pedicura gel Miramar
- soft gel Cuba
- diseños de uñas personalizados

### Long-tail:
- salón de uñas profesional en Miramar
- mejor manicura en La Habana
- pedicura con gel en Cuba
- diseños de uñas únicos Miramar

## 📈 Mejores Prácticas Implementadas

### ✅ On-Page SEO
- [x] Títulos únicos y descriptivos por página
- [x] Meta descriptions optimizadas (150-160 caracteres)
- [x] URLs amigables y descriptivas
- [x] Headings jerárquicos (H1, H2, H3)
- [x] Alt text en todas las imágenes
- [x] Enlaces internos estratégicos
- [x] Canonical URLs en todas las páginas

### ✅ Technical SEO
- [x] Sitemap XML dinámico
- [x] Robots.txt optimizado
- [x] Schema.org markup (LocalBusiness, Service)
- [x] Open Graph tags
- [x] Twitter Cards
- [x] PWA manifest
- [x] Favicon en múltiples tamaños
- [x] Mobile-friendly (responsive)
- [x] Fast loading (optimización de fuentes)

### ✅ Local SEO
- [x] Información de ubicación (Miramar, La Habana)
- [x] Teléfono local (+53 5511 8387)
- [x] Horarios de atención
- [x] Coordenadas geográficas
- [x] Moneda local (CUP)
- [x] Idioma local (es-CU)

### ✅ Social Media Integration
- [x] Enlaces a Instagram
- [x] Enlaces a WhatsApp
- [x] Open Graph para compartir en redes
- [x] Botones de contacto directo

## 🚀 Cómo Usar en Nuevas Páginas

### Ejemplo básico:
```astro
---
import Layout from "../layouts/Layout.astro";
import { siteConfig } from "../data/seo";

const pageTitle = "Mi Nueva Página | Havanera Nails";
const pageDescription = "Descripción de mi página";
---

<Layout 
  title={pageTitle}
  description={pageDescription}
  keywords={["keyword1", "keyword2"]}
  structuredDataType="organization"
>
  <!-- Contenido de la página -->
</Layout>
```

## 📊 Monitoreo y Análisis

### Google Search Console
1. Verificar propiedad con meta tag (ya incluido)
2. Enviar sitemap: `https://havanera-nails.vercel.app/sitemap.xml`
3. Monitorear:
   - Impresiones y clics
   - Posiciones promedio
   - Errores de rastreo
   - Usabilidad móvil

### Google My Business
1. Crear perfil de negocio
2. Verificar ubicación
3. Agregar:
   - Fotos de trabajos
   - Horarios
   - Servicios
   - Enlace al sitio web

### Herramientas Recomendadas
- Google Search Console
- Google Analytics
- Google My Business
- Schema.org Validator
- Mobile-Friendly Test
- PageSpeed Insights

## 🔄 Mantenimiento

### Mensual:
- [ ] Revisar posiciones en Google
- [ ] Actualizar contenido si es necesario
- [ ] Verificar enlaces rotos
- [ ] Revisar Search Console

### Trimestral:
- [ ] Actualizar keywords según tendencias
- [ ] Revisar y mejorar meta descriptions
- [ ] Agregar nuevo contenido (blog posts, servicios)
- [ ] Actualizar fotos y diseños

### Anual:
- [ ] Auditoría SEO completa
- [ ] Revisar estrategia de keywords
- [ ] Actualizar datos estructurados
- [ ] Renovar contenido antiguo

## 📞 Información de Contacto para SEO

**Nombre del Negocio:** Havanera Nails  
**Ubicación:** Miramar, La Habana, Cuba  
**Teléfono:** +53 5511 8387  
**Instagram:** @havanera_nails_  
**WhatsApp:** https://wa.me/+5355118387  
**Sitio Web:** https://havanera-nails.vercel.app  

**Horarios:**
- Lunes a Viernes: 9:00 AM - 7:00 PM
- Sábado: 9:00 AM - 6:00 PM
- Domingo: Con cita previa

## 🎯 Próximos Pasos Recomendados

1. **Google My Business**
   - Crear y verificar perfil
   - Subir fotos de calidad
   - Responder reseñas

2. **Contenido**
   - Crear blog con tips de cuidado de uñas
   - Galería de trabajos realizados
   - Testimonios de clientes

3. **Backlinks**
   - Directorios locales de Cuba
   - Colaboraciones con influencers
   - Menciones en blogs de belleza

4. **Redes Sociales**
   - Publicar regularmente en Instagram
   - Usar hashtags locales
   - Interactuar con seguidores

5. **Análisis**
   - Configurar Google Analytics
   - Monitorear conversiones
   - A/B testing de CTAs

---

**Última actualización:** Octubre 2025  
**Mantenido por:** Equipo de Desarrollo Havanera Nails
