export const landingContent = {
  brand: "Company Name",
  nav: [
    { label: "Why GTM breaks", href: "/#why" },
    { label: "Stages", href: "/#stages" },
    { label: "Channels", href: "/#channels" },
    { label: "FAQ", href: "/#faq" }
  ],
  hero: {
    title: "The GTM Engine Built for AI Companies",
    subtitle:
      "A coordinated system that turns product momentum into predictable demand, pipeline, and activation - without random tactics.",
    primaryCta: { label: "Get the GTM playbook", href: "/#cta" },
    secondaryCta: { label: "Book a call", href: "/#cta" },
    note: "No spam. Just strategy you can ship this week."
  },
  logoCloud: {
    title: "Trusted by teams shipping AI",
    logos: [
      "VectorOps",
      "OrbitAI",
      "NeuralDesk",
      "Promptboard",
      "AstraLabs",
      "Synthesis",
      "HelioSearch",
      "QuartzML"
    ]
  },
  why: {
    title: "Why Most AI Products Fail at GTM",
    items: [
      {
        title: "No distribution",
        icon: "users",
        description:
          "Great demos don’t matter if you don’t own attention and reach buyers consistently."
      },
      {
        title: "Fragmented channels",
        icon: "layers",
        description:
          "Paid, content, outbound, and community run in silos, so nothing compounds."
      },
      {
        title: "Failing activation",
        icon: "target",
        description:
          "Leads arrive, but messaging, onboarding, and conversion aren’t aligned to outcomes."
      }
    ]
  },
  faq: {
    title: "Does This Sound Like You?",
    items: [
      {
        q: "You shipped something impressive, but growth is unpredictable.",
        a: "We replace one-off campaigns with an operating system: positioning, channels, and conversion that compound."
      },
      {
        q: "Your pipeline comes in waves, and you can’t explain why.",
        a: "We set up measurable inputs per channel, then iterate weekly so you can forecast outcomes."
      },
      {
        q: "You’re doing “everything,” yet nothing seems to move the needle.",
        a: "We prioritize the smallest set of moves that creates leverage, then expand once it’s working."
      }
    ]
  },
  stats: {
    title: "Built for AI. Proven by Results.",
    items: [
      { value: "130+", label: "AI teams supported" },
      { value: "1.2B+", label: "pipeline influenced" },
      { value: "150K+", label: "high-intent leads" },
      { value: "330+", label: "experiments shipped" }
    ]
  },
  stages: {
    title: "Four Stages. One System.",
    items: [
      {
        step: "01",
        title: "Positioning that clicks",
        icon: "target",
        description:
          "Crisp ICP, value narrative, and proof that makes the product instantly legible."
      },
      {
        step: "02",
        title: "Channel fit",
        icon: "layers",
        description:
          "Pick the channels where your buyers already are, and build repeatable acquisition loops."
      },
      {
        step: "03",
        title: "Conversion & activation",
        icon: "zap",
        description:
          "Tight messaging, offers, onboarding, and follow-up so interest turns into usage."
      },
      {
        step: "04",
        title: "Scale with ops",
        icon: "settings",
        description:
          "Dashboards, rituals, and experiments so the engine runs without heroics."
      }
    ]
  },
  comparison: {
    title: "This Is Not Your Average Agency",
    left: {
      title: "Typical agency",
      items: [
        "Sells deliverables, not outcomes",
        "Runs disconnected channel tactics",
        "Reports vanity metrics",
        "One-size-fits-all messaging",
        "Little iteration after launch"
      ]
    },
    right: {
      title: "A GTM engine",
      items: [
        "Builds a repeatable system",
        "Coordinates channels around one narrative",
        "Optimizes for pipeline + activation",
        "Ships weekly experiments",
        "Documents playbooks your team owns"
      ]
    }
  },
  channels: {
    title: "Five Channels. One Coordinated System.",
    items: [
      { title: "Content & SEO", icon: "chart", description: "Create compounding demand." },
      { title: "Outbound", icon: "message", description: "Targeted, narrative-led outreach." },
      { title: "Paid", icon: "zap", description: "Fast learning loops with guardrails." },
      { title: "Partnerships", icon: "layers", description: "Leverage distribution you don’t own." },
      { title: "Community", icon: "users", description: "Earn attention and trust at scale." }
    ]
  },
  testimonials: {
    title: "Loved by Founders and Product Leads",
    subtitle:
      "Teams use the GTM Engine to align narrative, channels, and conversion, then ship experiments weekly.",
    items: [
      {
        quote:
          "We went from “random tactics” to a clear operating rhythm. Our pipeline stopped being a mystery.",
        name: "Priya K.",
        role: "Founder",
        company: "VectorOps"
      },
      {
        quote:
          "The positioning work made everything easier: ads, outbound, onboarding, even our demos.",
        name: "Marcus L.",
        role: "Head of Growth",
        company: "QuartzML"
      },
      {
        quote:
          "The system helped us focus: fewer initiatives, better execution, and faster learning loops.",
        name: "Sana R.",
        role: "Product Lead",
        company: "OrbitAI"
      }
    ]
  },
  cta: {
    title: "Your AI Deserves a GTM Engine. Not Random Tactics.",
    subtitle:
      "Get a clear roadmap for positioning, channels, and conversion, built for how AI products actually sell.",
    primaryCta: { label: "Get the playbook", href: "/#cta" },
    secondaryCta: { label: "Talk to us", href: "/#cta" }
  },
  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "How it works", href: "/#stages" },
          { label: "Channels", href: "/#channels" },
          { label: "FAQ", href: "/#faq" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/" },
          { label: "Careers", href: "/" },
          { label: "Contact", href: "/#cta" }
        ]
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/" },
          { label: "Terms", href: "/" }
        ]
      }
    ]
  }
} as const;
