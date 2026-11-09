// Лёгкая оживляющая прослойка для статической демо-копии: меню на телефоне и формы в демо-режиме.
(function () {
  'use strict';
  var hdr = document.querySelector('header');
  if (hdr) {
    var btn = hdr.querySelector('button[aria-label="Открыть меню"]');
    var nav0 = hdr.querySelector('nav[aria-label]'); var links = nav0 ? nav0.querySelectorAll('a') : [];
    if (btn && links.length) {
      var panel = document.createElement('nav');
      panel.className = 'demo-mnav';
      panel.setAttribute('aria-label', 'Меню');
      links.forEach(function (a) { var c = a.cloneNode(true); c.className = ''; panel.appendChild(c); });
      hdr.parentNode.insertBefore(panel, hdr.nextSibling);
      btn.addEventListener('click', function () {
        var open = panel.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }
    // «Вид и доступность» в копии не работает
    hdr.querySelectorAll('button[aria-expanded]').forEach(function (b) {
      if (/Вид/.test(b.textContent)) { var p = b.parentNode; if (p) p.style.display = 'none'; }
    });
  }
  document.querySelectorAll('form').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var box = document.createElement('div');
      box.className = 'demo-ok';
      box.setAttribute('role', 'status');
      if (f.hasAttribute('data-demo-search')) {
        box.innerHTML = '<b>Поиск в демо-копии отключён</b><small>На настоящем сайте здесь список найденных страниц.</small>';
      } else {
        box.innerHTML = '<b>Заявка отправлена</b>Администратор перезвонит в течение 15 минут.<small>Демо-режим: данные никуда не передаются.</small>';
      }
      f.replaceWith(box);
      box.scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  });
  // кнопки без ссылки: понятное поведение вместо тишины
  document.querySelectorAll('a[href="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) { e.preventDefault(); });
  });
})();
