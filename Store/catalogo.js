/*
  PRIMAL STORE - ÚNICO ARCHIVO QUE NECESITAS EDITAR PARA CAMBIAR PRODUCTOS
  1. Edita el nombre, precio e imagen de cada producto.
  2. Si subes fotos propias a Store/imagenes, cambia imagen a "imagenes/nombre.webp".
  3. Para retirar un producto, cambia visible: true por false.
  4. Para agregar uno, copia un bloque completo y usa un id distinto.
  IMPORTANTE: ESTE ARCHIVO ES PÚBLICO. No pongas aquí costos de proveedor,
  claves, contraseñas, tokens ni información personal privada.
*/

const PRIMAL_CONFIG = {
  whatsapp: '573152591115', // OBLIGATORIO ANTES DE VENDER: número empresarial con indicativo, ej. '573001112233', SIN '+'.
  nombre: 'PRIMAL Store',
  domicilio: 'Envíos cotizados al confirmar el pedido',
  inicio: 'https://primalproducts.com.co/',
  boxing: 'https://primalproducts.com.co/Primal-Boxing/',
  logo: 'imagenes/primal-icon.png'
};

const PRIMAL_PRODUCTOS = [
  // ==================== BOXEO (4) ====================
  {
    id: 'box-guantes-12', categoria: 'boxeo', visible: true, destacado: true,
    nombre: 'Guantes de boxeo Sportfitness 12 oz',
    nombreEn: 'Sportfitness 12 oz boxing gloves',
    marca: 'Sportfitness', presentacion: 'Par · 12 oz · Negro / gris',
    presentacionEn: 'Pair · 12 oz · Black / gray',
    descripcion: 'Guantes para entrenamiento con ajuste de velcro y acolchado de protección.',
    descripcionEn: 'Training gloves with hook-and-loop closure and protective padding.',
    precio: 109900,
    imagen: 'imagenes/box-guantes-12.webp',
    fuente: 'https://sportfitness.co/products/guante-boxeo-12-oz-negro-gris'
  },
  {
    id: 'box-vendas', categoria: 'boxeo', visible: true,
    nombre: 'Vendajes de boxeo Sportfitness', nombreEn: 'Sportfitness boxing hand wraps',
    marca: 'Sportfitness', presentacion: 'Par · Azul', presentacionEn: 'Pair · Blue',
    descripcion: 'Vendas de entrenamiento para envolver manos y muñecas.',
    descripcionEn: 'Training wraps for hands and wrists.',
    precio: 37900,
    imagen: 'imagenes/box-vendas.webp',
    fuente: 'https://sportfitness.co/collections/vendas'
  },
  {
    id: 'box-bucal', categoria: 'boxeo', visible: true,
    nombre: 'Protector bucal de boxeo adulto', nombreEn: 'Adult boxing mouthguard',
    marca: 'Decathlon · Domyos', presentacion: '1 unidad · Transparente', presentacionEn: '1 piece · Clear',
    descripcion: 'Protector bucal monomaterial para deportes de contacto.',
    descripcionEn: 'Single-material mouthguard for contact sports.',
    precio: 29900,
    imagen: 'imagenes/box-bucal.webp',
    fuente: 'https://www.decathlon.com.co/deportes-decathlon-colombia/boxeo-kickboxing'
  },
  {
    id: 'box-lazo', categoria: 'boxeo', visible: true,
    nombre: 'Cuerda de salto ajustable 3 m', nombreEn: 'Adjustable 3 m jump rope',
    marca: 'Sportfitness', presentacion: '1 unidad · Cable 2,4 mm', presentacionEn: '1 piece · 2.4 mm cable',
    descripcion: 'Cuerda de salto con longitud ajustable para acondicionamiento.',
    descripcionEn: 'Adjustable jump rope for conditioning drills.',
    precio: 19900,
    imagen: 'imagenes/box-lazo.webp',
    fuente: 'https://cyclewear.com.co/products/lazo-para-salto-2-4mm-3mt-ajustable-ptsr001-sportfitness'
  },
  // ================= SUPLEMENTOS (4) =================
  {
    id: 'sup-creatina', categoria: 'suplementos', visible: true, destacado: true,
    habilitado: false, // Referencia pendiente de aclaración: alerta INVIMA 424-2025. No habilitar sin verificar.
    nombre: 'Creatina Ultra Pure 500 g', nombreEn: 'Ultra Pure creatine 500 g',
    marca: 'Smart Nutrition', presentacion: '500 g · Referencia en revisión',
    presentacionEn: '500 g · Product under review',
    descripcion: 'Creatina en polvo. Revisa los ingredientes y las indicaciones del fabricante.',
    descripcionEn: 'Powdered creatine. Check the manufacturer label and instructions.',
    precio: 109900,
    imagen: 'imagenes/sup-creatina.webp',
    fuente: 'https://suplementosnutrecol.com/'
  },
  {
    id: 'sup-proteina', categoria: 'suplementos', visible: true,
    nombre: 'Proteína Whey Pure 2 lb', nombreEn: 'Whey Pure protein 2 lb',
    marca: 'Smart Nutrition', presentacion: '908 g · Sabor por confirmar',
    presentacionEn: '908 g · Flavor to confirm',
    descripcion: 'Proteína en polvo a base de suero de leche. El sabor se confirma en el pedido.',
    descripcionEn: 'Whey protein powder. Flavor is confirmed when ordering.',
    precio: 189900,
    imagen: 'imagenes/sup-proteina.webp',
    fuente: 'https://suplementosdeportivosmedellin.com/'
  },
  {
    id: 'sup-pre', categoria: 'suplementos', visible: true,
    nombre: 'Intenze preentreno 14 servicios', nombreEn: 'Intenze pre-workout 14 servings',
    marca: 'Proscience', presentacion: '420 g · Fruit Punch · Contiene cafeína',
    presentacionEn: '420 g · Fruit Punch · Contains caffeine',
    descripcion: 'Mezcla en polvo con cafeína. Lee las advertencias del empaque antes de consumir.',
    descripcionEn: 'Powder blend containing caffeine. Read pack warnings before use.',
    precio: 79900,
    imagen: 'imagenes/sup-pre.webp',
    fuente: 'https://suplementosdeportivosmedellin.com/'
  },
  {
    id: 'sup-gainer', categoria: 'suplementos', visible: true,
    nombre: 'Smart Gainer 3,25 lb', nombreEn: 'Smart Gainer 3.25 lb',
    marca: 'Proscience', presentacion: '1.476 g · Vainilla gourmet',
    presentacionEn: '1,476 g · Gourmet vanilla',
    descripcion: 'Mezcla en polvo tipo gainer. Revisa los ingredientes y la información nutricional.',
    descripcionEn: 'Gainer powder blend. Check ingredients and nutrition facts.',
    precio: 99900,
    imagen: 'imagenes/sup-gainer.webp',
    fuente: 'https://suplementosnutrecol.com/'
  },
  // =================== FITNESS (4) ===================
  {
    id: 'fit-bandas', categoria: 'fitness', visible: true, destacado: true,
    nombre: 'Bandas elásticas de tela x5', nombreEn: 'Fabric resistance bands, 5-pack',
    marca: 'Sportfitness', presentacion: 'Set de 5 resistencias', presentacionEn: 'Set of 5 resistance levels',
    descripcion: 'Cinco niveles de resistencia para ejercicios de fuerza y movilidad.',
    descripcionEn: 'Five resistance levels for strength and mobility exercises.',
    precio: 56900,
    imagen: 'imagenes/fit-bandas.webp',
    fuente: 'https://sportfitness.co/products/set-de-bandas-elasticas-en-tela-setx5'
  },
  {
    id: 'fit-mat', categoria: 'fitness', visible: true,
    nombre: 'Mat de yoga Sportfitness', nombreEn: 'Sportfitness yoga mat',
    marca: 'Sportfitness', presentacion: 'Morado · 175 × 61 cm', presentacionEn: 'Purple · 175 × 61 cm',
    descripcion: 'Superficie antideslizante de TPE para ejercicio de piso y movilidad.',
    descripcionEn: 'Textured TPE surface for floor workouts and mobility.',
    precio: 69900,
    imagen: 'imagenes/fit-mat.webp',
    fuente: 'https://sportfitness.co/products/colchoneta-yoga-morada'
  },
  {
    id: 'fit-mancuerna', categoria: 'fitness', visible: true,
    nombre: 'Mancuerna neopreno 5 lb', nombreEn: '5 lb neoprene dumbbell',
    marca: 'Sportfitness', presentacion: '1 unidad · 5 lb · Azul', presentacionEn: '1 piece · 5 lb · Blue',
    descripcion: 'Mancuerna individual con recubrimiento de neopreno, ideal para rutinas en casa.',
    descripcionEn: 'Single neoprene-coated dumbbell for workouts at home.',
    precio: 34900,
    imagen: 'imagenes/fit-mancuerna.webp',
    fuente: 'https://sportfitness.co/products/mancuernas-encauchetadas-en-neopreno'
  },
  {
    id: 'fit-rueda', categoria: 'fitness', visible: true,
    nombre: 'Rueda abdominal doble', nombreEn: 'Dual-wheel ab roller',
    marca: 'Sportfitness', presentacion: '1 unidad · Doble rueda', presentacionEn: '1 piece · Dual wheel',
    descripcion: 'Rueda para ejercicios de abdomen con agarres laterales.',
    descripcionEn: 'Ab roller for core exercises with side handles.',
    precio: 29900,
    imagen: 'imagenes/fit-rueda.webp',
    fuente: 'https://sportfitness.co/products/rueda-para-abdominales-doble-rueda'
  }
];
