import { proof } from "./results";
export { caseStudies } from "./results";

// Shared content. Historical metrics include the corrected October 2026 Instagram figure.
export const meta = {
  name: "Ethan Alfandary",
  role: "Creative operator. Builder. Systems thinker.",
  title: "Ethan Alfandary — Audience Growth & Media Systems",
  description:
    `Content, audience growth and practical AI workflows. The work behind ${proof.overallViews} views, two YouTube Silver Play Buttons and ${proof.medical.growth} medical YouTube growth.`,
  email: "Ethan.alfandary@gmail.com",
  linkedin: "https://linkedin.com/in/ethanialfandary",
  calendly: "https://calendly.com/miningspartan2",
};

export const nav = [
  { href: "/", label: "Meet Ethan" },
  { href: "#philosophy", label: "Philosophy" },
  { href: "#capabilities", label: "Services" },
  { href: "#channels", label: "Highlights" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

/** Headline proof. Rendered as a typographic strip, not as cards. */
export const trackRecord = [
  { value: proof.mma.views, label: "short-form views", note: "UFC/MMA projects" },
  { value: proof.medical.growth, label: "YouTube growth", note: "Tansavatdi · 8K → 62K" },
  { value: proof.yamikaze.views, label: "views", note: "Yamikaze" },
  { value: proof.breakcore.to, label: "X / Twitter followers", note: "Breakcore · +120%" },
  { value: proof.medical.views, label: "medical content views", note: "Tansavatdi" },
  { value: "2×", label: "Silver Play Buttons", note: "Music & gaming" },
];

export const philosophy = {
  thesis: "In every industry, taste separates the forgettable from the iconic.",
  body: [
    "Over the last decade, I've built and scaled audiences in music, gaming, and digital media — earning two YouTube Silver Play Buttons (100K+) for work in both music promotion and gaming video editing. I've also been an early adopter of AI in my workflows, using it to streamline production and spot opportunities faster — without ever losing the human taste that makes content resonate.",
    "But taste alone isn't enough — scaling requires systems. I design repeatable frameworks, train editors, and lead teams so projects don't just grow once, they grow consistently. My work spans medical content strategy and AI training, UFC/MMA projects with 120M+ views, and gaming channels with 45M+ views.",
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
      `Selected results: ${proof.medical.growth} medical YouTube growth, ${proof.breakcore.to} Breakcore followers, ${proof.mma.views} MMA views`,
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
    stat: `${proof.yamikaze.to} subscribers`,
    detail: `${proof.yamikaze.from} → ${proof.yamikaze.to} · ${proof.yamikaze.growth}`,
    href: "https://www.youtube.com/@Yamikaze",
    source: "yamikaze_subs.png",
    img: [1280, 720],
    crop: [70, 175, 350],
  },
  {
    name: "random videos with breakcore",
    handle: "@memesbreakcore",
    platform: "X / Twitter",
    stat: `${proof.breakcore.to} followers`,
    detail: `${proof.breakcore.from} → ${proof.breakcore.to} · +${proof.breakcore.growth}`,
    href: "https://twitter.com/memesbreakcore",
    source: "breakcore-333.png",
    img: [601, 551],
    crop: [20, 180, 140],
  },
  {
    name: "Syfer Music",
    handle: "@SyferMusic",
    platform: "YouTube",
    stat: `${proof.music.subscribers} subscribers`,
    detail: `${proof.music.views} views`,
    href: "https://www.youtube.com/@SyferMusic",
    source: "syfer-music.PNG",
    img: [1280, 720],
    crop: [57, 190, 330],
  },
  {
    name: "Yozu Lux",
    handle: "@YozuLux",
    platform: "YouTube",
    stat: `${proof.yozu.to} subscribers`,
    detail: `${proof.yozu.from} → ${proof.yozu.to}`,
    href: "https://www.youtube.com/@YozuLux",
    source: "yozu_lux.png",
    img: [1280, 720],
    crop: [48, 170, 400],
  },
  {
    name: "MMA",
    handle: "@MMA",
    platform: "YouTube",
    stat: `${proof.mma.to} subscribers`,
    detail: `${proof.mma.from} → ${proof.mma.to} · +${proof.mma.growth}`,
    href: "https://www.youtube.com/@MMA",
    source: "mma_subs.png",
    img: [1280, 720],
    crop: [47, 133, 430],
  },
  {
    name: "Tansavatdi Facial Plastic Surgery",
    handle: "@FaceliftExpert",
    platform: "YouTube",
    stat: `${proof.medical.to} subscribers`,
    detail: `${proof.medical.from} → ${proof.medical.to} · +${proof.medical.growth}`,
    href: "https://www.youtube.com/@FaceliftExpert",
    source: "plastic_surgery_subs.png",
    img: [1280, 720],
    crop: [51, 218, 254],
  },
];
