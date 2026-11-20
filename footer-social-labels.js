// Accessible names for the footer social icons (ClickUp 14zervz0n63).
// Mintlify renders the icons with screen-reader text like "x" or "website";
// this replaces it with a clear name that also says the link opens a new tab.
(function () {
  var LABELS = [
    [/^https?:\/\/(www\.)?accesstive\.com\/?$/i, 'Accesstive website'],
    [/^https?:\/\/(www\.)?(x|twitter)\.com\//i, 'Accesstive on X'],
    [/^https?:\/\/(www\.)?linkedin\.com\//i, 'Accesstive on LinkedIn'],
    [/^https?:\/\/(www\.)?youtube\.com\//i, 'Accesstive on YouTube']
  ];
  function apply() {
    var links = document.querySelectorAll('footer a[href]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (!a.querySelector('svg')) continue; // icon links only
      for (var j = 0; j < LABELS.length; j++) {
        if (LABELS[j][0].test(a.href)) {
          var name = LABELS[j][1] + (a.target === '_blank' ? ' (opens in a new tab)' : '');
          var sr = a.querySelector('.sr-only');
          if (sr && sr.textContent !== name) sr.textContent = name;
          if (a.getAttribute('aria-label') !== name) a.setAttribute('aria-label', name);
          break;
        }
      }
    }
  }
  function start() {
    apply();
    new MutationObserver(apply).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
