# GT Connections — sitio web (Next.js)

Rediseño del sitio informativo de GT Connections. Casi todo el sitio es
estático; el contenido vive en archivos JSON separados del código, listo para
migrar a Supabase el día que se necesite edición en vivo.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- Despliegue pensado para **Vercel** (SSG / estático)

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run start    # sirve el build
```

> Node 18.18+ (tu equipo tiene Node 24, perfecto).

## Estructura

```
src/
  app/                     # rutas (una carpeta por página)
    page.tsx               # Home
    about-us/ web-development/ app-development/
    landing-pages/ influencers/ reseller-program/
    news/ contact-us/
    layout.tsx             # Header + Footer globales
    globals.css            # tokens de diseño (colores de marca, botones)
  components/
    Header.tsx  Footer.tsx
    DomainSearch.tsx       # buscador de dominios (GoDaddy Reseller)
    ContactForm.tsx        # formulario de contacto
    PageRenderer.tsx       # compone las secciones de cada página
    sections/              # Hero, CardsGrid, Steps, Reasons, Pricing, ...
  content/
    site.json              # marca, navegación, footer, contacto, GoDaddy
    pages/*.json           # contenido de cada página
  lib/
    content.ts             # capa de acceso al contenido (hoy JSON, mañana Supabase)
    types.ts               # tipos del contenido
```

## Editar contenido

Todo el texto está en `src/content`. Para cambiar un texto o un botón, edita el
JSON correspondiente y haz commit — Vercel redespliega solo. No hace falta tocar
componentes.

- Textos de una página → `src/content/pages/<pagina>.json`
- Navegación, footer, teléfonos, redes, enlaces externos → `src/content/site.json`

## Integración GoDaddy (Reseller Program)

- El **buscador de dominios** y los enlaces "Online Services" apuntan a
  GoDaddy/secureserver con el `pl_id` de la cuenta (**531354**).
- Todo es configurable en `src/content/site.json → godaddy.domainSearch` y
  `external`. Si el endpoint del buscador cambia, se ajusta ahí sin tocar código.

> Nota: verifica la URL de `godaddy.domainSearch.action` contra tu storefront
> real de reseller; se dejó el patrón estándar de secureserver.

## Mejorar sección a sección con 21st.dev

Cada sección es un componente en `src/components/sections`. Para rehacer una con
un componente de 21st.dev, reemplaza ese componente (o su JSX) manteniendo las
mismas props; el contenido no cambia.

## Migrar a Supabase (opcional, a futuro)

El contenido se lee a través de `src/lib/content.ts` con funciones `async`
(`getSiteConfig`, `getPage`). Para pasar a edición en vivo:

1. Crea las tablas en Supabase (p. ej. `pages`, `site_config`).
2. Cambia el cuerpo de esas funciones por consultas con `@supabase/supabase-js`.
3. Usa ISR / revalidación on-demand para refrescar sin redeploy.

Los componentes y las páginas no cambian, porque ya consumen esas funciones.
```
```
