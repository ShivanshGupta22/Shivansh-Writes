/* ==========================================================================
   SHIVANSH WRITES  —  js/store.js
   --------------------------------------------------------------------------
   THE "WRITE" LAYER — lets the blog be edited without touching any code.

   HOW IT WORKS
   The twelve starter articles live in js/articles-*.js. Anything the visitor
   creates or edits in the editor is saved in the browser's localStorage and
   then MERGED with the starter articles every time a page renders:

        SW.articles  (starter data)  +  localStorage (your posts & edits)
                                 |
                                 v
                        SW.allPosts()  ->  what every page displays

   That gives working create / edit / delete / draft features on a static
   website (GitHub Pages has no server or database), and the data shape is
   still exactly the database shape, so a real back-end can replace this
   file later without changing render.js.

   STORAGE KEYS
        sw-posts     custom posts and overrides of starter posts
        sw-likes     liked article ids      (used by site.js)
        sw-bookmarks saved article ids      (used by site.js)
        sw-theme     light / dark           (used by site.js)
   ========================================================================== */
(function () {
  'use strict';

  var SW = window.SW;
  var KEY = 'sw-posts';
  var FIRST_CUSTOM_ID = 1001;

  /* ======================================================================
     LOW-LEVEL STORAGE (wrapped in try/catch: localStorage can be blocked)
     ====================================================================== */
  function readAll() {
    try {
      var raw = localStorage.getItem(KEY);
      var list = raw ? JSON.parse(raw) : [];
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function writeAll(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      /* most likely the 5 MB quota was exceeded by a large uploaded image */
      return false;
    }
  }

  /* ======================================================================
     PUBLIC API
     ====================================================================== */
  SW.store = {

    KEY: KEY,

    /* every custom post / override, including drafts */
    all: readAll,

    /* one stored post by id */
    get: function (id) {
      var list = readAll();
      for (var i = 0; i < list.length; i++) {
        if (String(list[i].id) === String(id)) return list[i];
      }
      return null;
    },

    /* the original starter article with this id (or null if it is custom) */
    starter: function (id) {
      for (var i = 0; i < SW.articles.length; i++) {
        if (String(SW.articles[i].id) === String(id)) return SW.articles[i];
      }
      return null;
    },

    isStarter: function (id) { return !!SW.store.starter(id); },

    /* true when a starter article has been edited (it can be reverted) */
    isEdited: function (id) {
      var stored = SW.store.get(id);
      return !!stored && !!SW.store.starter(id);
    },

    /* Create or update. Returns the saved post. */
    save: function (post) {
      var list = readAll();
      var found = false;

      for (var i = 0; i < list.length; i++) {
        if (String(list[i].id) === String(post.id)) {
          list[i] = post;
          found = true;
          break;
        }
      }
      if (!found) list.push(post);

      return writeAll(list) ? post : null;
    },

    /* Delete a custom post, or undo an edit made to a starter article */
    remove: function (id) {
      var list = readAll().filter(function (p) { return String(p.id) !== String(id); });
      return writeAll(list);
    },

    /* An id that no post is using yet */
    nextId: function () {
      var max = FIRST_CUSTOM_ID - 1;
      readAll().forEach(function (p) {
        var n = Number(p.id);
        if (n > max) max = n;
      });
      SW.articles.forEach(function (a) {
        var n = Number(a.id);
        if (n > max) max = n;
      });
      return max + 1;
    },

    /* ---------------- stats used by the editor page ---------------- */
    stats: function () {
      var list = readAll();
      var published = list.filter(function (p) { return p.status !== 'draft'; }).length;
      var drafts = list.length - published;
      var edits = list.filter(function (p) { return SW.store.isStarter(p.id); }).length;
      return {
        total: SW.articles.length + list.length - edits,
        custom: list.length - edits,
        published: published - edits,
        drafts: drafts,
        edits: edits
      };
    },

    /* ---------------- backup: export / import ---------------- */
    exportJSON: function () {
      return JSON.stringify({
        site: 'Shivansh Writes',
        exported: new Date().toISOString().slice(0, 10),
        posts: readAll()
      }, null, 2);
    },

    /* mode 'replace' (default) or 'merge'. Returns the number of posts imported. */
    importJSON: function (text, mode) {
      var data;
      try { data = JSON.parse(text); } catch (e) { return -1; }

      var incoming = Array.isArray(data) ? data : data.posts;
      if (!Array.isArray(incoming)) return -1;

      var list = readAll();
      incoming.forEach(function (post) {
        if (!post || post.title === undefined) return;
        post.id = Number(post.id) || SW.store.nextId();
        var replaced = false;
        for (var i = 0; i < list.length; i++) {
          if (String(list[i].id) === String(post.id)) { list[i] = post; replaced = true; break; }
        }
        if (!replaced && mode !== 'replace') list.push(post);
        else if (!replaced) list.push(post);
      });

      return writeAll(list) ? incoming.length : -2;
    },

    clear: function () {
      try { localStorage.removeItem(KEY); return true; } catch (e) { return false; }
    }
  };

  /* ======================================================================
     MERGED POST LIST — what the whole website reads
     ====================================================================== */
  SW.allPosts = function (options) {
    options = options || {};
    var includeDrafts = !!options.includeDrafts;

    var byId = {};
    SW.articles.forEach(function (a) { byId[String(a.id)] = a; });      /* starters */
    readAll().forEach(function (p) { byId[String(p.id)] = p; });        /* custom + edits */

    var list = Object.keys(byId).map(function (k) { return byId[k]; });

    return includeDrafts ? list : list.filter(function (p) { return p.status !== 'draft'; });
  };

  /* Convenience: only the posts written inside the editor */
  SW.customPosts = function (includeDrafts) {
    return readAll().filter(function (p) {
      return includeDrafts || p.status !== 'draft';
    });
  };

  /* ======================================================================
     SMALL TEXT HELPERS USED BY THE EDITOR
     ====================================================================== */

  /* "My New Post!" -> "my-new-post" */
  SW.slugify = function (text) {
    return String(text || '')
      .toLowerCase()
      .replace(/['"“”]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'post';
  };

  /* Makes a slug unique by adding -2, -3 … */
  SW.uniqueSlug = function (text, ignoreId) {
    var base = SW.slugify(text);
    var taken = SW.allPosts({ includeDrafts: true })
      .filter(function (p) { return String(p.id) !== String(ignoreId); })
      .map(function (p) { return p.slug; });

    if (taken.indexOf(base) === -1) return base;
    var n = 2;
    while (taken.indexOf(base + '-' + n) > -1) n++;
    return base + '-' + n;
  };

  /* Reading time from the word count (about 200 words per minute) */
  SW.readingTimeFor = function (html) {
    var words = String(html || '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200)) + ' min read';
  };

  /* ----------------------------------------------------------------------
     A very small Markdown converter, so posts can be written as plain text
     instead of HTML. Supported:

        ## Heading            ->  <h2 id="heading">
        ### Sub-heading       ->  <h3>
        - item / * item       ->  bullet list
        1. item               ->  numbered list
        > quote               ->  blockquote
        ``` code ```          ->  code block
        **bold**  *italic*  `code`  [text](url)  ![alt](image)
        anything else         ->  a paragraph

     If the text already starts with "<" it is treated as HTML and kept as is,
     so the twelve starter articles continue to work unchanged.
     ---------------------------------------------------------------------- */
  SW.mdToHtml = function (text) {
    var src = String(text || '').replace(/\r\n/g, '\n');
    if (/^\s*</.test(src)) return src;                     /* already HTML */

    function inline(s) {
      return s
        /* escape first, then re-introduce the few tags we support */
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">')
        .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[\s(])\*([^*\n]+)\*/g, '$1<em>$2</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
    }

    var out = [];
    var para = [];
    var lines = src.split('\n');
    var i;

    function flushPara() {
      if (para.length) {
        out.push('<p>' + inline(para.join(' ')) + '</p>');
        para = [];
      }
    }

    for (i = 0; i < lines.length; i++) {
      var line = lines[i];
      var trimmed = line.trim();

      /* --- fenced code block --- */
      if (/^```/.test(trimmed)) {
        flushPara();
        var code = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i].trim())) {
          code.push(lines[i]);
          i++;
        }
        out.push('<pre><code>' + code.join('\n')
                   .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                 '</code></pre>');
        continue;
      }

      /* --- headings --- */
      if (/^###\s+/.test(trimmed)) {
        flushPara();
        var h3 = trimmed.replace(/^###\s+/, '');
        out.push('<h3>' + inline(h3) + '</h3>');
        continue;
      }
      if (/^##\s+/.test(trimmed)) {
        flushPara();
        var h2 = trimmed.replace(/^##\s+/, '');
        out.push('<h2 id="' + SW.slugify(h2) + '">' + inline(h2) + '</h2>');
        continue;
      }

      /* --- blockquote --- */
      if (/^>\s?/.test(trimmed)) {
        flushPara();
        var quote = [];
        while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
          quote.push(lines[i].trim().replace(/^>\s?/, ''));
          i++;
        }
        i--;
        out.push('<blockquote>' + inline(quote.join(' ')) + '</blockquote>');
        continue;
      }

      /* --- bullet list --- */
      if (/^[-*]\s+/.test(trimmed)) {
        flushPara();
        var items = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
          items.push('<li>' + inline(lines[i].trim().replace(/^[-*]\s+/, '')) + '</li>');
          i++;
        }
        i--;
        out.push('<ul>' + items.join('') + '</ul>');
        continue;
      }

      /* --- numbered list --- */
      if (/^\d+\.\s+/.test(trimmed)) {
        flushPara();
        var nums = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          nums.push('<li>' + inline(lines[i].trim().replace(/^\d+\.\s+/, '')) + '</li>');
          i++;
        }
        i--;
        out.push('<ol style="list-style:decimal">' + nums.join('') + '</ol>');
        continue;
      }

      /* --- blank line ends a paragraph --- */
      if (!trimmed) { flushPara(); continue; }

      para.push(trimmed);
    }

    flushPara();
    return out.join('\n');
  };

})();
