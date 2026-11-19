(() => {
  const header = document.querySelector('.nw-head');
  if (!header) return;
  const toggle = header.querySelector('.nw-switch');
  const nav = header.querySelector('.nw-primary');
  const groups = Array.from(nav.querySelectorAll('.nw-more'));
  const summary = toggle.querySelector('summary');
  summary.setAttribute('aria-controls', nav.id);
  function closeGroups(except) {
    groups.forEach(group => { if (group !== except) group.open = false; });
  }
  function closeMenu() {
    toggle.open = false;
    closeGroups();
  }
  groups.forEach(group => group.addEventListener('toggle', () => {
    if (group.open) closeGroups(group);
  }));
  toggle.addEventListener('toggle', () => { if (!toggle.open) closeGroups(); });
  document.addEventListener('click', event => {
    if (!header.contains(event.target) || event.target.closest('a,button')) closeMenu();
  });
  document.addEventListener('focusin', event => { if (!header.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const openGroup = groups.find(group => group.open);
    if (openGroup) { openGroup.open = false; openGroup.querySelector('summary').focus(); }
    else if (toggle.open) { closeMenu(); summary.focus(); }
  });
  matchMedia('(max-width:1199px)').addEventListener('change', closeMenu);
  window.addEventListener('pageshow', event => { if (event.persisted) closeMenu(); });
})();
