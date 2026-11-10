// Hamburger menu for the header on phones. The header markup comes from the
// Claude Design runtime, which can re-render it, so the toggle is re-attached
// whenever it goes missing.
(function () {
  var MENU_ID = 'site-menu';

  function setOpen(nav, open) {
    var btn = nav.querySelector('[data-nav-toggle]');
    if (open) nav.setAttribute('data-menu-open', '');
    else nav.removeAttribute('data-menu-open');
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
  }

  function attach() {
    var nav = document.querySelector('[data-nav]');
    if (!nav) return;
    var row = nav.firstElementChild;
    var menu = row && row.querySelector(':scope > div');
    if (!menu || row.querySelector(':scope > [data-nav-toggle]')) return;

    menu.id = MENU_ID;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-nav-toggle', '');
    btn.setAttribute('aria-controls', MENU_ID);
    btn.innerHTML = '<span></span><span></span><span></span>';
    row.insertBefore(btn, menu);
    setOpen(nav, false);

    btn.addEventListener('click', function () {
      setOpen(nav, !nav.hasAttribute('data-menu-open'));
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a, button')) setOpen(nav, false);
    });
  }

  document.addEventListener('keydown', function (e) {
    var nav = document.querySelector('[data-nav][data-menu-open]');
    if (e.key === 'Escape' && nav) {
      setOpen(nav, false);
      var btn = nav.querySelector('[data-nav-toggle]');
      if (btn) btn.focus();
    }
  });
  document.addEventListener('click', function (e) {
    var nav = document.querySelector('[data-nav][data-menu-open]');
    if (nav && !nav.contains(e.target)) setOpen(nav, false);
  });

  new MutationObserver(attach).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', attach);
  else attach();
})();
