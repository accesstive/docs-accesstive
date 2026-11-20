// Logo alt text (ClickUp 14zervz0n64).
// Mintlify renders a light and a dark logo with alt "light logo" / "dark logo".
// The visible logo gets alt "Accesstive Docs"; the hidden theme logo gets
// empty alt and aria-hidden so it is not read twice.
(function () {
  var ALT = 'Accesstive Docs';
  var LINK = 'Accesstive Docs home page';
  function isShown(el) {
    var s = window.getComputedStyle(el);
    return s.display !== 'none' && s.visibility !== 'hidden' && el.getClientRects().length > 0;
  }
  function set(el, name, value) {
    if (value === null) { if (el.hasAttribute(name)) el.removeAttribute(name); }
    else if (el.getAttribute(name) !== value) el.setAttribute(name, value);
  }
  function apply() {
    var imgs = document.querySelectorAll('img[src*="/logo/light"], img[src*="/logo/dark"]');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      if (isShown(img)) { set(img, 'alt', ALT); set(img, 'aria-hidden', null); }
      else { set(img, 'alt', ''); set(img, 'aria-hidden', 'true'); }
      var a = img.closest('a');
      if (a) set(a, 'aria-label', LINK);
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
    // Re-check when the light/dark theme changes.
    new MutationObserver(schedule).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', schedule);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
