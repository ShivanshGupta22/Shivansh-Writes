/* ==========================================================================
   SHIVANSH WRITES  —  js/render.js
   --------------------------------------------------------------------------
   THE VIEW LAYER.

   Reads the data from js/data.js + js/articles-*.js and builds the HTML for
   every page. The HTML files contain only empty containers marked with
   data-* attributes, so the design (classes, layout, animation) is reused
   exactly as it already was — nothing here changes the visual design.

   SECTION MAP
     1.  Icons and tiny helpers
     2.  Reusable HTML pieces (article card, category card, social list)
     3.  Counters, sorting, search and "related articles" logic
     4.  Page renderers (home, blog, categories, article, about, contact)
     5.  Start-up: pick the renderer that matches <body data-page="...">
   ========================================================================== */
(function () {
  'use strict';

  var SW = window.SW;
  var R = {};                 /* expose as SW.render */
  SW.render = R;

  /* ======================================================================
     1. ICONS AND HELPERS
     Icons are inline SVG strings so no icon font or external file is needed.
     ====================================================================== */
  var icons = {
    monitor:  '<rect x="3" y="5" width="18" height="12" rx="2"/><path d="M8 21h8"/>',
    ai:       '<circle cx="12" cy="12" r="3"/><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2"/>',
    code:     '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>',
    layers:   '<path d="M4 7l8-4 8 4-8 4-8-4z"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4"/>',
    cap:      '<path d="M12 4L2 9l10 5 8-4v6"/><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5"/>',
    bolt:     '<path d="M13 3L5 14h6l-1 7 8-11h-6l1-7z"/>',
    sparkle:  '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M18.5 15.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z"/>',
    heart:    '<path d="M12 20s-7-4.4-7-9.3A4.1 4.1 0 0112 7.8 4.1 4.1 0 0119 10.7c0 4.9-7 9.3-7 9.3z"/>',
    bookmark: '<path d="M6 4h12v16l-6-4-6 4z"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL:   '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    eye:      '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/>',
    github:   '<path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 00-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<path d="M6 9v10M6 5.5v.01M11 19v-6a2.5 2.5 0 015 0v6"/><rect x="3" y="3" width="18" height="18" rx="3"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".9" fill="currentColor"/>',
    mail:     '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>',
    send:     '<path d="M4 12l16-8-6 16-3-6-7-2z"/>'
  };

  /* Returns a complete <svg> element as a string */
  function svg(name, size, stroke) {
    return '<svg width="' + (size || 17) + '" height="' + (size || 17) + '" viewBox="0 0 24 24" ' +
           'fill="none" stroke="currentColor" stroke-width="' + (stroke || 1.6) + '" ' +
           'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
           (icons[name] || '') + '</svg>';
  }

  /* Escapes text that goes into HTML (keeps the site safe if data is edited) */
  function esc(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }

  /* Small helper for the "date • 5 min read" line */
  function metaLine(article, extra) {
    var parts = [
      '<span>' + esc(SW.formatDate(article.date)) + '</span>',
      '<span class="meta__dot"></span><span>' + esc(article.readingTime) + '</span>'
    ];
    if (extra === 'views') {
      parts.push('<span class="meta__dot"></span><span>' + article.views + ' views</span>');
    }
    return '<div class="meta" style="margin-bottom:14px">' + parts.join('') + '</div>';
  }

  /* ======================================================================
     2. REUSABLE HTML PIECES
     ====================================================================== */

  /* Like + bookmark buttons. The count is updated live by site.js. */
  function actionsHTML(article) {
    return '<div class="card-actions">' +
      '<button class="action" data-like="' + article.id + '" aria-pressed="false" ' +
        'aria-label="Like this article">' + svg('heart') +
        '<span class="action__count" data-like-count="' + article.id + '">' + article.likes + '</span></button>' +
      '<button class="action" data-bookmark="' + article.id + '" aria-pressed="false" ' +
        'aria-label="Bookmark this article">' + svg('bookmark') +
        '<span class="action__count" data-bookmark-count="' + article.id + '">' + article.bookmarks + '</span></button>' +
    '</div>';
  }

  /* One article card — the same markup the design already used */
  function cardHTML(article, options) {
    options = options || {};
    var category = SW.categoryBySlug(article.category);
    var categoryName = category ? category.name : article.category;
    var url = 'article.html?slug=' + article.slug;

    /* data-search holds every searchable word of the card, so the blog-page
       filter can also match on tags and descriptions. */
    var searchText = [article.title, article.description, categoryName, article.tags.join(' ')]
                       .join(' ').toLowerCase();

    return '<article class="post-card reveal" data-category="' + esc(article.category) + '" ' +
             'data-slug="' + esc(article.slug) + '" ' +
             'data-tags="' + esc(article.tags.join(' ').toLowerCase()) + '" ' +
             'data-search="' + esc(searchText) + '">' +
      '<div class="post-card__media">' +
        '<img src="' + esc(article.image) + '" alt="' + esc(article.imageAlt) + '" ' +
          'width="900" height="563" loading="lazy">' +
        '<span class="badge">' + esc(categoryName) + '</span>' +
      '</div>' +
      '<div class="post-card__body">' +
        metaLine(article, options.showViews ? 'views' : null) +
        '<h3><a href="' + url + '">' + esc(article.title) + '</a></h3>' +
        '<p>' + esc(article.description) + '</p>' +
        '<div class="card-foot">' +
          '<a class="link" href="' + url + '"><span>Read Article</span>' + svg('arrow', 14, 2) + '</a>' +
          actionsHTML(article) +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* One category card (used on the home page and the categories page) */
  function categoryCardHTML(category, counts, withDescription) {
    return '<a class="subject-card reveal" href="blog.html?category=' + esc(category.slug) + '">' +
      '<span class="subject-card__icon">' + svg(category.icon, 18) + '</span>' +
      '<h3>' + esc(category.name) + '</h3>' +
      (withDescription
        ? '<p style="font-size:14px;color:var(--ink-2);margin:8px 0 0">' + esc(category.description) + '</p>'
        : '') +
      '<small style="display:block;margin-top:12px">' +
        counts[category.slug] + (counts[category.slug] === 1 ? ' article' : ' articles') +
      '</small>' +
    '</a>';
  }

  /* The "Written by Shivansh Gupta" box under an article */
  function authorCardHTML() {
    var p = SW.profile;
    return '<div class="author-box" style="margin-top:48px;grid-template-columns:110px 1fr;gap:28px;padding:32px">' +
      '<img src="' + esc(p.avatar) + '" alt="Portrait of ' + esc(p.name) + '" width="440" height="440" loading="lazy">' +
      '<div>' +
        '<span class="eyebrow">Written by</span>' +
        '<h3 style="margin:12px 0 10px;font-size:20px;font-weight:500">' + esc(p.name) + '</h3>' +
        '<p style="margin:0;font-size:15px">' + esc(p.authorBio) + ' ' +
          '<a class="link" href="about.html" style="margin-left:6px"><span>About me</span></a></p>' +
      '</div>' +
    '</div>';
  }

  /* Placeholder-aware social link. Until a URL is filled in data.js the site
     shows a clearly marked placeholder instead of a made-up username. */
  function socialLinkHTML(item, style) {
    var filled = !!(item.url && item.url.length);
    var href = filled ? esc(item.url) : '#';
    var note = filled
      ? (item.handle ? esc(item.handle) : '')
      : '<em class="muted" style="font-size:12.5px">add your link in js/data.js</em>';

    if (style === 'footer') {
      return '<li><a href="' + href + '"' + (filled ? '' : ' data-placeholder title="Replace in js/data.js"') + '>' +
             esc(item.label) + '</a></li>';
    }
    return '<span><strong style="display:block;font-size:15px">' + esc(item.label) + '</strong>' +
           '<span class="muted" style="font-size:14px">' + note + '</span></span>';
  }

  /* Small inline icon row (views / likes / bookmarks) shown on the article page */
  function statsRowHTML(article) {
    return '<span class="meta" style="gap:16px">' +
      '<span style="display:inline-flex;align-items:center;gap:6px">' + svg('eye', 15) + article.views + ' views</span>' +
      '<span style="display:inline-flex;align-items:center;gap:6px">' + svg('heart', 15) +
        '<span data-like-count="' + article.id + '">' + article.likes + '</span> likes</span>' +
      '<span style="display:inline-flex;align-items:center;gap:6px">' + svg('bookmark', 15) +
        '<span data-bookmark-count="' + article.id + '">' + article.bookmarks + '</span> saves</span>' +
    '</span>';
  }

  /* ======================================================================
     3. SORTING, COUNTERS, SEARCH AND RELATED ARTICLES
     ====================================================================== */

  /* Every list on the site reads from SW.allPosts(): the twelve starter
     articles PLUS anything created or edited in the editor (js/store.js). */
  function posts() { return SW.allPosts(); }

  function byNewest(a, b) { return a.date < b.date ? 1 : (a.date > b.date ? -1 : 0); }

  /* Newest first */
  R.newest = function (limit) {
    var list = posts().sort(byNewest);
    return limit ? list.slice(0, limit) : list;
  };

  /* Highest view count first */
  R.popular = function (limit) {
    var list = posts().sort(function (a, b) { return b.views - a.views; });
    return limit ? list.slice(0, limit) : list;
  };

  /* How many articles sit in each category: {'programming': 2, ...} */
  R.categoryCounts = function () {
    var counts = {};
    SW.categories.forEach(function (c) { counts[c.slug] = 0; });
    posts().forEach(function (a) {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  };

  /* Total views across the blog — used for the hero statistics */
  R.totalViews = function () {
    return posts().reduce(function (sum, a) { return sum + a.views; }, 0);
  };

  /* Find one article by its slug (used by article.html?slug=...) */
  R.findBySlug = function (slug) {
    var list = posts();
    for (var i = 0; i < list.length; i++) {
      if (list[i].slug === slug) return list[i];
    }
    return null;
  };

  /* The article shown as the featured story on the home page */
  R.featured = function () {
    var list = posts();
    for (var i = 0; i < list.length; i++) {
      if (list[i].featured) return list[i];
    }
    return R.newest(1)[0];
  };

  /* SEARCH — looks through title, description, category name and tags.
     Returns an array of matching articles. */
  R.search = function (query) {
    var q = String(query || '').trim().toLowerCase();
    if (!q) return [];
    return posts().filter(function (a) {
      var category = SW.categoryBySlug(a.category);
      var haystack = [
        a.title,
        a.description,
        a.slug,
        category ? category.name : '',
        a.tags.join(' ')
      ].join(' ').toLowerCase();
      if (haystack.indexOf(q) > -1) return true;

      /* second pass: also allow a match inside the article body */
      return String(a.content || '')
        .replace(/<[^>]+>/g, ' ').toLowerCase().indexOf(q) > -1;
    }).sort(byNewest);
  };

  /* RELATED ARTICLES — scores every other article by how much it overlaps:
     same category is worth a lot, each shared tag is worth a little. */
  R.related = function (article, limit) {
    limit = limit || 3;
    var scored = posts()
      .filter(function (a) { return a.id !== article.id; })
      .map(function (a) {
        var score = 0;
        if (a.category === article.category) score += 10;
        a.tags.forEach(function (tag) {
          if (article.tags.indexOf(tag) > -1) score += 3;
        });
        return { article: a, score: score };
      })
      .sort(function (x, y) {
        if (y.score !== x.score) return y.score - x.score;
        return x.article.date < y.article.date ? 1 : -1;   /* newer first on a tie */
      });

    return scored.slice(0, limit).map(function (item) { return item.article; });
  };

  /* ======================================================================
     4. PAGE RENDERERS
     Each one fills the containers that exist on that page and does nothing
     if the containers are missing, so the same file works everywhere.
     ====================================================================== */

  /* ------------------------------ HOME --------------------------------- */
  R.home = function () {
    var p = SW.profile;
    var featured = R.featured();
    var latest = R.newest(6);
    var popular = R.popular(3);
    var counts = R.categoryCounts();

    /* Hero text */
    var tagline = $('[data-hero-tagline]');
    if (tagline) tagline.textContent = p.tagline;

    var bio = $('[data-hero-bio]');
    if (bio) bio.textContent = p.shortBio;

    var heroImg = $('[data-hero-image]');
    if (heroImg) {
      heroImg.setAttribute('src', p.heroImage);
      heroImg.setAttribute('alt', 'Shivansh writing notes beside an open laptop at his desk');
    }

    var heroCaption = $('[data-hero-caption]');
    if (heroCaption) heroCaption.textContent = 'Notes, code &amp; college life'.replace('&amp;', '&');

    /* Statistics — all three come from the data, none are hard-coded */
    var stats = $('[data-hero-stats]');
    if (stats) {
      stats.innerHTML =
        '<div class="stat"><div class="stat__num">' + posts().length + '<sup>+</sup></div>' +
          '<div class="stat__label">Essays Published</div></div>' +
        '<div class="stat"><div class="stat__num">' + SW.categories.length + '</div>' +
          '<div class="stat__label">Core Disciplines</div></div>' +
        '<div class="stat"><div class="stat__num">' + R.totalViews() + '<sup>+</sup></div>' +
          '<div class="stat__label">Total Reads</div></div>';
    }

    var issue = $('[data-issue]');
    if (issue) {
      issue.innerHTML = 'Issue No. ' + String(posts().length).padStart(2, '0') +
                        ' <span class="meta__dot"></span> Latest: ' + SW.formatDate(R.newest(1)[0].date);
    }

    /* Featured story */
    var featuredBox = $('[data-featured]');
    if (featuredBox) {
      var fc = SW.categoryBySlug(featured.category);
      featuredBox.innerHTML =
        '<div class="featured__media">' +
          '<img src="' + esc(featured.image) + '" alt="' + esc(featured.imageAlt) + '" width="1100" height="688">' +
          '<span class="badge featured__tag">' + esc(fc ? fc.name : featured.category) + '</span>' +
        '</div>' +
        '<div class="featured__body">' +
          '<span class="meta">' + esc(SW.formatDate(featured.date)) + ' <span class="meta__dot"></span> ' +
            esc(featured.readingTime) + '</span>' +
          '<h3 class="headline"><a href="article.html?slug=' + esc(featured.slug) + '">' +
            esc(featured.title) + '</a></h3>' +
          /* featuredNote (if present) is used on the big card; otherwise the short description */
          '<p>' + esc(featured.featuredNote || featured.description) + '</p>' +
          '<div class="card-foot">' +
            '<a class="link" href="article.html?slug=' + esc(featured.slug) + '">' +
              '<span>Read Article</span>' + svg('arrow', 14, 2) + '</a>' +
            actionsHTML(featured) +
          '</div>' +
        '</div>';
    }

    /* Latest articles */
    var latestBox = $('[data-latest]');
    if (latestBox) latestBox.innerHTML = latest.map(function (a) { return cardHTML(a); }).join('');

    /* Popular articles (highest view count) */
    var popularBox = $('[data-popular]');
    if (popularBox) {
      popularBox.innerHTML = popular.map(function (a) {
        return cardHTML(a, { showViews: true });
      }).join('');
    }

    /* All seven categories */
    var catBox = $('[data-categories]');
    if (catBox) {
      catBox.innerHTML = SW.categories.map(function (c) {
        return categoryCardHTML(c, counts, false);
      }).join('');
    }

    /* Author preview box */
    var authorBox = $('[data-author-preview]');
    if (authorBox) {
      authorBox.innerHTML =
        '<img src="' + esc(p.avatar) + '" alt="Portrait of ' + esc(p.name) + '" width="440" height="440" loading="lazy">' +
        '<div>' +
          '<span class="eyebrow">The Author</span>' +
          '<h2 class="headline">A little about me</h2>' +
          '<p>' + esc(p.aboutMe[0]) + '</p>' +
          '<p style="margin-top:-10px"><span class="badge badge--ghost">' + esc(p.tagline) + '</span></p>' +
          '<a class="link" href="about.html"><span>More About Me &amp; My Projects</span>' +
            svg('arrow', 14, 2) + '</a>' +
        '</div>';
    }
  };

  /* ------------------------------ BLOG --------------------------------- */
  R.blog = function () {
    var counts = R.categoryCounts();
    var chips = $('[data-filters]');
    var grid = $('[data-blog-grid]');

    /* One filter chip per category, generated from the data */
    if (chips) {
      chips.innerHTML =
        '<button class="chip is-active" data-filter="all">All</button>' +
        SW.categories.map(function (c) {
          return '<button class="chip" data-filter="' + esc(c.slug) + '">' +
                 esc(c.name) + ' <span style="opacity:.6">' + counts[c.slug] + '</span></button>';
        }).join('');
    }

    if (grid) {
      grid.innerHTML = R.newest().map(function (a) { return cardHTML(a); }).join('');
    }
  };

  /* --------------------------- CATEGORIES ------------------------------ */
  R.categoriesPage = function () {
    var counts = R.categoryCounts();
    var grid = $('[data-category-grid]');
    var recent = $('[data-category-recent]');
    var summary = $('[data-category-summary]');

    if (grid) {
      grid.innerHTML = SW.categories.map(function (c) {
        return categoryCardHTML(c, counts, true);
      }).join('');
    }

    if (recent) {
      recent.innerHTML = R.newest(6).map(function (a) { return cardHTML(a); }).join('');
    }

    if (summary) {
      summary.textContent = posts().length + ' articles across ' + SW.categories.length +
                            ' categories — updated as I publish something new.';
    }
  };

  /* ---------------------------- ARTICLE -------------------------------- */
  R.articlePage = function () {
    /* Which article? article.html?slug=...  — with a sensible default so the
       page still works when opened directly from the file system. */
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('slug');
    var article = (slug && R.findBySlug(slug)) || R.featured();
    if (!article) return;

    document.title = article.title + ' — ' + SW.profile.siteName;

    var category = SW.categoryBySlug(article.category);
    var categoryName = category ? category.name : article.category;

    /* --- header --- */
    var badge = $('[data-article-category]');
    if (badge) {
      badge.textContent = categoryName;
      badge.setAttribute('href', 'blog.html?category=' + article.category);
    }

    var title = $('[data-article-title]');
    if (title) title.textContent = article.title;

    var lede = $('[data-article-lede]');
    if (lede) lede.textContent = article.description;

    var meta = $('[data-article-meta]');
    if (meta) {
      meta.innerHTML =
        '<span>' + esc(SW.formatDate(article.date)) + '</span><span class="meta__dot"></span>' +
        '<span>' + esc(article.readingTime) + '</span><span class="meta__dot"></span>' +
        '<span>' + esc(article.author) + '</span>';
    }

    /* --- the whole reading column is built in one go so that the paragraph
           spacing rules of .prose still apply to direct children --- */
    var body = $('[data-article-body]');
    if (body) {
      var tagsHTML = article.tags.map(function (tag) {
        return '<a class="badge badge--ghost" href="blog.html?search=' + encodeURIComponent(tag) + '">' +
               esc(tag) + '</a>';
      }).join('');

      var footerHTML =
        '<div class="card-actions" style="gap:10px">' +
          '<button class="action" data-like="' + article.id + '" aria-pressed="false" ' +
            'aria-label="Like this article">' + svg('heart') +
            '<span class="action__count" data-like-count="' + article.id + '">' + article.likes + '</span></button>' +
          '<button class="action" data-bookmark="' + article.id + '" aria-pressed="false" ' +
            'aria-label="Bookmark this article">' + svg('bookmark') +
            '<span class="action__count" data-bookmark-count="' + article.id + '">' + article.bookmarks + '</span></button>' +
          '<span class="muted" style="font-size:13px">Save it for later</span>' +
        '</div>' + statsRowHTML(article);

      body.innerHTML =
        '<figure><img src="' + esc(article.image) + '" alt="' + esc(article.imageAlt) +
          '" width="900" height="563"></figure>' +
        article.content +
        '<div class="pill-row" style="margin-top:44px">' + tagsHTML + '</div>' +
        '<div class="article-footer">' + footerHTML + '</div>' +
        authorCardHTML();
    }

    /* --- table of contents, built from the <h2> headings in the content --- */
    var toc = $('[data-toc]');
    var tocBox = $('[data-toc-wrap]');
    if (toc && tocBox) {
      var headings = $$('h2', body || document);
      if (headings.length) {
        headings.forEach(function (h, index) {
          if (!h.id) h.id = 'section-' + (index + 1);
        });
        toc.innerHTML = headings.map(function (h) {
          return '<a href="#' + h.id + '">' + esc(h.textContent) + '</a>';
        }).join('');
      } else {
        tocBox.style.display = 'none';
      }
    }

    /* --- related articles --- */
    var related = $('[data-related]');
    if (related) {
      var list = R.related(article, 3);
      related.innerHTML = list.map(function (a) { return cardHTML(a); }).join('');
      var label = $('[data-related-label]');
      if (label) {
        label.textContent = 'More on ' + categoryName + ' and ' + article.tags[0];
      }
    }
  };

  /* ------------------------------ ABOUT -------------------------------- */
  R.about = function () {
    var p = SW.profile;

    var setText = function (selector, value) {
      var el = $(selector);
      if (el) el.textContent = value;
    };

    $$('[data-profile-name]').forEach(function (el) { el.textContent = p.name; });
    $$('[data-profile-tagline]').forEach(function (el) { el.textContent = p.tagline; });
    $$('[data-profile-role]').forEach(function (el) { el.textContent = p.role; });

    var avatar = $('[data-profile-avatar]');
    if (avatar) avatar.setAttribute('src', p.avatar);

    var about = $('[data-profile-about]');
    if (about) {
      about.innerHTML = p.aboutMe.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('');
    }

    /* Currently learning — list from the data */
    var learning = $('[data-profile-learning]');
    if (learning) {
      learning.innerHTML = p.currentlyLearning.map(function (item) {
        return '<li style="display:flex;align-items:center;gap:10px">' +
               '<span style="color:var(--sage)">' + svg('arrow', 14, 2) + '</span>' + esc(item) + '</li>';
      }).join('');
    }

    /* Skills — small pills */
    var skills = $('[data-profile-skills]');
    if (skills) {
      skills.innerHTML = p.skills.map(function (skill) {
        return '<span class="badge badge--ghost">' + esc(skill) + '</span>';
      }).join('');
    }

    /* Quick facts: only the fields that are actually filled in are shown */
    var facts = $('[data-profile-facts]');
    if (facts) {
      var rows = [
        ['Studying', p.role],
        ['Based in', p.location || ''],
        ['Currently learning', p.currentlyLearning.slice(0, 2).join(', ')],
        ['Skills', p.skills.length + ' technologies'],
        ['Writing since', SW.formatDate(posts()[posts().length - 1].date)]
      ];
      facts.innerHTML = rows.map(function (row) {
        var value = row[1]
          ? esc(row[1])
          : '<em class="muted" style="font-size:13px">add in js/data.js</em>';
        return '<li style="display:flex;justify-content:space-between;gap:16px;padding:9px 0;' +
               'border-bottom:1px solid var(--line)"><span>' + esc(row[0]) + '</span>' +
               '<strong style="color:var(--ink);text-align:right">' + value + '</strong></li>';
      }).join('');
    }

    /* Projects section */
    var projects = $('[data-profile-projects]');
    if (projects) {
      projects.innerHTML = SW.projects.map(function (project) {
        return '<article class="subject-card reveal" style="display:flex;flex-direction:column">' +
          '<span class="subject-card__icon">' + svg('layers', 18) + '</span>' +
          '<h3>' + esc(project.name) + '</h3>' +
          '<p style="font-size:14.5px;color:var(--ink-2);margin:10px 0 18px;flex:1">' +
            esc(project.description) + '</p>' +
          '<div class="pill-row" style="margin-bottom:16px">' +
            project.technologies.map(function (tech) {
              return '<span class="badge badge--ghost">' + esc(tech) + '</span>';
            }).join('') +
          '</div>' +
          '<span class="muted" style="font-size:12.5px">' + project.status + '</span>' +
        '</article>';
      }).join('');
    }

    /* Writing subjects = the categories, with live counts */
    var subjects = $('[data-profile-subjects]');
    if (subjects) {
      var counts = R.categoryCounts();
      subjects.innerHTML = SW.categories.map(function (c) {
        return categoryCardHTML(c, counts, true);
      }).join('');
    }

    /* Social links */
    $$('[data-social-list]').forEach(function (list) {
      list.innerHTML = SW.social.map(function (item) { return socialLinkHTML(item); }).join('');
    });
    $$('[data-social-links]').forEach(function (wrap) {
      wrap.innerHTML = SW.social.map(function (item) {
        return '<a class="btn btn--outline btn--sm" href="' + (item.url ? esc(item.url) : '#') + '"' +
               (item.url ? '' : ' data-placeholder title="Replace in js/data.js"') + '>' +
               svg(item.icon, 15) + ' ' + esc(item.label) + '</a>';
      }).join(' ');
    });
  };

  /* ----------------------------- CONTACT ------------------------------- */
  R.contact = function () {
    var p = SW.profile;

    /* Contact channels: use the real values only if they were filled in */
    var list = $('[data-contact-channels]');
    if (list) {
      list.innerHTML = SW.social.map(function (item) {
        return '<li style="display:flex;gap:16px;padding:20px 0;border-bottom:1px solid var(--line)">' +
          '<span class="subject-card__icon" style="margin:0;flex:none">' + svg(item.icon, 17) + '</span>' +
          socialLinkHTML(item) +
        '</li>';
      }).join('');
    }

    var cityRow = $('[data-contact-location]');
    if (cityRow) {
      cityRow.innerHTML = p.location
        ? '<strong style="display:block;font-size:15px">Based in</strong>' +
          '<span class="muted" style="font-size:14px">' + esc(p.location) + '</span>'
        : '<strong style="display:block;font-size:15px">Location</strong>' +
          '<span class="muted" style="font-size:14px"><em>add your city in js/data.js</em></span>';
    }
  };

  /* ------------------------------ FOOTER ------------------------------- */
  R.footer = function () {
    var cols = $('[data-footer-social]');
    if (cols) {
      cols.innerHTML = SW.social.map(function (item) { return socialLinkHTML(item, 'footer'); }).join('');
    }
    $$('[data-year]').forEach(function (el) { el.textContent = '2026'; });
  };

  /* ======================================================================
     5. START-UP
     The <body data-page="..."> attribute decides which renderer runs.
     ====================================================================== */
  R.renderPage = function () {
    var page = document.body.getAttribute('data-page') || 'home';

    /* footer + social links appear on every page */
    R.footer();

    if (page === 'home')        R.home();
    if (page === 'blog')        R.blog();
    if (page === 'categories')  R.categoriesPage();
    if (page === 'article')     R.articlePage();
    if (page === 'about')       R.about();
    if (page === 'contact')     R.contact();
  };

  /* Scripts are loaded at the end of <body>, so the DOM above already exists */
  R.renderPage();

})();
