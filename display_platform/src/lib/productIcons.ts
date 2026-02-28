import {
  Bot,
  Brain,
  BarChart3,
  Code2,
  Cpu,
  Image,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Video,
  Volume2,
  Circle
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { ClassificationTag, Product, ProductType } from "@/lib/types";

export type ProductIconKey =
  | "sparkles"
  | "bot"
  | "search"
  | "code"
  | "image"
  | "video"
  | "audio"
  | "brain"
  | "hardware"
  | "shield"
  | "chart"
  | "rocket"
  | "default";

export const ICON_MAP: Record<ProductIconKey, LucideIcon> = {
  sparkles: Sparkles,
  bot: Bot,
  search: Search,
  code: Code2,
  image: Image,
  video: Video,
  audio: Volume2,
  brain: Brain,
  hardware: Cpu,
  shield: Shield,
  chart: BarChart3,
  rocket: Rocket,
  default: Circle
};

const tagIconMap: Partial<Record<ClassificationTag, ProductIconKey>> = {
  "Image generation": "image",
  "Video Creation": "video",
  "Audio Processing": "audio",
  "Programming Development": "code",
  "Smart Search": "search",
  "Knowledge Management": "brain",
  "Agent build": "bot",
  "General Assistant": "sparkles",
  "Smart Hardware": "hardware",
  "Scientific research assistant": "chart",
  "Efficiency Tools": "rocket",
  "3D generation": "image",
  "Writing aids": "sparkles",
  "Virtual companionship": "bot"
};

const typeIconMap: Partial<Record<ProductType, ProductIconKey>> = {
  Software: "sparkles",
  Agent: "bot",
  "Model/API": "code",
  Hardware: "hardware",
  Robotics: "hardware",
  "Research/Demo": "chart"
};

export function getIconForProduct(product: Pick<Product, "fields" | "iconKey">): ProductIconKey {
  if (product.iconKey && product.iconKey in ICON_MAP) {
    return product.iconKey as ProductIconKey;
  }
  const [firstTag] = product.fields.classificationTags;
  if (firstTag && tagIconMap[firstTag]) {
    return tagIconMap[firstTag] as ProductIconKey;
  }
  const typeKey = product.fields.productType;
  if (typeKey && typeIconMap[typeKey]) {
    return typeIconMap[typeKey] as ProductIconKey;
  }
  return "default";
}
