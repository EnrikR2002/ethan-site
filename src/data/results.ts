/**
 * Historical results from Ethan's August 2026 resume, plus owner-supplied
 * September 2026 MemesBreakcore figures and the October 2026 Instagram correction.
 * These are not live analytics.
 * Project figures can overlap: never sum them into a portfolio total.
 * Instagram growth uses the corrected October resume: (41 - 13) / 13 = 215.38%.
 * Yozu's 195% views / 73% revenue increases are separately reported measures;
 * the source does not specify their comparison periods.
 */
export const resultsAsOf = "Selected results through August 2026";
export const proof = {
  overallViews: "200M+",
  medical: { from: "8K", to: "62K", growth: "675%", views: "32M+", instagram: "13K → 41K", instagramGrowth: "≈215%" },
  yozu: { from: "17K", to: "82K+", views: "40M+", revenue: "$45K+", viewsGrowth: "195%", revenueGrowth: "73%" },
  mma: { from: "10K", to: "67K", growth: "570%", views: "120M+" },
  yamikaze: { from: "63K", to: "360K", growth: "≈471%", views: "45M+" },
  breakcore: { from: "150K", to: "330K", growth: "120%", growthMonths: "11 months", instagram: "45K+", reddit: "24K", playlistSaves: "4,200+" },
  music: { subscribers: "104K", views: "54M+", artists: "100+", releases: "250+", discord: "2K" },
};

export const caseStudies = [
  {
    index: "01", title: "Making medical expertise visible", client: "Tansavatdi Facial Plastic Surgery",
    href: "https://www.youtube.com/@FaceliftExpert", art: "tansavatdi-mark.png", treatment: "invert", tint: "rgba(255,255,255,0.05)",
    role: "AI content strategy & audience growth",
    system: "Used competitor and audience research to shape content strategy; worked with the surgeon and her team on AI playbooks and performance scorecards.",
    change: `${proof.medical.from} → ${proof.medical.to} YouTube subscribers`,
    detail: `Instagram: ${proof.medical.instagram} followers (${proof.medical.instagramGrowth}). Individual videos reached 11M+, 5M+ and 5M+ views.`,
    results: [{ value: proof.medical.growth, label: "YouTube growth" }, { value: proof.medical.views, label: "views" }],
  },
  {
    index: "02", title: "Scaling a gaming creative team", client: "Yamikaze & YamikazeXZ",
    href: "https://www.youtube.com/@Yamikaze", art: "yamikaze_logo_talon.jpg", treatment: "cover", tint: "rgba(124,108,245,0.2)",
    role: "Creative lead & editor",
    system: "Led creative production, recruited and managed editors, and trained the team on titles and thumbnail design.",
    change: `${proof.yamikaze.from} → ${proof.yamikaze.to} YouTube subscribers`,
    detail: "Second channel: 0 → 50K subscribers across 42 videos, averaging 110,310 views per video.",
    results: [{ value: proof.yamikaze.growth, label: "subscriber growth" }, { value: proof.yamikaze.views, label: "views" }],
  },
  {
    index: "03", title: "Building an MMA shorts audience", client: "MMA · Adam YT / Martial Arts Virtue",
    href: "https://www.youtube.com/@MMA", art: "UFC_MMA_banner.png", treatment: "cover", tint: "rgba(214,26,26,0.16)",
    role: "Partner, video editor & growth manager",
    system: "Produced UFC short-form content across YouTube, TikTok and Instagram, growing the YouTube subscriber base in under a year.",
    change: `${proof.mma.from} → ${proof.mma.to} YouTube subscribers`,
    detail: "Short-form production and growth across three platforms.",
    results: [{ value: proof.mma.growth, label: "subscriber growth" }, { value: proof.mma.views, label: "views" }],
  },
  {
    index: "04", title: "Growing a creator business", client: "Yozu & Yozu Lux",
    href: "https://www.youtube.com/@YozuLux", art: "yozu_lux.png", treatment: "avatar", tint: "rgba(124,108,245,0.16)",
    role: "Partner & channel manager",
    system: "Managed the channels and optimized content to grow the audience, viewership and channel revenue.",
    change: `${proof.yozu.from} → ${proof.yozu.to} YouTube subscribers`,
    detail: `${proof.yozu.views} views and ${proof.yozu.revenue} in revenue.`,
    results: [{ value: `+${proof.yozu.viewsGrowth}`, label: "views" }, { value: `+${proof.yozu.revenueGrowth}`, label: "revenue" }],
  },
];
