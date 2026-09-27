(function(){
  "use strict";

  /* ---------------------------------------------------------
     Footer year
     --------------------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Mobile nav toggle
     --------------------------------------------------------- */
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------------------------------------------------------
     Scroll‑spy: highlight active nav link
     --------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    navLinks.forEach(function (a) {
      byId[a.getAttribute('href').replace('#', '')] = a;
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------------------------------------------------------
     Hero "editor" type‑in animation — one orchestrated moment
     --------------------------------------------------------- */
  var editorBody = document.getElementById('editorBody');
  if (editorBody) {
    var lines = [
      { html: '<span class="tag">&lt;section</span> <span class="attr">class</span>=<span class="str">"studio"</span><span class="tag">&gt;</span>' },
      { html: '&nbsp;&nbsp;<span class="com">// Ahad — strategy &amp; delivery</span>' },
      { html: '&nbsp;&nbsp;<span class="tag">&lt;h1&gt;</span>Dual Code Studios<span class="tag">&lt;/h1&gt;</span>' },
      { html: '&nbsp;&nbsp;<span class="com">// Anmol — design &amp; build</span>' },
      { html: '&nbsp;&nbsp;<span class="tag">&lt;p&gt;</span>Built by two, shipped as one.<span class="tag">&lt;/p&gt;</span>' },
      { html: '&nbsp;&nbsp;<span class="tag">&lt;Button</span> <span class="attr">href</span>=<span class="str">"#contact"</span><span class="tag">&gt;</span>' },
      { html: '&nbsp;&nbsp;&nbsp;&nbsp;Start a project' },
      { html: '&nbsp;&nbsp;<span class="tag">&lt;/Button&gt;</span>' },
      { html: '<span class="tag">&lt;/section&gt;</span>' }
    ];

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      editorBody.innerHTML = lines.map(function (l, i) {
        return '<div><span class="ln">' + (i + 1) + '</span>' + l.html + '</div>';
      }).join('');
    } else {
      var li = 0;
      function typeNextLine() {
        if (li >= lines.length) {
          var cursor = document.createElement('span');
          cursor.className = 'cursor cursor-b';
          editorBody.lastChild.appendChild(cursor);
          return;
        }
        var row = document.createElement('div');
        var num = document.createElement('span');
        num.className = 'ln';
        num.textContent = li + 1;
        row.appendChild(num);

        var content = document.createElement('span');
        row.appendChild(content);

        var cursor = document.createElement('span');
        cursor.className = 'cursor' + (li % 2 ? ' cursor-b' : '');
        row.appendChild(cursor);

        editorBody.appendChild(row);

        // fill instantly per-line (typing the DOM char-by-char with raw HTML is unsafe;
        // instead reveal each line with a tiny stagger for a typed feel)
        content.innerHTML = lines[li].html;
        cursor.remove();

        li++;
        setTimeout(typeNextLine, 180);
      }
      typeNextLine();
    }
  }

  /* ---------------------------------------------------------
     Inquiry form submission (Formspree‑ready, graceful fallback)
     --------------------------------------------------------- */
  var form = document.getElementById('inquiryForm');
  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var action = form.getAttribute('action') || '';
      var notConfigured = action.indexOf('YOUR_FORM_ID') !== -1;

      status.classList.remove('is-visible', 'ok', 'err');

      if (notConfigured) {
        // No Formspree endpoint set yet — tell the visitor plainly and
        // offer the mailto fallback instead of failing silently.
        status.textContent = "This form isn't fully wired up yet — please email hello@dualcodestudios.com directly for now.";
        status.classList.add('is-visible', 'err');
        return;
      }

      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          status.textContent = "Thanks — that's in our inbox. We'll reply within about 48 hours.";
          status.classList.add('is-visible', 'ok');
        } else {
          status.textContent = 'Something went wrong sending that. Please email hello@dualcodestudios.com instead.';
          status.classList.add('is-visible', 'err');
        }
      }).catch(function () {
        status.textContent = 'Something went wrong sending that. Please email hello@dualcodestudios.com instead.';
        status.classList.add('is-visible', 'err');
      }).finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      });
    });
  }

})();
