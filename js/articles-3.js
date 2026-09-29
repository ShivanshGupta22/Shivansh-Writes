/* ==========================================================================
   SHIVANSH WRITES  —  js/articles-3.js
   Articles 9 – 12 of 12.  (Same object shape as articles-1.js)
   ========================================================================== */

window.SW.articles.push(

/* ------------------------------- ARTICLE 9 ------------------------------- */
{
  id: 9,
  slug: 'understanding-generative-ai-as-a-student',
  title: 'Understanding Generative AI as a Student',
  category: 'artificial-intelligence',
  author: 'Shivansh Gupta',
  date: '2026-08-28',
  readingTime: '6 min read',
  image: 'images/post-8.jpg',
  imageAlt: 'Soft glowing abstract shapes floating above textured paper',
  description:
    'A simple introduction to generative AI and the ways students can understand and use the technology responsibly.',
  tags: ['AI', 'GenAI', 'Technology'],
  likes: 68, bookmarks: 34, views: 546,
  featured: false,

  content: `
<p>
  Generative AI arrived in my college life the way it arrived in everyone else's: suddenly,
  everywhere, and with very strong opinions attached. Some of my classmates treat it as a
  shortcut, others as a threat. After using it seriously for a few months, I have landed
  somewhere in the middle — it is a genuinely useful tool with a very specific failure mode.
</p>

<h2 id="what-it-is">What it actually is</h2>
<p>
  A generative model produces new content — text, code, an image — rather than just
  labelling or sorting existing content. For text, the mechanism sounds almost too simple:
  the model is trained to predict the next word, again and again, based on an enormous
  amount of written material. Do that well enough and the output reads like reasoning.
</p>
<p>
  What it is not: a search engine, a database, or a thinker. It does not look anything up,
  and it does not know when it is inventing something.
</p>

<h2 id="what-it-is-good-at">What it is genuinely good at</h2>
<ul>
  <li><strong>Explaining things differently.</strong> When a lecture explanation does not land, asking for the same idea explained with a simpler analogy usually helps.</li>
  <li><strong>Boilerplate code.</strong> A file-reading loop, a form validation pattern, a SQL join. It saves typing, not thinking.</li>
  <li><strong>Naming and wording.</strong> Function names, commit messages, a paragraph that needs to be less awkward.</li>
  <li><strong>Generating practice questions.</strong> This one is underrated — I ask for ten questions on a topic and answer them before checking.</li>
</ul>

<h2 id="where-it-fails">Where it fails, and why that matters</h2>
<p>
  It is confidently wrong. Not occasionally — structurally. Because the model optimises for
  plausible text rather than verified truth, an invented function or a made-up citation
  sounds exactly like a correct one. In code this is easy to catch: the program either runs
  or it does not. In an assignment or a report it is much harder, which is why I never
  submit anything I cannot explain.
</p>
<p>
  There is a second, quieter cost: it is very good at making me <em>feel</em> like I have
  learned something. I can read a perfect explanation of recursion and feel satisfied
  without being able to write a recursive function. The test is always output, not reading.
</p>

<h2 id="my-rules">The four rules I follow</h2>
<ol style="list-style:decimal;">
  <li><strong>Attempt first, then ask.</strong> I write my own version before requesting help, because the struggle is where the learning happens.</li>
  <li><strong>Ask for explanations, not answers.</strong> "Why does this fail?" teaches me something; "solve this" teaches me nothing.</li>
  <li><strong>Verify by running or citing.</strong> Code gets executed, claims get a real source.</li>
  <li><strong>Be transparent.</strong> If a tool helped materially, I say so. Especially in submissions.</li>
</ol>

<h2 id="future">What this means for students like me</h2>
<p>
  Basic syntax is becoming less valuable, and judgement is becoming more valuable — knowing
  which approach fits, catching what is subtly wrong, and asking a precise question in the
  first place. That is the skill I am deliberately practising now: not writing code faster,
  but reading it more carefully.
</p>
<p>
  Generative AI will keep changing. The habit of verifying what I am told, whether by a
  model or a lecture slide, is the one I want to keep.
</p>
`
},

/* ------------------------------- ARTICLE 10 ------------------------------ */
{
  id: 10,
  slug: 'building-a-better-learning-habit',
  title: 'Building a Better Learning Habit',
  category: 'productivity',
  author: 'Shivansh Gupta',
  date: '2026-08-23',
  readingTime: '4 min read',
  image: 'images/post-9.jpg',
  imageAlt: 'An open notebook with a hand-drawn habit tracker grid and a cup of tea',
  description:
    'Why consistency matters more than studying for long hours and how small daily improvements can add up.',
  tags: ['Productivity', 'Learning', 'Habits'],
  likes: 44, bookmarks: 27, views: 312,
  featured: false,

  content: `
<p>
  I used to believe that learning required long, uninterrupted stretches — the mythical
  six-hour Sunday where everything would finally get done. Those Sundays happened rarely,
  and when they did, I remembered very little on Monday. What actually worked was smaller
  and far less impressive.
</p>

<h2 id="hours">Long hours are a bad metric</h2>
<p>
  Sitting with a book for four hours feels productive, but feeling productive and learning
  are different things. After about ninety minutes of genuinely focused work, my reading
  speed drops and I start re-reading the same paragraph. Counting those hours only
  inflates my sense of progress.
</p>
<p>
  What I track instead is simpler: did I do focused work today, yes or no. That is a
  number I cannot fake.
</p>

<h2 id="tracker">The habit tracker that finally stuck</h2>
<p>
  Mine is a grid drawn in a notebook with seven columns and no app attached. Every evening
  I fill one square if I did a session on my current learning goal. Days with exams get a
  half square. Days I miss get an empty square, and nothing else — no self-criticism
  written in the margin.
</p>
<p>
  I have tried tracking apps, and they demotivated me by turning every missed day into a
  broken streak. A paper grid is forgiving in a way that software rarely is.
</p>

<h2 id="session">What a session looks like</h2>
<ul>
  <li><strong>Ten minutes</strong> — review what I did last time and pick one specific task.</li>
  <li><strong>Sixty minutes</strong> — focused work, phone in another room, one browser tab.</li>
  <li><strong>Ten minutes</strong> — write two lines: what worked, what confused me.</li>
</ul>
<p>
  That last step is the one I resisted for months and the one that has helped most. A note
  like "could not understand why the query returned duplicates" becomes tomorrow's first
  question instead of a vague feeling of unease.
</p>

<h2 id="input-output">Measure inputs, not outcomes</h2>
<p>
  I cannot guarantee that I will understand pointers today. I can guarantee that I will
  spend sixty minutes on them. Setting the goal at the input makes it something I can
  actually control, which removes most of the frustration.
</p>

<h3>What I do after a bad week</h3>
<p>
  A bad week means three or four empty squares and a growing sense that I have fallen
  behind. My recovery plan is deliberately small: one session, no targets, just reopening
  the same topic I left. Momentum comes back much faster from a single twenty-minute
  session than from waiting until I feel motivated again.
</p>
<p>
  I also write one line in the margin about why the week went badly — exams, guests,
  illness, or simply no plan. Naming the reason stops it from turning into a story about
  discipline, which is almost never the real problem.
</p>

<h2 id="rest">Rest is part of the system</h2>
<p>
  The version of this habit that works is the one that survives a bad week. So there is
  one rest day, and there is no attempt to "make up" missed sessions by doing double.
  Compensating once is fine; making it a pattern turns a small gap into a reason to quit.
</p>
<p>
  A year of small sessions beats two months of heroic ones. I have tested both, and the
  arithmetic is not close.
</p>
`
},

/* ------------------------------- ARTICLE 11 ------------------------------ */
{
  id: 11,
  slug: 'from-college-assignment-to-real-project',
  title: 'From College Assignment to Real Project',
  category: 'projects',
  author: 'Shivansh Gupta',
  date: '2026-08-18',
  readingTime: '5 min read',
  image: 'images/post-10.jpg',
  imageAlt: 'An assignment sheet, pencil and calculator on a desk',
  description:
    'How a simple academic assignment can become an opportunity to learn real development skills.',
  tags: ['Projects', 'College', 'Development', 'Database', 'SQL'],
  likes: 33, bookmarks: 15, views: 254,
  featured: false,

  content: `
<p>
  Most assignments have one purpose: get marks and move on. But a few of them are secretly
  project briefs in disguise, and spotting that early is one of the more useful habits I
  have picked up in college.
</p>

<h2 id="the-assignment">The assignment that started it</h2>
<p>
  In my second semester we were asked to build a small apartment management system —
  resident records, complaints, notices and a basic admin view. On paper it was a database
  exercise: create tables, write queries, submit a report.
</p>
<p>
  Instead of writing queries in a notebook, I built the thing as a web page. The tables
  became forms, the queries became buttons, and the report became the project itself.
  It took longer than the assignment required, and I learned almost everything I know
  about connecting a form to a database.
</p>

<h2 id="what-changed">What changes when it becomes a project</h2>
<p>
  The requirements stop being the finish line. An assignment ends when the marks are
  awarded; a project ends when someone can use it without me standing behind them. That
  single shift changes what you build:
</p>
<ul>
  <li><strong>Input validation</strong> — a textbook does not care that a resident's phone field was left blank, but a user will.</li>
  <li><strong>Empty states</strong> — what shows on screen when there are no complaints yet? Assignments never ask.</li>
  <li><strong>Naming and structure</strong> — because you will come back to this code in three weeks.</li>
  <li><strong>A README</strong> — how to run it, and what it does not do yet.</li>
</ul>

<h2 id="scoping">Keeping it sane</h2>
<p>
  The trap is scope. Assignment deadlines are a useful restraint: I keep the graded part
  exactly as specified, and treat the rest as optional layers added afterwards. The
  submission stays on time, and the learning happens in the extra hours around it.
</p>
<p>
  I also keep a short list of "not now" ideas in the README. Writing them down stops them
  from quietly turning the assignment into a two-month detour.
</p>

<h2 id="reuse">The unexpected bonus</h2>
<p>
  Academic projects build up. The database structure from the apartment system reappeared
  in my journal app, and the form validation pattern is now something I copy between
  projects without thinking. Assignments look like isolated exercises, but the parts
  accumulate if you let them.
</p>

<h3>What I had to learn in order to finish it</h3>
<p>
  Three things would never have appeared if I had written the queries in a notebook and
  submitted the report: connecting a form to a database without creating duplicate rows,
  showing something useful when a list is empty, and pausing to ask who is allowed to do
  what — a notice probably should not be postable by every resident.
</p>
<p>
  Each of those problems pushed me into the documentation, properly, instead of into a
  copied snippet. That reading is the part of the assignment I would count as the real
  result.
</p>

<h2 id="closing">What I would tell a junior</h2>
<p>
  Look at your assignment list this semester and pick the one that could plausibly be used
  by a real person. Build that one properly, even if it takes three extra weekends. Marks
  are momentary; the project sits in your portfolio and in your memory for much longer.
</p>
`
},

/* ------------------------------- ARTICLE 12 ------------------------------ */
{
  id: 12,
  slug: 'what-i-want-to-build-next',
  title: 'What I Want to Build Next',
  category: 'personal',
  author: 'Shivansh Gupta',
  date: '2026-08-12',
  readingTime: '4 min read',
  image: 'images/post-11.jpg',
  imageAlt: 'Sketches and sticky notes planning a project on a large sheet',
  description:
    'Some of the projects and technologies I want to explore as I continue growing as a developer.',
  tags: ['Projects', 'Future', 'Learning', 'Java', 'Spring Boot'],
  likes: 29, bookmarks: 12, views: 198,
  featured: false,

  content: `
<p>
  Writing down what I want to build has become a useful habit, partly because a public list
  is harder to quietly abandon. This is my current list — not a five-year plan, just the
  things I want to properly attempt next.
</p>

<h2 id="backend">Finish the backend properly</h2>
<p>
  Right now I am learning Java and Spring Boot with a specific target: rebuild the backend
  of my journal app as a proper API with routes, validation and a real database schema
  instead of the simplest possible setup. I want to understand status codes, authentication
  and why a schema migration is a thing people worry about.
</p>

<h2 id="dsa">Get serious about data structures</h2>
<p>
  This is the honest gap in my learning. I can use arrays, lists and maps comfortably, but
  I still slow down on trees and graphs. My plan is unglamorous: solve a small number of
  problems consistently each week rather than grinding a hundred in one weekend, and write
  down the pattern each problem used.
</p>

<h3>Project idea: a study tracker</h3>
<p>
  Something small and genuinely useful to me: log study sessions by subject, see time spent
  per week, and set input-based goals similar to the ones I wrote about earlier. It would
  be my first attempt at charts, and the first time I handle dates seriously. Dates, I am
  told, are where beginners go to suffer.
</p>

<h3>Project idea: a college notice board</h3>
<p>
  Our class announcements are scattered across group chats. A simple notice board — post a
  notice, filter by subject, see what you missed — would be a genuinely useful thing for a
  department. It would also force me to learn authentication, since notices should come
  from verified users only.
</p>

<h2 id="writing">Keep writing, once a fortnight at least</h2>
<p>
  This blog has already changed how I learn, mostly by exposing what I only half-know. I
  want to keep publishing even in busy weeks, with shorter posts when there is no time for
  a long one. A short honest post is worth more than a perfect one that never gets
  published.
</p>

<h2 id="not-yet">Things I am deliberately not starting yet</h2>
<p>
  Mobile development, Rust, and anything involving blockchain all sit on the "later" list.
  Not because they are uninteresting, but because I have watched myself start four things in
  one month and finish none of them. A short list of goals I actually touch beats a long
  list of goals I only talk about.
</p>
<p>
  There is a practical reason too: Spring Boot and data structures already give me more than
  enough to be genuinely stuck on every single week, and being stuck on something I chose
  is the most productive state I know.
</p>

<h2 id="honest">An honest note to end on</h2>
<p>
  I do not know which of these will actually happen, and I have abandoned enough side
  projects to be realistic about that. But writing them down and publishing them means
  progress is at least visible, and visible progress is easier to continue.
</p>
<p>
  If you are a student too, I would recommend keeping a list like this somewhere public —
  even if nobody reads it. It is much easier to be honest with a list than with a feeling.
</p>
`
}

);
