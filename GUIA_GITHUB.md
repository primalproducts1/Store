# PRIMAL Store — actualizar y publicar

## Activar WhatsApp
Abre `Store/catalogo.js` en GitHub y pulsa el lápiz (Edit this file). En `whatsapp: ''` escribe tu número real con indicativo 57, solo dígitos. Guarda con **Commit changes**. No uses un enlace de canal o comunidad. El botón abre una conversación con productos, presentaciones, cantidades, precios y subtotal ya escritos. El comprador pulsa Enviar. No cobra ni envía automáticamente.

## Cambiar precio, texto o imagen
1. Abre `Store/catalogo.js` y pulsa el lápiz.
2. Busca el producto por nombre. Cambia `precio: 109900` por el precio final al público, sin puntos ni símbolo $. Mantén comillas en los textos.
3. Guarda con **Commit changes** y espera que finalice el despliegue en **Actions**.
4. Recarga la tienda y revisa el producto y su resumen en el carrito.

## Subir una fotografía
1. Entra en `Store/imagenes` → **Add file → Upload files**.
2. Sube una foto propia o autorizada del producto exacto. Nombre recomendado: `guantes-rojos.webp` (también JPG/PNG). Evita espacios y tildes; respeta mayúsculas.
3. Guarda y cambia en el catálogo `imagen: 'imagenes/guantes-rojos.webp'`.
4. Guarda de nuevo. La foto debe coincidir con marca, tamaño, sabor y presentación ofrecidos.

## Añadir un producto
Copia un bloque completo del catálogo (desde `{` hasta `},`) dentro de `PRIMAL_PRODUCTOS`, antes de `];`. Cambia su `id` por uno único y actualiza nombre, nombreEn, marca, presentacion, presentacionEn, descripcion, descripcionEn, precio e imagen. Usa una categoría existente: `boxeo`, `suplementos` o `fitness`. Conserva las comas entre bloques. Usa `visible: true`. No copies `habilitado: false` salvo que quieras impedir su compra. El nuevo producto aparece automáticamente, sin cambiar HTML.

Para ocultarlo, cambia `visible: true` a `visible: false`. No reutilices el identificador de otro producto. No existen cantidades disponibles ni gestión de stock; la cantidad del carrito es cuántas unidades pide el cliente.

## Publicar en /Store/ sin afectar las otras páginas
1. Descomprime el ZIP en tu computador.
2. Identifica el repositorio y carpeta que YA publica `primalproducts.com.co` en **Settings → Pages**. Si publica desde `/docs`, Store va dentro de docs; si publica desde la raíz, Store va en la raíz. Si usa Actions, respeta la carpeta que ese flujo despliega.
3. Sube la carpeta **Store** completa dentro de esa carpeta de publicación. No subas el ZIP sin descomprimir. Si existe Store, actualiza sus archivos con estos.
4. No reemplaces el index.html principal, CNAME, DNS, configuración Pages ni la carpeta Primal-Boxing.
5. Espera el despliegue y abre `https://primalproducts.com.co/Store/` (Store con S mayúscula).
6. Prueba desde celular: agregar dos productos, cambiar cantidad, eliminar uno y abrir WhatsApp. Comprueba destinatario, contenido y subtotal antes de enviar.

## Datos públicos y privados
Actualiza los datos de atención en `Store/negocio.js` y revisa `Store/legal.html`. No publiques costos, márgenes, clientes, documentos escaneados, claves o información interna: también el historial de GitHub es público. El ZIP no incluye la tabla privada de costos. No hace falta Google Sheets ni base de datos.
