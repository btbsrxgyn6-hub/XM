import { createId } from "@/lib/id";
import { getDemoCoverByIndex } from "@/lib/demoCovers";
import {
  addUser,
  getAllProducts,
  getSeededFlag,
  getUsers,
  setSeededFlag,
  upsertProduct
} from "@/lib/storage";
import { getIconForProduct } from "@/lib/productIcons";
import type {
  Acknowledgement,
  ClassificationTag,
  Product,
  ProductStatus,
  ProductTrailer,
  ProductType,
  Region,
  User
} from "@/lib/types";
import type { ProductIconKey } from "@/lib/productIcons";

type DemoUserSeed = {
  name: string;
  email: string;
};

type ProductSeed = {
  productName: string;
  organizationName: string;
  website: string;
  slogan: string;
  tags: ClassificationTag[];
  region: Region;
  status: ProductStatus;
  productType: ProductType;
  focus: string;
  shortDescription: string;
  views: number;
  likes: number;
  saves: number;
  rating?: number;
  ratingCount?: number;
  pricing?: Product["pricing"];
  discountPercent?: number;
  updatedDaysAgo: number;
  isFeatured?: boolean;
  featuredRank?: number;
  atlasCount?: number;
  videoUrl?: string;
  iconKey?: ProductIconKey;
  acknowledgements?: Acknowledgement[];
  trailer?: Partial<ProductTrailer>;
};

const demoUsers: DemoUserSeed[] = [
  { name: "Maya Ortiz", email: "maya@pulsepilot.ai" },
  { name: "Kenji Nakamura", email: "kenji@spectravision.ai" },
  { name: "Ava Laurent", email: "ava@briefly.studio" },
  { name: "Omar Rahman", email: "omar@atlasflow.ai" }
];

const productSeeds: ProductSeed[] = [
  {
    productName: "PulsePilot",
    organizationName: "PulsePilot Labs",
    website: "https://pulsepilot.ai",
    slogan: "Daily go-to-market briefs for AI teams.",
    tags: ["Knowledge Management", "Efficiency Tools"],
    region: "NA",
    status: "published",
    productType: "Software",
    focus: "strategy teams stay aligned with daily AI market shifts",
    shortDescription: "Daily AI go-to-market intelligence for product and strategy teams.",
    views: 4200,
    likes: 980,
    saves: 340,
    rating: 4.7,
    ratingCount: 128,
    pricing: { model: "subscription", price: 49, interval: "month" },
    discountPercent: 15,
    updatedDaysAgo: 2,
    isFeatured: true,
    featuredRank: 1,
    atlasCount: 2
  },
  {
    productName: "BrieflyAI",
    organizationName: "Briefly Studio",
    website: "https://briefly.ai",
    slogan: "Turn notes into polished client-ready briefs.",
    tags: ["Writing aids", "General Assistant"],
    region: "EU",
    status: "published",
    productType: "Software",
    focus: "consulting teams summarize and present complex work quickly",
    shortDescription: "AI briefs that turn messy notes into client-ready narratives.",
    views: 1800,
    likes: 740,
    saves: 260,
    rating: 4.5,
    ratingCount: 96,
    pricing: { model: "subscription", price: 29, interval: "month" },
    discountPercent: 20,
    updatedDaysAgo: 8,
    atlasCount: 2
  },
  {
    productName: "AtlasFlow",
    organizationName: "AtlasFlow Inc.",
    website: "https://atlasflow.ai",
    slogan: "Orchestrate AI agents across every workflow.",
    tags: ["Agent build", "Programming Development"],
    region: "Global",
    status: "published",
    productType: "Agent",
    focus: "ops leaders coordinate multi-agent automations without glue code",
    shortDescription: "Launch and monitor multi-agent workflows with governance built in.",
    views: 3600,
    likes: 1220,
    saves: 410,
    rating: 4.8,
    ratingCount: 210,
    pricing: { model: "subscription", price: 99, interval: "month" },
    discountPercent: 10,
    updatedDaysAgo: 4,
    isFeatured: true,
    featuredRank: 2,
    atlasCount: 3,
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U"
  },
  {
    productName: "SpectraVision",
    organizationName: "SpectraVision",
    website: "https://spectravision.ai",
    slogan: "Cinematic product visuals in minutes.",
    tags: ["Image generation", "Video Creation"],
    region: "APAC",
    status: "published",
    productType: "Software",
    focus: "brand teams create consistent visuals without a studio",
    shortDescription: "Generate on-brand image and video packs for fast launches.",
    views: 2300,
    likes: 860,
    saves: 305,
    rating: 4.6,
    ratingCount: 140,
    pricing: { model: "one_time", price: 199 },
    updatedDaysAgo: 10
  },
  {
    productName: "QueryNest",
    organizationName: "QueryNest",
    website: "https://querynest.ai",
    slogan: "Enterprise search that learns your knowledge base.",
    tags: ["Smart Search", "Knowledge Management"],
    region: "NA",
    status: "published",
    productType: "Software",
    focus: "enterprises surface answers across docs, tickets, and wikis",
    shortDescription: "Unified enterprise search that learns from every query.",
    views: 1500,
    likes: 520,
    saves: 190,
    rating: 4.4,
    ratingCount: 88,
    updatedDaysAgo: 5
  },
  {
    productName: "EchoFrame",
    organizationName: "EchoFrame Audio",
    website: "https://echoframe.audio",
    slogan: "Studio-grade sound cleanup for podcasts.",
    tags: ["Audio Processing", "Efficiency Tools"],
    region: "EU",
    status: "submitted",
    productType: "Software",
    focus: "creators polish audio with smart noise and tone controls",
    shortDescription: "Clean, level, and master podcasts in one pass.",
    views: 980,
    likes: 260,
    saves: 110,
    rating: 4.2,
    ratingCount: 52,
    updatedDaysAgo: 18
  },
  {
    productName: "CodaCraft",
    organizationName: "CodaCraft AI",
    website: "https://codacraft.dev",
    slogan: "Ship features faster with AI pair-programming.",
    tags: ["Programming Development", "Agent build"],
    region: "Global",
    status: "published",
    productType: "Software",
    focus: "engineering teams plan, scaffold, and review code in one flow",
    shortDescription: "Plan, scaffold, and review features with an AI pair.",
    views: 3100,
    likes: 990,
    saves: 360,
    rating: 4.7,
    ratingCount: 170,
    pricing: { model: "subscription", price: 59, interval: "month" },
    updatedDaysAgo: 12,
    atlasCount: 2
  },
  {
    productName: "NeuronEdge",
    organizationName: "NeuronEdge Robotics",
    website: "https://neuronedge.ai",
    slogan: "Edge AI for agile warehouse robots.",
    tags: ["Smart Hardware", "Other types"],
    region: "APAC",
    status: "draft",
    productType: "Robotics",
    focus: "robotics teams deploy perception models on low-power hardware",
    shortDescription: "Deploy perception models on low-power edge robots.",
    views: 120,
    likes: 90,
    saves: 40,
    rating: 4.1,
    ratingCount: 12,
    updatedDaysAgo: 26
  },
  {
    productName: "LuminaHR",
    organizationName: "Lumina HR",
    website: "https://luminahr.com",
    slogan: "AI copilots for HR workflows and onboarding.",
    tags: ["General Assistant", "Efficiency Tools"],
    region: "NA",
    status: "published",
    productType: "Software",
    focus: "people teams automate onboarding, policies, and HR Q&A",
    shortDescription: "Automate HR workflows, onboarding, and policy support.",
    views: 2100,
    likes: 640,
    saves: 230,
    rating: 4.5,
    ratingCount: 104,
    updatedDaysAgo: 6
  },
  {
    productName: "LabRelay",
    organizationName: "LabRelay Research",
    website: "https://labrelay.ai",
    slogan: "Research copilots for faster literature reviews.",
    tags: ["Scientific research assistant", "Knowledge Management"],
    region: "EU",
    status: "published",
    productType: "Research/Demo",
    focus: "research teams synthesize papers and share evidence trails",
    shortDescription: "Literature review copilots for high-signal research teams.",
    views: 2800,
    likes: 870,
    saves: 320,
    rating: 4.8,
    ratingCount: 152,
    pricing: { model: "free" },
    updatedDaysAgo: 3,
    isFeatured: true,
    featuredRank: 3,
    atlasCount: 2,
    acknowledgements: [
      {
        id: createId("ack"),
        name: "OpenAlex",
        url: "https://openalex.org",
        note: "Metadata aggregation"
      }
    ]
  },
  {
    productName: "GuardianGrid",
    organizationName: "GuardianGrid",
    website: "https://guardiangrid.ai",
    slogan: "Smart monitoring for critical facilities.",
    tags: ["Smart Hardware", "Other types"],
    region: "Other",
    status: "submitted",
    productType: "Hardware",
    focus: "security teams unify sensor feeds and automate alerts",
    shortDescription: "Intelligent monitoring for facilities with critical uptime.",
    views: 640,
    likes: 210,
    saves: 75,
    rating: 4.0,
    ratingCount: 26,
    updatedDaysAgo: 21
  },
  {
    productName: "NovaSketch",
    organizationName: "NovaSketch",
    website: "https://novasketch.ai",
    slogan: "3D concept art for product teams.",
    tags: ["3D generation", "Image generation"],
    region: "Global",
    status: "published",
    productType: "Software",
    focus: "design teams explore 3D ideas without specialized tooling",
    shortDescription: "3D concept art in minutes for product design teams.",
    views: 3900,
    likes: 1520,
    saves: 540,
    rating: 4.9,
    ratingCount: 260,
    pricing: { model: "subscription", price: 49, interval: "month" },
    discountPercent: 10,
    updatedDaysAgo: 1,
    isFeatured: true,
    featuredRank: 4,
    atlasCount: 3
  },
  {
    productName: "FlowForge",
    organizationName: "FlowForge Co.",
    website: "https://flowforge.ai",
    slogan: "Automation blueprints for busy teams.",
    tags: ["Agent build", "Efficiency Tools"],
    region: "NA",
    status: "published",
    productType: "Agent",
    focus: "ops teams launch automations for finance, ops, and support",
    shortDescription: "Prebuilt automation blueprints tailored to busy ops teams.",
    views: 2600,
    likes: 560,
    saves: 200,
    rating: 4.3,
    ratingCount: 70,
    updatedDaysAgo: 9
  },
  {
    productName: "KindredCare",
    organizationName: "KindredCare AI",
    website: "https://kindredcare.ai",
    slogan: "Compassionate AI companionship at scale.",
    tags: ["Virtual companionship", "General Assistant"],
    region: "Other",
    status: "draft",
    productType: "Software",
    focus: "care teams deliver personalized check-ins and reminders",
    shortDescription: "Compassionate AI companion workflows for care teams.",
    views: 300,
    likes: 180,
    saves: 65,
    rating: 4.1,
    ratingCount: 32,
    updatedDaysAgo: 30,
    trailer: {
      enabled: true,
      releaseAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString(),
      note: "Private beta opens soon.",
      reservationEnabled: true,
      reservationUrl: "https://kindredcare.ai/beta"
    }
  },
  {
    productName: "SignalDock",
    organizationName: "SignalDock",
    website: "https://signaldock.ai",
    slogan: "Unified APIs for trusted model access.",
    tags: ["Programming Development", "Smart Search"],
    region: "Global",
    status: "published",
    productType: "Model/API",
    focus: "engineering teams route traffic across model vendors safely",
    shortDescription: "Route model traffic safely with policy-based controls.",
    views: 4100,
    likes: 1120,
    saves: 420,
    rating: 4.6,
    ratingCount: 190,
    pricing: { model: "subscription", price: 129, interval: "month" },
    updatedDaysAgo: 7,
    isFeatured: true,
    featuredRank: 5,
    atlasCount: 2
  }
];

const defaultTrailer: ProductTrailer = {
  enabled: false,
  releaseAt: undefined,
  note: "",
  reservationEnabled: false,
  reservationUrl: ""
};

function toDate(daysAgo: number) {
  return new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
}

function buildDetails(seed: ProductSeed) {
  const paragraph1 = `${seed.productName} helps ${seed.focus}. Built by ${seed.organizationName}, it focuses on clarity, speed, and the workflows teams already trust.`;
  const paragraph2 = `Teams use ${seed.productName} to prioritize the work that matters, track outcomes, and share results without digging through tools. The experience is designed to stay lightweight while still giving teams the context they need.`;
  return [paragraph1, paragraph2].join("\n\n");
}

function createAtlasImages(count: number) {
  if (count <= 0) return [];
  return Array.from({ length: count }).map((_, index) => ({
    id: createId("file"),
    name: `atlas-${index + 1}.jpg`,
    size: 120000 + index * 15000,
    type: "image/jpeg",
    lastModified: Date.now()
  }));
}

function createDemoUsers() {
  const now = new Date().toISOString();
  return demoUsers.map((seed) => {
    const user: User = {
      id: createId("usr"),
      name: seed.name,
      email: seed.email,
      createdAt: now
    };
    addUser(user);
    return user;
  });
}

function createDemoProducts(users: User[]) {
  productSeeds.forEach((seed, index) => {
    const owner = users[index % users.length];
    const updatedAt = toDate(seed.updatedDaysAgo);
    const createdAt = toDate(seed.updatedDaysAgo + 22);

    const product: Product = {
      id: createId("prd"),
      ownerUserId: owner.id,
      status: seed.status,
      createdAt,
      updatedAt,
      views: seed.views,
      coverImage: getDemoCoverByIndex(index),
      shortDescription: seed.shortDescription,
      pricing: seed.pricing,
      discountPercent: seed.discountPercent,
      likes: seed.likes,
      saves: seed.saves,
      rating: seed.rating,
      ratingCount: seed.ratingCount,
      isSeededDemo: true,
      isFeatured: seed.isFeatured,
      featuredRank: seed.featuredRank,
      iconKey: seed.iconKey,
      fields: {
        productName: seed.productName,
        officialWebsiteUrl: seed.website,
        organizationName: seed.organizationName,
        submitterRelationship: "owner",
        contactEmail: `hello@${seed.website
          .replace("https://", "")
          .replace("http://", "")}`,
        region: seed.region,
        productType: seed.productType,
        introSlogan: seed.slogan,
        productDetails: buildDetails(seed),
        productDetailsFormat: "markdown",
        classificationTags: seed.tags,
        productLogo: undefined,
        productCover: undefined,
        productVideoUrl: seed.videoUrl ?? "",
        detailsPageAtlasImages: createAtlasImages(seed.atlasCount ?? 0),
        acknowledgements: seed.acknowledgements ?? [],
        trailer: {
          ...defaultTrailer,
          ...seed.trailer
        }
      }
    };

    product.iconKey = seed.iconKey ?? getIconForProduct(product);
    upsertProduct(product);
  });
}

export function seedDemoData() {
  if (typeof window === "undefined") return;
  if (getSeededFlag()) return;

  const existingUsers = getUsers();
  const existingProducts = getAllProducts();
  if (existingUsers.length > 0 || existingProducts.length > 0) return;

  const users = createDemoUsers();
  createDemoProducts(users);
  setSeededFlag();
}

export function ensureDemoCoverImages() {
  if (typeof window === "undefined") return;
  const products = getAllProducts();
  products.forEach((product, index) => {
    const existingCover = product.coverImage ?? "";
    const hadLegacyCover = existingCover.startsWith("/demo/cover-");
    const hadLegacyAvif =
      existingCover.startsWith("/demo/") && existingCover.endsWith(".avif");
    const needsCover = product.isSeededDemo && !product.coverImage;
    if (!hadLegacyCover && !hadLegacyAvif && !needsCover) return;
    const nextCover = getDemoCoverByIndex(index);
    if (nextCover === product.coverImage) return;
    upsertProduct({
      ...product,
      coverImage: nextCover,
      isSeededDemo: product.isSeededDemo ?? true
    });
  });
}
