# Nora Makovitz - Web Store

Storefront en Next.js (App Router) para catalogo, favoritos, carrito y checkout por WhatsApp.

## Stack

- Next.js 16 (App Router)
- React 19
- Zustand (persistencia en localStorage)
- Deploy en Vercel

## Produccion

- URL: `https://muga-makovitz.vercel.app`
- Branch principal: `main`

## Rutas

- `/`
- `/tienda`
- `/tienda/[categoria]`
- `/producto/[slug]`
- `/favoritos`
- `/carrito`
- `/checkout`

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Estructura

```txt
src/
  app/
  components/
  data/
  store/
  utils/
public/
```

## Deploy

Configuracion en `vercel.json`:

- `framework`: `nextjs`
- `outputDirectory`: `.next`
