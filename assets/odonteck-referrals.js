(function () {
  'use strict';
  var REF_KEY = 'odonteck_referral_code';
  var incoming = new URLSearchParams(location.search).get('ref');
  var validIncoming = !!(incoming && /^ODO-[A-F0-9]{10}$/i.test(incoming.trim()));
  if (validIncoming) localStorage.setItem(REF_KEY, incoming.trim().toUpperCase());

  function addStyles() {
    if (document.getElementById('odt-ref-styles')) return;
    var style = document.createElement('style'); style.id = 'odt-ref-styles';
    style.textContent = `.ref-wrap{padding:4px 0}.ref-head{margin-bottom:22px}.ref-head small{font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:var(--primary);font-weight:800}.ref-head h1{font-size:30px;margin:7px 0;color:var(--text)}.ref-head p{color:var(--text-2);font-size:13px;line-height:1.6;max-width:720px}.ref-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(260px,.75fr);gap:18px}.ref-card{background:var(--surface);border:1px solid var(--border-2);border-radius:18px;padding:22px;box-shadow:var(--shadow-sm)}.ref-card h3{margin:0 0 6px;color:var(--text);font-size:17px}.ref-muted{font-size:12px;line-height:1.6;color:var(--text-2)}.ref-code{font-family:monospace;font-size:22px;font-weight:800;letter-spacing:1px;color:var(--primary);margin:16px 0 4px}.ref-link{display:flex;gap:8px;margin:16px 0}.ref-link input{flex:1;min-width:0;border:1px solid var(--border-2);border-radius:10px;padding:11px;background:var(--surface-2);color:var(--text)}.ref-progress{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:18px 0 9px}.ref-step{height:11px;border-radius:99px;background:var(--surface-3);border:1px solid var(--border)}.ref-step.is-done{background:linear-gradient(90deg,var(--primary),#4FA39B);border-color:transparent}.ref-kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-top:16px}.ref-kpi{padding:13px;border-radius:13px;background:var(--surface-2);border:1px solid var(--border);text-align:center}.ref-kpi b{display:block;font-size:20px;color:var(--text)}.ref-kpi span{font-size:9px;text-transform:uppercase;letter-spacing:.5px;color:var(--text-3)}.ref-rule{display:flex;gap:10px;padding:11px 0;border-bottom:1px solid var(--border);font-size:12px;line-height:1.5;color:var(--text-2)}.ref-rule:last-child{border:0}.ref-rule b{color:var(--text)}.ref-list{display:grid;gap:8px;margin-top:12px}.ref-person{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:10px;border:1px solid var(--border);border-radius:11px;background:var(--surface-2);font-size:11px}.ref-person strong{color:var(--text)}.ref-person>span{color:var(--success);font-weight:800}.ref-note{margin:12px 0;padding:11px;border-radius:11px;background:color-mix(in srgb,var(--primary) 12%,var(--surface));border:1px solid color-mix(in srgb,var(--primary) 35%,transparent);color:var(--text);font-size:12px;font-weight:700}@media(max-width:820px){.ref-grid{grid-template-columns:1fr}.ref-kpis{grid-template-columns:1fr 1fr}.ref-link{flex-wrap:wrap}.ref-link input{flex-basis:100%}}`;
    document.head.appendChild(style);
  }
  function safe(v){return String(v==null?'':v).replace(/[&<>'"]/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'})[c];});}
  function money(v){return '$'+Number(v||0).toLocaleString('es-MX',{maximumFractionDigits:2});}
  function authNote(){
    var pane=document.getElementById('pane-register'); if(!validIncoming||!pane||pane.querySelector('.ref-note'))return;
    addStyles(); var note=document.createElement('div'); note.className='ref-note';
    note.textContent='✓ Invitación OdonTeck aplicada. Si activas un plan, ayudarás a quien te invitó a conseguir su recompensa.';
    pane.insertBefore(note,pane.firstChild);
  }
  authNote();
  if(typeof Sections==='undefined'||!Sections.renderers)return;
  addStyles();

  async function fetchMe(){
    var user=window.__auth&&window.__auth.currentUser;if(!user)throw new Error('Inicia sesión para ver tus referidos.');
    var token=await user.getIdToken();var response=await fetch((window.WEBHOOK_URL||'https://odonteck-production.up.railway.app')+'/referrals/me',{headers:{Authorization:'Bearer '+token}});
    var data=await response.json().catch(function(){return{};});if(!response.ok)throw new Error(data.error||('HTTP '+response.status));return data;
  }
  Sections.renderers.referidos=async function(container){
    container.innerHTML='<div class="ref-wrap"><div class="ref-head"><small>Invita y gana</small><h1>Programa de referidos</h1><p>Cada 3 personas diferentes que se registren desde tu enlace y paguen un plan te dan crédito equivalente a una mensualidad.</p></div><div class="ref-card">Cargando tu progreso…</div></div>';
    try{
      var d=await fetchMe(),done=Number(d.progress||0),recent=Array.isArray(d.recent)?d.recent:[];
      container.innerHTML=`<div class="ref-wrap"><div class="ref-head"><small>Invita y gana</small><h1>Programa de referidos</h1><p>Comparte tu enlace. Solo cuentan primeras compras confirmadas por Stripe.</p></div><div class="ref-grid"><section class="ref-card"><h3>Tu enlace personal</h3><div class="ref-muted">La invitación se conserva al abrir el enlace y se valida en el servidor cuando la persona compra.</div><div class="ref-code">${safe(d.code)}</div><div class="ref-link"><input id="odt-ref-link" readonly value="${safe(d.link)}"><button class="btn btn--accent btn--sm" id="odt-ref-copy">Copiar</button><button class="btn btn--wa btn--sm" id="odt-ref-wa">WhatsApp</button></div><h3 style="margin-top:21px">Siguiente recompensa</h3><div class="ref-progress">${[0,1,2].map(function(i){return'<div class="ref-step '+(i<done?'is-done':'')+'"></div>';}).join('')}</div><div class="ref-muted"><b style="color:var(--text)">${done} de 3</b> en este bloque · ${Number(d.qualifiedPurchases||0)} compras históricas.</div><div class="ref-kpis"><div class="ref-kpi"><b>${Number(d.qualifiedPurchases||0)}</b><span>Compras válidas</span></div><div class="ref-kpi"><b>${Number(d.rewardsEarned||0)}</b><span>Recompensas</span></div><div class="ref-kpi"><b>${money(d.totalCredit)}</b><span>Crédito aplicado</span></div></div>${Number(d.pendingRewards||0)?'<div class="ref-note">Tienes '+Number(d.pendingRewards)+' recompensa pendiente de aplicar en Stripe.</div>':''}</section><aside class="ref-card"><h3>Cómo funciona</h3><div class="ref-rule"><b>1</b><div>Comparte tu enlace personal.</div></div><div class="ref-rule"><b>2</b><div>La persona debe registrarse y <b>pagar</b> un plan.</div></div><div class="ref-rule"><b>3</b><div>Cada 3 compras únicas genera crédito por el precio mensual vigente.</div></div><div class="ref-rule"><b>4</b><div>En mensual reduce la próxima mensualidad; en anual reduce el próximo cobro anual por ese importe.</div></div><h3 style="margin-top:18px">Confirmados</h3><div class="ref-list">${recent.length?recent.map(function(r){return'<div class="ref-person"><div><strong>'+safe(r.email)+'</strong><div class="ref-muted">Plan '+safe(r.plan||'VIP')+'</div></div><span>Pagado</span></div>';}).join(''):'<div class="ref-muted">Aún no tienes compras referidas confirmadas.</div>'}</div></aside></div></div>`;
      document.getElementById('odt-ref-copy').onclick=async function(){await navigator.clipboard.writeText(d.link);if(window.Toast)Toast.success('Enlace copiado','Ya puedes compartirlo.');};
      document.getElementById('odt-ref-wa').onclick=function(){window.open('https://wa.me/?text='+encodeURIComponent('Te invito a OdonTeck VIP. Regístrate desde mi enlace: '+d.link),'_blank','noopener');};
    }catch(err){container.innerHTML='<div class="ref-wrap"><div class="ref-head"><h1>Referidos</h1></div><div class="ref-card"><h3>No pudimos cargar tus referidos</h3><div class="ref-muted">'+safe(err.message)+'</div></div></div>';}
  };
})();
