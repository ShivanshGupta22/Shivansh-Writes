# Shivansh Writes — a data-driven personal blogging website

A **personal blog by Shivansh Gupta**, a computer science student. Built with plain
**HTML5, CSS3 and JavaScript** — no frameworks, no libraries, no back-end and no database.

The whole website is **data-driven**: the HTML pages contain only empty containers, and every
article, category, project, statistic and count is rendered by JavaScript from a small
content layer held in `js/data.js` and `js/articles-*.js`. That means a new article is added
by writing **one object** — not by editing six HTML files.

The design is unchanged: Playfair Display headings, Plus Jakarta Sans body text, a warm cream
canvas (`#fcf9f8`), sage green accents (`#4f614b`), hairline borders and restrained corners.

---

## 1. How to open the project

**Easiest** — double-click `index.html`. Everything works offline (fonts and images are inside
the folder).

**Recommended for a demo** — run a tiny local server so the URLs behave exactly like a real site:

```bash
cd shivansh-writes
python3 -m http.server 8000
# open http://localhost:8000
```

---

## 2. Folder structure

```
shivansh-writes/
│
├── index.html          Home: hero, featured story, latest 6, popular 3, 7 categories, author, newsletter
├── editor.html         Write page: create / edit / delete / draft posts, live preview, backup
├── blog.html           All 12 articles + category filter chips
├── article.html        One article (?slug=...) with table of contents and related articles
├── categories.html     All 7 categories + recent articles
├── about.html          Profile, currently learning, skills, 3 projects, social links
├── contact.html        Validated contact form + contact channels
│
├── css/style.css       The complete stylesheet (17 commented sections) — design unchanged
│
├── js/
│   ├── data.js         PROFILE + CATEGORIES + PROJECTS + SOCIAL PLACEHOLDERS
│   ├── articles-1.js   Articles 1–4   (full 500–800 word content each)
│   ├── articles-2.js   Articles 5–8
│   ├── articles-3.js   Articles 9–12
│   ├── store.js        WRITE layer — saves your posts in localStorage and merges them with the starters
│   ├── render.js       VIEW layer — builds every page from the data
│   ├── site.js         INTERACTION layer — likes, bookmarks, search, filters, theme, forms
│   └── editor.js       The Write page only: form, live preview, Markdown, backup
│
├── fonts/              fonts.css + 8 .woff2 files (works offline)
├── images/             12 JPEGs (hero photo, avatar, 12 article covers — see §7)
├── README.md           this file
└── PROJECT-NOTES.md    viva / demo notes
```

**Load order**: `data.js → articles-1.js → articles-2.js → articles-3.js → store.js →
render.js → site.js`, plus `editor.js` on the Write page only.

### Two kinds of content

| | Where it lives | How it gets there |
|---|---|---|
| **Starter articles** (the 12 you supplied) | `js/articles-1/2/3.js` | written in the code, permanent |
| **Your posts** (created in the Write page) | browser `localStorage` under `sw-posts` | the editor |

Both are merged by `SW.allPosts()` before anything renders, so a post you write behaves
exactly like a starter article everywhere: home page, blog grid, category counts, search,
its own article page with a table of contents, and related articles.

---

## 3. The data model

Everything mirrors the columns of a database table, so this exact data could later be served
from an API or a `.json` file without touching the markup.

**Article object** (12 of these):

| field | example | used by |
|---|---|---|
| `id` | `1` | likes / bookmarks in `localStorage`, related articles |
| `slug` | `'my-journey-into-programming'` | the URL: `article.html?slug=...` |
| `title` | `'My Journey Into Programming'` | cards, headings, search, `<title>` |
| `category` | `'programming'` | filter chips, category counts, related articles |
| `author` | `'Shivansh Gupta'` | article meta row |
| `date` | `'2026-09-28'` (ISO, so sorting works) | "newest first" everywhere |
| `readingTime` | `'5 min read'` | cards + article header |
| `image`, `imageAlt` | `'images/post-1.jpg'` | cards + article cover |
| `description` | one-line summary | cards, previews, search |
| `tags` | `['Programming','Learning','Student Life','Java']` | search + related articles |
| `likes`, `bookmarks`, `views` | `42`, `18`, `326` | counters (likes/saves update live) |
| `featured` | `true` on exactly one article | the home-page featured story |
| `featuredNote` | *optional* longer blurb | shown on the big featured card instead of `description` |
| `content` | the full article as simple HTML | the reading page |

Also in `data.js`: `SW.profile` (name, tagline, bio, about, currentlyLearning, skills),
`SW.categories` (7 records with slug, name, description, icon), `SW.projects` (3 records) and
`SW.social` (4 placeholder links).

**Nothing is duplicated:** category counts, the hero statistics ("12+ essays", "7 disciplines",
total reads) and the "Issue No. 12" line are all **calculated** from the articles array, so
they can never disagree with the content.

---

## 4. How to add a new article (the important bit)

Open `js/articles-3.js`, copy any object, and paste this at the end of the list:

```js
{
  id: 13,                                    // must be unique
  slug: 'learning-spring-boot-for-real',
  title: 'Learning Spring Boot For Real',
  category: 'programming',                   // must match a slug in SW.categories
  author: 'Shivansh Gupta',
  date: '2026-10-04',
  readingTime: '5 min read',
  image: 'images/post-4.jpg',
  imageAlt: 'A book and a laptop on a desk',
  description: 'What changed when I stopped following tutorials and built an API.',
  tags: ['Java', 'Spring Boot', 'Backend'],
  likes: 0, bookmarks: 0, views: 0,
  featured: false,
  content: `
    <p>Opening paragraph…</p>
    <h2 id="section-one">First section</h2>
    <p>Body text…</p>
  `
}
```

Save and refresh. Automatically: the home page (latest + featured if you set `featured: true`),
the blog grid, the filter chips and their counts, the categories page, the search index, the
article page, its table of contents and the related-articles list all pick it up. **No HTML
file is edited.**

---

## 5. The Write page (create / edit / delete posts)

Open **Write** in the navigation (or `editor.html`).

### Create
1. Type a **title** and the **article body** in the big box.
2. Write in plain text — `##` makes a section heading, `-` makes a bullet list, `> ` makes a
   quote, triple backticks make a code block, `**bold**`, `*italic*`, `` `code` ``
   and `[link](url)` all work. There is a toolbar above the box that inserts them for you.
3. Watch the **live preview** as you type. The word count and reading time update themselves
   (about 200 words per minute, exactly like a real blog).
4. Choose the **category**, date, short description, tags and a **cover image**
   (pick one of the twelve built-in images, paste a path/URL, or upload your own — it is
   resized in the browser so it stays small).
5. Press **Publish post**. It is instantly on the home page, the blog, the categories
   count and search. Press **Save as draft** instead and only you can see it.

### Edit
The **Your posts** list at the bottom of the Write page shows **every** article — the twelve
starter ones included — and it has its own search box. Press **Edit** on any of them,
change what you like, and publish:

* editing a **starter** article stores an override, so the original file is never touched and
  the article is replaced (not duplicated) across the whole site — the list marks it
  *Edited starter* and gives you a **Revert** button
* editing **your own** post simply updates it

### Delete
Press **Delete** on a post you wrote (it asks for confirmation first). Drafts, published posts
and edits can all be removed; reverting an edited starter article restores the original text.

### Backup
Because the posts live in your browser, the Write page has **Export backup (.json)** and
**Import backup** buttons — download your work, keep the file safe, and load it again on
another computer or after clearing browser data. **Clear editor data** removes everything you
wrote but keeps the twelve starter articles, so the site can always be reset to its
original state before a demo.

### Keyboard shortcuts
`Ctrl / Cmd + S` saves a draft · `Ctrl / Cmd + K` opens search · `Esc` closes search.

---

## 6. Features, and where they live

| Feature | Where | Notes |
|---|---|---|
| Data-driven pages | `render.js` + `store.js` | card, category, project and social HTML templates built once and reused |
| **Search** | `site.js` → `SW.render.search()` | searches **title, description, category and tags**, then the article body; `Ctrl/Cmd + K` opens it, `Esc` closes it |
| **Create / edit / delete posts** | `editor.js` + `store.js` | saved in `localStorage` under `sw-posts` |
| **Category filter** | `site.js` → `initFilters()` | chips generated from `SW.categories`; also supports `blog.html?category=ai` and `blog.html?search=Java` |
| **Like counter** | `site.js` → `initReactions()` | count goes up on click, down on second click; liked ids in `localStorage` (`sw-likes`) |
| **Bookmark** | same | saved ids in `localStorage` (`sw-bookmarks`) |
| **Dark mode** | `site.js` → `initTheme()` | preference in `localStorage` (`sw-theme`) |
| **Reading progress** | `site.js` → `initProgress()` | thin sage bar fixed at the top; width = scroll % |
| **Table of contents** | `render.js` + scroll spy in `site.js` | generated from the `<h2>`s, highlights the section you are reading |
| **Related articles** | `render.js` → `R.related()` | scores every other article: same category +10, each shared tag +3; shows the best 3 |
| **Popular articles** | `render.js` → `R.popular(3)` | top 3 by `views` |
| Validation | `site.js` → `initForms()` | regex email check + required/min-length rules |

**Search examples from the brief:**

| you type | you get |
|---|---|
| `Java` | My Journey Into Programming · HTML, CSS and JavaScript: Where Should You Start? · What I Want to Build Next |
| `project` | 6 project-related articles |
| `AI` | My First Steps Into Artificial Intelligence · Understanding Generative AI as a Student · … |
| `sql` | From College Assignment to Real Project (matched by **tag**) |
| anything unmatched | **"No articles found. Try searching for another topic."** |

---

## 7. Placeholders you should fill in later

To keep the site honest, nothing personal was invented. These fields are intentionally blank
and every page prints a clearly marked placeholder instead:

| What | Where | Currently shows |
|---|---|---|
| Email | `js/data.js` → `profile.email` and `social` (Email) | *add your link in js/data.js* |
| GitHub / LinkedIn / Instagram | `js/data.js` → `social[].url` and `.handle` | *add your link in js/data.js* |
| City | `js/data.js` → `profile.location` | *add your city in js/data.js* |
| Your photo | replace `images/avatar.jpg` (and `images/hero-student.jpg` for the hero) | AI-generated placeholder portrait |
| Project links | `js/data.js` → `projects[].link` | empty |

Fill one value in `data.js` and it appears in the footer, the contact page, the about page and
the article author box at once.

---

## 8. Images

12 article covers + 1 hero photo + 1 avatar = 14 files in `images/`. Two covers are used twice
by design (the blog has 12 articles and 12 distinct covers, so no repeats currently); all are
compressed to keep the whole project around 1.2 MB. Every image is a **placeholder** — swap
the file, keep the filename, and nothing else changes.

---

## 9. Techniques worth mentioning in a viva

- **Separation of concerns**: data (`data.js`, `articles-*.js`) → view (`render.js`) →
  behaviour (`site.js`). Changing content never means touching layout code.
- **CSS custom properties** in `:root` for the whole palette; dark mode simply re-declares
  them under `[data-theme="dark"]`.
- **Flexbox** for one-dimensional rows, **CSS Grid** for the card grids and the
  article + table-of-contents layout.
- **Event delegation** in `site.js`: one click listener handles like/bookmark buttons on every
  card, including cards rendered later.
- **A tiny Markdown parser** (`SW.mdToHtml`, about 60 lines) so articles can be written as
  plain text and are converted to the HTML the site already used.
- **A merge/sync step** (`SW.allPosts()`): starter data + browser-stored posts are combined by
  id, which is what makes "edit a published article" possible on a static site.
- **`localStorage`** for likes, bookmarks and the theme, wrapped in `try/catch` because it can
  throw in private browsing.
- **`URLSearchParams`** so `?slug=`, `?category=` and `?search=` links are shareable.
- **`IntersectionObserver`** for the fade-in animation (with a fallback that shows everything).
- Accessibility: semantic tags, `alt` text, `aria-label` on icon buttons, `aria-pressed` on
  like/save buttons, `aria-current` for the active nav link, visible focus rings, and
  `prefers-reduced-motion` support.

---

## 10. What is not included (honest limitations)

- No back-end, database or CMS. The twelve starter articles live in JavaScript objects; posts
  written in the Write page live in **your browser's localStorage**, so they appear only on
  the computer where you wrote them (export the JSON backup to move them). The next step
  would be Node/Express + a database returning exactly the same field names, at which point
  `store.js` is the only file that changes.
- The contact and newsletter forms validate input and show a confirmation, but do not send
  anything (there is no server).
- Search is client-side over the 12 articles in `data.js`.
- Like/bookmark/view numbers are realistic demo values; likes and bookmarks change only in the
  visitor's own browser.

---

## 11. Credits

- Design system and layout: supplied design reference.
- Typefaces: **Playfair Display** and **Plus Jakarta Sans** (Google Fonts, Open Font License),
  downloaded locally so the site works offline.
- All written content, and the placeholder images, were created for this project.
