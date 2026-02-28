"use client";

import { Input } from "@/components/atoms/input";
import { RadioGroup } from "@/components/atoms/radio-group";
import { Select } from "@/components/atoms/select";
import { FormField } from "@/components/molecules/form-field";
import { productTypeKey, regionKey } from "@/lib/product-options";
import type { ProductFields, Region, ProductType } from "@/lib/types";
import { isValidEmail, isValidUrl } from "@/lib/validation";
import { useTranslations, type TranslationValues } from "next-intl";

const regionOptions: Region[] = ["Global", "NA", "EU", "APAC", "Other"];
const productTypeOptions: ProductType[] = [
  "Software",
  "Agent",
  "Model/API",
  "Hardware",
  "Robotics",
  "Research/Demo"
];

type TFn = (key: string, values?: TranslationValues) => string;

export function validateBasicInfo(fields: ProductFields, t: TFn) {
  const errors: Record<string, string> = {};
  if (!fields.productName.trim()) {
    errors.productName = t("productNameRequired");
  } else if (fields.productName.trim().length > 24) {
    errors.productName = t("productNameMax");
  }
  if (!fields.officialWebsiteUrl.trim() || !isValidUrl(fields.officialWebsiteUrl)) {
    errors.officialWebsiteUrl = t("websiteRequired");
  }
  if (!fields.organizationName.trim()) {
    errors.organizationName = t("organizationRequired");
  } else if (fields.organizationName.trim().length > 32) {
    errors.organizationName = t("organizationMax");
  }
  if (!fields.submitterRelationship) {
    errors.submitterRelationship = t("relationshipRequired");
  }
  if (!fields.contactEmail.trim() || !isValidEmail(fields.contactEmail)) {
    errors.contactEmail = t("contactEmailRequired");
  }
  return errors;
}

export function StepBasicInfo({
  fields,
  onChange,
  errors
}: {
  fields: ProductFields;
  onChange: (next: Partial<ProductFields>) => void;
  errors: Record<string, string>;
}) {
  const t = useTranslations("wizard");
  const productsT = useTranslations("products");
  const relationshipOptions = [
    { value: "owner", label: t("relationship.owner.title"), description: t("relationship.owner.description") },
    { value: "team_member", label: t("relationship.teamMember.title"), description: t("relationship.teamMember.description") },
    { value: "third_party", label: t("relationship.thirdParty.title"), description: t("relationship.thirdParty.description") }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <FormField
          label={t("basic.productName")}
          htmlFor="productName"
          required
          hint={`${fields.productName.length}/24`}
          error={errors.productName}
        >
          <Input
            id="productName"
            value={fields.productName}
            onChange={(event) =>
              onChange({ productName: event.target.value.slice(0, 24) })
            }
            placeholder={t("basic.productNamePlaceholder")}
          />
        </FormField>

        <FormField
          label={t("basic.website")}
          htmlFor="officialWebsiteUrl"
          required
          error={errors.officialWebsiteUrl}
        >
          <Input
            id="officialWebsiteUrl"
            value={fields.officialWebsiteUrl}
            onChange={(event) => onChange({ officialWebsiteUrl: event.target.value })}
            placeholder={t("basic.websitePlaceholder")}
          />
        </FormField>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <FormField
          label={t("basic.organization")}
          htmlFor="organizationName"
          required
          hint={`${fields.organizationName.length}/32`}
          error={errors.organizationName}
        >
          <Input
            id="organizationName"
            value={fields.organizationName}
            onChange={(event) =>
              onChange({ organizationName: event.target.value.slice(0, 32) })
            }
            placeholder={t("basic.organizationPlaceholder")}
          />
        </FormField>

        <FormField
          label={t("basic.contactEmail")}
          htmlFor="contactEmail"
          required
          error={errors.contactEmail}
        >
          <Input
            id="contactEmail"
            type="email"
            value={fields.contactEmail}
            onChange={(event) => onChange({ contactEmail: event.target.value })}
            placeholder={t("basic.contactEmailPlaceholder")}
          />
        </FormField>
      </div>

      <FormField
        label={t("basic.relationship")}
        required
        error={errors.submitterRelationship}
      >
        <RadioGroup
          name="submitterRelationship"
          value={fields.submitterRelationship}
          options={relationshipOptions}
          onChange={(value) => onChange({ submitterRelationship: value })}
        />
      </FormField>

      <div className="grid gap-6 lg:grid-cols-2">
        <FormField label={t("basic.region")} htmlFor="region">
          <Select
            id="region"
            value={fields.region ?? ""}
            onChange={(event) =>
              onChange({ region: event.target.value as Region })
            }
          >
            <option value="">{t("basic.regionPlaceholder")}</option>
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {productsT(`regions.${regionKey(region)}`)}
              </option>
            ))}
          </Select>
        </FormField>

        <FormField label={t("basic.productType")} htmlFor="productType">
          <Select
            id="productType"
            value={fields.productType ?? ""}
            onChange={(event) =>
              onChange({ productType: event.target.value as ProductType })
            }
          >
            <option value="">{t("basic.productTypePlaceholder")}</option>
            {productTypeOptions.map((type) => (
              <option key={type} value={type}>
                {t(`types.${productTypeKey(type)}`)}
              </option>
            ))}
          </Select>
        </FormField>
      </div>
    </div>
  );
}
