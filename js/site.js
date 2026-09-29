/* ==========================================================================
   SHIVANSH WRITES  —  js/site.js
   --------------------------------------------------------------------------
   THE INTERACTION LAYER.

   Runs after render.js has built the pages. Every function checks that the
   element it needs exists, so this one file is safe to include everywhere.

   SECTIONS
     1.  Helpers (selectors, toast message, localStorage wrapper)
     2.  Dark mode preference          (localStorage)
     3.  Mobile navigation menu
     4.  Search overlay                (title, description, category, tags)
     5.  Category filter on the blog page
     6.  Like + bookmark counters      (localStorage)
     7.  Reading progress bar
     8.  Table-of-contents scroll spy
     9.  Newsletter + contact form validation
    10.  Fade-in on scroll
   ========================================================================== */
(function () {
  'use strict';

  var SW = window.SW;

  /* ======================================================================
     1. HELPERS
     ====================================================================== */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(sel));
  }

  var toastTimer;
  function toast(message) {
    var el = $('[data-toast]');
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2400);
  }

  /* Read or write an array in localStorage (never throws, even in private mode) */
  function readList(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch (e) { return []; }
  }
  function writeList(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  }
  function readValue(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ======================================================================
     2. DARK MODE
     The choice is stored under "sw-theme" and applied on every page load.
     ====================================================================== */
  function initTheme() {
    var html = document.documentElement;
    var saved = readValue('sw-theme');

    if (saved) {
      html.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.setAttribute('data-theme', 'dark');
    }

    $$('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        writeList('sw-theme', next);           /* stored as a JSON string */
        toast(next === 'dark' ? 'Dark mode on' : 'Light mode on');
      });
    });
  }

  /* ======================================================================
     3. MOBILE NAVIGATION
     ====================================================================== */
  function initNav() {
    var toggle = $('[data-nav-toggle]');
    var nav = $('#primary-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    $$('.nav__link', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ======================================================================
     4. SEARCH OVERLAY
     Searches article titles, descriptions, categories and tags by calling
     SW.render.search(), so there is only one search implementation.
     ====================================================================== */
  function initSearch() {
    var overlay = $('[data-search-overlay]');
    var input = $('[data-search-input]');
    var results = $('[data-search-results]');
    if (!overlay || !input || !results) return;

    var HINT = 'Start typing to search by title, description, category or tag.';

    function open() { overlay.classList.add('is-open'); input.focus(); input.select(); }
    function close() { overlay.classList.remove('is-open'); }

    $$('[data-search-open]').forEach(function (btn) { btn.addEventListener('click', open); });
    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    });

    function renderResults(list, query) {
      if (!query) {
        results.innerHTML = '<p class="muted" style="font-size:14px">' + HINT + '</p>';
        return;
      }
      if (!list.length) {
        results.innerHTML = '<p class="muted" style="font-size:14px">' +
                            'No articles found. Try searching for another topic.</p>';
        return;
      }
      results.innerHTML =
        '<p class="muted" style="font-size:13px;margin-bottom:10px">' + list.length +
        ' article' + (list.length === 1 ? '' : 's') + ' found</p>' +
        list.map(function (a) {
          var category = SW.categoryBySlug(a.category);
          return '<a href="article.html?slug=' + a.slug + '">' + a.title +
                 '<small>' + (category ? category.name : a.category) + ' &middot; ' +
                 SW.formatDate(a.date) + ' &middot; ' + a.readingTime + '</small></a>';
        }).join('');
    }

    input.addEventListener('input', function () {
      var query = input.value.trim();
      renderResults(query ? SW.render.search(query) : [], query);
    });

    renderResults([], '');
  }

  /* ======================================================================
     5. CATEGORY FILTER (blog page)
     Chips carry data-filter="<slug>"; cards carry data-category="<slug>".
     ====================================================================== */
  function initFilters() {
    var chips = $$('[data-filter]');
    var grid = $('[data-blog-grid]');
    if (!chips.length || !grid) return;

    var cards = $$('[data-category]', grid);
    var countLabel = $('[data-result-count]');
    var notice = $('[data-filter-notice]');

    function apply(filter, searchTerm) {
      var shown = 0;

      /* When a search term is present we reuse SW.render.search() — the same
         function the search overlay uses — so the blog page and the overlay
         can never disagree about what matches. */
      var matchedSlugs = null;
      if (searchTerm) {
        matchedSlugs = {};
        SW.render.search(searchTerm).forEach(function (a) { matchedSlugs[a.slug] = true; });
      }

      cards.forEach(function (card) {
        var matchesCategory = (filter === 'all' || card.getAttribute('data-category') === filter);
        var matchesSearch = matchedSlugs ? !!matchedSlugs[card.getAttribute('data-slug')] : true;

        var show = matchesCategory && matchesSearch;
        card.style.display = show ? '' : 'none';
        if (show) shown++;
      });

      chips.forEach(function (chip) {
        chip.classList.toggle('is-active', chip.getAttribute('data-filter') === filter);
      });

      if (countLabel) {
        var label = 'Showing ' + shown + ' of ' + cards.length + ' articles';
        if (filter !== 'all') {
          var category = SW.categoryBySlug(filter);
          if (category) label += ' in ' + category.name;
        }
        countLabel.textContent = label;
      }

      if (notice) {
        if (shown === 0) {
          notice.style.display = '';
          notice.innerHTML = '<p class="empty-state">No articles found. Try searching for another topic.</p>';
        } else {
          notice.style.display = 'none';
          notice.innerHTML = '';
        }
      }
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        apply(chip.getAttribute('data-filter'), null);
        /* keep the URL shareable without reloading the page */
        history.replaceState(null, '', 'blog.html?category=' + chip.getAttribute('data-filter'));
      });
    });

    /* Links like blog.html?category=ai or blog.html?search=Java set the view */
    var params = new URLSearchParams(window.location.search);
    var requestedCategory = params.get('category');
    var requestedSearch = params.get('search');

    var known = chips.some(function (c) { return c.getAttribute('data-filter') === requestedCategory; });
    apply(known ? requestedCategory : 'all', requestedSearch);
  }

  /* ======================================================================
     6. LIKE + BOOKMARK COUNTERS
     The article data holds a starting count; the visitor's own clicks are
     stored in localStorage, so the number goes up by one when they like it
     and back down when they undo it.
     ====================================================================== */
  function initReactions() {
    var liked = readList('sw-likes');
    var saved = readList('sw-bookmarks');

    /* looks in the merged list, so likes work on posts written in the editor too */
    function articleById(id) {
      var list = SW.allPosts();
      for (var i = 0; i < list.length; i++) {
        if (String(list[i].id) === String(id)) return list[i];
      }
      return null;
    }

    /* Writes a number into every element that displays this counter */
    function paint(type, id, value) {
      var selector = type === 'like' ? '[data-like-count="' + id + '"]' : '[data-bookmark-count="' + id + '"]';
      $$(selector).forEach(function (el) { el.textContent = value; });
    }

    /* Makes all buttons for one article reflect the current state */
    function paintButtons(attr, id, on) {
      $$('[' + attr + '="' + id + '"]').forEach(function (btn) {
        btn.classList.toggle('is-on', on);
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }

    /* Restore the state saved in localStorage on page load */
    liked.forEach(function (id) {
      var article = articleById(id);
      if (!article) return;
      paintButtons('data-like', id, true);
      paint('like', id, article.likes + 1);
    });

    saved.forEach(function (id) {
      var article = articleById(id);
      if (!article) return;
      paintButtons('data-bookmark', id, true);
      paint('bookmark', id, article.bookmarks + 1);
    });

    /* Event delegation: one listener handles buttons on every card, even
       ones created after the page loaded. */
    document.addEventListener('click', function (e) {
      var likeBtn = e.target.closest('[data-like]');
      if (likeBtn) {
        var id = likeBtn.getAttribute('data-like');
        var article = articleById(id);
        if (!article) return;

        var isOn = liked.indexOf(Number(id)) > -1;
        if (isOn) {
          liked = liked.filter(function (x) { return Number(x) !== Number(id); });
          paint('like', id, article.likes);
          toast('Like removed');
        } else {
          liked.push(Number(id));
          paint('like', id, article.likes + 1);
          toast('Thanks for the applause!');
        }
        writeList('sw-likes', liked);
        paintButtons('data-like', id, !isOn);
        return;
      }

      var saveBtn = e.target.closest('[data-bookmark]');
      if (saveBtn) {
        var bId = saveBtn.getAttribute('data-bookmark');
        var bArticle = articleById(bId);
        if (!bArticle) return;

        var on = saved.indexOf(Number(bId)) > -1;
        if (on) {
          saved = saved.filter(function (x) { return Number(x) !== Number(bId); });
          paint('bookmark', bId, bArticle.bookmarks);
          toast('Removed from your reading list');
        } else {
          saved.push(Number(bId));
          paint('bookmark', bId, bArticle.bookmarks + 1);
          toast('Saved to your reading list');
        }
        writeList('sw-bookmarks', saved);
        paintButtons('data-bookmark', bId, !on);
      }
    });
  }

  /* ======================================================================
     7. READING PROGRESS BAR
     ====================================================================== */
  function initProgress() {
    var fill = $('[data-progress]');
    if (!fill) return;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var percent = max > 0 ? (window.scrollY / max) * 100 : 0;
      fill.style.width = Math.min(100, Math.max(0, percent)).toFixed(2) + '%';
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ======================================================================
     8. TABLE OF CONTENTS — SCROLL SPY
     ====================================================================== */
  function initScrollSpy() {
    var links = $$('.toc__list a');
    if (!links.length) return;

    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);
    if (!sections.length) return;

    function update() {
      var current = sections[0];
      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= 150) current = section;
      });
      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id);
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ======================================================================
     9. FORMS
     ====================================================================== */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

  function initForms() {
    /* ---- newsletter ---- */
    $$('[data-subscribe-form]').forEach(function (form) {
      var note = $('[data-form-note]', form.parentNode) || $('[data-form-note]');
      var input = $('input[type="email"]', form);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var value = input.value.trim();

        if (!value) {
          note.textContent = 'Please enter your email address.';
          note.className = 'form-note is-error';
          input.focus();
          return;
        }
        if (!EMAIL_RE.test(value)) {
          note.textContent = 'That does not look like a valid email address.';
          note.className = 'form-note is-error';
          input.focus();
          return;
        }
        note.textContent = 'Thank you! You are on the list — see you on Sunday.';
        note.className = 'form-note is-ok';
        form.reset();
        toast('Subscribed successfully');
      });
    });

    /* ---- contact form ---- */
    var contact = $('[data-contact-form]');
    if (contact) {
      contact.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;

        $$('[data-validate]', contact).forEach(function (input) {
          var err = input.parentNode.querySelector('.err');
          var value = input.value.trim();
          var rule = input.getAttribute('data-validate');

          function fail(message) {
            if (err) err.textContent = message;
            input.setAttribute('aria-invalid', 'true');
            ok = false;
          }
          function pass() {
            if (err) err.textContent = '';
            input.removeAttribute('aria-invalid');
          }

          if (rule === 'required') {
            value ? pass() : fail('This field is required.');
          } else if (rule === 'email') {
            (value && EMAIL_RE.test(value)) ? pass() : fail('Please enter a valid email address.');
          } else if (rule === 'message') {
            value.length >= 20 ? pass() : fail('Please write at least 20 characters.');
          } else {
            pass();
          }
        });

        if (!ok) { toast('Please fix the highlighted fields'); return; }

        contact.reset();
        toast('Message sent — thank you!');
        var note = $('[data-contact-note]');
        if (note) note.textContent = 'Thanks for writing in! (Demo project: nothing is actually sent.)';
      });
    }
  }

  /* ======================================================================
     10. FADE-IN ON SCROLL
     ====================================================================== */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) ||
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ======================================================================
     START
     render.js already ran at this point and built the DOM, so everything
     below binds to elements that really exist.
     ====================================================================== */
  function init() {
    initTheme();
    initNav();
    initSearch();
    initFilters();
    initReactions();
    initProgress();
    initScrollSpy();
    initForms();
    initReveal();
  }

  init();

})();
