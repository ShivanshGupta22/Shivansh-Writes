/* ==========================================================================
   SHIVANSH WRITES  —  js/articles-2.js
   Articles 5 – 8 of 12.  (Same object shape as articles-1.js)
   ========================================================================== */

window.SW.articles.push(

/* ------------------------------- ARTICLE 5 ------------------------------- */
{
  id: 5,
  slug: 'html-css-and-javascript-where-should-you-start',
  title: 'HTML, CSS and JavaScript: Where Should You Start?',
  category: 'technology',
  author: 'Shivansh Gupta',
  date: '2026-09-13',
  readingTime: '5 min read',
  image: 'images/featured.jpg',
  imageAlt: 'An open notebook with diagrams next to a laptop on a study desk',
  description:
    'A beginner-friendly explanation of how HTML, CSS and JavaScript work together to create websites.',
  tags: ['HTML', 'CSS', 'JavaScript', 'Web Development'],
  likes: 47, bookmarks: 22, views: 398,
  featured: false,

  content: `
<p>
  Almost everyone who wants to build websites starts by searching "where should I begin?"
  and ends up more confused than before. The honest answer is that the three languages do
  three different jobs, and once you see the jobs clearly, the order becomes obvious.
</p>

<h2 id="three-jobs">Three languages, three jobs</h2>
<p>
  Think of a web page as a person. <strong>HTML</strong> is the skeleton — the structure
  and the content. <strong>CSS</strong> is the clothing and posture — spacing, colour,
  fonts, layout. <strong>JavaScript</strong> is the behaviour — what happens when someone
  clicks, types or scrolls.
</p>
<p>
  A single element shows the division nicely. The button itself is HTML, its rounded shape
  is CSS, and the message that appears when you click it is JavaScript.
</p>

<pre><code>&lt;button class="btn"&gt;Save entry&lt;/button&gt;      &lt;!-- HTML: what it is --&gt;

.btn { padding: 12px 24px; border-radius: 6px; }   /* CSS: how it looks */

document.querySelector('.btn')
  .addEventListener('click', saveEntry);           // JS: what it does</code></pre>

<h2 id="order">The order that worked for me</h2>
<p>
  I spent about two weeks on HTML before touching CSS, and that was roughly right. You
  cannot style a page whose structure you do not understand. A sensible beginner order is:
</p>
<ul>
  <li><strong>HTML first.</strong> Headings, paragraphs, lists, links, images, forms, tables. Enough to write a plain, ugly page that is correctly structured.</li>
  <li><strong>CSS second.</strong> Selectors, the box model, colour, typography, then Flexbox and Grid for layout.</li>
  <li><strong>JavaScript third.</strong> Variables, functions, arrays, objects, events, and then the DOM — selecting and changing elements.</li>
</ul>
<p>
  The temptation is to start with all three at once, because every tutorial shows all
  three together. It works for a week and then you cannot tell which language caused the
  bug you are staring at.
</p>

<h2 id="box-model">The one CSS idea worth slowing down for</h2>
<p>
  The box model. Every element is a box with content, padding, a border and a margin. Once
  I understood those four layers, unpredictable spacing stopped feeling random. The
  developer tools in the browser draw the box model for you — right-click any element,
  choose Inspect, and look at the coloured diagram. That panel taught me more CSS than any
  video.
</p>

<h2 id="js-role">Where JavaScript earns its place</h2>
<p>
  HTML and CSS already give you a working website — that is the part beginners find
  surprising. JavaScript is for anything that changes after the page loads: validating a
  form, filtering a list, saving something to the browser, loading new content without a
  refresh. Start with small, visible tasks rather than frameworks.
</p>
<p>
  My first real JavaScript feature was a form that refused to submit if the email field was
  empty. Twenty lines, and it taught me values, conditions, functions and events in one go.
</p>

<h3>Mistakes I made, so you can skip them</h3>
<ul>
  <li><strong>Styling before structure.</strong> I spent an evening choosing colours while my page still had headings in the wrong order. Fix the skeleton first.</li>
  <li><strong>Ignoring the browser tools.</strong> The Elements panel shows the CSS the browser actually applied. Guessing why a margin is wrong is much slower than looking.</li>
  <li><strong>Copying a finished template.</strong> A starter file is fine; a complete template teaches nothing, because every decision has already been made for you.</li>
  <li><strong>Learning a framework too early.</strong> React only made sense to me after I had built the same feature in plain JavaScript and felt exactly what the framework was removing.</li>
</ul>
<p>
  Each of those cost me a week or more, and each of them was avoidable.
</p>

<h2 id="advice">Advice I would give a first-year student</h2>
<p>
  Do not start with a framework. Build one page with plain HTML, CSS and JavaScript where
  you write every line yourself and can explain what each line does. After that, any
  framework makes sense, because you will recognise what it is doing for you.
</p>
`
},

/* ------------------------------- ARTICLE 6 ------------------------------- */
{
  id: 6,
  slug: 'balancing-college-coding-and-projects',
  title: 'Balancing College, Coding and Projects',
  category: 'student-life',
  author: 'Shivansh Gupta',
  date: '2026-09-10',
  readingTime: '5 min read',
  image: 'images/post-5.jpg',
  imageAlt: 'A student desk with a spiral notebook, pen and a laptop edge',
  description:
    'My approach to managing college studies while continuously learning development and working on projects.',
  tags: ['College', 'Coding', 'Productivity'],
  likes: 52, bookmarks: 26, views: 344,
  featured: false,

  content: `
<p>
  There is a particular kind of tiredness that comes from having three deadlines, one
  assignment and a project you actually care about. I have been living in that space for a
  while now, and while I do not have it fully solved, I do have a system that mostly keeps
  me upright.
</p>

<h2 id="reality">Accepting that something will always be behind</h2>
<p>
  The most useful realisation was that perfect balance does not exist during a semester.
  Something will always be slightly behind — usually the thing you care about least that
  week. Once I stopped expecting an even split, planning became a matter of choosing which
  thing gets less attention today, instead of feeling guilty about all of them at once.
</p>

<h2 id="week">How my week is actually arranged</h2>
<p>
  Roughly, not rigidly:
</p>
<ul>
  <li><strong>Weekday mornings</strong> — college lectures and labs. Nothing gets planned against these hours.</li>
  <li><strong>Weekday afternoons</strong> — coursework, assignments and revision while the material is still fresh.</li>
  <li><strong>Evenings</strong> — one focused block of project or learning work, usually about ninety minutes.</li>
  <li><strong>Weekends</strong> — a longer block for the project, plus the week's writing if I have something worth publishing.</li>
</ul>
<p>
  The important part is not the schedule, it is that the blocks exist at all. When I leave
  "work on project" as an unscheduled intention, it loses to everything else.
</p>

<h2 id="exams">During exam weeks, project work pauses</h2>
<p>
  This took me a while to accept, but trying to do both badly was worse than doing one
  properly. During exams I stop starting new features and keep only two things alive:
  revision, and a fifteen-minute note about what I want to build next. The fifteen minutes
  keeps the ideas alive without the guilt of half-finished code.
</p>

<h2 id="small-consistency">Small consistency beats big weekends</h2>
<p>
  I used to save everything for a heroic eight-hour Saturday. Those Saturdays happened
  maybe once a month, and I spent the next three days recovering. Since I moved to
  shorter weekday sessions, my actual output has gone up. Ninety minutes on a Tuesday is
  unglamorous, but it is real, and it repeats.
</p>

<h3>Three things I deliberately stopped doing</h3>
<p>
  I stopped comparing my progress with people on the internet, because their year one is
  not my year one. I stopped joining every hackathon that appeared in the class group —
  two per semester is what I can honestly handle. And I stopped chasing a perfect streak of
  daily commits, which turned out to be an excellent way to write small meaningless commits
  at 11:50 pm.
</p>
<p>
  Removing those three things did not make me less ambitious. It made the ambition survive
  contact with a real semester, which with three more semesters to go matters far more.
</p>

<h2 id="learning">Learning without burning out</h2>
<p>
  I also try to keep learning attached to something I am building. Reading about
  authentication is abstract; adding one login screen to my journal app made the concept
  stick immediately. When learning has a destination, the motivation stops depending on
  my mood.
</p>
<p>
  Last thing: I take one evening a week completely off from screens. It is the only rule
  I refuse to negotiate, and everything else in this article works better because of it.
</p>
`
},

/* ------------------------------- ARTICLE 7 ------------------------------- */
{
  id: 7,
  slug: 'things-i-wish-i-knew-before-starting-programming',
  title: 'Things I Wish I Knew Before Starting Programming',
  category: 'personal',
  author: 'Shivansh Gupta',
  date: '2026-09-06',
  readingTime: '6 min read',
  image: 'images/post-4.jpg',
  imageAlt: 'A worn paperback book and reading glasses resting on a desk',
  description:
    'A collection of lessons I wish someone had told me when I was just starting my programming journey.',
  tags: ['Programming', 'Beginner', 'Learning'],
  likes: 71, bookmarks: 38, views: 523,
  featured: false,

  content: `
<p>
  This is the article I wanted to read two years ago. Nothing in it is technical. All of
  it cost me weeks of confusion to learn, and most of it could have been explained to me
  in an afternoon.
</p>

<h2 id="one">You are not supposed to understand everything immediately</h2>
<p>
  For a long time I assumed that if a concept did not make sense on the first pass, I was
  not "made for programming". That is false. Understanding often arrives on the third
  attempt, after you have used the idea in two other programs. Loops made no sense to me
  until I wrote five of them badly.
</p>

<h3>Copying code is fine, copying understanding is not</h3>
<p>
  Everyone copies code. The problem is copying it and moving on. The rule I now follow is
  simple: if I paste a block of code, I have to be able to explain what each line does
  before I commit it. If I cannot, I leave a comment saying what I think it does and come
  back to it. Half the time, writing that comment is the moment I understand it.
</p>

<h3>Errors are messages, not verdicts</h3>
<p>
  Early on, every error message felt like the computer telling me I was bad at this. Now I
  read them like a note from a colleague: something specific is wrong, and here is roughly
  where. Errors are one of the few places where the computer tells you exactly what it is
  thinking. Ignoring them is a choice, and a bad one.
</p>

<h2 id="four">Learn one language properly first</h2>
<p>
  I collected languages the way some people collect stamps — Python, then Java, then C++,
  then back to Python. Each switch felt productive and reset my progress. What finally
  worked was staying with one language long enough to build something I was proud of.
  Concepts transfer; restlessness does not.
</p>

<h2 id="five">Consistency is a skill you practise</h2>
<p>
  The students who improved fastest were not necessarily the most talented. They were the
  ones who showed up four times a week, every week, for a year. That is it. Programming
  rewards patience more than intensity, and the reward arrives quietly and then all at
  once.
</p>

<h2 id="six">Build something small and finish it</h2>
<p>
  A finished twelve-line program teaches more than a half-built ambitious one, because
  finishing forces you to meet the parts that are boring: input validation, weird data,
  one more test. Those boring parts are the actual job.
</p>

<h3>Ask for help earlier</h3>
<p>
  I used to sit with a bug for hours out of pride. Now I spend twenty minutes alone, then
  ask a classmate or search properly. The hours I saved went into learning new things
  instead of re-learning the same lesson. Asking is not a weakness; it is throughput.
</p>

<h2 id="closing">Closing thought</h2>
<p>
  Nobody starts out knowing how any of this works. Everyone you admire spent a long, quiet
  period being confused in public and in private. The only real difference between the
  people who learn to program and the people who give up is how long they are willing to
  stay confused while continuing to write code.
</p>
`
},

/* ------------------------------- ARTICLE 8 ------------------------------- */
{
  id: 8,
  slug: 'how-i-organize-my-coding-projects',
  title: 'How I Organize My Coding Projects',
  category: 'productivity',
  author: 'Shivansh Gupta',
  date: '2026-09-02',
  readingTime: '4 min read',
  image: 'images/post-6.jpg',
  imageAlt: 'A planner notebook, pen and small clock on a warm wooden desk',
  description:
    'How I organize project files, tasks and development work to avoid unnecessary confusion.',
  tags: ['Productivity', 'Projects', 'Coding'],
  likes: 39, bookmarks: 21, views: 287,
  featured: false,

  content: `
<p>
  I once spent forty minutes looking for a file called <em>script-final-new.js</em> that
  turned out to be the only version I had not already tried. That afternoon I reorganised
  everything, and my projects have been considerably calmer since.
</p>

<h2 id="folders">One folder per project, one purpose per folder</h2>
<p>
  Every project gets the same skeleton, which means I never have to think about where a
  file belongs:
</p>
<pre><code>project-name/
  index.html
  css/          style.css
  js/           data.js, main.js
  images/
  README.md</code></pre>
<p>
  It is a boring structure, and boring is the point. When a project is organised, opening
  it after two weeks does not feel like reading someone else's code.
</p>

<h2 id="readme">A README before the code</h2>
<p>
  I now write a five-line README on the first day: what the project is, how to run it, what
  is finished and what is not. I started doing this after noticing that my abandoned
  projects were exactly the ones where I could not remember my own intention. The README is
  a message to my future self, and my future self is not always grateful for surprises.
</p>

<h2 id="tasks">Tasks live in one place only</h2>
<p>
  I keep a simple list — either GitHub issues or a plain text file inside the project. I
  write tasks as actions that can be finished: "show saved entries on the home page",
  not "improve the app". Big vague items sit there forever and make everything feel
  unfinished.
</p>
<p>
  My rule is that no more than three tasks are marked as current. Anything more than three
  and I am really just deciding to do nothing well.
</p>

<h2 id="commits">Commits as a work diary</h2>
<p>
  Committing every time I finish a small piece of work has an unexpected benefit: my Git
  history doubles as a progress log. When I feel like I have not achieved anything this
  month, <code>git log --oneline</code> politely disagrees with me.
</p>

<h3>Naming things so future me survives</h3>
<p>
  I use the same names in every project: <code>index.html</code>, <code>style.css</code>,
  <code>main.js</code>. In CSS I name classes after what they are rather than how they
  look, because colours change and meanings do not. In JavaScript I keep data at the top of
  the file and the functions that use it below, so reading it top to bottom mostly makes
  sense.
</p>
<p>
  It sounds trivial and it is the single biggest reason my older projects are still
  readable. When a name needs a comment to be understood, the name is wrong.
</p>

<h3>The five-minute rule</h3>
<p>
  At the end of every session I spend five minutes tidying: delete dead code, close the
  editor tabs I no longer need, and update the line in the README that says what is not
  finished yet. Five minutes now saves the twenty confused minutes I used to spend at the
  start of the next session trying to work out where I had stopped.
</p>

<h2 id="notebook">The messy notebook still exists</h2>
<p>
  Not everything goes into a tidy system. Before I write any code for a new feature, I
  sketch it on paper — boxes, arrows, and questions I do not yet know the answers to. The
  notebook is allowed to be messy because it is where confusion is allowed to exist. The
  project folder is not.
</p>
<p>
  Organisation is not about being neat. It is about removing small daily frictions so the
  energy goes into the work instead of into finding it.
</p>
`
}

);
