# Especificación completa del proyecto

## 1. Resumen ejecutivo

Este proyecto comercializa un único producto digital en inglés:

**Etsy Seller Profit Tracker (After Fees)**

Es un archivo de Microsoft Excel que ayuda a vendedores de Etsy a estimar cuánto dinero queda en cada pedido después de aplicar las tarifas configuradas. El producto permite cargar pedidos, modificar supuestos de tarifas y revisar resultados mensuales.

- Precio fijo: **9.99 USD**
- Producto principal: `etsy-seller-profit-tracker.xlsx`
- Canal principal activo: **Payhip**
- Canal secundario en preparación: **Etsy**
- Landing independiente: **GitHub Pages**
- Idioma del producto y del material comercial: **inglés**
- Público objetivo: vendedores de Etsy que necesitan estimar tarifas y beneficio neto por pedido

No es un producto oficial de Etsy ni está afiliado, patrocinado o respaldado por Etsy. Tampoco sustituye asesoramiento fiscal, legal o contable.

## 2. Propuesta de valor

El comprador introduce un pedido por fila y obtiene una estimación del beneficio después de tarifas.

El workbook contempla:

- Precio del artículo
- Importe de envío cobrado
- Cantidad
- Reembolso
- Listing fee
- Transaction fee
- Payment processing
- Offsite Ads
- Etsy Ads introducido manualmente
- Regulatory operating fee
- Total de tarifas
- Beneficio neto
- Margen

Las tarifas cambian según el país y la fecha. El usuario debe verificarlas en su cuenta de Etsy Payment antes de utilizar los resultados.

## 3. Contenido del workbook

Archivo fuente:

`product/etsy-seller-profit-tracker.xlsx`

Tamaño verificado: aproximadamente **46 KB**.

### Hojas incluidas

1. **START HERE**
   - Instrucciones rápidas.
   - Alcance del modelo.
   - Elementos incluidos y excluidos.
   - Advertencia de que no es asesoramiento fiscal.

2. **SETTINGS**
   - Supuestos de tarifas editables.
   - Fuentes oficiales.
   - Fecha en que se comprobó cada supuesto.
   - Tarifas predeterminadas para un vendedor de Estados Unidos.
   - Selector para el umbral de Offsite Ads.

3. **ORDERS**
   - Una fila por pedido.
   - 200 filas listas para usar.
   - Celdas amarillas para datos introducidos por el usuario.
   - Columnas azules calculadas automáticamente.

4. **DASHBOARD**
   - Selección de mes.
   - Ventas netas.
   - Total de tarifas.
   - Beneficio neto.
   - Margen.
   - Cantidad de pedidos.
   - Pedidos atribuidos a Offsite Ads.

5. **EXAMPLE**
   - Ocho pedidos completos utilizados para comprobar la lógica.
   - Incluye escenarios estándar, cantidades múltiples, Offsite Ads, Etsy Ads y reembolsos.

### Comprobaciones

Las comprobaciones funcionales están documentadas en:

`product/CHECKS.md`

No se deben modificar las fórmulas sin repetir las ocho comprobaciones.

## 4. Precio y condiciones comerciales

- Precio en Payhip: **9.99 USD**
- Precio previsto en Etsy: **9.99 USD**
- No usar modalidad gratuita.
- No usar “pay what you want”.
- No prometer una cifra de ahorro, beneficio o ventas.
- No publicar testimonios, reseñas ni resultados inventados.

Política comercial preparada:

- Descarga digital instantánea.
- No se envía ningún producto físico.
- Reembolso dentro de siete días solamente cuando el archivo no haya sido descargado, salvo que la legislación aplicable exija otra cosa.

## 5. Payhip

### Estado

**Publicado y operativo.**

### URLs

- Producto: <https://payhip.com/b/LRMqF>
- Tienda: <https://payhip.com/sellermargintoolkit>
- Refund Policy: <https://payhip.com/sellermargintoolkit/refund-policy>
- Terms of Use: <https://payhip.com/sellermargintoolkit/terms-of-use>

### Configuración verificada

- Precio visible: **9.99 USD**.
- Producto marcado como visible.
- Archivo descargable cargado.
- Checkout probado.
- PayPal y tarjeta disponibles en el checkout.
- Política de reembolso visible.
- Términos de uso visibles.
- Política de privacidad visible.
- Pregunta legal requerida en el checkout:

  `I agree to the Refund Policy and Terms of Use.`

- Los textos “Refund Policy” y “Terms of Use” enlazan a sus páginas correspondientes.

Documentación operativa de Payhip:

`sales/payhip.md`

## 6. Landing pública

### Estado

**Publicada y operativa en GitHub Pages.**

### URLs

- Landing: <https://enriqueb86.github.io/payhipex/site/>
- Repositorio: <https://github.com/Enriqueb86/payhipex>

### Archivos

- `site/index.html`
- `site/styles.css`

### Configuración

- Botón de compra dirigido a <https://payhip.com/b/LRMqF>.
- Precio mostrado: **9.99 USD**.
- Diseño responsive comprobado en escritorio y móvil.
- FAQ incluida.
- Avisos de independencia y limitación de responsabilidad incluidos.
- Enlaces a privacidad y términos incluidos.
- Frase principal corregida:

  `Know what each order leaves after fees.`

## 7. Repositorio y control de versiones

### Repositorio remoto

<https://github.com/Enriqueb86/payhipex>

### Rama

`main`

### Último commit del paquete de Etsy

`946e0d5 Prepare Etsy listing assets and download package`

### Identidad de correo prevista para GitHub

`35084412+Enriqueb86@users.noreply.github.com`

No guardar contraseñas, claves API, datos fiscales, documentos personales ni datos bancarios en el repositorio.

## 8. Distribución realizada

Se publicó una comunicación inicial en LinkedIn:

<https://www.linkedin.com/feed/update/urn:li:activity:7513987925940932609/>

El copy fuente está en:

`distribution/post.md`

No se utilizaron mensajes directos automatizados, reseñas falsas ni republicaciones masivas.

## 9. Listing de Etsy

### Estado actual

**Preparado, pero todavía no publicado.**

La cuenta avanzó correctamente hasta la pantalla de facturación. La vinculación para recibir pagos mediante Payoneer quedó completada.

### Bloqueo pendiente

Falta que el titular de la cuenta complete personalmente:

1. Tarjeta de crédito o débito.
2. Nombre del titular.
3. Dirección de facturación.
4. Autorización de cobro.
5. Pago único de apertura de Etsy: **19 USD**.
6. Paso final de seguridad de la tienda.

Estos datos son privados y no deben compartirse ni guardarse en el repositorio.

Una vez completado el pago y abierta la tienda, se debe entrar en:

**Shop Manager → Listings → Add a listing**

### Título preparado

`Etsy Profit Tracker Spreadsheet, Excel Fee Calculator, Offsite Ads and Net Profit Dashboard`

### Precio

**9.99 USD**

### Configuración del listing

- Tipo: Digital item
- Entrega: Instant download
- Idioma: English
- Who made it: I did
- What is it: A finished product
- When made: 2020–2026
- SKU: `SMT-ETSY-PROFIT-01`
- Cantidad: 999
- Renovación: Automatic
- Sección sugerida: Seller Spreadsheets

El título, la descripción completa, los highlights y las etiquetas están listos para copiar desde:

`listings/etsy.md`

### Archivo que se debe subir a Etsy

`product/etsy-seller-profit-tracker.zip`

Etsy no acepta `.xlsx` como extensión de carga directa. El ZIP contiene exactamente el workbook original:

`etsy-seller-profit-tracker.xlsx`

La integridad del ZIP fue comprobada y el archivo interno tiene el mismo hash SHA-256 que el workbook original:

`5e2e7fb61193cf31c745014ecc720f20b9778da9646e2fe798d25863af6e8241`

Tamaño del ZIP: aproximadamente **28 KB**.

### Imágenes preparadas

Las siete imágenes finales están en:

`listings/images/etsy/`

Orden de carga:

1. `00-primary.jpg`
2. `01-cover.jpg`
3. `02-orders.jpg`
4. `03-fees.jpg`
5. `04-settings.jpg`
6. `05-dashboard.jpg`
7. `06-whats-included.jpg`

Especificaciones:

- Formato JPEG.
- Dimensiones: **2400 × 1800 px**.
- Relación 4:3.
- Modo RGB.
- Cada imagen pesa menos de 1 MB.
- La primera imagen muestra el workbook real en una computadora y no contiene texto publicitario superpuesto.
- Las demás imágenes explican las hojas, tarifas, dashboard y archivos incluidos.
- No contienen logos de Etsy, reseñas, ventas ni garantías inventadas.

Las capturas reales utilizadas están en:

`listings/images/source/`

Los fondos visuales están en:

`listings/images/backgrounds/`

El script reproducible está en:

`listings/build_etsy_images.py`

Los prompts utilizados están documentados en:

`listings/image-prompts.md`

### Etiquetas preparadas

1. `etsy profit tracker`
2. `seller fee tracker`
3. `etsy fees excel`
4. `profit spreadsheet`
5. `digital seller tool`
6. `etsy order tracker`
7. `fee calculator`
8. `small business excel`
9. `etsy ads tracker`
10. `offsite ads fees`
11. `net profit template`
12. `seller spreadsheet`
13. `instant download`

## 10. Qué falta para finalizar Etsy

### Tarea humana obligatoria

- Completar los datos de facturación.
- Autorizar y pagar los **19 USD** de apertura.
- Completar la seguridad de la tienda.

### Después del pago

1. Crear el único listing.
2. Subir las siete imágenes en el orden indicado.
3. Copiar el título y la descripción de `listings/etsy.md`.
4. Introducir las 13 etiquetas.
5. Fijar el precio en **9.99 USD**.
6. Seleccionar descarga digital instantánea.
7. Subir `product/etsy-seller-profit-tracker.zip`.
8. Revisar la miniatura en escritorio y móvil.
9. Comprobar políticas y datos de la tienda.
10. Publicar.
11. Abrir el listing público en una ventana privada.
12. Verificar precio, descripción, imágenes y botón de compra.
13. Registrar la URL pública en este documento, `README.md` y `HUMAN_TASKS.md`.

## 11. Estrategia para las primeras ventas

No es posible garantizar tres ventas. El objetivo es aumentar la probabilidad mediante una propuesta clara, una presentación profesional y tráfico relevante.

Plan inicial:

1. Publicar un solo listing bien optimizado.
2. Mantener el precio inicial en 9.99 USD.
3. Utilizar las 13 etiquetas preparadas.
4. Mantener la primera imagen limpia y fácil de entender.
5. Utilizar las imágenes siguientes para explicar qué recibe el comprador.
6. No modificar título, precio e imágenes todos los días; dejar tiempo para obtener impresiones y visitas.
7. Registrar semanalmente visitas, favoritos, carritos y ventas reales.
8. No comprar anuncios de Etsy hasta comprobar que el listing recibe clics y que la página convierte de forma orgánica.
9. Si hay visitas pero no ventas, revisar primero miniatura, primeras líneas de la descripción y claridad de la oferta.
10. Si no hay visitas, revisar título, categoría, atributos y etiquetas.

## 12. Métricas y criterio de decisión

Las métricas se registran en:

`REPORT.md`

Solo se deben registrar datos reales de Payhip, Etsy, LinkedIn y GitHub Pages.

Criterio de muerte documentado:

- Revisar a los **42 días**.
- Si existen **0 ventas** y menos de **50 visitas al listing**, no añadir más páginas, canales ni automatizaciones.
- En ese caso, proponer otro producto digital relacionado antes de invertir más tiempo o dinero.

## 13. Documentos legales

- `PRIVACY.md`
- `TERMS.md`
- Política de reembolso configurada en Payhip.
- Términos de uso configurados en Payhip.
- Pregunta legal requerida configurada en el checkout de Payhip.

Los documentos deben revisarse si cambia el país operativo, la plataforma de cobro, el tipo de datos recopilados o la política comercial.

## 14. Estructura principal del proyecto

```text
Experiment/
├── PROJECT_SPEC.md
├── README.md
├── HUMAN_TASKS.md
├── REPORT.md
├── PRIVACY.md
├── TERMS.md
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
└── tools/
    └── build_workbook.mjs
```

## 15. Definición de proyecto completamente operativo

El proyecto se considerará completamente operativo cuando se cumplan todos estos puntos:

- Payhip publicado y comprable. **Completado.**
- Landing de GitHub Pages publicada. **Completado.**
- Políticas legales visibles. **Completado.**
- Checkout de Payhip probado. **Completado.**
- Material de distribución inicial publicado. **Completado.**
- Cuenta de cobro de Etsy vinculada. **Completado.**
- Pago de apertura de Etsy de 19 USD. **Pendiente.**
- Seguridad final de la tienda Etsy. **Pendiente.**
- Listing único de Etsy publicado. **Pendiente.**
- Revisión pública del listing y descarga. **Pendiente.**

## 16. Próxima acción exacta

El titular debe completar en Etsy la tarjeta, dirección de facturación y autorización del pago único de **19 USD**. Después debe finalizar la seguridad de la tienda y abrir **Shop Manager → Listings**.

En ese punto se podrá cargar y publicar el listing utilizando exclusivamente los archivos y textos ya preparados en este repositorio.

---

Última actualización: **8 de octubre de 2026**.
