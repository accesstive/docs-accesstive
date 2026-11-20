// Heading order (ClickUp 14zervz0n62).
// Mintlify marks the left menu group labels (h3) and "On this page" (h2) as
// headings, so screen readers meet them before the page title (h1).
// This keeps them looking the same but removes their heading role, so the
// page title is the first heading. Page content headings are not touched.
(function () {
  function apply() {
    var h1 = document.querySelector('#content-area h1, #header h1, main h1, h1');
    var hs = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (var i = 0; i < hs.length; i++) {
      var h = hs[i];
      if (h === h1) break; // only headings that come before the page title
      if (h.closest('[aria-hidden="true"]')) continue;
      var inMenu = h.closest('#sidebar, #sidebar-content, nav, aside, #table-of-contents, [id*="toc"]');
      if (inMenu && h.getAttribute('role') !== 'none') h.setAttribute('role', 'none');
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
