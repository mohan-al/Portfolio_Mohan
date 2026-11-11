import type {
  AchievementItem,
  CertificationItem,
  DsaStats,
  FeatureFlags,
  ProjectItem,
  SkillGroup,
} from "@/lib/types";

const HERO_PHOTO = {
  src: "/images/mohan-hero.jpg",
  webpSrc: "/images/mohan-hero.webp",
  width: 800,
  height: 800,
  alt: "Portrait of Mohan A L",
};

const PORTRAIT_PHOTO = {
  src: "/images/mohan-portrait.jpg",
  webpSrc: "/images/mohan-portrait.webp",
  width: 366,
  height: 366,
  alt: "Portrait of Mohan A L",
};

export const featureFlags: FeatureFlags = {
  showEmployerBadge: true,
  showInstagram: true,
  // Swap heroPhoto and aboutPhoto below in one line if desired.
  heroPhoto: HERO_PHOTO,
  aboutPhoto: PORTRAIT_PHOTO,
};

export const profile = {
  name: "Mohan A L",
  monogram: "MAL",
  location: "Chennai, Tamil Nadu, India",
  headline: "Final-year CSE student | Java, full-stack and real-time systems",
  employerBadge: "Joining Wind River as Associate Engineer, July 2027",
  pitch:
    "Final-year CSE student at MIT Chennai who builds real-time, full-stack systems in Java and TypeScript, and keeps DSA sharp on LeetCode.",
  resumePath: "/resume.pdf",
  emailUser: "almohan0728",
  emailDomain: "gmail.com",
  socials: {
    github: "https://github.com/mohan-al",
    linkedin: "https://www.linkedin.com/in/mohan-a-l-0497a632b",
    leetcode: "https://leetcode.com/u/Mohan_0728/",
    instagram: "https://www.instagram.com/mxhxn.al/",
  },
  ogImage: "/images/mohan-hero.jpg",
} as const;

export const seo = {
  title: "Mohan A L — Software Engineer | Java, Full-Stack & Real-Time Systems",
  description:
    "Portfolio of Mohan A L, final-year CSE student at MIT Chennai building real-time and full-stack applications in Java and TypeScript.",
  keywords: [
    "Mohan A L",
    "Software Engineer",
    "Java",
    "TypeScript",
    "Spring Boot",
    "React",
    "Full-Stack Developer",
    "MIT Chennai",
  ],
} as const;

export const about = {
  lines: [
    "I'm a final-year B.E. Computer Science and Engineering student at Madras Institute of Technology (MIT), Anna University, Chennai (Aug 2023 – Present).",
    "I build full-stack and real-time systems across Java, Spring Boot, React, TypeScript, and PostgreSQL, with a focus on clean data models and reliable backend workflows.",
    "I reinforce core computer science fundamentals—DSA, OOP, DBMS, Operating Systems, and Computer Networks—through project engineering and consistent Java problem solving on LeetCode.",
    "I speak Tamil natively and use English in professional settings. Away from code, I play zonal-level chess alongside badminton, cricket, gardening, reading, and competitive programming.",
  ],
  education: [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "Madras Institute of Technology (MIT), Anna University, Chennai",
      period: "Aug 2023 – Present",
    },
    {
      degree: "Class 12 (HSC)",
      institution: "VAARIAR Matriculation Higher Secondary School",
      period: "2023–24",
      highlight: "97.6% • District-level cutoff recognition (199 cutoff, Thiruvallur District)",
    },
  ],
  strengths: [
    "Java",
    "DSA",
    "OOP",
    "DBMS",
    "Full-Stack Development",
    "Real-Time Apps",
  ],
  spokenLanguages: ["Tamil (Native)", "English (Professional Working)"],
  interests: [
    "Chess (zonal-level player)",
    "Badminton",
    "Cricket",
    "Gardening",
    "Reading",
    "Competitive programming",
  ],
} as const;

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Java", level: "Strong" },
      { name: "C", level: "Working" },
      { name: "C++", level: "Working" },
      { name: "JavaScript", level: "Working" },
      { name: "Python", level: "Working" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "React.js", level: "Working" },
      { name: "TypeScript", level: "Working" },
      { name: "Tailwind CSS", level: "Working" },
      { name: "shadcn/ui", level: "Working" },
      { name: "Node.js", level: "Working" },
      { name: "Express.js", level: "Working" },
      { name: "Vite", level: "Working" },
      { name: "HTML", level: "Working" },
      { name: "CSS", level: "Working" },
      { name: "Thymeleaf", level: "Learning" },
    ],
  },
  {
    category: "Backend & DB",
    items: [
      { name: "Spring Boot", level: "Working" },
      { name: "Spring Data JPA", level: "Working" },
      { name: "SQL", level: "Working" },
      { name: "MySQL", level: "Working" },
      { name: "PostgreSQL", level: "Working" },
      { name: "Supabase", level: "Working" },
      { name: "SQLite", level: "Working" },
      { name: "MongoDB", level: "Learning" },
      { name: "Oracle", level: "Learning" },
    ],
  },
  {
    category: "Core CS",
    items: [
      { name: "DSA", level: "Strong" },
      { name: "DBMS", level: "Strong" },
      { name: "OOP", level: "Strong" },
      { name: "OS", level: "Working" },
      { name: "Networks", level: "Working" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: "Working" },
      { name: "GitHub", level: "Working" },
    ],
  },
  {
    category: "AI/ML (from project work)",
    items: [
      { name: "Whisper ASR", level: "Working" },
      { name: "Sentence-BERT", level: "Working" },
      { name: "MediaPipe", level: "Working" },
      { name: "Unity", level: "Learning" },
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: "sign-language-avatar",
    title: "Sign Language Avatar using Neural Language Understanding",
    period: "Dec 2025 – Apr 2026",
    oneLineProblem:
      "Reducing communication barriers for hearing-impaired users by translating spoken language into real-time 3D sign-language animation.",
    stack: ["Whisper ASR", "Sentence-BERT", "Unity", "MediaPipe"],
    outcomes: [
      "Built a speech-to-gloss translation pipeline using Whisper ASR and Sentence-BERT to convert spoken input into sign-language representations.",
      "Integrated Unity and MediaPipe to render synchronized real-time 3D avatar animations.",
      "Structured the end-to-end pipeline specifically to improve accessibility for hearing-impaired users.",
    ],
    // TODO: Add GitHub repo URL, demo URL, and screenshot path when available
    githubUrl: "",
    demoUrl: "",
    screenshot: "",
    detail: {
      problem:
        "Real-time spoken conversations remain inaccessible without automated translation into visual sign-language representations.",
      approach:
        "Combined Whisper ASR for speech recognition with Sentence-BERT for semantic gloss mapping, feeding synchronized pose and gesture sequences into MediaPipe and Unity for real-time 3D avatar playback.",
      architectureTitle: "Speech-to-Avatar Pipeline",
      architectureNodes: [
        { label: "Spoken Audio", sublabel: "Voice input" },
        { label: "Whisper ASR", sublabel: "Speech recognition" },
        { label: "Sentence-BERT", sublabel: "Speech-to-gloss mapping" },
        { label: "MediaPipe + Unity", sublabel: "Synchronized 3D avatar" },
      ],
      whatILearned: [
        "Connecting speech transcription outputs to Sentence-BERT semantic matching for consistent gloss representation.",
        "Synchronizing MediaPipe tracking signals with Unity 3D avatar animation states in real time.",
      ],
    },
  },
  {
    id: "realtime-pals",
    title: "Realtime Pals: Real-Time Chat Application",
    period: "Dec 2025 – Apr 2026",
    oneLineProblem:
      "Delivering instant messaging and friend-request workflows over WebSockets with database-enforced access control.",
    stack: ["React", "TypeScript", "Supabase", "Tailwind CSS", "shadcn/ui"],
    outcomes: [
      "Built a full-stack real-time chat application supporting authentication, friend requests, and instant messaging.",
      "Designed a PostgreSQL schema with Row Level Security (RLS) policies to isolate user profiles, friendships, and messages.",
      "Used Supabase Realtime WebSocket Postgres change broadcasts instead of polling, paired with DB triggers for automatic profile creation and bidirectional friendship linking.",
    ],
    // TODO: Add GitHub repo URL, demo URL, and screenshot path when available
    githubUrl: "",
    demoUrl: "",
    screenshot: "",
    detail: {
      problem:
        "Polling-based chat apps add unnecessary latency and server load, while weak access rules risk exposing private conversations and friend graphs.",
      approach:
        "Built a typed React + shadcn/ui client subscribed to Supabase Realtime Postgres broadcasts, backed by RLS policies and SQL triggers that automate profile creation and bidirectional friendships.",
      architectureTitle: "Event-Driven Chat Architecture",
      architectureNodes: [
        { label: "React + TypeScript", sublabel: "Tailwind & shadcn/ui" },
        { label: "Supabase Auth & Realtime", sublabel: "WebSocket change broadcasts" },
        { label: "PostgreSQL + RLS", sublabel: "Profiles, friendships, messages" },
        { label: "DB Triggers", sublabel: "Auto-profile & bidirectional links" },
      ],
      whatILearned: [
        "Modeling authorization directly inside PostgreSQL via Row Level Security rather than relying solely on client checks.",
        "Handling bidirectional friendship invariants and onboarding atomically with database triggers and WebSocket change streams.",
      ],
    },
  },
  {
    id: "fridge2fork",
    title: "Fridge2Fork: Recipe Recommendation System",
    period: "Aug 2023 – Jan 2024",
    oneLineProblem:
      "Matching available kitchen ingredients to recipes with dietary filtering and live nutritional metadata.",
    stack: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Spring Data JPA",
      "Thymeleaf",
      "Edamam API",
    ],
    outcomes: [
      "Developed a full-stack web app allowing users to search recipes by available ingredients.",
      "Modeled MySQL persistence with Spring Data JPA to support dietary preference filters (vegan, vegetarian, gluten-free).",
      "Integrated the Edamam REST API for live nutrition info, ingredients, and cooking time alongside Spring Boot CRUD/search REST endpoints and Thymeleaf SSR.",
    ],
    // TODO: Add GitHub repo URL, demo URL, and screenshot path when available
    githubUrl: "",
    demoUrl: "",
    screenshot: "",
    detail: {
      problem:
        "Finding usable recipes from existing ingredients while enforcing dietary restrictions requires combining structured local data with live nutritional metadata.",
      approach:
        "Implemented a Spring Boot MVC and REST backend with Spring Data JPA over MySQL for CRUD and dietary filters, enriched with live Edamam Recipe Search API calls and rendered through Thymeleaf templates.",
      architectureTitle: "Spring Boot MVC & REST Flow",
      architectureNodes: [
        { label: "Thymeleaf SSR UI", sublabel: "Ingredient & diet filters" },
        { label: "Spring Boot REST API", sublabel: "CRUD & dynamic search" },
        { label: "Spring Data JPA + MySQL", sublabel: "Recipe & filter storage" },
        { label: "Edamam REST API", sublabel: "Nutrition & cooking time" },
      ],
      whatILearned: [
        "Designing Spring Data JPA repositories and dynamic query endpoints over a relational MySQL schema.",
        "Integrating external REST API responses cleanly alongside local CRUD operations and Thymeleaf server-side rendering.",
      ],
    },
  },
  {
    id: "linktree",
    title: "Linktree (Linkleaf)",
    period: "In Progress",
    status: "In Progress",
    oneLineProblem:
      "Building a customizable link-in-bio platform with a live creator studio, theme contrast checks, QR sharing, and SQLite analytics.",
    stack: ["React", "TypeScript", "Vite", "Express", "SQLite", "QRCode"],
    outcomes: [
      "Built public /@handle profile pages supporting standard links, section headers, spotlight cards, newsletter email capture, expandable notes, scheduled visibility windows, and downloadable QR codes.",
      "Implemented a split-screen creator studio (/studio) with live mobile preview, drag-and-drop and keyboard block reordering, 8 preset/custom themes with live WCAG contrast ratio checks, and CSV subscriber export.",
      "Built the Express backend with Node's built-in node:sqlite database, scrypt password hashing, signed HTTP-only session cookies, and real-time view/click/CTR analytics.",
    ],
    githubUrl: "https://github.com/mohan-al/linktree",
    // TODO: Add live demo URL and screenshot path when deployed
    demoUrl: "",
    screenshot: "",
    detail: {
      problem:
        "Creators need a single customizable bio page with rich block types, accessible custom theming, and first-party click/subscriber analytics.",
      approach:
        "Paired a React + TypeScript + Vite frontend (split-screen studio and live mobile preview) with an Express API backed by Node's built-in SQLite engine, scrypt + HMAC cookie sessions, and client QR generation.",
      architectureTitle: "Full-Stack Studio & Analytics Architecture",
      architectureNodes: [
        { label: "React + TypeScript + Vite", sublabel: "/@handle & /studio preview" },
        { label: "Express REST API", sublabel: "Validation & block management" },
        { label: "scrypt + HMAC Cookies", sublabel: "HTTP-only session auth" },
        { label: "node:sqlite", sublabel: "Profiles, links, analytics, subscribers" },
      ],
      whatILearned: [
        "Computing live WCAG contrast ratios in the theme editor so custom color combinations remain readable.",
        "Designing a compact full-stack persistence and analytics layer directly on Node's built-in node:sqlite module.",
      ],
    },
  },
];

// Last updated: Nov 2026 — Source: https://leetcode.com/u/Mohan_0728/
// Refresh these manually from your LeetCode profile when counts or streaks change.
export const dsaStats: DsaStats = {
  totalSolved: 212,
  easy: 63,
  medium: 121,
  hard: 28,
  language: "Java",
  submissionsPastYear: 623,
  activeDays: 130,
  maxStreakDays: 22,
  badges: [
    { name: "100 Days Badge 2026" },
    // TODO: Add your exact second LeetCode streak badge once verified, e.g.:
    // { name: "50 Days Badge 2026" },
  ],
  lastUpdated: "Nov 2026",
  profileUrl: "https://leetcode.com/u/Mohan_0728/",
  solutionsRepoUrl: "https://github.com/mohan-al/Leetcode-Solutions",
  focusNote: "Java-based DSA practice, with a focus on consistency.",
  chessNote: "Zonal-level chess player.",
};

export const achievements: AchievementItem[] = [
  {
    title: "Team Project Leadership",
    description:
      "Led and delivered a scalable full-stack solution in a team project.",
  },
  {
    title: "Class 12 Academic Merit & District Cutoff Recognition",
    description:
      "Scored 97.6% in Class 12 at VAARIAR Matriculation Higher Secondary School and received Thiruvallur district-level cutoff recognition (199 cutoff, 2023–24).",
  },
  {
    title: "Zonal-Level Chess Player",
    description: "Competed and recognized at zonal-level chess competitions.",
  },
];

export const certifications: CertificationItem[] = [
  {
    title: "MATLAB Statistics Onramp",
    issuer: "MathWorks",
    // TODO: Add credentialUrl if available
  },
  {
    title: "Basics of AI",
    issuer: "IBM",
    // TODO: Add credentialUrl if available
  },
  {
    title: "Mobile Virtuality and AI",
    issuer: "NPTEL",
    detail: "Score: 69%",
    // TODO: Add credentialUrl if available
  },
];
