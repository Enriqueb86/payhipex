# Etsy Seller Profit Tracker — operación del repo

Producto digital único: un archivo Excel en inglés que estima el neto de cada pedido después de las tarifas configuradas. Precio fijo de lista: **9.99 USD**. Canal principal: Payhip. Canal secundario opcional: un listing en Etsy con el mismo archivo.

## Árbol

```text
.
├── product/
│   ├── etsy-seller-profit-tracker.xlsx
│   └── CHECKS.md
├── sales/
│   └── payhip.md
├── site/
│   ├── index.html
│   └── styles.css
├── listings/
│   ├── etsy.md
│   ├── image-prompts.md
│   ├── gemini_images.py
│   └── images/
├── distribution/
│   └── post.md
├── tools/
│   └── build_workbook.mjs
├── PRIVACY.md
├── TERMS.md
├── HUMAN_TASKS.md
├── REPORT.md
└── README.md
```

## Operación

1. No modificar las fórmulas sin repetir los ocho checks de `product/CHECKS.md`.
2. Verificar las tarifas en `SETTINGS` antes de capturar imágenes o vender una versión nueva.
3. Mantener el precio en 9.99 USD y usar un solo archivo en Payhip y Etsy.
4. La URL de compra de Payhip es `https://payhip.com/b/LRMqF`.
5. Registrar únicamente métricas reales en `REPORT.md`.

## Imágenes

No había `GEMINI_API_KEY` disponible al preparar este repo, por lo que no se hizo ninguna llamada de imagen. Los seis prompts están en `listings/image-prompts.md`. El script `listings/gemini_images.py` lee la clave solo desde el entorno, intenta primero `gemini-nano-banana-2.1`, usa `gemini-3.1-flash-image` como fallback y se detiene a más tardar en ocho llamadas. `.env` está ignorado por Git.

## Criterio de muerte

A los **42 días**, si hay **0 ventas** y **menos de 50 visitas al listing**, no agregar más páginas, canales ni automatizaciones. Proponer otro archivo digital relacionado y esperar aprobación explícita antes de construirlo.

