(function () {
  'use strict';
  if (typeof Pages === 'undefined') return;

  var style = document.createElement('style');
  style.textContent = '.odt-ref-admin{padding:2px 0}.odt-ref-admin__head{margin-bottom:22px}.odt-ref-admin__head small{font-size:10px;text-transform:uppercase;letter-spacing:1.2px;color:var(--primary);font-weight:800}.odt-ref-admin__head h1{font-size:30px;margin:7px 0;color:var(--text)}.odt-ref-admin__head p{color:var(--text-2);font-size:13px;line-height:1.6;max-width:760px}.odt-ref-admin__kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}.odt-ref-admin__kpi,.odt-ref-admin__panel{background:var(--surface);border:1px solid var(--border-2);border-radius:16px;box-shadow:var(--shadow-sm)}.odt-ref-admin__kpi{padding:18px}.odt-ref-admin__kpi span{display:block;font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);font-weight:800}.odt-ref-admin__kpi b{display:block;margin-top:8px;font-size:25px;color:var(--text)}.odt-ref-admin__panel{overflow:hidden;margin-top:16px}.odt-ref-admin__panel-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:17px 19px;border-bottom:1px solid var(--border)}.odt-ref-admin__panel-head h3{font-size:16px;margin:0;color:var(--text)}.odt-ref-admin__panel-head p{font-size:11px;color:var(--text-3);margin:4px 0 0}.odt-ref-admin__table-wrap{overflow:auto}.odt-ref-admin__table{width:100%;border-collapse:collapse;min-width:730px}.odt-ref-admin__table th,.odt-ref-admin__table td{padding:12px 14px;text-align:left;border-bottom:1px solid var(--border);font-size:12px;color:var(--text-2)}.odt-ref-admin__table th{font-size:10px;letter-spacing:.6px;text-transform:uppercase;color:var(--text-3);background:var(--surface-2)}.odt-ref-admin__table tr:last-child td{border-bottom:0}.odt-ref-admin__empty{text-align:center!important;color:var(--text-3)!important;padding:28px!important}.odt-ref-admin__status{display:inline-flex;padding:4px 8px;border-radius:99px;font-size:9px;font-weight:800}.odt-ref-admin__status--ok{background:rgba(16,185,129,.14);color:#059669}.odt-ref-admin__status--pending{background:rgba(245,158,11,.14);color:#d97706}@media(max-width:900px){.odt-ref-admin__kpis{grid-template-columns:1fr 1fr}}@media(max-width:540px){.odt-ref-admin__kpis{grid-template-columns:1fr}}';
  document.head.appendChild(style);

  function safe(value) {
    return String(value == null ? '' : value).replace(/[&<>'"]/g, function (c) {
      return ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[c];
    });
  }
  function money(value) {
    return '$' + Number(value || 0).toLocaleString('es-MX', { maximumFractionDigits: 2 });
  }
  function statusLabel(status) {
    return status === 'applied'
      ? '<span class="odt-ref-admin__status odt-ref-admin__status--ok">APLICADO</span>'
      : '<span class="odt-ref-admin__status odt-ref-admin__status--pending">PENDIENTE</span>';
  }

  async function loadData() {
    var token = await Pages._getAuthToken();
    var response = await fetch(Pages._webhookUrl + '/admin/referrals', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    var data = await response.json().catch(function () { return {}; });
    if (!response.ok) throw new Error(data.error || ('HTTP ' + response.status));
    return data;
  }

  Pages.referidos = function (page) {
    page.innerHTML = '<div class="odt-ref-admin"><div class="odt-ref-admin__head"><small>Programa de crecimiento</small><h1>Referidos</h1><p>Auditoría de compras atribuidas y créditos de membresía.</p></div><div class="odt-ref-admin__panel"><div class="odt-ref-admin__empty">Cargando referidos…</div></div></div>';
    loadData().then(function (data) {
      var totals = data.totals || {};
      var rows = Array.isArray(data.stats) ? data.stats : [];
      var rewards = Array.isArray(data.rewards) ? data.rewards : [];
      var pending = rewards.filter(function (r) { return r.status !== 'applied'; }).length;
      page.innerHTML = `<div class="odt-ref-admin">
        <div class="odt-ref-admin__head"><small>Programa de crecimiento</small><h1>Referidos</h1><p>Solo cuentan personas únicas después de que Stripe confirma su primera compra pagada.</p></div>
        <div class="odt-ref-admin__kpis">
          <div class="odt-ref-admin__kpi"><span>Participantes</span><b>${Number(totals.participants || 0)}</b></div>
          <div class="odt-ref-admin__kpi"><span>Compras referidas</span><b>${Number(totals.qualifiedPurchases || 0)}</b></div>
          <div class="odt-ref-admin__kpi"><span>Premios aplicados</span><b>${Number(totals.rewardsApplied || 0)}</b></div>
          <div class="odt-ref-admin__kpi"><span>Crédito total</span><b>${money(totals.totalCredit)}</b><small>${pending} pendiente(s)</small></div>
        </div>
        <section class="odt-ref-admin__panel">
          <div class="odt-ref-admin__panel-head"><div><h3>Avance por miembro</h3><p>Cada bloque de 3 primeras compras pagadas genera una recompensa.</p></div><button class="btn btn--outline btn--sm" id="odt-ref-admin-refresh">Actualizar</button></div>
          <div class="odt-ref-admin__table-wrap"><table class="odt-ref-admin__table"><thead><tr><th>Miembro</th><th>Código</th><th>Compras</th><th>Avance</th><th>Premios</th><th>Crédito</th></tr></thead><tbody>
            ${rows.length ? rows.map(function (r) { return '<tr><td><b>'+safe(r.name || 'Miembro')+'</b><br><small>'+safe(r.email)+'</small></td><td><code>'+safe(r.code)+'</code></td><td>'+Number(r.qualifiedPurchases || 0)+'</td><td>'+Number(r.qualifiedPurchases || 0)%3+' / 3</td><td>'+Number(r.rewardsApplied || 0)+' / '+Number(r.rewardsEarned || 0)+'</td><td>'+money(r.totalCredit)+'</td></tr>'; }).join('') : '<tr><td colspan="6" class="odt-ref-admin__empty">Todavía no hay participantes.</td></tr>'}
          </tbody></table></div>
        </section>
        <section class="odt-ref-admin__panel">
          <div class="odt-ref-admin__panel-head"><div><h3>Recompensas</h3><p>Las pendientes se aplicarán cuando exista un cliente Stripe válido.</p></div></div>
          <div class="odt-ref-admin__table-wrap"><table class="odt-ref-admin__table"><thead><tr><th>ID</th><th>Miembro</th><th>Importe</th><th>Estado</th><th>Detalle</th></tr></thead><tbody>
            ${rewards.length ? rewards.map(function (r) { return '<tr><td><code>'+safe(r.id)+'</code></td><td><code>'+safe(r.referrerUid).slice(0,12)+'…</code></td><td>'+money(r.amount)+'</td><td>'+statusLabel(r.status)+'</td><td><small>'+safe(r.lastError || '—')+'</small></td></tr>'; }).join('') : '<tr><td colspan="5" class="odt-ref-admin__empty">Aún no se han generado recompensas.</td></tr>'}
          </tbody></table></div>
        </section>
      </div>`;
      document.getElementById('odt-ref-admin-refresh').addEventListener('click', function () { Pages.referidos(page); });
    }).catch(function (err) {
      page.innerHTML = '<div class="odt-ref-admin"><div class="odt-ref-admin__head"><h1>Referidos</h1></div><div class="odt-ref-admin__panel"><div class="odt-ref-admin__empty"><b>No pudimos cargar los referidos</b><br>'+safe(err.message)+'</div></div></div>';
    });
  };
})();
