(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const fmt = n => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);
  const items = PRIMAL_PRODUCTOS.filter(p => p.visible !== false && p.id && Number.isFinite(p.precio) && p.precio > 0);
  const phone = String(PRIMAL_CONFIG.whatsapp || '').replace(/[\s()+-]/g, '');
  const validPhone = /^[1-9]\d{7,14}$/.test(phone);
  const byId = new Map(items.map(p => [p.id, p]));
  const translations = {
    es: {
      cart: 'Mi pedido', heroTitle: 'EQUÍPATE PARA<br><em>EL PRÓXIMO ROUND.</em>',
      heroText: 'Boxeo, suplementos y fitness. Elige lo que necesitas y solicita tu pedido. Nosotros confirmamos los detalles antes de que pagues.',
      explore: 'VER PRODUCTOS', fine: 'Sin pagos en esta web · Pedidos por WhatsApp · Envío por confirmar',
      how: 'ASÍ DE FÁCIL', steps: ['Escoge tus productos','Prepara tu solicitud','Confirmamos entrega y pago por WhatsApp'],
      title: 'ELIGE TU EQUIPO.', subtitle: '12 productos elegidos para empezar. Pide sin registro y sin pagar en esta página.',
      filters: {todos: 'TODOS',boxeo: 'BOXEO',suplementos: 'SUPLEMENTOS',fitness: 'FITNESS'},
      placeholder: 'Buscar un producto', add: 'AÑADIR AL PEDIDO', added: 'Añadido a tu pedido',
      emptySearch: 'No encontramos productos con esa búsqueda.', noticeTitle: 'SOLICITA. CONFIRMA. ENTRENA.',
      notice: 'En esta página preparas una solicitud, no realizas un pago. Confirmaremos por WhatsApp disponibilidad, costo de envío, tiempo de entrega y total antes de cerrar la compra.',
      training: 'ENTRENAR CON PRIMAL BOXING', footer: 'Volver a PRIMAL Products',
      drawer: 'TU PEDIDO', emptyCart: 'Tu pedido está vacío. Elige productos para continuar.',
      subtotal: 'Subtotal de productos', shipping: 'Envío no incluido. Cotizamos y confirmamos el total antes de pagar.',
      checkout: 'SOLICITAR POR WHATSAPP', copy: 'COPIAR SOLICITUD', clear: 'Vaciar pedido', remove: 'Quitar',
      missingWA: 'El contacto para pedidos estará disponible pronto. Puedes guardar una copia de tu solicitud.',
      clipboard: 'Resumen del pedido copiado.', copyError: 'No se pudo copiar automáticamente. Selecciona y copia el texto.',
      clearConfirm: '¿Vaciar todo tu pedido?', copied: 'Resumen copiado al portapapeles', orderTitle: 'Hola, quiero solicitar este pedido en PRIMAL Store:',
      totalText: 'Subtotal productos', shippingText: 'Envío pendiente por cotizar. Quiero confirmar disponibilidad, total, plazo de entrega y forma de pago antes de comprar.',
      photo: 'Imagen de producto no disponible', qtyLabel: 'Cantidad', whatsTitle: 'Pedido PRIMAL Store', error: 'No fue posible abrir WhatsApp. Copia la solicitud y envíala manualmente.'
    },
    en: {
      cart: 'My order', heroTitle: 'GEAR UP FOR<br><em>YOUR NEXT ROUND.</em>',
      heroText: 'Boxing, supplements and fitness. Choose what you need and submit an order request. We confirm the details before you pay.',
      explore: 'EXPLORE PRODUCTS', fine: 'No online payments · WhatsApp requests · Delivery to be confirmed',
      how: 'THREE EASY STEPS', steps: ['Choose your products','Prepare your request','We confirm delivery and payment via WhatsApp'],
      title: 'CHOOSE YOUR GEAR.', subtitle: '12 starter picks. Request without registration or online payment.',
      filters: {todos: 'ALL',boxeo: 'BOXING',suplementos: 'SUPPLEMENTS',fitness: 'FITNESS'},
      placeholder: 'Search products', add: 'ADD TO REQUEST', added: 'Added to your order',
      emptySearch: 'No products match your search.', noticeTitle: 'REQUEST. CONFIRM. TRAIN.',
      notice: 'This website prepares an order request, not a payment. We will confirm availability, shipping, delivery timing and the full total via WhatsApp before completing the purchase.',
      training: 'TRAIN WITH PRIMAL BOXING', footer: 'Back to PRIMAL Products',
      drawer: 'YOUR ORDER', emptyCart: 'Your order is empty. Select products to continue.',
      subtotal: 'Product subtotal', shipping: 'Shipping not included. We confirm the full total before you pay.',
      checkout: 'REQUEST VIA WHATSAPP', copy: 'COPY REQUEST', clear: 'Clear order', remove: 'Remove',
      missingWA: 'Order contact will be available soon. You can save a copy of your request.',
      clipboard: 'Order summary copied.', copyError: 'Automatic copy failed. Select and copy the text.',
      clearConfirm: 'Remove all items from your order?', copied: 'Order summary copied', orderTitle: 'Hello, I would like to request this PRIMAL Store order:',
      totalText: 'Product subtotal', shippingText: 'Shipping to be quoted. I would like to confirm availability, full total, delivery time, and payment method before buying.',
      photo: 'Product photo unavailable', qtyLabel: 'Quantity', whatsTitle: 'PRIMAL Store order', error: 'WhatsApp could not be opened. Copy your request and send it manually.'
    }
  };
  let lang = (() => {try{return localStorage.getItem('primal-store-lang') === 'en' ? 'en' : 'es'}catch{return 'es'}})();
  let category = 'todos';
  let cart = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem('primal-store-cart') || '{}');
      const safe = {};
      for(const [id, qty] of Object.entries(saved)) if(byId.has(id) && byId.get(id).habilitado !== false && Number.isInteger(qty) && qty > 0) safe[id] = Math.min(qty, 99);
      return safe;
    } catch { return {}; }
  })();
  const t = () => translations[lang];
  const tr = (p, prop) => lang === 'en' && p[prop + 'En'] ? p[prop + 'En'] : p[prop];
  function saveCart() {try{localStorage.setItem('primal-store-cart', JSON.stringify(cart))}catch{}}
  function text(id, value) { $(id).textContent = value; }
  function toast(msg){let el=$('toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.timeout);toast.timeout=setTimeout(()=>el.classList.remove('show'),2600)}
  function applyLanguage() {
    const w=t();document.documentElement.lang=lang;
    $('langBtn').textContent=lang==='es'?'EN':'ES';
    $('heroTitle').innerHTML=w.heroTitle;
    text('heroText',w.heroText);$('exploreBtn').innerHTML=`${w.explore} <span aria-hidden="true">↓</span>`;
    text('heroFine',w.fine);text('howTitle',w.how);
    w.steps.forEach((s,i)=>text('step'+(i+1),s));
    text('catalogTitle',w.title);text('catalogSub',w.subtitle.replace('12',String(items.length)));
    document.querySelectorAll('.filter').forEach(btn=>{btn.setAttribute('aria-pressed',String(btn.dataset.cat===category));let count=btn.dataset.cat==='todos'?items.length:items.filter(p=>p.categoria===btn.dataset.cat).length;btn.innerHTML=`${w.filters[btn.dataset.cat]} <span>${count}</span>`});
    $('search').placeholder=w.placeholder;$('search').setAttribute('aria-label',w.placeholder);$('closeCart').setAttribute('aria-label',lang==='es'?'Cerrar pedido':'Close order');$('openCart').setAttribute('aria-label',w.cart);$('langBtn').setAttribute('aria-label',lang==='es'?'Switch to English':'Cambiar a español');text('emptyProducts',w.emptySearch);
    text('noticeTitle',w.noticeTitle);text('noticeBody',w.notice);text('trainingCta',w.training);
    text('footerBack',w.footer);text('drawerTitle',w.drawer);text('cartLabel',w.cart);
    text('subtotalLabel',w.subtotal);text('shippingCopy',w.shipping);text('clearCart',w.clear);
    text('checkoutTitle',lang==='es'?'COMPRAR POR WHATSAPP':'ORDER ON WHATSAPP');text('checkoutSubtitle',lang==='es'?'Tu pedido listo. Hablemos.':'Your order is ready. Let’s talk.');text('copyOrder',lang==='es'?'Copiar pedido':'Copy order');text('downloadOrder',lang==='es'?'Descargar resumen':'Download summary');
    text('checkoutHelp',validPhone?(lang==='es'?'Se abrirá tu pedido completo. Revisa y pulsa Enviar en WhatsApp.':'Your full order will open. Review it and tap Send in WhatsApp.'):(lang==='es'?'Falta habilitar el número de pedidos. Por ahora puedes copiar o descargar tu selección.':'The ordering number is not enabled yet. You can copy or download your selection.'));$('checkoutLegal').innerHTML=lang==='es'?'El mensaje llevará los productos de tu carrito. Revisa las <a href="legal.html#compra" target="_blank" rel="noopener">condiciones</a> y el <a href="legal.html#privacidad" target="_blank" rel="noopener">aviso de privacidad</a>.':'Your cart products are included in the message. Read the <a href="legal.html#compra" target="_blank" rel="noopener">terms (Spanish)</a> and <a href="legal.html#privacidad" target="_blank" rel="noopener">privacy notice (Spanish)</a>.';
    $('backLink').href=PRIMAL_CONFIG.inicio;
    $('boxingLink').href=PRIMAL_CONFIG.boxing;
    $('trainingCta').href=PRIMAL_CONFIG.boxing;
    document.querySelector('.brand').href=PRIMAL_CONFIG.inicio;document.querySelector('.brand img').src=PRIMAL_CONFIG.logo;$('footerBack').href=PRIMAL_CONFIG.inicio;
    renderProducts();renderCart();
  }
  function renderProducts(){
    const term=$('search').value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const list=items.filter(p => (category==='todos'||p.categoria===category) && (p.nombre+' '+(p.nombreEn||'')+' '+p.marca+' '+p.descripcion).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(term));
    $('emptyProducts').hidden=list.length!==0;
    const grid=$('productGrid');grid.replaceChildren();
    for(const p of list){
      const card=document.createElement('article');card.className='product';
      const photo=document.createElement('div');photo.className='photo';
      const img=document.createElement('img');img.src=p.imagen;img.alt=tr(p,'nombre');img.loading='lazy';img.decoding='async';img.width=600;img.height=600;
      img.onerror=()=>photo.classList.add('missing');photo.appendChild(img);
      const categoryLabel=document.createElement('span');categoryLabel.className='pill';categoryLabel.textContent=t().filters[p.categoria];photo.appendChild(categoryLabel);
      const fail=document.createElement('span');fail.className='image-fail';fail.textContent=t().photo;photo.appendChild(fail);
      const body=document.createElement('div');body.className='product-body';
      const brand=document.createElement('div');brand.className='product-brand';brand.textContent=p.marca;
      const name=document.createElement('h3');name.textContent=tr(p,'nombre');
      const desc=document.createElement('p');desc.className='product-desc';desc.textContent=tr(p,'descripcion');
      const size=document.createElement('p');size.className='product-size';size.textContent=tr(p,'presentacion');
      const bottom=document.createElement('div');bottom.className='product-bottom';
      const price=document.createElement('div');price.className='price';price.textContent=fmt(p.precio);
      const button=document.createElement('button');button.className='add';button.type='button';button.textContent=t().add;button.setAttribute('aria-label',`${t().add}: ${tr(p,'nombre')}`);
      if(p.habilitado===false){button.disabled=true;button.textContent=lang==='es'?'EN REVISIÓN':'UNDER REVIEW';button.setAttribute('aria-label',button.textContent+': '+tr(p,'nombre'))}
      button.addEventListener('click',()=>{if(p.habilitado===false)return;cart[p.id]=Math.min((cart[p.id]||0)+1,99);saveCart();renderCart();toast(t().added)});
      const more=document.createElement('details');more.className='product-details';const summary=document.createElement('summary');summary.textContent=lang==='es'?'Ver detalles':'View details';more.append(summary,desc);bottom.append(price,button);body.append(brand,name,size,more,bottom);card.append(photo,body);grid.appendChild(card);
    }
  }
  function getCount(){return Object.values(cart).reduce((s,n)=>s+n,0)}
  function getSubtotal(){return Object.entries(cart).reduce((s,[id,n])=>s+(byId.get(id)?.precio||0)*n,0)}
  function renderCart(){
    $('copyPanel').hidden=true;text('summaryLabel',lang==='es'?'Resumen para copiar':'Order summary to copy');
    text('cartCount',String(getCount()));$('mobileCart').hidden=getCount()===0;text('mobileTotal',fmt(getSubtotal()));text('mobileCartText',lang==='es'?`Ver mi pedido (${getCount()})`:`View order (${getCount()})`);document.body.classList.toggle('has-cart',getCount()>0);text('subtotal',fmt(getSubtotal()));const target=PRIMAL_PEDIDO.url(PRIMAL_CONFIG.whatsapp,items,cart,lang);if(target){$('checkout').href=target;$('checkout').removeAttribute('aria-disabled');$('checkout').tabIndex=0}else{$('checkout').removeAttribute('href');$('checkout').setAttribute('aria-disabled','true');$('checkout').tabIndex=-1}$('copyOrder').disabled=getCount()===0;$('downloadOrder').disabled=getCount()===0;
    const el=$('cartItems');el.replaceChildren();
    $('clearCart').hidden=!getCount();
    if(!getCount()){const p=document.createElement('p');p.className='cart-empty';p.textContent=t().emptyCart;el.appendChild(p);return}
    for(const [id,n] of Object.entries(cart)){
      const p=byId.get(id);if(!p)continue;
      const row=document.createElement('div');row.className='cart-row';
      const pic=document.createElement('img');pic.src=p.imagen;pic.alt=tr(p,'nombre');pic.loading='lazy';
      const details=document.createElement('div');
      const name=document.createElement('div');name.className='cart-name';name.textContent=tr(p,'nombre');
      const price=document.createElement('div');price.className='cart-price';price.textContent=fmt(p.precio*n);
      const qty=document.createElement('div');qty.className='qty';
      const minus=document.createElement('button');minus.textContent='−';minus.type='button';minus.setAttribute('aria-label',`${lang==='es'?'Restar':'Decrease'}: ${tr(p,'nombre')}`);
      const count=document.createElement('b');count.textContent=String(n);
      const plus=document.createElement('button');plus.textContent='+';plus.type='button';plus.setAttribute('aria-label',`${lang==='es'?'Sumar':'Increase'}: ${tr(p,'nombre')}`);
      plus.disabled=n>=99;plus.dataset.action='plus';minus.dataset.action='minus';
      const remove=document.createElement('button');remove.className='remove';remove.dataset.action='remove';row.dataset.id=id;remove.textContent=t().remove;remove.type='button';
      minus.addEventListener('click',()=>changeQty(id,-1));plus.addEventListener('click',()=>changeQty(id,1));remove.addEventListener('click',()=>changeQty(id,-99));
      qty.append(minus,count,plus,remove);details.append(name,price,qty);row.append(pic,details);el.append(row);
    }
  }
  function changeQty(id,diff){const action=document.activeElement?.dataset.action;const next=Math.min(99,(cart[id]||0)+diff);if(next<=0)delete cart[id];else cart[id]=next;saveCart();renderCart();const row=Array.from($('cartItems').children).find(el=>el.dataset.id===id);const focus=row?.querySelector(`[data-action="${action}"]`);if(focus&&!focus.disabled)focus.focus();else ($('cartItems').querySelector('button:not(:disabled)')||$('closeCart')).focus()}
  function orderMessage(){return PRIMAL_PEDIDO.message(items,cart,lang)}
  async function copyOrder(){if(!getCount())return;const summary=orderMessage();$('copyPanel').hidden=false;const field=$('orderSummary');field.value=summary;field.focus();field.select();try{await navigator.clipboard.writeText(summary);toast(t().copied)}catch{toast(t().copyError)}}
  let previousFocus;
  function openDrawer(){previousFocus=document.activeElement;$('drawer').inert=false;$('drawer').classList.add('open');$('drawer').setAttribute('aria-hidden','false');$('openCart').setAttribute('aria-expanded','true');$('overlay').hidden=false;document.body.classList.add('locked');document.querySelectorAll('header,main,footer,#mobileCart,.skip').forEach(el=>el.inert=true);$('closeCart').focus()}
  function closeDrawer(){ $('drawer').classList.remove('open');$('drawer').setAttribute('aria-hidden','true');$('drawer').inert=true;$('openCart').setAttribute('aria-expanded','false');$('overlay').hidden=true;document.body.classList.remove('locked');document.querySelectorAll('header,main,footer,#mobileCart,.skip').forEach(el=>el.inert=false);(previousFocus&&!previousFocus.hidden?previousFocus:$('openCart')).focus() }
  $('drawer').addEventListener('keydown',ev=>{if(ev.key!=='Tab')return;const nodes=Array.from($('drawer').querySelectorAll('button:not(:disabled),a[href],input,textarea')).filter(el=>el.getClientRects().length);const first=nodes[0],last=nodes[nodes.length-1];if(ev.shiftKey&&document.activeElement===first){ev.preventDefault();last.focus()}else if(!ev.shiftKey&&document.activeElement===last){ev.preventDefault();first.focus()}});
  $('mobileCart').addEventListener('click',openDrawer);
  $('filters').addEventListener('click',ev=>{const btn=ev.target.closest('[data-cat]');if(!btn)return;category=btn.dataset.cat;document.querySelectorAll('.filter').forEach(el=>{el.classList.toggle('active',el===btn);el.setAttribute('aria-pressed',String(el===btn))});renderProducts()});
  $('search').addEventListener('input',renderProducts);
  $('langBtn').addEventListener('click',()=>{lang=lang==='es'?'en':'es';try{localStorage.setItem('primal-store-lang',lang)}catch{}applyLanguage()});
  $('openCart').addEventListener('click',openDrawer);$('closeCart').addEventListener('click',closeDrawer);$('overlay').addEventListener('click',closeDrawer);
  document.addEventListener('keydown',ev=>{if(ev.key==='Escape' && $('drawer').classList.contains('open'))closeDrawer()});
  $('checkout').addEventListener('click',ev=>{if(!$('checkout').hasAttribute('href'))ev.preventDefault()});
  $('copyOrder').addEventListener('click',copyOrder);
  $('downloadOrder').addEventListener('click',()=>{if(!getCount())return;const blob=new Blob([orderMessage()],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='PRIMAL-pedido.txt';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000)});
  $('clearCart').addEventListener('click',()=>{if(getCount() && window.confirm(t().clearConfirm)){cart={};saveCart();renderCart();$('closeCart').focus()}});
  applyLanguage();
})();
