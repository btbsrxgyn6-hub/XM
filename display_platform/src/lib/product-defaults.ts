import type { ProductDraft, ProductFields } from "@/lib/types";

export function createEmptyProductFields(): ProductFields {
  return {
    productName: "",
    officialWebsiteUrl: "",
    organizationName: "",
    submitterRelationship: "",
    contactEmail: "",
    region: undefined,
    productType: undefined,
    introSlogan: "",
    productDetails: "",
    productDetailsFormat: "markdown",
    classificationTags: [],
    productLogo: undefined,
    productCover: undefined,
    productVideoUrl: "",
    detailsPageAtlasImages: [],
    acknowledgements: [],
    trailer: {
      enabled: false,
      releaseAt: undefined,
      note: "",
      reservationEnabled: false,
      reservationUrl: ""
    }
  };
}

export function createEmptyProductDraft(): ProductDraft {
  return {
    productId: undefined,
    updatedAt: new Date().toISOString(),
    fields: createEmptyProductFields(),
    coverImage: undefined
  };
}
