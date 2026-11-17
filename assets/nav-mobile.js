/* 모바일 메뉴 보조 (2026-11-17 초안) — 상단 메뉴가 숨겨지는 쪽에서만 «메뉴» 단추를 띄움.
   상담 폼·방문 추적·다른 스크립트는 건드리지 않음. */
(function () {
  if (window.__nwMobileNav) return; window.__nwMobileNav = true;
  var LINKS = [
    ['index.html', 'Store'], ['home-classic.html', 'Home'], ['about.html', '회사소개'],
    ['lineup.html', '제품라인업'], ['support.html#store', '구매스토어'], ['store-3d.html', '3D 매장보기']
  ];
  var css = '' +
    '.nwm-btn{position:fixed;left:16px;bottom:16px;z-index:2147483000;display:none;align-items:center;gap:6px;padding:11px 16px;border:0;border-radius:999px;background:#0032a0;color:#fff;font:700 14px/1 "Noto Sans KR","Malgun Gothic",sans-serif;box-shadow:0 8px 24px rgba(0,50,160,.35);cursor:pointer}' +
    '.nwm-btn:focus-visible{outline:3px solid #66b2ff;outline-offset:2px}' +
    '.nwm-panel{position:fixed;left:12px;right:12px;bottom:72px;z-index:2147483001;display:none;background:#fff;border-radius:20px;box-shadow:0 20px 50px rgba(11,26,58,.25);padding:10px}' +
    '.nwm-panel.open{display:block}' +
    '.nwm-panel a{display:block;padding:14px 16px;border-radius:12px;color:#0b1a3a;font:600 16px/1.2 "Noto Sans KR","Malgun Gothic",sans-serif;text-decoration:none}' +
    '.nwm-panel a:hover,.nwm-panel a.on{background:#eef3fb;color:#0032a0}' +
    '.nwm-panel a.tel{margin-top:6px;background:#0032a0;color:#fff;text-align:center}';
  function here(href) {
    var p = location.pathname.split('/').pop() || 'index.html';
    return href.split('#')[0] === p;
  }
  function build() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'nwm-btn'; btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'nwmPanel'); btn.innerHTML = '<span aria-hidden="true">☰</span> 메뉴';
    var panel = document.createElement('nav');
    panel.className = 'nwm-panel'; panel.id = 'nwmPanel'; panel.setAttribute('aria-label', '모바일 메뉴');
    LINKS.forEach(function (l) {
      var a = document.createElement('a'); a.href = l[0]; a.textContent = l[1];
      if (here(l[0])) { a.className = 'on'; a.setAttribute('aria-current', 'page'); }
      panel.appendChild(a);
    });
    var tel = document.createElement('a'); tel.href = 'tel:1544-7754'; tel.className = 'tel'; tel.textContent = '📞 1544-7754 상담';
    panel.appendChild(tel);
    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('open'); btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
    document.body.appendChild(panel); document.body.appendChild(btn);
    function sync() {
      var top = document.querySelector('a[href="store-3d.html"]:not(.nwm-panel a)');
      var hidden = !top || top.offsetParent === null || top.getBoundingClientRect().width === 0;
      btn.style.display = hidden ? 'flex' : 'none';
      if (!hidden) { panel.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    }
    sync(); window.addEventListener('resize', sync);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build); else build();
})();
