/* ==========================================================================
   SHIVANSH WRITES  —  js/data.js
   --------------------------------------------------------------------------
   THE CONTENT LAYER.

   Everything the website shows comes from this file and the two article
   files that follow it (articles-1.js, articles-2.js).  The HTML pages are
   only empty containers; JavaScript fills them in from this data.

   WHY IT IS BUILT THIS WAY
   The objects below deliberately mirror the columns of a database table, so
   this same data could later be served from an API or a JSON file without
   changing a single markup structure:

       profile          -> one "user" row
       categories[]     -> a "categories" table
       articles[]       -> a "posts" table (see articles-1.js / articles-2.js)
       projects[]       -> a "projects" table
       social[]         -> a "social_links" table

   TO ADD A NEW ARTICLE
   Just add another object to the array in articles-1.js (or a new file).
   Nothing in the HTML needs to be touched — the home page, blog, categories,
   article page, search, related articles and counters all read from here.

   PLACEHOLDERS
   Anything the college did not provide (email, social URLs, city) is left as
   an empty string with a "replaceWith" hint, and the pages print a clearly
   marked placeholder instead of a made-up detail.
   ========================================================================== */

window.SW = window.SW || {};

/* --------------------------------------------------------------------------
   1. PROFILE  (one user record)
   -------------------------------------------------------------------------- */
SW.profile = {
  id: 'user-01',
  name: 'Shivansh Gupta',
  displayName: 'Shivansh',
  siteName: 'Shivansh Writes',
  initials: 'SG',
  tagline: 'Student • Developer • Curious Learner',
  role: 'Computer Science Student',

  shortBio:
    "I'm a computer science student interested in programming, artificial " +
    "intelligence, web development and building real-world projects. I enjoy " +
    "learning new technologies and documenting my journey through projects and writing.",

  aboutMe: [
    "I'm Shivansh Gupta, a computer science student exploring the world of software " +
    "development and artificial intelligence. I enjoy turning ideas into projects, " +
    "experimenting with new technologies and continuously improving my programming skills.",

    "This blog is my personal space to share what I learn, the projects I build, useful " +
    "resources, challenges I face and experiences from my journey as a student developer."
  ],

  /* Short author line used under articles and in the author preview box */
  authorBio:
    'Computer science student exploring programming, AI, web development and real-world projects.',

  currentlyLearning: [
    'Java', 'Spring Boot', 'Backend Development', 'Data Structures',
    'Web Development', 'Artificial Intelligence', 'Database Management'
  ],

  skills: [
    'C', 'Java', 'Python', 'HTML', 'CSS', 'JavaScript', 'SQL',
    'Git & GitHub', 'Web Development'
  ],

  /* --- EDIT THESE TWO AFTER DOWNLOADING THE PROJECT ---------------------- */
  location: '',            // e.g. 'Ahmedabad, India'
  email: '',               // e.g. 'shivansh@example.com'

  avatar: 'images/avatar.jpg',
  heroImage: 'images/hero-student.jpg'
};

/* --------------------------------------------------------------------------
   2. CATEGORIES
   "count" and "views" are calculated automatically in render.js from the
   articles array, so they can never go out of sync.
   -------------------------------------------------------------------------- */
SW.categories = [
  { id: 'cat-tech',  slug: 'technology',    name: 'Technology',
    description: 'Exploring interesting technologies and how they are changing the world.',
    icon: 'monitor' },

  { id: 'cat-ai',    slug: 'artificial-intelligence', name: 'Artificial Intelligence',
    description: 'Beginner-friendly thoughts and articles about AI, machine learning and generative AI.',
    icon: 'ai' },

  { id: 'cat-prog',  slug: 'programming',   name: 'Programming',
    description: 'Programming concepts, coding experiences, tutorials and lessons learned.',
    icon: 'code' },

  { id: 'cat-proj',  slug: 'projects',      name: 'Projects',
    description: 'Behind-the-scenes experiences, challenges and lessons from building projects.',
    icon: 'layers' },

  { id: 'cat-life',  slug: 'student-life',  name: 'Student Life',
    description: 'Experiences, challenges, productivity and lessons from college life.',
    icon: 'cap' },

  { id: 'cat-prod',  slug: 'productivity',  name: 'Productivity',
    description: 'Learning habits, time management, consistency and personal growth.',
    icon: 'bolt' },

  { id: 'cat-personal', slug: 'personal',   name: 'Personal',
    description: 'Personal experiences, reflections and lessons from my journey.',
    icon: 'sparkle' }
];

/* --------------------------------------------------------------------------
   3. PROJECTS
   -------------------------------------------------------------------------- */
SW.projects = [
  {
    id: 'proj-01',
    name: 'Daily Journal',
    description:
      'A personal journaling web application for creating, managing and organizing daily ' +
      'journal entries. Entries are saved to a hosted database so they survive a browser ' +
      'refresh, and each entry carries a date, a mood and a short reflection.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Supabase'],
    status: 'Built &amp; in use',
    link: ''   // add a GitHub or live URL later
  },
  {
    id: 'proj-02',
    name: 'Apartment Management System',
    description:
      'A web-based system designed to simplify apartment management — resident information, ' +
      'complaints, notices and administrative tasks in one dashboard instead of paper registers ' +
      'and group chats.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Database'],
    status: 'Academic project',
    link: ''
  },
  {
    id: 'proj-03',
    name: 'Student Developer Portfolio',
    description:
      'A personal portfolio showcasing projects, skills, learning progress and development ' +
      'journey — built from scratch without any framework, which made me actually understand ' +
      'layout and the DOM instead of copying snippets.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Online',
    link: ''
  }
];

/* --------------------------------------------------------------------------
   4. SOCIAL LINKS  — deliberately left blank
   Fill the "url" (and "handle"/"address") values below with your own details;
   every page picks them up automatically. Until then the website prints a
   clearly marked "add your link" placeholder instead of inventing a username.
   -------------------------------------------------------------------------- */
SW.social = [
  { id: 'soc-gh',   label: 'GitHub',    url: '', handle: '', icon: 'github' },
  { id: 'soc-li',   label: 'LinkedIn',  url: '', handle: '', icon: 'linkedin' },
  { id: 'soc-ig',   label: 'Instagram', url: '', handle: '', icon: 'instagram' },
  { id: 'soc-mail', label: 'Email',     url: '', handle: '', icon: 'mail' }
];

/* Small helper used across the site: finds a category object by its slug */
SW.categoryBySlug = function (slug) {
  var list = SW.categories || [];
  for (var i = 0; i < list.length; i++) {
    if (list[i].slug === slug) return list[i];
  }
  return null;
};

/* Human readable date:  '2026-09-28'  ->  'September 28, 2026' */
SW.formatDate = function (isoDate) {
  var months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
  var parts = String(isoDate).split('-');
  if (parts.length !== 3) return isoDate;
  return months[Number(parts[1]) - 1] + ' ' + Number(parts[2]) + ', ' + parts[0];
};

/* Articles live in their own files so this file stays readable */
SW.articles = [];
