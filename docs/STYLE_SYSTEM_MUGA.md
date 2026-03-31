# Style System MUGA

## Contexto

- Proyecto: Babushka ecommerce homepage
- Tipo de sitio: ecommerce
- Estilo elegido: minimalista-moderno
- Stack objetivo: Astro + CSS

---

## 1) Direccion visual

- Intencion de marca: ordenar el catalogo, facilitar exploracion y sostener conversion a compra/CTA.
- Tono visual: limpio, estructurado, funcional.
- Sensacion objetivo: navegacion clara, jerarquia estable y decisiones rapidas.

---

## 2) Tokens base

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-text: #111111;
  --color-text-muted: #4a4a4a;
  --color-primary: #111111;
  --color-primary-contrast: #ffffff;
  --color-border: #d9d9d9;
  --color-success: #1f7a1f;
  --color-warning: #9a6b00;
  --color-danger: #b3261e;

  --font-display: "Inter", "Segoe UI", sans-serif;
  --font-body: "Inter", "Segoe UI", sans-serif;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 8px 20px rgba(0, 0, 0, 0.08);
}
```

---

## 3) Tipografia

- H1: 48/56, 600
- H2: 34/42, 600
- H3: 24/32, 600
- Body: 16/26, 400
- Small text: 14/22, 400
- Regla de line-height: minimo 1.5 en body y 1.2 en headings

---

## 4) Componentes minimos

### Button

- Variante primaria: fondo `--color-primary`, texto `--color-primary-contrast`, radio `--radius-md`.
- Variante secundaria: fondo transparente, borde `--color-border`, texto `--color-text`.
- Hover/focus: contraste mayor en hover y focus ring visible de 2px.

### Card

- Estructura: imagen superior, titulo, metadata/precio, CTA.
- Padding: `--space-4` mobile / `--space-5` desktop.
- Borde/sombra: borde fino `--color-border`, sombra ligera `--shadow-sm` opcional.

### Input/Form

- Altura: 48px minima.
- Estados: default, hover, focus, error.
- Mensajes de error: texto corto debajo del campo con separacion `--space-2`.

### Hero

- Composicion: split 50/50, texto y CTAs a la izquierda, imagen principal a la derecha.
- Jerarquia: heading corto + subtexto + 2 acciones maximas.
- CTA principal: constante en todas las secciones clave.

---

## 5) Reglas especificas por estilo

### A) minimalista-clasico

- Espacios amplios, contraste sobrio, ritmo vertical editorial.

### B) minimalista-moderno

- Grilla modular 12 columnas.
- Superficies limpias y acento controlado.
- Microinteracciones discretas y funcionales.

### C) brutalista-simple

- Bordes marcados, bloques compactos y jerarquia frontal.

---

## 6) Do / Dont

### Do

- Mantener tokens y spacing consistentes en todo el sitio.
- Priorizar alineacion de grilla y claridad de acciones.
- Reusar componentes base de header, hero y cards.

### Dont

- Mezclar variantes visuales por seccion sin criterio funcional.
- Duplicar botones primarios compitiendo entre si.
- Romper el ritmo de gaps con margenes arbitrarios.

---

## 7) Checklist de calidad

- [x] Mobile-first validado
- [x] Contraste AA validado
- [x] CTA principal consistente
- [x] Components listos para reuso
- [x] Tokens suficientes para escalar
