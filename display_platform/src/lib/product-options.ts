import type { ProductType, Region } from "@/lib/types";

const REGION_KEYS: Record<Region, string> = {
  Global: "global",
  NA: "na",
  EU: "eu",
  APAC: "apac",
  Other: "other"
};

const PRODUCT_TYPE_KEYS: Record<ProductType, string> = {
  Software: "software",
  Agent: "agent",
  "Model/API": "modelApi",
  Hardware: "hardware",
  Robotics: "robotics",
  "Research/Demo": "researchDemo"
};

export function regionKey(region: Region) {
  return REGION_KEYS[region];
}

export function productTypeKey(type: ProductType) {
  return PRODUCT_TYPE_KEYS[type];
}
