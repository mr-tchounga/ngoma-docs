(function () {
  var KEY = 'ngoma-lang';

  function apply(lang) {
    var l = lang === 'en' ? 'en' : 'fr';
    document.documentElement.lang = l;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.dataset.lang !== l;
    });
    document.querySelectorAll('[data-set-lang]').forEach(function (btn) {
      var on = btn.dataset.setLang === l;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(KEY, l); } catch (_) {}
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-set-lang]');
    if (!btn) return;
    apply(btn.dataset.setLang);
    var url = new URL(location.href);
    url.searchParams.set('lang', btn.dataset.setLang === 'en' ? 'en' : 'fr');
    history.replaceState(null, '', url);
  });

  var params = new URLSearchParams(location.search);
  var fromUrl = params.get('lang');
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (_) {}
  var fromBrowser = (navigator.language || 'fr').toLowerCase().indexOf('en') === 0 ? 'en' : 'fr';
  apply(fromUrl || saved || fromBrowser);
})();
