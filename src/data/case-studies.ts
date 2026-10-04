import { proof } from "./results";

export interface StudyMetric {
  value: string;
  label: string;
}

export interface Study {
  index: string;
  slug: string;
  client: string;
  shortName: string;
  category: string;
  title: string;
  role: string;
  preview: string;
  overview: string;
  work: string[];
  detail: string;
  metrics: StudyMetric[];
  supportingMetrics?: StudyMetric[];
  change?: { from: string; to: string; label: string; note?: string };
  visual: "medical" | "gaming" | "mma" | "yozu" | "breakcore" | "music" | "intelligence";
  link?: { href: string; label: string };
}

// Historical project results and owner-supplied facts, not live channel counts.
// The anonymized research project reports its scope, with no invented growth lift.
// Separate from the four legacy studies so the archived page stays intact.
export const caseStudyLibrary: Study[] = [
  {
    index: "01", slug: "tansavatdi", client: "Tansavatdi Facial Plastic Surgery", shortName: "Tansavatdi",
    category: "Healthcare · Content strategy & AI", title: "Making medical expertise visible.",
    role: "Content strategist", visual: "medical",
    preview: "Audience research, content strategy and practical AI workflows for a surgical practice.",
    overview: "My work with Tansavatdi combined competitive content research, audience analysis and AI training for the surgeon and her staff. The work covered both YouTube and Instagram.",
    work: [
      "Reverse-engineered top-performing competitor content and audience behavior to develop scalable content strategies.",
      "Produced viral campaigns, including individual videos with 11M+, 5M+ and 5M+ views.",
      "Taught the surgeon and her staff how to integrate AI into their practice, with playbooks, training guides and performance scorecards.",
    ],
    detail: `Instagram: ${proof.medical.instagram} followers (${proof.medical.instagramGrowth} growth).`,
    metrics: [{ value: proof.medical.growth, label: "YouTube subscriber growth" }, { value: proof.medical.views, label: "views" }],
    supportingMetrics: [{ value: proof.medical.instagramGrowth, label: "Instagram follower growth" }],
    change: { from: proof.medical.from, to: proof.medical.to, label: "YouTube subscribers" },
    link: { href: "https://www.youtube.com/@FaceliftExpert", label: "Visit the channel" },
  },
  {
    index: "02", slug: "yamikaze", client: "Yamikaze & YamikazeXZ", shortName: "Yamikaze",
    category: "Gaming · Creative leadership", title: "Growing the channel. Building the team.",
    role: "Creative lead & editor", visual: "gaming",
    preview: `Creative production, editor training and a second channel built from ${proof.yamikaze.secondaryFrom} to ${proof.yamikaze.secondaryTo} subscribers.`,
    overview: "As creative lead and editor, I worked on channel growth while recruiting, managing and training editors. That work also extended to building YamikazeXZ from its first subscribers.",
    work: [
      "Led creative production while recruiting and managing the editing team.",
      "Trained editors on titles and thumbnail design as production expanded.",
      `Scaled the second channel from ${proof.yamikaze.secondaryFrom} to ${proof.yamikaze.secondaryTo} subscribers across ${proof.yamikaze.secondaryVideos} videos, averaging ${proof.yamikaze.secondaryAverageViews} views per video.`,
    ],
    detail: "The second-channel results show the production work beyond the main channel's subscriber growth.",
    metrics: [{ value: proof.yamikaze.growth, label: "subscriber growth" }, { value: proof.yamikaze.views, label: "views" }],
    supportingMetrics: [{ value: `${proof.yamikaze.secondaryFrom} → ${proof.yamikaze.secondaryTo}`, label: "second-channel subscribers" }],
    change: { from: proof.yamikaze.from, to: proof.yamikaze.to, label: "YouTube subscribers" },
    link: { href: "https://www.youtube.com/@Yamikaze", label: "Visit the channel" },
  },
  {
    index: "03", slug: "mma", client: "MMA · Adam YT / Martial Arts Virtue", shortName: "MMA",
    category: "Sports · Short-form media", title: "A fight audience, built in under a year.",
    role: "Founding growth partner, video editor & growth manager", visual: "mma",
    preview: "Short-form UFC content and audience growth across YouTube, TikTok and Instagram.",
    overview: "I was a founding growth partner for a UFC short-form media project, combining video editing with audience-growth work across YouTube, TikTok and Instagram.",
    work: [
      "Produced and edited UFC short-form content across three social platforms.",
      "Worked as a founding partner and growth manager alongside the production work.",
      `Grew the YouTube audience from ${proof.mma.from} to ${proof.mma.to} subscribers in under one year.`,
    ],
    detail: `The project generated ${proof.mma.views} views across its short-form media work.`,
    metrics: [{ value: proof.mma.views, label: "views" }, { value: proof.mma.growth, label: "subscriber growth" }],
    change: { from: proof.mma.from, to: proof.mma.to, label: "YouTube subscribers", note: "In under one year" },
    link: { href: "https://www.youtube.com/@MMA", label: "Visit the channel" },
  },
  {
    index: "04", slug: "yozu", client: "Yozu & Yozu Lux", shortName: "Yozu",
    category: "Gaming · Creator business", title: "Growing the audience and the business.",
    role: "Partner & channel manager", visual: "yozu",
    preview: "Channel management and content optimization, with growth in views and revenue.",
    overview: "As a partner and channel manager, I managed the channels and optimized content. The reported results include audience size, viewership and channel revenue.",
    work: [
      "Managed Yozu and Yozu Lux as a partner and channel manager.",
      `Optimized content as the subscriber audience grew from ${proof.yozu.from} to ${proof.yozu.to}.`,
      `The project generated ${proof.yozu.views} views and ${proof.yozu.revenue} in revenue, with reported increases of ${proof.yozu.viewsGrowth} in views and ${proof.yozu.revenueGrowth} in revenue.`,
    ],
    detail: "The reported view and revenue increases do not specify a comparison period.",
    metrics: [{ value: `+${proof.yozu.viewsGrowth}`, label: "views" }, { value: `+${proof.yozu.revenueGrowth}`, label: "revenue" }],
    supportingMetrics: [{ value: proof.yozu.views, label: "total views" }, { value: proof.yozu.revenue, label: "revenue generated" }],
    change: { from: proof.yozu.from, to: proof.yozu.to, label: "YouTube subscribers" },
    link: { href: "https://www.youtube.com/@YozuLux", label: "Visit the channel" },
  },
  {
    index: "05", slug: "memesbreakcore", client: "MemesBreakcore", shortName: "MemesBreakcore",
    category: "Music culture · Community building", title: "A niche music community, at scale.",
    role: "Founder & community operator", visual: "breakcore",
    preview: "Community building across X, Instagram, Reddit, Discord and music curation.",
    overview: "I founded MemesBreakcore and built communities around a niche music culture across X, Instagram, Reddit and Discord, alongside Spotify playlist curation.",
    work: [
      `Grew the X community from ${proof.breakcore.from} to ${proof.breakcore.to} followers in ${proof.breakcore.growthMonths}.`,
      "Built communities across Reddit, Discord and Instagram, alongside the core X audience.",
      "Established a community primed for partnerships, merchandise and affiliate marketing.",
    ],
    detail: `The Spotify playlist has ${proof.breakcore.playlistSaves} saves.`,
    metrics: [{ value: proof.breakcore.growth, label: "X follower growth" }, { value: proof.breakcore.growthMonths, label: "growth period" }],
    supportingMetrics: [{ value: proof.breakcore.instagram, label: "Instagram followers" }, { value: proof.breakcore.reddit, label: "Reddit subscribers" }, { value: proof.breakcore.playlistSaves, label: "Spotify playlist saves" }],
    change: { from: proof.breakcore.from, to: proof.breakcore.to, label: "X followers" },
    link: { href: "https://twitter.com/memesbreakcore", label: "Visit the community" },
  },
  {
    index: "06", slug: "syfer-music", client: "Syfer Music & Silver Skies Records", shortName: "Syfer Music",
    category: "Music · Artist discovery", title: "Connecting independent artists with audiences.",
    role: "Co-founder", visual: "music",
    preview: "Independent music promotion, artist support and creator communities since 2014.",
    overview: "I co-founded Syfer Music in 2014, building an independent music media brand and creator communities. The work with Syfer Music and Silver Skies Records spans music promotion, artist support and releases.",
    work: [
      `Built a music media brand to ${proof.music.subscribers} YouTube subscribers and ${proof.music.views} views.`,
      `Supported ${proof.music.artists} artists and ${proof.music.releases} releases.`,
      `Built and managed creator communities across YouTube and Discord, including a ${proof.music.discord}-member Discord community.`,
    ],
    detail: "An independent music community connecting artists with new audiences.",
    metrics: [{ value: proof.music.subscribers, label: "YouTube subscribers" }, { value: proof.music.views, label: "views" }],
    supportingMetrics: [{ value: proof.music.artists, label: "artists supported" }, { value: proof.music.releases, label: "releases supported" }, { value: proof.music.discord, label: "Discord members" }],
    link: { href: "https://www.youtube.com/@SyferMusic", label: "Visit the channel" },
  },
  {
    index: "07", slug: "content-intelligence", client: "Content intelligence project", shortName: "Content intelligence",
    category: "Media · Audience research", title: "Reading the patterns behind performance.",
    role: "Content intelligence & research", visual: "intelligence",
    preview: `A content intelligence system built around analysis of ${proof.intelligence.videos} videos.`,
    overview: `For a media client, I built a content intelligence system analyzing ${proof.intelligence.videos} videos to identify audience behavior patterns and inform content decisions.`,
    work: [
      `Analyzed ${proof.intelligence.videos} videos to identify patterns in audience behavior.`,
      "Examined thumbnails, titles, audience retention and content performance.",
      "Built a content intelligence system around that analysis.",
    ],
    detail: "The research informed decisions about packaging, audience retention and content performance.",
    metrics: [{ value: proof.intelligence.videos, label: "videos analyzed" }],
  },
];

export const caseStudyLinks: Record<string, string> = Object.fromEntries(
  caseStudyLibrary.map(study => [study.index, `/case-studies/#${study.slug}`]),
);

export const caseStudyPreviews: Record<string, string> = Object.fromEntries(
  caseStudyLibrary.map(study => [study.index, study.preview]),
);
