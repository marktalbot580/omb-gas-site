/* the same sums the app does: kW = m3 x CV (MJ/m3) x 1000 / seconds ; net = gross / 1.11 */
(function () {
  const $ = id => document.getElementById(id);
  const num = v => { const n = parseFloat(String(v).trim().replace(',', '.')); return Number.isFinite(n) ? n : null; };
  const secs = v => {
    const s = String(v).trim().replace(',', '.'); if (!s) return null;
    const m = s.match(/^(\d+):(\d{1,2}(?:\.\d+)?)$/); if (m) return +m[1] * 60 + +m[2];
    return num(s);
  };
  function go() {
    const a = num($('c-a').value), b = num($('c-b').value), t = secs($('c-t').value), cv = num($('c-cv').value);
    const v = a !== null && b !== null ? b - a : null;
    const ok = v > 0 && t > 0 && cv > 0;
    const set = (id, val, d) => { $(id).textContent = val === null ? '–' : val.toFixed(d); };
    if (!ok) { set('r-rate', null); set('r-gross', null); set('r-net', null); $('c-msg').textContent = v !== null && v <= 0 ? 'The second reading must be higher than the first.' : ''; return; }
    $('c-msg').textContent = '';
    const gross = v * cv * 1000 / t;
    set('r-rate', v * 3600 / t, 3); set('r-gross', gross, 1); set('r-net', gross / 1.11, 1);
  }
  ['c-a', 'c-b', 'c-t', 'c-cv'].forEach(id => $(id).addEventListener('input', go));
  go();
})();
