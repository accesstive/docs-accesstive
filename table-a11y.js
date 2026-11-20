// Table accessibility for docs pages (ClickUp 14zervz0n66).
// Keeps the Markdown tables and their look, and adds for screen readers:
// - scope="col" on column headers
// - a row header role on the first cell of each body row
// - a visually hidden caption taken from the nearest heading above the table
// - a hidden name for an empty top-left header cell
(function () {
  var HIDDEN = 'position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0;';
  function headingFor(table) {
    var hs = document.querySelectorAll('h1, h2, h3, h4');
    var found = null;
    for (var i = 0; i < hs.length; i++) {
      if (hs[i].compareDocumentPosition(table) & Node.DOCUMENT_POSITION_FOLLOWING) found = hs[i];
      else break;
    }
    if (!found) return '';
    return (found.textContent || '').replace(/\s+/g, ' ').replace(/[#\u200b]/g, '').trim();
  }
  function apply() {
    var tables = document.querySelectorAll('main table, article table');
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      var ths = t.querySelectorAll('thead th');
      for (var j = 0; j < ths.length; j++) {
        if (ths[j].getAttribute('scope') !== 'col') ths[j].setAttribute('scope', 'col');
      }
      if (ths.length && !ths[0].textContent.trim() && !ths[0].querySelector('[data-a11y-hidden]')) {
        var s = document.createElement('span');
        s.setAttribute('data-a11y-hidden', '');
        s.style.cssText = HIDDEN;
        s.textContent = 'Feature';
        ths[0].appendChild(s);
      }
      if (ths.length > 1) {
        var rows = t.querySelectorAll('tbody tr');
        for (var k = 0; k < rows.length; k++) {
          var c = rows[k].firstElementChild;
          if (!c) continue;
          if (c.tagName === 'TH') { if (c.getAttribute('scope') !== 'row') c.setAttribute('scope', 'row'); }
          else if (c.getAttribute('role') !== 'rowheader') c.setAttribute('role', 'rowheader');
        }
      }
      var text = t.getAttribute('data-caption') || headingFor(t);
      if (text) {
        var cap = t.querySelector('caption');
        if (!cap) {
          cap = document.createElement('caption');
          cap.style.cssText = HIDDEN;
          t.insertBefore(cap, t.firstChild);
        }
        if (cap.textContent !== text) cap.textContent = text;
      }
    }
  }
  var queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    (window.requestAnimationFrame || setTimeout)(function () { queued = false; apply(); });
  }
  function start() {
    apply();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
