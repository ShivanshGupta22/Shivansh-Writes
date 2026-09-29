/* ==========================================================================
   SHIVANSH WRITES  —  js/editor.js
   --------------------------------------------------------------------------
   The logic behind editor.html — writing, editing and managing posts.

   Loaded ONLY on the editor page (the rest of the website never needs it).

   SECTIONS
     1.  Helpers
     2.  Build the category dropdown
     3.  The post list ("Your posts")
     4.  Loading a post into the form (create vs edit)
     5.  Saving: publish or draft
     6.  Delete / revert to the original
     7.  Live preview + word count + reading time
     8.  Cover image: built-in choices, URL, or upload (resized in the browser)
     9.  Export / import a backup
    10.  Start-up
   ========================================================================== */
(function () {
  'use strict';

  var SW = window.SW;

  /* ======================================================================
     1. HELPERS
     ====================================================================== */
  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }

  var toastTimer;
  function toast(message) {
    var el = $('[data-toast]');
    if (!el) return;
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  function escapeHTML(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* The form fields, in one place */
  var F = {};
  function cacheFields() {
    F.form = $('[data-post-form]');
    F.id = $('[data-field="id"]');
    F.title = $('[data-field="title"]');
    F.category = $('[data-field="category"]');
    F.date = $('[data-field="date"]');
    F.readingTime = $('[data-field="readingTime"]');
    F.description = $('[data-field="description"]');
    F.tags = $('[data-field="tags"]');
    F.image = $('[data-field="image"]');
    F.views = $('[data-field="views"]');
    F.body = $('[data-field="body"]');
    F.mode = $('[data-editor-mode]');
    F.list = $('[data-post-list]');
    F.preview = $('[data-preview]');
    F.counters = $('[data-editor-counters]');
    F.status = $('[data-editor-status]');
  }

  /* ======================================================================
     2. CATEGORY DROPDOWN (built from the category data)
     ====================================================================== */
  function buildCategories() {
    if (!F.category) return;
    F.category.innerHTML = SW.categories.map(function (c) {
      return '<option value="' + c.slug + '">' + escapeHTML(c.name) + '</option>';
    }).join('');
  }

  /* ======================================================================
     3. THE POST LIST
     Every post saved in this browser, newest first, with actions.
     ====================================================================== */
  function renderList(query) {
    if (!F.list) return;

    var q = String(query || '').trim().toLowerCase();

    /* the list shows EVERY post — the twelve starter articles and anything you
       have written or edited — so any article can be opened and changed. */
    var all = SW.allPosts({ includeDrafts: true }).slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    });

    var storedIds = {};
    SW.store.all().forEach(function (p) { storedIds[String(p.id)] = true; });

    var shown = all;
    if (q) {
      shown = all.filter(function (p) {
        var category = SW.categoryBySlug(p.category);
        return [p.title, p.description, (p.tags || []).join(' '), category ? category.name : '']
          .join(' ').toLowerCase().indexOf(q) > -1;
      });
    }

    /* counters at the top of the editor */
    if (F.counters) {
      var st = SW.store.stats();
      F.counters.innerHTML =
        '<span class="badge">' + st.total + ' posts on the site</span>' +
        '<span class="badge badge--ghost">' + st.custom + ' written by you</span>' +
        '<span class="badge badge--ghost">' + st.published + ' published by you</span>' +
        '<span class="badge badge--ghost">' + st.drafts + ' draft' + (st.drafts === 1 ? '' : 's') + '</span>' +
        (st.edits ? '<span class="badge badge--ghost">' + st.edits + ' edited</span>' : '');
    }

    var countLabel = $('[data-post-count]');
    if (countLabel) {
      countLabel.textContent = q
        ? 'Showing ' + shown.length + ' of ' + all.length + ' posts matching “' + query + '”'
        : all.length + ' posts — the twelve starter articles plus anything you have written';
    }

    if (!shown.length) {
      F.list.innerHTML = '<p class="empty-state" style="padding:32px 0">' +
        (q ? 'No posts match that search.'
           : 'Nothing written yet. Fill the form above and press <strong>Publish post</strong>.') +
        '</p>';
      return;
    }

    F.list.innerHTML = shown.map(function (p) {
      var category = SW.categoryBySlug(p.category);
      var isStarter = SW.store.isStarter(p.id);
      var stored = !!storedIds[String(p.id)];
      var isEdit = isStarter && stored;
      var url = 'article.html?slug=' + encodeURIComponent(p.slug);

      var badges =
        '<span class="badge badge--ghost">' + escapeHTML(category ? category.name : p.category) + '</span>' +
        '<span class="badge" style="background:var(--surface-2);color:var(--ink-3)">' +
          (isStarter ? (isEdit ? 'Edited starter' : 'Starter article') : (p.status === 'draft' ? 'Draft' : 'Written by you')) +
        '</span>' +
        (isStarter ? '' : '<span class="badge">' + (p.status === 'draft' ? 'Hidden from visitors' : 'Live on the site') + '</span>');

      return '<div class="post-row" data-row="' + p.id + '">' +
        '<div class="post-row__main">' +
          '<div class="post-row__title">' + escapeHTML(p.title) + '</div>' +
          '<div class="post-row__meta">' + badges +
            '<span class="muted" style="font-size:12.5px">' + escapeHTML(SW.formatDate(p.date)) +
              ' &middot; ' + escapeHTML(p.readingTime) + ' &middot; ' + (p.views || 0) + ' views</span>' +
          '</div>' +
        '</div>' +
        '<div class="post-row__actions">' +
          (p.status === 'draft' ? '' : '<a class="btn btn--outline btn--sm" href="' + url + '">View</a>') +
          '<button class="btn btn--outline btn--sm" data-edit="' + p.id + '">Edit</button>' +
          (stored ? '<button class="btn btn--outline btn--sm" data-delete="' + p.id + '">' +
                      (isStarter ? 'Revert' : 'Delete') + '</button>' : '') +
        '</div>' +
      '</div>';
    }).join('');
  }

  /* ======================================================================
     4. LOAD A POST INTO THE FORM
     ====================================================================== */
  function newPostDefaults() {
    return {
      id: '',
      title: '',
      category: SW.categories[0].slug,
      date: new Date().toISOString().slice(0, 10),
      readingTime: '',
      description: '',
      tags: '',
      image: 'images/post-1.jpg',
      views: 0,
      body: ''
    };
  }

  function fillForm(post) {
    F.id.value = post.id;
    F.title.value = post.title;
    F.category.value = post.category;
    F.date.value = post.date;
    F.readingTime.value = post.readingTime || '';
    F.description.value = post.description || '';
    F.tags.value = Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || '');
    F.image.value = post.image || 'images/post-1.jpg';
    F.views.value = post.views || 0;
    /* starter articles are stored as HTML; custom ones keep their Markdown */
    F.body.value = post.source !== undefined ? post.source : (post.content || '');

    if (F.mode) {
      F.mode.innerHTML = post.id
        ? 'Editing <strong>' + escapeHTML(post.title) + '</strong>' +
          (SW.store.isStarter(post.id) ? ' <span class="muted">(starter post — the original stays safe, you can revert)</span>' : '')
        : 'Writing a new post';
    }

    updateWordCount();
    updatePreview();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function loadPost(id) {
    var stored = SW.store.get(id);
    if (stored) { fillForm(stored); return; }

    var starter = SW.store.starter(id);
    if (starter) { fillForm(starter); return; }

    toast('That post could not be found');
  }

  /* ======================================================================
     5. SAVING
     ====================================================================== */
  function collect(status) {
    var html = SW.mdToHtml(F.body.value);
    var title = F.title.value.trim();

    var post = {
      id: F.id.value ? Number(F.id.value) : SW.store.nextId(),
      title: title,
      slug: SW.uniqueSlug(title || 'untitled', F.id.value),
      category: F.category.value,
      author: SW.profile.name,
      date: F.date.value || new Date().toISOString().slice(0, 10),
      readingTime: F.readingTime.value.trim() || SW.readingTimeFor(html),
      image: F.image.value.trim() || 'images/post-1.jpg',
      imageAlt: title ? 'Cover image for ' + title : 'Cover image',
      description: F.description.value.trim() ||
                   html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).slice(0, 22).join(' ') + '…',
      tags: F.tags.value.split(',').map(function (t) { return t.trim(); }).filter(Boolean),
      likes: Number(F.views.dataset.likes || 0),
      bookmarks: Number(F.views.dataset.bookmarks || 0),
      views: Number(F.views.value) || 0,
      featured: false,
      status: status,                       /* 'published' or 'draft' */
      custom: true,
      source: F.body.value,                 /* keep the Markdown so it can be edited again */
      content: html                         /* what the website displays */
    };

    /* Keep the counts of an existing post when editing it */
    var existing = SW.store.get(post.id) || SW.store.starter(post.id);
    if (existing) {
      post.likes = existing.likes || 0;
      post.bookmarks = existing.bookmarks || 0;
      post.featured = !!existing.featured;
      if (!F.views.value) post.views = existing.views || 0;
    }

    return post;
  }

  function validate() {
    var problems = [];
    if (!F.title.value.trim()) { problems.push('a title'); F.title.focus(); }
    if (!F.body.value.trim()) { problems.push('some content'); }
    return problems;
  }

  function save(status) {
    var problems = validate();
    if (problems.length) {
      toast('Please add ' + problems.join(' and '));
      return;
    }

    var post = collect(status);
    var saved = SW.store.save(post);

    if (!saved) {
      toast('Could not save — this browser\'s storage is full. Try a smaller cover image.');
      return;
    }

    renderList();
    setStatus(status === 'draft' ? 'Saved as a draft — only you can see it.' : 'Published! It is now live on the site.', 'is-ok');
    toast(status === 'draft' ? 'Draft saved' : 'Post published');

    if (status === 'published') {
      /* stay in the editor, but switch into "edit this post" mode */
      F.id.value = post.id;
      fillForm(post);
      renderList();
    }
  }

  function setStatus(message, cls) {
    if (!F.status) return;
    F.status.textContent = message;
    F.status.className = 'form-note ' + (cls || '');
  }

  /* ======================================================================
     6. DELETE / REVERT
     ====================================================================== */
  function remove(id) {
    var isEdit = SW.store.isStarter(id);
    var message = isEdit
      ? 'Revert this post to the original starter version?'
      : 'Delete this post permanently?';

    if (!window.confirm(message)) return;

    SW.store.remove(id);
    renderList();

    if (String(F.id.value) === String(id)) fillForm(newPostDefaults());
    setStatus(isEdit ? 'Post reverted to the original version.' : 'Post deleted.', 'is-ok');
    toast(isEdit ? 'Reverted' : 'Deleted');
  }

  /* ======================================================================
     7. LIVE PREVIEW + WORD COUNT
     ====================================================================== */
  function updateWordCount() {
    if (!F.body) return;
    var words = F.body.value.trim().split(/\s+/).filter(Boolean).length;
    var target = $('[data-word-count]');
    if (target) {
      target.textContent = words + ' words · about ' + SW.readingTimeFor(SW.mdToHtml(F.body.value));
      target.className = 'form-note' + (words < 500 && words > 0 ? '' : '');
    }
  }

  function updatePreview() {
    if (!F.preview) return;
    var html = SW.mdToHtml(F.body.value);
    var title = F.title.value.trim() || 'Your title appears here';

    F.preview.innerHTML =
      '<h1 class="display" style="font-size:34px;margin-bottom:10px">' + escapeHTML(title) + '</h1>' +
      '<p class="lede" style="font-size:16px">' + escapeHTML(F.description.value.trim() || 'A short description appears here.') + '</p>' +
      '<hr class="rule" style="margin:22px 0">' +
      (html || '<p class="muted">Start typing in the editor and your article will appear here, already formatted.</p>');
  }

  /* ======================================================================
     8. COVER IMAGE
     Built-in choices + URL + upload resized in the browser with a canvas,
     which keeps the stored data small enough for localStorage.
     ====================================================================== */
  function buildImagePicker() {
    var wrap = $('[data-image-picker]');
    if (!wrap) return;

    var choices = ['images/post-1.jpg','images/post-2.jpg','images/post-3.jpg','images/post-4.jpg',
                   'images/post-5.jpg','images/post-6.jpg','images/post-7.jpg','images/post-8.jpg',
                   'images/post-9.jpg','images/post-10.jpg','images/post-11.jpg','images/featured.jpg'];

    wrap.innerHTML = choices.map(function (src) {
      return '<button type="button" class="thumb" data-thumb="' + src + '" title="Use this image">' +
             '<img src="' + src + '" alt="" loading="lazy"></button>';
    }).join('');
  }

  function handleUpload(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { toast('Please choose an image file'); return; }

    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        /* resize to a maximum of 900px wide so the saved data stays small */
        var max = 900;
        var scale = Math.min(1, max / img.width);
        var canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
          F.image.value = canvas.toDataURL('image/jpeg', 0.78);
          toast('Image uploaded and resized');
        } catch (err) {
          toast('Could not read that image');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  /* ======================================================================
     9. EXPORT / IMPORT
     ====================================================================== */
  function exportPosts() {
    var data = SW.store.exportJSON();
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'shivansh-writes-posts.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Backup downloaded');
  }

  function importPosts(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      var count = SW.store.importJSON(e.target.result, 'merge');
      if (count < 0) { toast('That file could not be read as a post backup'); return; }
      renderList();
      toast(count + ' post(s) imported');
    };
    reader.readAsText(file);
  }

  /* ======================================================================
     10. START-UP
     ====================================================================== */
  function init() {
    /* the editor is only present on editor.html */
    if (!$('[data-field="title"]')) return;

    cacheFields();
    buildCategories();
    buildImagePicker();
    renderList();

    /* Buttons */
    F.form.addEventListener('submit', function (e) {
      e.preventDefault();                 /* stop the browser from reloading the page */
      save('published');
    });

    $('[data-action="publish"]').addEventListener('click', function () { save('published'); });
    $('[data-action="draft"]').addEventListener('click', function () { save('draft'); });
    $('[data-action="new"]').addEventListener('click', function () {
      fillForm(newPostDefaults());
      setStatus('', '');
    });
    $('[data-action="preview-toggle"]').addEventListener('click', function () {
      var box = $('[data-preview-wrap]');
      box.style.display = box.style.display === 'none' ? '' : 'none';
      updatePreview();
    });
    $('[data-action="export"]').addEventListener('click', exportPosts);

    var listSearch = $('[data-post-search]');
    if (listSearch) {
      listSearch.addEventListener('input', function () { renderList(this.value); });
    }

    var importInput = $('[data-import-input]');
    $('[data-action="import"]').addEventListener('click', function () { importInput.click(); });
    importInput.addEventListener('change', function () { importPosts(this.files[0]); this.value = ''; });

    $('[data-action="reset"]').addEventListener('click', function () {
      if (!window.confirm('Remove ALL posts written in this browser? The twelve starter articles stay.')) return;
      SW.store.clear();
      renderList();
      fillForm(newPostDefaults());
      toast('Editor data cleared');
    });

    /* Live typing */
    ['input', 'change'].forEach(function (evt) {
      F.body.addEventListener(evt, function () { updateWordCount(); updatePreview(); });
      F.title.addEventListener(evt, updatePreview);
      F.description.addEventListener(evt, updatePreview);
    });

    /* Cover image */
    var upload = $('[data-upload]');
    upload.addEventListener('change', function () { handleUpload(this.files[0]); this.value = ''; });

    document.addEventListener('click', function (e) {
      var thumb = e.target.closest('[data-thumb]');
      if (thumb) {
        F.image.value = thumb.getAttribute('data-thumb');
        $$('[data-thumb]').forEach(function (b) { b.classList.remove('is-active'); });
        thumb.classList.add('is-active');
        toast('Cover image set');
        return;
      }

      var editBtn = e.target.closest('[data-edit]');
      if (editBtn) { loadPost(editBtn.getAttribute('data-edit')); return; }

      var delBtn = e.target.closest('[data-delete]');
      if (delBtn) { remove(delBtn.getAttribute('data-delete')); }
    });

    /* Simple formatting buttons that wrap the selected text */
    $$('[data-md]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var before = btn.getAttribute('data-before');
        var after = btn.getAttribute('data-after');
        var start = F.body.selectionStart;
        var end = F.body.selectionEnd;
        var selected = F.body.value.slice(start, end) || btn.getAttribute('data-sample') || '';
        F.body.setRangeText(before + selected + after, start, end, 'end');
        F.body.focus();
        updateWordCount();
        updatePreview();
      });
    });

    /* Start in "new post" mode, or open ?edit=<id> directly */
    var editId = new URLSearchParams(window.location.search).get('edit');
    if (editId && (SW.store.get(editId) || SW.store.starter(editId))) {
      loadPost(editId);
    } else {
      fillForm(newPostDefaults());
    }

    /* keyboard shortcut: Ctrl/Cmd + S saves as a draft */
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        save('draft');
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
