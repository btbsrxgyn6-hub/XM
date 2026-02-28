"use client";

import { Input } from "@/components/atoms/input";
import { Toggle } from "@/components/atoms/toggle";
import { FormField } from "@/components/molecules/form-field";
import type { ProductFields } from "@/lib/types";
import { isValidUrl } from "@/lib/validation";
import { useTranslations, type TranslationValues } from "next-intl";

type TFn = (key: string, values?: TranslationValues) => string;

export function validateTrailer(fields: ProductFields, t: TFn) {
  const errors: Record<string, string> = {};
  if (fields.trailer.enabled) {
    if (!fields.trailer.releaseAt) {
      errors.trailerReleaseAt = t("trailerReleaseRequired");
    } else {
      const releaseAt = new Date(fields.trailer.releaseAt).getTime();
      const min = Date.now() + 24 * 60 * 60 * 1000;
      if (Number.isNaN(releaseAt) || releaseAt < min) {
        errors.trailerReleaseAt = t("trailerReleaseWindow");
      }
    }
    if (fields.trailer.reservationEnabled && fields.trailer.reservationUrl) {
      if (!isValidUrl(fields.trailer.reservationUrl)) {
        errors.reservationUrl = t("reservationUrlInvalid");
      }
    }
  }
  return errors;
}

export function StepTrailer({
  fields,
  onChange,
  errors
}: {
  fields: ProductFields;
  onChange: (next: Partial<ProductFields>) => void;
  errors: Record<string, string>;
}) {
  const trailer = fields.trailer;
  const t = useTranslations("wizard");

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/10 bg-surface/70 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">{t("trailer.title")}</p>
            <p className="mt-1 text-xs text-primary/60">
              {t("trailer.subtitle")}
            </p>
          </div>
          <Toggle
            label={t("trailer.enable")}
            checked={trailer.enabled}
            onChange={(enabled) =>
              onChange({
                trailer: { ...trailer, enabled }
              })
            }
          />
        </div>

        {trailer.enabled ? (
          <div className="mt-6 space-y-5">
            <FormField
              label={t("trailer.releaseTime")}
              htmlFor="trailerReleaseAt"
              required
              error={errors.trailerReleaseAt}
            >
              <Input
                id="trailerReleaseAt"
                type="datetime-local"
                value={trailer.releaseAt ?? ""}
                onChange={(event) =>
                  onChange({
                    trailer: { ...trailer, releaseAt: event.target.value }
                  })
                }
              />
            </FormField>

            <FormField label={t("trailer.note")} htmlFor="trailerNote">
              <Input
                id="trailerNote"
                value={trailer.note ?? ""}
                onChange={(event) =>
                  onChange({
                    trailer: { ...trailer, note: event.target.value }
                  })
                }
                placeholder={t("trailer.notePlaceholder")}
              />
            </FormField>

            <div className="rounded-2xl border border-primary/10 bg-surface/70 p-4 text-xs text-primary/70">
              {t("trailer.rules")}
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-primary/10 bg-surface/60 p-4">
              <div>
                <p className="text-sm font-semibold text-primary">{t("trailer.reservations.title")}</p>
                <p className="text-xs text-primary/60">
                  {t("trailer.reservations.subtitle")}
                </p>
              </div>
              <Toggle
                label={t("trailer.reservations.enable")}
                checked={!!trailer.reservationEnabled}
                onChange={(enabled) =>
                  onChange({
                    trailer: { ...trailer, reservationEnabled: enabled }
                  })
                }
              />
            </div>

            {trailer.reservationEnabled ? (
              <FormField
                label={t("trailer.reservations.url")}
                htmlFor="reservationUrl"
                error={errors.reservationUrl}
              >
                <Input
                  id="reservationUrl"
                  value={trailer.reservationUrl ?? ""}
                  onChange={(event) =>
                    onChange({
                      trailer: { ...trailer, reservationUrl: event.target.value }
                    })
                  }
                  placeholder={t("trailer.reservations.placeholder")}
                />
              </FormField>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
