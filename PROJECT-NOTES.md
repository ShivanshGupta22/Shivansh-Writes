# Viva / demo notes — how to explain this project

Keep this open while presenting. Everything is written the way you would say it out loud.

---

## 30-second introduction

> "This is a personal blogging website called **Shivansh Writes**. It is a data-driven static
> front-end project built with HTML5, CSS3 and vanilla JavaScript — no Bootstrap, no React,
> no back-end. All the content lives as JavaScript objects in `js/data.js` and the three
> article files. `render.js` reads that data and builds every page, and `site.js` handles the
> interactions: search, category filters, likes, bookmarks, dark mode, form validation and the
> reading-progress bar."

---

## The five things most likely to be asked

### 1. "Where is the data? Show me the structure."
> "In `js/data.js` — a profile object, seven category objects, three project objects and four
> social link placeholders. The twelve articles are in `js/articles-1.js`, `articles-2.js` and
> `articles-3.js`. Each article is an object with id, slug, title, category, author, date,
> readingTime, image, description, tags, likes, bookmarks, views and the full content. Those
> field names are deliberately the same as the columns a database table would have."

### 2. "If you had to add a new article, how long would it take?"
> "About a minute. I copy one object, change the values, paste it at the end of the array and
> save — nothing in the HTML changes. The home page, blog grid, filter chips, counts,
> categories page, search and related articles all pick it up automatically."
> *(Then actually do it live — it is the most convincing answer in the whole demo.)*

### 3. "How does search work? What does it search?"
> "Title, description, category name and tags. `SW.render.search()` builds one lowercase
> string per article from those four fields and tests whether it contains the query, then
> re-sorts the matches newest first. `Ctrl + K` opens the overlay, `Esc` closes it. If nothing
> matches it prints 'No articles found. Try searching for another topic.'"

### 4. "How are related articles chosen?"
> "A small scoring function. Every other article starts at zero; if it shares the category it
> gets 10 points, and every shared tag adds 3. Then I sort by score, and on a tie the newer
> article wins, and return the top three. It is a simple ranking, but it always produces
> something relevant."

### 5. "Where is the database / back-end?"
> "There isn't one — this is a front-end project, and the data is structured so a back-end can
> be added later without redesigning anything. The natural next step would be Node with
> Express and a database returning the same JSON shape, with the rendering code unchanged."

---

## Table of specific questions → short answers

| If they ask… | Say this |
|---|---|
| **Why didn't you use Bootstrap or React?** | "I needed exact control over an editorial design, and writing the CSS and DOM code myself demonstrates that I understand Flexbox, CSS Grid, media queries and DOM scripting." |
| **What are the files in `js/`?** | "`data.js` and `articles-*.js` are the content; `render.js` is the view layer that builds the HTML; `site.js` is the interaction layer." |
| **How do likes and bookmarks work?** | "Each article has a starting count in the data. On click I add or remove the article's id in an array in `localStorage` and repaint every element that shows that counter — so it goes up by one when you like it and back when you undo it." |
| **What is event delegation?** | "Instead of attaching a listener to every like button, I attach one listener to the document and check which button the click came from with `closest()`. It works for cards that are created after the page has loaded." |
| **Why cache the theme in `localStorage`?** | "So the choice survives a reload: the script reads `sw-theme` on load and sets `data-theme=\"dark\"` on the `<html>` element before the page settles." |
| **How does the table of contents appear?** | "It is generated from the `<h2>` headings inside the article content, so it can never go out of sync. A scroll listener highlights whichever section is at the top of the viewport." |
| **What is the thin bar at the very top?** | "The reading-progress indicator. It is `position: fixed`, and its width is set to how far the page has been scrolled, in percent." |
| **How do you validate the form without a server?** | "On submit I test each field against a rule — required, a regular expression for email, a minimum length for the message — write an error under the field that fails, and show a confirmation when everything passes." |
| **How does the category filter work?** | "The chips are generated from the category data; each card carries `data-category` with its slug, so the filter just shows or hides cards and updates the 'Showing X of 12' label. It also reads `?category=` so a filtered view can be shared as a link." |
| **Is it responsive?** | "Three breakpoints — 1100px, 1024px and 760px. Cards go 3 → 2 → 1 per row, the navigation becomes a hamburger menu, and the table of contents moves from a sticky column to chips." |
| **Is it accessible?** | "Semantic tags, alt text on every image, `aria-label` on icon-only buttons, `aria-pressed` on the like and save buttons, `aria-current` for the active nav link, visible focus rings, and a `prefers-reduced-motion` rule that disables animation on request." |
| **Why is the text dark grey on cream, not black on white?** | "Design decision — `#1c1b1b` on `#fcf9f8` is easier to read at length and it makes the page feel like paper." |
| **What is in `localStorage`?** | "Three keys: `sw-likes`, `sw-bookmarks` and `sw-theme`." |
| **How does creating a post work?** | "The editor collects the fields, `SW.uniqueSlug()` makes a URL-friendly slug from the title, `SW.readingTimeFor()` calculates the reading time from the word count, and `SW.mdToHtml()` converts the plain-text writing into the same HTML the starter articles use. Then `SW.store.save()` writes it to `localStorage` and the page re-renders." |
| **How is editing an existing article possible?** | "A saved post with the same id as a starter article replaces it when the lists are merged — so the edit is live everywhere, but the original file is untouched. The list marks it 'Edited starter' and gives a Revert button that just deletes my version." |
| **Why Markdown instead of HTML in the editor?** | "Writing `##` and `-` is far quicker than typing tags, and the parser is only about sixty lines. Any text that already starts with `<` is passed through untouched, which is exactly how the twelve starter articles keep working." |
| **What happens to a draft?** | "It is stored with `status: 'draft'` and `SW.allPosts()` filters drafts out of everything the public sees — home, blog, categories, search, related articles. It still appears in my editor list marked 'Hidden from visitors'." |
| **What if two posts have the same title?** | "`SW.uniqueSlug()` checks the existing slugs and appends `-2`, `-3` and so on, so links never collide." |
| **Is the editor safe?** | "It is a personal writing tool, not a public admin panel — there is no login because there is no server to protect. Anyone using the same browser could edit the posts, which is why a real deployment would put this behind authentication on a back-end." |
| **Why are some fields blank (email, GitHub, city)?** | "Deliberate. I did not want to publish invented personal details, so those values are empty in `data.js` and the page prints a clearly marked 'add your link in js/data.js' placeholder instead." |

---

## Live demo order (about 4 minutes)

1. **Home** — point out that every number ("12+ essays", "7 disciplines", total reads,
   "Issue No. 12") is calculated from the data, not typed in.
2. **Search** — press `Ctrl + K`, type `Java`, then type nonsense to show the empty message.
3. **Blog** — click a category chip; show the label change and `?category=` in the URL.
4. **Article** — open any card; scroll to show the progress bar and the table of contents
   highlighting each section; click the heart (count goes 42 → 43) and the bookmark; scroll to
   the bottom for three related articles that changed with the article.
5. **Categories / About** — show the counts and that the 3 projects and 9 skills come from data.
6. **Dark mode** — toggle it, reload the page to show the preference was remembered.
7. **THE KILLER DEMO** — open the **Write** page, type a title and a couple of paragraphs with a
   `##` heading, press **Publish post**, then jump to Home → Blog → Search → the article page.
   Everything updates instantly. Then press **Edit** on one of the twelve starter articles,
   change a word, publish, and show the change live — then **Revert** it and show that the
   original came back untouched. Finish with **Export backup (.json)** to prove the work is
   portable, and **Clear editor data** to reset the site before the next demo.
8. **Alternative (code) demo** — open `js/articles-3.js`, paste a new article object, save,
   refresh, and show it appear automatically on the home page, the blog, the filter counts
   and search.

---

## Honest limitations to admit if asked

- Only a front-end: no server, no database, no login. Posts written in the Write page are
  stored in the browser (`localStorage`), so they are not shared between devices unless you
  export and import the JSON backup.
- The contact and newsletter forms validate but do not send an email.
- Like, bookmark and view numbers are demo values; likes and bookmarks change only in your own
  browser.
- Images are placeholders (AI-generated) rather than real photographs.
- Search is client-side over the 12 starter articles plus your own — fine at this size, but a
  server would be needed at a thousand.
- The editor has no login, because there is no server to protect; on a real deployment this
  page would sit behind authentication.

---

## What could be added next

1. A real back-end (Node + Express + database) returning the same JSON shape.
2. Working newsletter and contact endpoints.
3. A small admin page to write articles in Markdown instead of editing JavaScript.
4. Pagination, sorting and an RSS feed generated from the article array.
5. Comments, and per-user accounts instead of `localStorage`.
6. Moving the Write page's data to a real API (the only file that would change is `store.js`).
