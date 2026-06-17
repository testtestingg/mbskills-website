/* =============================================================================
 * SITE DATA — single source of truth for all homepage placeholder content.
 *
 * Everything you'll want to replace lives here. Search for "[" to find every
 * placeholder. Swap these values for your own content and the whole homepage
 * updates automatically — no need to touch the component files.
 * ===========================================================================*/

/* -----------------------------------------------------------------------------
 * BRAND / GLOBAL
 * ---------------------------------------------------------------------------*/
export const BRAND = {
  name: "[BRAND_NAME]",
  // Brand accent. Components also use the Tailwind `ds-primary` token; if you
  // change this, also update --color-ds-primary in app/globals.css.
  phoneDisplay: "+1 (555) 000-0000",
  phoneHref: "tel:+15550000000",
  whatsappHref: "https://wa.me/15550000000",
  email: "hello@[brand].com",
  address: "[123 Placeholder Street, City, Country]",
}

/* -----------------------------------------------------------------------------
 * NAVBAR
 * ---------------------------------------------------------------------------*/
export type NavCourseLink = { label: string; href: string }
export type NavCourseGroup = { category: string; links: NavCourseLink[] }

// Grouped course links that appear inside the "Courses" dropdown menu.
export const NAV_COURSE_GROUPS: NavCourseGroup[] = [
  {
    category: "[Artificial Intelligence]",
    links: [
      { label: "[AI Fundamentals]", href: "#courses" },
      { label: "[Machine Learning]", href: "#courses" },
      { label: "[Prompt Engineering]", href: "#courses" },
    ],
  },
  {
    category: "[Web Development]",
    links: [
      { label: "[Full-Stack Bootcamp]", href: "#courses" },
      { label: "[Frontend with React]", href: "#courses" },
      { label: "[Backend with Node.js]", href: "#courses" },
    ],
  },
  {
    category: "[Data & Analytics]",
    links: [
      { label: "[Data Science]", href: "#courses" },
      { label: "[Data Analytics]", href: "#courses" },
      { label: "[SQL & Databases]", href: "#courses" },
    ],
  },
  {
    category: "[Design & Product]",
    links: [
      { label: "[UI/UX Design]", href: "#courses" },
      { label: "[Product Management]", href: "#courses" },
      { label: "[Digital Marketing]", href: "#courses" },
    ],
  },
]

// Top-level nav links (other than the Courses dropdown).
export const NAV_LINKS: NavCourseLink[] = [
  { label: "[About]", href: "#instructors" },
  { label: "[For Companies]", href: "#partners" },
  { label: "[Success Stories]", href: "#testimonials" },
  { label: "[Contact]", href: "#contact" },
]

/* -----------------------------------------------------------------------------
 * HERO
 * ---------------------------------------------------------------------------*/
export const HERO = {
  titleLead: "[Launch your tech career with]",
  titleHighlight: "[hands-on training]", // rendered in brand color
  subtitle:
    "[Placeholder subheading — describe your school in one or two sentences. Live, mentor-led courses designed to get you job-ready in months, not years.]",
  primaryCta: { label: "[Get Started]", href: "#contact" },
  secondaryCta: { label: "[Explore Courses]", href: "#courses" },
  pills: ["[Live Classes]", "[In-person or Online]", "[40–360 hours]"],
  image: "https://placehold.co/640x520/ede9fe/7c3aed?text=Hero+Image",
}

/* -----------------------------------------------------------------------------
 * COURSE CATEGORIES
 * ---------------------------------------------------------------------------*/
export type Course = {
  level: "Intro" | "Advanced" | "Bootcamp" | string
  aiSkills?: boolean
  title: string
  description: string
  href: string
}

export const COURSE_SECTION = {
  title: "[Explore our courses]",
  subtitle:
    "[Placeholder subtitle — pick a track and find a course that matches your goals and schedule.]",
}

// Courses grouped by category tab. The tab labels are the object keys.
export const COURSE_CATEGORIES: Record<string, Course[]> = {
  "[AI]": [
    {
      level: "Intro",
      aiSkills: true,
      title: "[AI Fundamentals]",
      description:
        "[Placeholder description. Two to three lines summarizing what students learn and the outcomes they can expect.]",
      href: "#contact",
    },
    {
      level: "Advanced",
      aiSkills: true,
      title: "[Applied Machine Learning]",
      description:
        "[Placeholder description. Build and deploy ML models on real datasets with guidance from industry mentors.]",
      href: "#contact",
    },
    {
      level: "Bootcamp",
      aiSkills: true,
      title: "[Generative AI Bootcamp]",
      description:
        "[Placeholder description. Intensive program covering prompt engineering, LLM apps, and production workflows.]",
      href: "#contact",
    },
  ],
  "[Web Dev]": [
    {
      level: "Bootcamp",
      title: "[Full-Stack Web Bootcamp]",
      description:
        "[Placeholder description. Go from zero to deploying full-stack apps with a modern JavaScript stack.]",
      href: "#contact",
    },
    {
      level: "Intro",
      title: "[Frontend with React]",
      description:
        "[Placeholder description. Master components, hooks, and state to build polished, responsive interfaces.]",
      href: "#contact",
    },
    {
      level: "Advanced",
      aiSkills: true,
      title: "[Backend & APIs]",
      description:
        "[Placeholder description. Design REST/GraphQL APIs, databases, and authentication for production apps.]",
      href: "#contact",
    },
  ],
  "[Data]": [
    {
      level: "Intro",
      title: "[Data Analytics]",
      description:
        "[Placeholder description. Turn raw data into insights with spreadsheets, SQL, and dashboards.]",
      href: "#contact",
    },
    {
      level: "Advanced",
      aiSkills: true,
      title: "[Data Science]",
      description:
        "[Placeholder description. Statistics, Python, and ML to solve real business problems end to end.]",
      href: "#contact",
    },
    {
      level: "Intro",
      title: "[SQL & Databases]",
      description:
        "[Placeholder description. Query, model, and manage relational databases with confidence.]",
      href: "#contact",
    },
  ],
  "[Marketing]": [
    {
      level: "Intro",
      title: "[Digital Marketing]",
      description:
        "[Placeholder description. SEO, paid ads, social, and analytics to grow brands online.]",
      href: "#contact",
    },
    {
      level: "Advanced",
      title: "[Growth & Performance]",
      description:
        "[Placeholder description. Data-driven campaigns, funnels, and conversion optimization.]",
      href: "#contact",
    },
  ],
  "[Design]": [
    {
      level: "Intro",
      title: "[UI/UX Design]",
      description:
        "[Placeholder description. Research, wireframe, and prototype delightful product experiences.]",
      href: "#contact",
    },
    {
      level: "Advanced",
      title: "[Product Design Systems]",
      description:
        "[Placeholder description. Build scalable design systems and ship pixel-perfect interfaces.]",
      href: "#contact",
    },
  ],
  "[Project Management]": [
    {
      level: "Bootcamp",
      title: "[Agile Project Management]",
      description:
        "[Placeholder description. Lead teams with Scrum, Kanban, and modern delivery practices.]",
      href: "#contact",
    },
  ],
}

/* -----------------------------------------------------------------------------
 * AI / FEATURED SKILLS BANNER
 * ---------------------------------------------------------------------------*/
export const AI_BANNER = {
  eyebrow: "[Our differentiator]",
  title: "[An AI-integrated curriculum, built with industry]",
  body: "[Placeholder paragraph — explain your key differentiator. Every course embeds practical AI skills and industry-recognized certifications so graduates stand out.]",
  cta: { label: "[Talk to us on WhatsApp]" }, // links to BRAND.whatsappHref
  image: "https://placehold.co/520x420/f5f3ff/7c3aed?text=AI+Illustration",
}

/* -----------------------------------------------------------------------------
 * PARTNER / HIRING LOGOS
 * ---------------------------------------------------------------------------*/
export const PARTNERS = {
  title: "[Top companies hire our graduates]",
  // Using placeholders. Replace with real logo image URLs.
  logos: [
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+1",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+2",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+3",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+4",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+5",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+6",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+7",
    "https://placehold.co/160x48/ffffff/9ca3af?text=Logo+8",
  ],
}

/* -----------------------------------------------------------------------------
 * STATS / SOCIAL PROOF
 * ---------------------------------------------------------------------------*/
export type Stat = {
  // `value` is the number to count up to; `prefix`/`suffix` wrap it.
  value: number
  prefix?: string
  suffix?: string
  label: string
  description: string
}

export const STATS_SECTION = {
  title: "[Trusted by learners and employers]",
  subtitle: "[Placeholder subtitle — a one-line summary of your impact.]",
}

export const STATS: Stat[] = [
  { value: 1, prefix: "#", label: "[Tech School]", description: "[Placeholder — ranked #1 in the region.]" },
  { value: 70, suffix: "%", label: "[Employment Rate]", description: "[Placeholder — graduates hired within months.]" },
  { value: 40000, suffix: "+", label: "[Graduates]", description: "[Placeholder — alumni across our programs.]" },
  { value: 1500, label: "[Instructors]", description: "[Placeholder — industry experts and mentors.]" },
]

/* -----------------------------------------------------------------------------
 * TESTIMONIALS
 * ---------------------------------------------------------------------------*/
export type Testimonial = {
  name: string
  role: string
  quote: string
  photo: string
}

export const TESTIMONIALS_SECTION = {
  title: "[Success stories from our graduates]",
  subtitle: "[Placeholder subtitle — hear from learners who changed their careers.]",
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "[Alex Morgan]",
    role: "[Frontend Developer @ Company]",
    quote:
      "[Placeholder quote — a short, genuine sentence about the experience and the outcome the student achieved.]",
    photo: "https://placehold.co/96x96/ede9fe/7c3aed?text=AM",
  },
  {
    name: "[Jamie Lee]",
    role: "[Data Analyst @ Company]",
    quote:
      "[Placeholder quote — the mentors were incredibly supportive and the projects mirrored real work.]",
    photo: "https://placehold.co/96x96/ede9fe/7c3aed?text=JL",
  },
  {
    name: "[Sam Carter]",
    role: "[ML Engineer @ Company]",
    quote:
      "[Placeholder quote — I went from no coding experience to a full-time tech role in under a year.]",
    photo: "https://placehold.co/96x96/ede9fe/7c3aed?text=SC",
  },
  {
    name: "[Riley Quinn]",
    role: "[UX Designer @ Company]",
    quote:
      "[Placeholder quote — the portfolio I built during the program got me hired immediately.]",
    photo: "https://placehold.co/96x96/ede9fe/7c3aed?text=RQ",
  },
  {
    name: "[Taylor Reed]",
    role: "[Product Manager @ Company]",
    quote:
      "[Placeholder quote — practical, intense, and worth every hour. Highly recommend.]",
    photo: "https://placehold.co/96x96/ede9fe/7c3aed?text=TR",
  },
]

/* -----------------------------------------------------------------------------
 * INSTRUCTORS
 * ---------------------------------------------------------------------------*/
export const INSTRUCTORS = {
  eyebrow: "[Meet your mentors]",
  title: "[Learn from industry experts who care]",
  body: "[Placeholder paragraph — our instructors are working professionals and dedicated mentors focused on your growth, from your first line of code to your first job.]",
  bullets: ["[Industry experts]", "[1-on-1 mentorship]", "[Student-focused]"],
  cta: { label: "[Talk to us]" }, // links to BRAND.whatsappHref
  image: "https://placehold.co/560x520/ede9fe/7c3aed?text=Instructors",
}

/* -----------------------------------------------------------------------------
 * LEAD CAPTURE FORM
 * ---------------------------------------------------------------------------*/
export const LEAD_FORM = {
  title: "[Join our community]",
  subtitle:
    "[Placeholder subtitle — leave your details and our team will reach out with the next steps.]",
  courseOptions: [
    "[Select a course of interest]",
    "[Artificial Intelligence]",
    "[Web Development]",
    "[Data & Analytics]",
    "[UI/UX Design]",
    "[Digital Marketing]",
    "[Project Management]",
  ],
  locationOptions: [
    "[Select a campus / location]",
    "[Online]",
    "[Campus — City A]",
    "[Campus — City B]",
    "[Campus — City C]",
  ],
  submitLabel: "[Submit application]",
}

/* -----------------------------------------------------------------------------
 * FOOTER
 * ---------------------------------------------------------------------------*/
export const FOOTER = {
  tagline: "[One-line tagline describing your tech school and its mission.]",
  courseLinks: [
    { label: "[Artificial Intelligence]", href: "#courses" },
    { label: "[Web Development]", href: "#courses" },
    { label: "[Data & Analytics]", href: "#courses" },
    { label: "[UI/UX Design]", href: "#courses" },
    { label: "[Digital Marketing]", href: "#courses" },
  ],
  companyLinks: [
    { label: "[About]", href: "#" },
    { label: "[Careers]", href: "#" },
    { label: "[Blog]", href: "#" },
    { label: "[Privacy Policy]", href: "#" },
    { label: "[Terms of Service]", href: "#" },
  ],
  socials: [
    { label: "Facebook", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "X", href: "#" },
  ],
  copyright: "[BRAND_NAME]. All rights reserved.",
}
