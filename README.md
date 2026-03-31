# Babushka Landing WhatsApp (Astro)

Landing mobile-first para convertir trafico de Instagram en conversaciones de venta por WhatsApp.

## Stack

- Astro
- CSS plano (sin framework)

## Instalacion

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

## Build produccion

```bash
npm run build
npm run preview
```

## Personalizacion rapida

Editar `src/data/site.ts`:

- `whatsappNumber`: numero final en formato internacional (ej: `54911XXXXXXXX`).
- `instagram` e `instagramHandle`.
- `seo.title`, `seo.description`, `seo.ogImage`.
- `messages.general` y `messages.finalCta`.
- `products`: nombre, descripcion, rango y slug.
- `testimonials`.

## Estructura principal

- `src/layouts/BaseLayout.astro`: metadatos SEO + script de tracking.
- `src/pages/index.astro`: composicion de la landing.
- `src/components/*`: bloques de interfaz.
- `src/utils/whatsapp.ts`: armado de links de WhatsApp.
- `src/styles/global.css`: estilos globales.

## Tracking minimo incluido

Eventos por `data-track`:

- `click_whatsapp_primary`
- `click_whatsapp_secondary`
- `click_whatsapp_product_{slug}`
- `click_instagram`

Actualmente se envian a `window` como evento `analytics` y se registran por `console.log`.
Puedes conectarlo a tu herramienta de analitica en `BaseLayout.astro`.

## Importante

Este proyecto incluye SUPUESTOS para:

- dominio canonical,
- imagen OG final.

Reemplazarlos antes de publicar.
