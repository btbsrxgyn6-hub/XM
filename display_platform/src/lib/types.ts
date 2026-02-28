export type ISODateString = string;

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: ISODateString;
};

export type ProductStatus = "draft" | "submitted" | "published";

export type SubmitterRelationship = "third_party" | "owner" | "team_member";

export type Region = "Global" | "NA" | "EU" | "APAC" | "Other";

export type ProductType =
  | "Software"
  | "Agent"
  | "Model/API"
  | "Hardware"
  | "Robotics"
  | "Research/Demo";

export const CLASSIFICATION_TAG_OPTIONS = [
  "General Assistant",
  "Image generation",
  "Video Creation",
  "Audio Processing",
  "Programming Development",
  "Smart Search",
  "Knowledge Management",
  "Writing aids",
  "Smart Hardware",
  "Virtual companionship",
  "Agent build",
  "Efficiency Tools",
  "3D generation",
  "Scientific research assistant",
  "Other types"
] as const;

export type ClassificationTag = (typeof CLASSIFICATION_TAG_OPTIONS)[number];

export type FileMeta = {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  url?: string;
};

export type Acknowledgement = {
  id: string;
  name: string;
  url?: string;
  note?: string;
};

export type ProductTrailer = {
  enabled: boolean;
  releaseAt?: ISODateString;
  note?: string;
  reservationEnabled?: boolean;
  reservationUrl?: string;
};

export type ProductFields = {
  productName: string;
  officialWebsiteUrl: string;
  organizationName: string;
  submitterRelationship: SubmitterRelationship | "";
  contactEmail: string;
  region?: Region;
  productType?: ProductType;
  introSlogan?: string;
  productDetails: string;
  productDetailsFormat: "markdown" | "plain";
  classificationTags: ClassificationTag[];
  productLogo?: FileMeta;
  productCover?: FileMeta;
  productVideoUrl?: string;
  detailsPageAtlasImages: FileMeta[];
  acknowledgements: Acknowledgement[];
  trailer: ProductTrailer;
};

export type Product = {
  id: string;
  ownerUserId: string;
  status: ProductStatus;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  views?: number;
  coverImage?: string;
  logoImage?: string;
  shortDescription?: string;
  pricing?: {
    model: "free" | "subscription" | "one_time";
    price?: number;
    interval?: "month" | "year";
  };
  discountPercent?: number;
  likes?: number;
  saves?: number;
  rating?: number;
  ratingCount?: number;
  followCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  isFollowedByMe?: boolean;
  isBookmarkedByMe?: boolean;
  isSeededDemo?: boolean;
  isFeatured?: boolean;
  featuredRank?: number;
  iconKey?: string;
  fields: ProductFields;
};

export type ProductDraft = {
  productId?: string;
  updatedAt: ISODateString;
  fields: ProductFields;
  coverImage?: string;
};

export type AuthSession = {
  userId: string;
  createdAt: ISODateString;
};

export type CommentAuthor = {
  id: string;
  name: string;
};

export type CommentItem = {
  id: string;
  productId: string;
  parentId?: string | null;
  body?: string | null;
  isDeleted: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
  author: CommentAuthor;
  replyCount: number;
};

export type CommentList = {
  items: CommentItem[];
  nextCursor?: string | null;
};
