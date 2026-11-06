(()=>{'use strict';const n=PRIMAL_NEGOCIO;
document.querySelectorAll('[data-business]').forEach(el=>el.textContent=String(n[el.dataset.business]||'').trim()||'Pendiente de completar antes de vender');
const e=document.getElementById('businessEmail');if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n.email)){const a=document.createElement('a');a.href='mailto:'+n.email;a.textContent=n.email;e.append(a)}else e.textContent='Pendiente de completar antes de vender';
const phone=String(PRIMAL_CONFIG.whatsapp||'').replace(/[\s()+-]/g,'');const valid=/^[1-9]\d{7,14}$/.test(phone);if(valid){const a=document.getElementById('contactWA');a.href='https://wa.me/'+phone;a.hidden=false;}
document.getElementById('printLegal').addEventListener('click',()=>window.print());})();
