/* El mismo resumen se usa en WhatsApp, copia y descarga. Sin conexiones externas. */
(function(root){'use strict';
const money=n=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(n);
function lines(products,cart){return products.filter(p=>p.visible!==false&&p.habilitado!==false&&Number.isFinite(p.precio)&&p.precio>0&&Number.isInteger(cart[p.id])&&cart[p.id]>0).map(p=>({product:p,quantity:Math.min(cart[p.id],99)}));}
function message(products,cart,lang='es'){
 const en=lang==='en',rows=lines(products,cart);if(!rows.length)return '';
 const tr=(p,k)=>en&&p[k+'En']?p[k+'En']:p[k];
 const parts=[en?'Hello, I would like to order from PRIMAL Store:':'Hola, quiero comprar estos productos en PRIMAL Store:',''];
 let total=0;
 rows.forEach(({product:p,quantity:q},i)=>{total+=p.precio*q;parts.push(`${i+1}. ${tr(p,'nombre')}`,`${tr(p,'presentacion')||''}`,`${en?'Quantity':'Cantidad'}: ${q} | ${en?'Unit price':'Precio unitario'}: ${money(p.precio)}`,`${en?'Line total':'Total del producto'}: ${money(p.precio*q)}`,'');});
 parts.push(`${en?'Product subtotal':'Subtotal de productos'}: ${money(total)} COP`,en?'Shipping is not included. Please confirm availability, shipping cost, final total, delivery date and payment method before I accept the purchase.':'Envío no incluido. Quiero confirmar disponibilidad, costo de envío, total final, fecha de entrega y forma de pago antes de aceptar la compra.','',en?'This is a request, not a payment or purchase confirmation.':'Esta es una solicitud, no un pago ni una confirmación de compra.','https://primalproducts.com.co/Store/','Condiciones / Terms: https://primalproducts.com.co/Store/legal.html');
 return parts.join('\n');
}
function phone(value){const p=String(value||'').replace(/[\s()+-]/g,'');return /^[1-9]\d{7,14}$/.test(p)?p:'';}
function url(number,products,cart,lang){const p=phone(number),text=message(products,cart,lang);return p&&text?'https://wa.me/'+p+'?text='+encodeURIComponent(text):'';}
const api=Object.freeze({lines,message,phone,url});root.PRIMAL_PEDIDO=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
