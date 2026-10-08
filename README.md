# Etsy Seller Profit Tracker — operación del repo

Producto digital único: un archivo Excel en inglés que estima el neto de cada pedido después de las tarifas configuradas. Precio fijo de lista: **9.99 USD**. Canal principal: Payhip. Canal secundario opcional: un listing en Etsy con el mismo archivo.

## Estado publicado

- Compra en Payhip: <https://payhip.com/b/LRMqF>
- Tienda: <https://payhip.com/sellermargintoolkit>
- Landing pública: <https://enriqueb86.github.io/payhipex/site/>
- Repositorio: <https://github.com/Enriqueb86/payhipex>
- Publicación inicial: <https://www.linkedin.com/feed/update/urn:li:activity:7513987925940932609/>
- Estado verificado: **8 de octubre de 2026**

## Árbol

```text
.
├── product/
│   ├── etsy-seller-profit-tracker.xlsx
│   ├── etsy-seller-profit-tracker.zip
│   └── CHECKS.md
├── sales/
│   └── payhip.md
├── site/
│   ├── index.html
│   └── styles.css
├── listings/
│   ├── etsy.md
│   ├── image-prompts.md
│   ├── build_etsy_images.py
│   ├── gemini_images.py
│   └── images/
│       ├── backgrounds/
│       ├── source/
│       └── etsy/
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
3. Mantener el precio en 9.99 USD y usar el mismo workbook en Payhip y Etsy. En Etsy se entrega dentro de un ZIP porque esa plataforma no admite `.xlsx` como extensión directa.
4. La URL de compra de Payhip es `https://payhip.com/b/LRMqF`.
5. Registrar únicamente métricas reales en `REPORT.md`.

## Imágenes

Las siete imágenes finales del listing están en `listings/images/etsy/`, en formato JPEG de 2400 × 1800 px. La primera muestra el workbook real sin texto promocional superpuesto; las siguientes explican el contenido, los cálculos y lo que recibe el comprador. `listings/build_etsy_images.py` recompone las piezas desde las capturas reales de `listings/images/source/` y los fondos de `listings/images/backgrounds/`.

El script histórico `listings/gemini_images.py` se conserva como referencia, pero no es necesario para publicar el listing actual.

## Criterio de muerte

A los **42 días**, si hay **0 ventas** y **menos de 50 visitas al listing**, no agregar más páginas, canales ni automatizaciones. Proponer otro archivo digital relacionado y esperar aprobación explícita antes de construirlo.
