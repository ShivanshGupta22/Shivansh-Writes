/* ==========================================================================
   SHIVANSH WRITES  —  js/articles-1.js
   --------------------------------------------------------------------------
   Articles 1 – 4 of 12.

   Each object mirrors one row of a "posts" table:

     id            unique number (never reused)
     slug          URL-friendly name, used as article.html?slug=...
     title         headline shown everywhere
     category      must match a "slug" in SW.categories
     author        shown on the article page
     date          ISO format (YYYY-MM-DD) so it can be sorted properly
     readingTime   short human string
     image         cover image path
     imageAlt      accessibility text
     description   one or two line summary used on cards, search and previews
     tags[]        used by search and by "related articles"
     likes/bookmarks/views  demo numbers (likes & bookmarks update live)
     featured      true for the single hero article on the home page
     content       the full article body, written as simple HTML
   ========================================================================== */

window.SW.articles.push(

/* ------------------------------- ARTICLE 1 ------------------------------- */
{
  id: 1,
  slug: 'my-journey-into-programming',
  title: 'My Journey Into Programming',
  category: 'programming',
  author: 'Shivansh Gupta',
  date: '2026-09-28',
  readingTime: '5 min read',
  image: 'images/post-1.jpg',
  imageAlt: 'Hands typing code on a laptop at a wooden desk',
  description:
    'How I started learning programming, the challenges I faced and what keeps me motivated to continue.',

  /* Longer blurb used only by the big featured card on the home page (section 5 of the brief) */
  featuredNote:
    'Programming started as a subject I had to learn, but slowly became something I genuinely ' +
    'enjoy exploring. From writing simple programs to building complete projects, every step has ' +
    'taught me something new.',
  tags: ['Programming', 'Learning', 'Student Life', 'Java'],
  likes: 42, bookmarks: 18, views: 326,
  featured: true,

  content: `
<p>
  Programming started as a subject I had to learn, but slowly became something I
  genuinely enjoy exploring. Looking back, I do not remember a dramatic moment where
  everything clicked. It was a series of small wins — a program that finally ran, an
  error I finally understood, a feature that finally worked.
</p>

<h2 id="how-it-started">How it actually started</h2>
<p>
  My first proper program was a simple calculator in C. It took me an entire evening and
  at least thirty compile attempts. When it finally printed the right answer, I remember
  staring at the terminal for a few seconds, slightly shocked that I had made the
  computer do something. That feeling is still the reason I enjoy this field.
</p>
<p>
  For a few months, though, I was learning in a very scattered way — a video here, a
  random blog there, occasionally copying code I did not understand at all. It felt like
  progress because I was always busy, but I wasn't really building anything.
</p>

<h2 id="the-hard-part">The part nobody warns you about</h2>
<p>
  The hard part was not syntax. It was the silence. When you are stuck, there is no
  teacher standing next to you explaining what a <code>NullPointerException</code> means.
  You sit with an error message, read it four times, search it, and slowly learn to read
  what the computer is actually complaining about.
</p>
<p>
  Two things helped me get through that phase:
</p>
<ul>
  <li><strong>Reading error messages properly.</strong> Most of them tell you the exact line and the exact reason. I used to ignore them and guess. Guessing is slower.</li>
  <li><strong>Small programs, finished.</strong> Five small working programs taught me more than one ambitious project that I abandoned halfway.</li>
</ul>

<h2 id="first-useful-thing">The first time code did something useful</h2>
<p>
  In my first semester I wrote a script that took our messy class timetable spreadsheet and
  printed it in a clean, readable format. It was twenty lines long. My classmates actually
  used it. That tiny script changed how I saw programming — it was not an exam subject
  anymore, it was a tool that solved a real annoyance.
</p>

<h2 id="mistakes">Mistakes I made along the way</h2>
<p>
  I hopped between languages too quickly. I spent a week on Python, then jumped to Java
  because someone said it was better, then to C++ because another person said it was
  faster. Each switch reset my comfort level, and I learned very little in that month.
  Later I understood that the concepts — loops, functions, arrays, objects — travel with
  you between languages. The syntax is the easy part.
</p>
<p>
  I also avoided reading documentation for far too long. Official documentation looks
  intimidating until you realise it is just organised information, and it is usually more
  accurate than the forum answer you found from 2014.
</p>

<h2 id="what-keeps-me-going">What keeps me going now</h2>
<p>
  Curiosity, mostly. These days I am learning Java and Spring Boot on the backend side,
  along with data structures, because I want to understand what happens after a request
  leaves the browser. Writing about it here helps too — when I try to explain a concept
  in an article, I immediately discover the parts I only half-understood.
</p>
<p>
  If you are just starting out, my advice is unglamorous: pick one language, build small
  things, read the error messages, and keep going for longer than feels comfortable.
  Progress in programming is quiet, but it is real.
</p>
`
},

/* ------------------------------- ARTICLE 2 ------------------------------- */
{
  id: 2,
  slug: 'what-i-learned-building-my-first-real-project',
  title: 'What I Learned From Building My First Real Project',
  category: 'projects',
  author: 'Shivansh Gupta',
  date: '2026-09-24',
  readingTime: '6 min read',
  image: 'images/post-2.jpg',
  imageAlt: 'A student desk with a laptop showing a terminal window',
  description:
    'The biggest lessons I learned while turning an idea into a working project.',
  tags: ['Projects', 'Development', 'Learning'],
  likes: 35, bookmarks: 14, views: 271,
  featured: false,

  content: `
<p>
  Tutorials make you feel capable. Building something on your own makes you feel
  completely lost, and then — gradually — capable for real. My first proper project was a
  small journaling web application, and it taught me more in three weeks than a semester
  of lectures had.
</p>

<h2 id="the-idea">Starting with a problem, not a technology</h2>
<p>
  My original plan was vague: "make something with JavaScript". That went nowhere for two
  weeks. What finally worked was starting from a problem I actually had — I kept losing
  my study notes across notebooks, WhatsApp messages and random text files. A single
  place to write a daily entry became the project.
</p>
<p>
  Choosing the problem first also settled the technology question on its own. I needed a
  page, a form, storage and a way to list past entries. That is HTML, CSS, JavaScript and
  a database — no more, no less.
</p>

<h2 id="scope">Lesson one: scope is everything</h2>
<p>
  My first feature list had twelve items: authentication, tags, search, reminders, charts,
  dark mode, daily streaks, export to PDF and so on. My second list had three: write an
  entry, save it, see the list. The three-item version actually shipped.
</p>
<p>
  I now write features down under three headings:
</p>
<ul>
  <li><strong>Must have</strong> — the app is useless without it.</li>
  <li><strong>Nice to have</strong> — I will add it after the must-haves work.</li>
  <li><strong>Later</strong> — a polite way of saying "probably never".</li>
</ul>

<h2 id="edge-cases">Lesson two: the edge cases are the project</h2>
<p>
  The happy path took me two days. The next two weeks were edge cases: What happens if the
  entry is empty? What if the date is today but the user saved it after midnight? What if
  the internet drops while saving? What if someone pastes a 5,000-word entry?
</p>
<p>
  Handling those cases is what turned a demo into something I could actually rely on.
  It was also the least glamorous work, which is exactly why it is worth talking about.
</p>

<h3>Getting a second pair of eyes</h3>
<p>
  For the first two weeks nobody except me looked at the project, which is exactly why it
  took me so long to notice that my save button quietly failed when the text box contained
  only spaces. A classmate clicked it twice and broke it in ten seconds.
</p>
<p>
  All the edge cases I had missed were the ones I never thought to try, and the fastest way
  to find them was to watch someone else use the thing without helping them. Showing
  unfinished work is uncomfortable, and it is also the quickest feedback loop a student has.
</p>

<h2 id="bugs">Lesson three: debugging is a skill, not a delay</h2>
<p>
  In the beginning a bug felt like a personal insult. Now I treat it as information.
  My routine is boring and effective: reproduce it twice, read the console, print the
  value I think is correct, and use <code>console.log()</code> until the wrong assumption
  shows itself. Nine times out of ten the bug is in the data, not in the logic.
</p>

<h2 id="finishing">Lesson four: finished beats perfect</h2>
<p>
  My project is not impressive to look at. The styling is simple, the code has
  inconsistencies, and there is one function I am genuinely afraid to touch. But it works,
  I use it, and I understand every part of it — because I built it in small pieces instead
  of copying a finished template.
</p>
<p>
  That is the real return on a first project: not the product, but the fact that you can
  now picture the whole pipeline from the button click to the saved row in the database.
  That picture is what makes the next project easier.
</p>
`
},

/* ------------------------------- ARTICLE 3 ------------------------------- */
{
  id: 3,
  slug: 'why-every-computer-science-student-should-learn-git',
  title: 'Why Every Computer Science Student Should Learn Git',
  category: 'programming',
  author: 'Shivansh Gupta',
  date: '2026-09-20',
  readingTime: '4 min read',
  image: 'images/post-7.jpg',
  imageAlt: 'A laptop displaying a terminal window on a wooden desk',
  description:
    'Understanding why version control matters and how Git changed the way I manage my coding projects.',
  tags: ['Git', 'GitHub', 'Programming', 'Version Control'],
  likes: 58, bookmarks: 29, views: 412,
  featured: false,

  content: `
<p>
  For my first year of coding, version control meant copying a folder and renaming it
  <em>project_final_v2_actual_final</em>. It worked, in the same way that saving money
  under a mattress works. Then I lost two days of work to a bad edit, and I finally
  learned Git.
</p>

<h2 id="why-bother">Why it actually matters</h2>
<p>
  Git is not just a backup. It is a record of decisions. When something breaks, Git lets
  you answer "what changed?" instead of "what did I touch?". That question is the
  beginning of every debugging session.
</p>
<p>
  It also changes how you work with other people. In a group project, two people editing
  the same file used to mean an email thread and a broken build. Now it means a branch
  and a pull request.
</p>

<h2 id="first-commands">The five commands I use every single day</h2>
<pre><code>git status              # what have I changed?
git add .               # stage the changes
git commit -m "Fix: empty journal entry crash"
git pull                # bring in my teammate's work
git push                # send my work to GitHub</code></pre>
<p>
  That is genuinely most of it. Everything else — branching, rebasing, stashing — is
  useful, but you can learn it later without guilt. The five commands above already put
  you ahead of a large number of students.
</p>

<h2 id="habits">Small habits that made Git click</h2>
<ul>
  <li><strong>Commit often.</strong> One commit per logical change, not one per week. A commit message like "add login form" is far more useful than "update".</li>
  <li><strong>Write messages as instructions.</strong> "Fix: crash when entry is empty" reads like a sentence about the code, and it still makes sense three months later.</li>
  <li><strong>Pull before you start working.</strong> It saves fifteen minutes of merge pain later.</li>
</ul>

<h3>Three mistakes that cost me a repository</h3>
<p>
  I once committed a database password into a public repository and had to change it at
  midnight. I once ran <code>git reset --hard</code> without reading what it does to
  uncommitted work. And during my first merge conflict I deleted both versions and rewrote
  the file, which is technically a solution and definitely the wrong one.
</p>
<p>
  None of those were Git's fault. Each one came from typing a command I had copied from a
  forum without reading the sentence that explained it. My habit now is boring and useful:
  commit before trying anything unfamiliar, and read what a command will do to my files
  before I press Enter.
</p>

<h2 id="github">What GitHub adds</h2>
<p>
  GitHub is not Git — it is a place to keep Git repositories and collaborate around them.
  For a student, the useful parts are the commit history (it shows how you work), the
  README file (it explains a project to a stranger in one screen), and issues, which are
  a surprisingly good place to keep your own to-do list.
</p>
<p>
  Recruiters and seniors do look at GitHub profiles, but I would not start there. Start
  because it makes your own work safer. The visibility is a side effect.
</p>

<h2 id="start-today">If you have not started yet</h2>
<p>
  Take any project you already have, run three commands in its folder, and create your
  first commit tonight. The first time you type <code>git log</code> and see your own
  history listed line by line, version control stops being a formality and becomes a tool
  you actually want to use.
</p>
`
},

/* ------------------------------- ARTICLE 4 ------------------------------- */
{
  id: 4,
  slug: 'my-first-steps-into-artificial-intelligence',
  title: 'My First Steps Into Artificial Intelligence',
  category: 'artificial-intelligence',
  author: 'Shivansh Gupta',
  date: '2026-09-17',
  readingTime: '7 min read',
  image: 'images/post-3.jpg',
  imageAlt: 'Illustration of connected glowing nodes on warm paper texture',
  description:
    'My beginner journey into AI, what I initially misunderstood and what I am learning now.',
  tags: ['AI', 'Machine Learning', 'Learning'],
  likes: 64, bookmarks: 31, views: 489,
  featured: false,

  content: `
<p>
  My first mental picture of artificial intelligence was a robot that understood
  everything. My second mental picture, after two weeks of tutorials, was mathematics I
  did not remember from school. The truth, as usual, was more interesting and more
  ordinary than both.
</p>

<h2 id="misconception">What I misunderstood first</h2>
<p>
  I assumed AI meant a program with rules — just a very large set of <code>if</code> and
  <code>else</code> statements. It is almost the opposite. In machine learning, we do not
  write the rules; we show the model thousands of examples and it works out patterns that
  fit them.
</p>
<p>
  The second thing I misunderstood was the word "learning". A model does not learn the way
  I learn a chapter. It adjusts numbers inside itself — a lot of numbers — until the
  difference between its answer and the correct answer becomes small. No understanding is
  required for that process to work, which is both the magic and the limitation.
</p>

<h2 id="first-model">The first model I actually trained</h2>
<p>
  My starting exercise was the classic one: predicting whether a student passes based on
  hours studied and attendance. Two input columns, one output. I wrote it in Python with
  a few lines per step:
</p>
<pre><code># 1. prepare the data
# 2. split it into "training" and "testing" rows
# 3. fit the model on the training rows
# 4. check the accuracy on the testing rows</code></pre>
<p>
  The accuracy came out around 85%, and I was thrilled. Then I realised something
  uncomfortable: the model was good because my made-up data was almost perfectly
  separable. Real data is messy, so real accuracy is lower and much harder to trust.
</p>

<h2 id="things-that-matter">Three things that matter more than the model</h2>
<ul>
  <li><strong>Data quality.</strong> Bad or one-sided examples produce a confident, wrong model. Cleaning data is where most of the time goes.</li>
  <li><strong>Training versus testing data.</strong> If you check your model on the same rows you trained it with, you are grading your own paper with the answers on the desk.</li>
  <li><strong>What the metric hides.</strong> 95% accuracy sounds excellent until you discover that 95% of the data belongs to one class. Precision and recall usually tell the honest story.</li>
</ul>

<h2 id="generative-ai">Where generative AI fits in</h2>
<p>
  Generative AI — the kind that writes text or creates images — is built on the same
  principle, just at a huge scale. A language model is trained to predict the next word
  in a sequence. That single objective, repeated over an enormous amount of text, is
  enough to produce something that reads like reasoning. It is genuinely impressive and
  it also means the model has no way of knowing when it is wrong, which is why checking
  its output is still my job, not its.
</p>

<h2 id="how-i-am-learning">How I am learning it now</h2>
<p>
  I have stopped trying to learn "AI" as one giant subject. Right now my list is small:
  strengthen Python, revise the statistics I skipped, finish one small project with a
  real dataset, and read about one model architecture properly instead of skimming ten.
</p>
<p>
  If you are a student starting the same journey, my honest advice is to keep the maths
  close, keep the datasets small, and never trust a result you cannot explain — including
  your own.
</p>
`
}

);
