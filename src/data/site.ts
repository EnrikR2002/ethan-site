/**
 * Single source of truth for site content.
 *
 * Every number here is real and traceable to an asset in src/assets/media or to
 * the live channel it links to. Nothing in this file is illustrative.
 */

export const meta = {
  name: "Ethan Alfandary",
  role: "Creative operator. Builder. Systems thinker.",
  title: "Ethan Alfandary — Audience Growth & Media Systems",
  description:
    "I build audiences that move. Short-form engines, long-form trust, and the systems behind 120M+ views, two YouTube Silver Play Buttons, and 425% channel growth.",
  email: "Ethan.alfandary@gmail.com",
  linkedin: "https://linkedin.com/in/ethanialfandary",
  calendly: "https://calendly.com/miningspartan2",
};

export const nav = [
  { href: "#philosophy", label: "Philosophy" },
  { href: "#capabilities", label: "Services" },
  { href: "#channels", label: "Highlights" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

/** Headline proof. Rendered as a typographic strip, not as cards. */
export const trackRecord = [
  { value: "120M+", label: "short-form views", note: "UFC/MMA verticals" },
  { value: "425%", label: "YouTube growth", note: "Medical brand, <1 year" },
  { value: "45M+", label: "long-form views", note: "Gaming channels" },
  { value: "330K+", label: "Twitter followers", note: "Breakcore niche" },
  { value: "24M+", label: "medical vertical views", note: "Single vertical" },
  { value: "2×", label: "Silver Play Buttons", note: "Music & gaming" },
];

export const philosophy = {
  thesis: "In every industry, taste separates the forgettable from the iconic.",
  body: [
    "Over the last decade, I've built and scaled audiences in music, gaming, and digital media — earning two YouTube Silver Play Buttons (100K+) for work in both music promotion and gaming video editing. I've also been an early adopter of AI in my workflows, using it to streamline production and spot opportunities faster — without ever losing the human taste that makes content resonate.",
    "But taste alone isn't enough — scaling requires systems. I design repeatable frameworks, train editors, and lead teams so projects don't just grow once, they grow consistently. From medical brands that turned my videos into booked clients, to UFC/MMA verticals hitting 120M+ views, to gaming channels pulling 45M+ long-form views, I've proven that the right structure accelerates results.",
    "Whatever the field, I bring a curator's eye, the instincts of a builder, and the ability to turn vision into systems that scale.",
  ],
};

/**
 * `icon` maps to a line-drawn glyph in components/CapabilityIcon.astro.
 * Bullets are preserved verbatim from the original site copy.
 */
export const capabilities = [
  {
    icon: "growth",
    title: "Audience Growth & Channel Scaling",
    points: [
      "Multi-platform growth strategy (YouTube, Instagram, TikTok, Twitter, Reddit, Discord)",
      "Proven track record: 425%+ subscriber growth, 330K+ followers built, 120M+ vertical views",
      "Platform-specific optimization for retention, engagement, and monetization",
    ],
  },
  {
    icon: "edit",
    title: "Video Editing & Production",
    points: [
      "YouTube Shorts, Reels, and TikTok editing for maximum retention",
      "Long-form YouTube video production (gaming, educational, brand storytelling)",
      "Thumbnail design and visual branding for click-through optimization",
    ],
  },
  {
    icon: "strategy",
    title: "Content Strategy & Brand Positioning",
    points: [
      "Identifying and executing high-impact content pillars",
      "Storytelling frameworks that convert views into loyal audiences and paying clients",
      "Multi-platform campaign design with consistent brand voice",
    ],
  },
  {
    icon: "community",
    title: "Community Building & Monetization",
    points: [
      "From 0 to thriving: built communities across music, gaming, and niche genres",
      "Integration of merch, affiliate marketing, and partnership revenue streams",
      "Cross-platform engagement loops to increase loyalty & recurring traffic",
    ],
  },
  {
    icon: "tracking",
    title: "Digital Performance Tracking & Optimization",
    points: [
      "KPI design and analytics reporting for content and campaigns",
      "Lead tracking & attribution setup to prove ROI",
      "Iterative testing to find the highest-performing formats and hooks",
    ],
  },
  {
    icon: "direction",
    title: "Creative Direction & Visual Branding",
    points: [
      "Cohesive creative vision across video, thumbnail, and platform aesthetics",
      "Translating brand personality into visuals that drive recognition and clicks",
      "Aligning content style with audience psychology for higher retention and engagement",
    ],
  },
];

/**
 * Channels, with the avatar cropped out of each real profile screenshot.
 *
 * `crop` describes the avatar's square region inside the source image so the
 * component can show just the avatar instead of the raw screenshot chrome.
 * Values are the source pixel box: [x, y, size] against [imgW, imgH].
 */
export const channels = [
  {
    name: "Yamikaze",
    handle: "@Yamikaze",
    platform: "YouTube",
    stat: "360K subscribers",
    detail: "63K → 360K",
    href: "https://www.youtube.com/@Yamikaze",
    source: "yamikaze_subs.png",
    img: [1280, 720],
    crop: [70, 175, 350],
  },
  {
    name: "random videos with breakcore",
    handle: "@memesbreakcore",
    platform: "X / Twitter",
    stat: "333K followers",
    detail: "2,915 posts",
    href: "https://twitter.com/memesbreakcore",
    source: "breakcore-333.png",
    img: [601, 551],
    crop: [20, 180, 140],
  },
  {
    name: "Syfer Music",
    handle: "@SyferMusic",
    platform: "YouTube",
    stat: "104K subscribers",
    detail: "1.4K videos",
    href: "https://www.youtube.com/@SyferMusic",
    source: "syfer-music.PNG",
    img: [1280, 720],
    crop: [57, 190, 330],
  },
  {
    name: "Yozu Lux",
    handle: "@YozuLux",
    platform: "YouTube",
    stat: "78K subscribers",
    detail: "17K → 78K",
    href: "https://www.youtube.com/@YozuLux",
    source: "yozu_lux.png",
    img: [1280, 720],
    crop: [48, 170, 400],
  },
  {
    name: "MMA",
    handle: "@MMA",
    platform: "YouTube",
    stat: "58.5K subscribers",
    detail: "198 videos",
    href: "https://www.youtube.com/@MMA",
    source: "mma_subs.png",
    img: [1280, 720],
    crop: [47, 133, 430],
  },
  {
    name: "Tansavatdi Facial Plastic Surgery",
    handle: "@FaceliftExpert",
    platform: "YouTube",
    stat: "58.3K subscribers",
    detail: "7K → 58K",
    href: "https://www.youtube.com/@FaceliftExpert",
    source: "plastic_surgery_subs.png",
    img: [1280, 720],
    crop: [51, 218, 254],
  },
];

/**
 * Case studies framed as problem → system → result so the work reads as
 * repeatable operating leverage rather than one-off editing gigs.
 */
export const caseStudies = [
  {
    index: "01",
    title: "Medical Brand Growth",
    client: "Tansavatdi Facial Plastic Surgery",
    href: "https://www.youtube.com/@FaceliftExpert",
    art: "tansavatdi-mark.png",
    /** Line-art logo: knocked out and inverted to read on dark. */
    treatment: "invert",
    tint: "rgba(255, 255, 255, 0.05)",
    problem: "A surgical practice with expertise nobody could find.",
    system:
      "Vertical-first content engine with a repeatable hook library and booking-focused CTAs.",
    results: [
      { value: "425%", label: "subscriber growth" },
      { value: "24M+", label: "views in vertical" },
    ],
  },
  {
    index: "02",
    title: "UFC/MMA Shorts Engine",
    client: "MMA",
    href: "https://www.youtube.com/@MMA",
    art: "UFC_MMA_banner.png",
    treatment: "cover",
    tint: "rgba(214, 26, 26, 0.16)",
    problem: "A saturated fight-content niche with no durable output cadence.",
    system:
      "High-volume shorts pipeline with templated editing and trained editors.",
    results: [
      { value: "120M+", label: "views in vertical" },
      { value: "58.5K", label: "subscribers" },
    ],
  },
  {
    index: "03",
    title: "Gaming Channel Long-Form",
    client: "Yamikaze",
    href: "https://www.youtube.com/@Yamikaze",
    art: "yamikaze_logo_talon.jpg",
    treatment: "cover",
    tint: "rgba(124, 108, 245, 0.2)",
    problem: "Strong personality, inconsistent long-form retention.",
    system:
      "Narrative editing structure and thumbnail testing built to survive the algorithm.",
    results: [
      { value: "45M+", label: "long-form views" },
      { value: "360K", label: "subscribers" },
    ],
  },
];
