/* =========================================================
   Meln — Portfólio
   Sem dependências. Tudo degrada bem se algo falhar.
   ========================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Header: estado ao rolar ---------- */
  var header = document.getElementById('site-header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-stuck', window.scrollY > 12);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. Menu mobile ---------- */
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    if (!header || !toggle) return;
    header.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  }

  function openMenu() {
    if (!header || !toggle) return;
    header.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  }

  if (toggle && nav && header) {
    toggle.addEventListener('click', function () {
      if (header.classList.contains('is-open')) closeMenu();
      else openMenu();
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && header.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  /* ---------- 3. Animação de entrada ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(revealables, function (el, index) {
      el.style.transitionDelay = Math.min(index % 4, 3) * 70 + 'ms';
      revealObserver.observe(el);
    });
  }

  /* ---------- 4. Link ativo conforme a secção ---------- */
  var navLinks = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && navLinks.length) {
    var linkMap = {};
    Array.prototype.forEach.call(navLinks, function (link) {
      var id = link.getAttribute('href');
      if (id && id.charAt(0) === '#') linkMap[id.slice(1)] = link;
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Array.prototype.forEach.call(navLinks, function (link) {
          link.classList.remove('is-active');
        });
        var active = linkMap[entry.target.id];
        if (active) active.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    Object.keys(linkMap).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- 5. Terminal do hero ---------- */
  var terminal = document.getElementById('terminal-body');

  var session = [
    { cmd: 'whoami', out: 'miguel "meln" — desenvolvedor' },
    { cmd: 'cat stack.txt', out: 'web · apps · jogos · linux' },
    { cmd: 'uname -o', out: 'arch linux · cachyos' },
    { cmd: 'status', out: '● disponível para novos projetos', ok: true }
  ];

  function makePrompt() {
    var span = document.createElement('span');
    span.className = 'terminal__prompt';
    span.textContent = 'meln@arch ~ $';
    return span;
  }

  function makeOutput(line) {
    var div = document.createElement('div');
    div.className = 'terminal__out' + (line.ok ? ' terminal__out--ok' : '');
    div.textContent = line.out;
    return div;
  }

  function renderTerminalInstantly() {
    if (!terminal) return;
    terminal.textContent = '';
    session.forEach(function (line) {
      var row = document.createElement('div');
      var cmd = document.createElement('span');
      cmd.className = 'terminal__cmd';
      cmd.textContent = ' ' + line.cmd;
      row.appendChild(makePrompt());
      row.appendChild(cmd);
      terminal.appendChild(row);
      terminal.appendChild(makeOutput(line));
    });
    var last = document.createElement('div');
    last.appendChild(makePrompt());
    var cursor = document.createElement('span');
    cursor.className = 'terminal__cursor';
    last.appendChild(document.createTextNode(' '));
    last.appendChild(cursor);
    terminal.appendChild(last);
  }

  function typeTerminal() {
    if (!terminal) return;
    terminal.textContent = '';

    var cursor = document.createElement('span');
    cursor.className = 'terminal__cursor';

    var index = 0;

    function nextLine() {
      if (index >= session.length) {
        var last = document.createElement('div');
        last.appendChild(makePrompt());
        last.appendChild(document.createTextNode(' '));
        last.appendChild(cursor);
        terminal.appendChild(last);
        return;
      }

      var line = session[index];
      var row = document.createElement('div');
      var cmd = document.createElement('span');
      cmd.className = 'terminal__cmd';
      row.appendChild(makePrompt());
      row.appendChild(cmd);
      row.appendChild(cursor);
      terminal.appendChild(row);

      var chars = 0;
      var timer = window.setInterval(function () {
        chars += 1;
        cmd.textContent = ' ' + line.cmd.slice(0, chars);
        if (chars >= line.cmd.length) {
          window.clearInterval(timer);
          window.setTimeout(function () {
            terminal.appendChild(makeOutput(line));
            index += 1;
            window.setTimeout(nextLine, 320);
          }, 260);
        }
      }, 42);
    }

    window.setTimeout(nextLine, 450);
  }

  if (terminal) {
    if (reduceMotion) renderTerminalInstantly();
    else typeTerminal();
  }

  /* ---------- 6. Copiar contactos ---------- */
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  function legacyCopy(text) {
    var field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();
    var done = false;
    try { done = document.execCommand('copy'); } catch (error) { done = false; }
    document.body.removeChild(field);
    return done;
  }

  function markCopied(button, ok) {
    var original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = ok ? 'Copiado' : 'Não deu para copiar';
    button.classList.toggle('is-copied', ok);
    window.setTimeout(function () {
      button.textContent = original;
      button.classList.remove('is-copied');
    }, 2000);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      if (!text) return;

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () {
          markCopied(button, true);
          showToast(text + ' copiado');
        }).catch(function () {
          var ok = legacyCopy(text);
          markCopied(button, ok);
          if (ok) showToast(text + ' copiado');
        });
      } else {
        var ok = legacyCopy(text);
        markCopied(button, ok);
        if (ok) showToast(text + ' copiado');
      }
    });
  });

  /* ---------- 7. Luz que segue o cursor ---------- */
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (finePointer) {
    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var at = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    var glowFrame = null;

    function placeGlow() {
      glow.style.transform = 'translate3d(' + at.x + 'px, ' + at.y + 'px, 0)';
    }

    function moveGlow(event) {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      at.x = event.clientX;
      at.y = event.clientY;
      glow.classList.add('is-on');

      /* a luz vai direta para o cursor; o requestAnimationFrame só evita
         escrever no estilo mais vezes do que o ecrã desenha */
      if (!glowFrame) {
        glowFrame = window.requestAnimationFrame(function () {
          glowFrame = null;
          placeGlow();
        });
      }
    }

    placeGlow();

    /* pointermove nos navegadores atuais, mousemove como rede de segurança */
    if (window.PointerEvent) {
      document.addEventListener('pointermove', moveGlow, { passive: true });
    } else {
      document.addEventListener('mousemove', moveGlow, { passive: true });
    }

    /* apaga quando o rato sai da janela ou o separador perde o foco */
    document.addEventListener('mouseleave', function () { glow.classList.remove('is-on'); });
    window.addEventListener('blur', function () { glow.classList.remove('is-on'); });
  }

  /* ---------- 8. Ano no rodapé ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
