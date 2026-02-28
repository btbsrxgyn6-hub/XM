"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations, type TranslationValues } from "next-intl";

import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Toggle } from "@/components/atoms/toggle";
import { FormField } from "@/components/molecules/form-field";
import { TagPicker } from "@/components/molecules/tag-picker";
import { UploadDropzone } from "@/components/molecules/upload-dropzone";
import { cn } from "@/lib/cn";
import { DEMO_COVERS } from "@/lib/demoCovers";
import { createId } from "@/lib/id";
import { previewKey } from "@/lib/storageKeys";
import { tagKey } from "@/lib/tags";
import type { FileMeta, ProductFields } from "@/lib/types";
import { CLASSIFICATION_TAG_OPTIONS } from "@/lib/types";
import { isValidUrl } from "@/lib/validation";

function fileToMeta(file: File): FileMeta {
  return {
    id: createId("file"),
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  };
}

type TFn = (key: string, values?: TranslationValues) => string;

export function validateDescriptionAssets(fields: ProductFields, t: TFn) {
  const errors: Record<string, string> = {};
  if (!fields.productDetails.trim()) {
    errors.productDetails = t("productDetailsRequired");
  }
  if (fields.classificationTags.length < 1) {
    errors.classificationTags = t("tagsMin");
  }
  if (fields.classificationTags.length > 3) {
    errors.classificationTags = t("tagsMax");
  }
  if (fields.productVideoUrl && !isValidUrl(fields.productVideoUrl)) {
    errors.productVideoUrl = t("urlInvalid");
  }
  return errors;
}

export function StepDescriptionAssets({
  fields,
  coverImage,
  onChange,
  onCoverChange,
  errors
}: {
  fields: ProductFields;
  coverImage?: string;
  onChange: (next: Partial<ProductFields>) => void;
  onCoverChange: (next?: string) => void;
  errors: Record<string, string>;
}) {
  const t = useTranslations("wizard");
  const productsT = useTranslations("products");
  const [showPreview, setShowPreview] = useState(true);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const detailsFormat = fields.productDetailsFormat ?? "markdown";
  const previewsRef = useRef(previews);
  const persistedRef = useRef(new Set<string>());

  useEffect(() => {
    previewsRef.current = previews;
  }, [previews]);

  useEffect(() => {
    const persistedSet = persistedRef.current;
    return () => {
      Object.entries(previewsRef.current).forEach(([id, url]) => {
        if (!persistedSet.has(id)) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, []);

  const productDetailsPreview = useMemo(() => {
    if (!fields.productDetails) return t("details.emptyPreview");
    const preview = fields.productDetails.slice(0, 480);
    return preview + (fields.productDetails.length > 480 ? "…" : "");
  }, [fields.productDetails, t]);

  function setPreviewForFile(id: string, file: File, persist = false) {
    const url = URL.createObjectURL(file);
    setPreviews((prev) => {
      const next = { ...prev, [id]: url };
      return next;
    });
    if (persist && typeof window !== "undefined") {
      window.sessionStorage.setItem(previewKey(id), url);
      persistedRef.current.add(id);
    }
  }

  function revokePreview(id?: string) {
    if (!id) return;
    setPreviews((prev) => {
      const url = prev[id];
      if (url) URL.revokeObjectURL(url);
      if (persistedRef.current.has(id) && typeof window !== "undefined") {
        window.sessionStorage.removeItem(previewKey(id));
        persistedRef.current.delete(id);
      }
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  }

  function moveAtlasImage(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= fields.detailsPageAtlasImages.length) return;
    const next = [...fields.detailsPageAtlasImages];
    const [item] = next.splice(index, 1);
    next.splice(nextIndex, 0, item);
    onChange({ detailsPageAtlasImages: next });
  }

  return (
    <div className="space-y-8">
      <FormField
        label={t("details.introSlogan")}
        htmlFor="introSlogan"
        hint={`${fields.introSlogan?.length ?? 0}/80`}
      >
        <Input
          id="introSlogan"
          value={fields.introSlogan ?? ""}
          onChange={(event) =>
            onChange({ introSlogan: event.target.value.slice(0, 80) })
          }
          placeholder={t("details.introSloganPlaceholder")}
        />
      </FormField>

      <FormField
        label={t("details.productDetails")}
        htmlFor="productDetails"
        required
        error={errors.productDetails}
      >
        <Textarea
          id="productDetails"
          rows={8}
          value={fields.productDetails}
          onChange={(event) => onChange({ productDetails: event.target.value })}
          placeholder={t("details.productDetailsPlaceholder")}
        />
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-primary/60">
            <span>
              {detailsFormat === "markdown"
                ? t("details.markdownOn")
                : t("details.markdownOff")}
            </span>
            <Toggle
              checked={detailsFormat === "markdown"}
              onChange={(enabled) =>
                onChange({ productDetailsFormat: enabled ? "markdown" : "plain" })
              }
              label={t("details.toggleMarkdown")}
            />
          </div>
          <Toggle
            checked={showPreview}
            onChange={setShowPreview}
            label={t("details.togglePreview")}
          />
        </div>
        {showPreview ? (
          <div className="mt-4 rounded-2xl border border-primary/10 bg-surface/60 p-4 text-sm text-primary/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/40">
              {t("details.previewTitle")}
            </p>
            <p className="mt-2 whitespace-pre-wrap">{productDetailsPreview}</p>
          </div>
        ) : null}
      </FormField>

      <FormField
        label={t("details.classificationTags")}
        htmlFor="classificationTags"
        required
        error={errors.classificationTags}
      >
        <TagPicker
          options={CLASSIFICATION_TAG_OPTIONS}
          selected={fields.classificationTags}
          getLabel={(tag) => productsT(`tags.${tagKey(tag)}`)}
          onChange={(next) => onChange({ classificationTags: next })}
        />
      </FormField>

      <div className="grid gap-6 lg:grid-cols-2">
        <UploadDropzone
          label={t("details.productLogo")}
          accept="image/*"
          onFiles={(files) => {
            const file = files.item(0);
            if (!file) return;
            if (fields.productLogo) revokePreview(fields.productLogo.id);
            const meta = fileToMeta(file);
            onChange({ productLogo: meta });
            setPreviewForFile(meta.id, file, true);
          }}
          description={t("details.productLogoHint")}
        />
        <UploadDropzone
          label={t("details.productCover")}
          accept="image/*"
          onFiles={(files) => {
            const file = files.item(0);
            if (!file) return;
            if (fields.productCover) revokePreview(fields.productCover.id);
            const meta = fileToMeta(file);
            onChange({ productCover: meta });
            setPreviewForFile(meta.id, file);
          }}
          description={t("details.productCoverHint")}
        />
      </div>

      <div className="rounded-3xl border border-primary/10 bg-surface/70 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("details.coverTemplates")}
          </p>
          {coverImage ? (
            <button
              type="button"
              className="text-xs font-semibold text-primary/70 hover:text-primary"
              onClick={() => onCoverChange(undefined)}
            >
              {t("details.clearCover")}
            </button>
          ) : null}
        </div>
        <p className="mt-2 text-xs text-primary/60">{t("details.coverTemplatesHint")}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {DEMO_COVERS.map((src) => {
            const active = coverImage === src;
            return (
              <button
                key={src}
                type="button"
                onClick={() => onCoverChange(src)}
                className={cn(
                  "group relative overflow-hidden rounded-xl border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  active
                    ? "border-brand/60 shadow-glow"
                    : "border-primary/10 hover:border-primary/30"
                )}
              >
                <div className="relative aspect-video w-full bg-primary/5">
                  <Image
                    src={src}
                    alt={t("details.coverTemplateAlt")}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    unoptimized
                    className="object-cover"
                  />
                </div>
                {active ? (
                  <span className="absolute right-2 top-2 rounded-full bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                    {t("details.selectedCover")}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-primary/10 bg-surface/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("details.logoPreview")}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl bg-primary/3">
              {fields.productLogo && previews[fields.productLogo.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previews[fields.productLogo.id]}
                  alt={fields.productName || t("details.logoPreview")}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="text-xs text-primary/60">
              {fields.productLogo ? fields.productLogo.name : t("details.noLogo")}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-primary/10 bg-surface/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
            {t("details.coverPreview")}
          </p>
          <div className="mt-3 overflow-hidden rounded-2xl bg-primary/3">
            {fields.productCover && previews[fields.productCover.id] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previews[fields.productCover.id]}
                alt={fields.productName || t("details.coverPreview")}
                className="h-40 w-full object-cover"
              />
            ) : coverImage ? (
              <div className="relative h-40 w-full">
                <Image
                  src={coverImage}
                  alt={fields.productName || t("details.coverPreview")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-40 w-full" />
            )}
          </div>
          <p className="mt-2 text-xs text-primary/60">
            {fields.productCover
              ? fields.productCover.name
              : coverImage
                ? t("details.templateCoverLabel")
                : t("details.noCover")}
          </p>
        </div>
      </div>

      <FormField label={t("details.productVideoUrl")} htmlFor="productVideoUrl" error={errors.productVideoUrl}>
        <Input
          id="productVideoUrl"
          value={fields.productVideoUrl ?? ""}
          onChange={(event) => onChange({ productVideoUrl: event.target.value })}
          placeholder={t("details.productVideoPlaceholder")}
        />
      </FormField>

      <div className="space-y-3">
        <UploadDropzone
          label={t("details.atlasImages")}
          accept="image/*"
          multiple
          onFiles={(files) => {
            const nextFiles = Array.from(files).map((file) => {
              const meta = fileToMeta(file);
              setPreviewForFile(meta.id, file);
              return meta;
            });
            onChange({
              detailsPageAtlasImages: [...fields.detailsPageAtlasImages, ...nextFiles]
            });
          }}
          description={t("details.atlasImagesHint")}
        />
        {fields.detailsPageAtlasImages.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {fields.detailsPageAtlasImages.map((file, index) => (
              <div
                key={file.id}
                className="rounded-2xl border border-primary/10 bg-surface/70 p-3 text-xs text-primary/70"
              >
                <div className="mb-2 h-24 overflow-hidden rounded-xl bg-primary/3">
                  {previews[file.id] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previews[file.id]}
                      alt={file.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full" />
                  )}
                </div>
                <p className="font-semibold text-primary">{file.name}</p>
                <p>{Math.round(file.size / 1024)} KB</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary/70 hover:text-primary"
                    onClick={() => moveAtlasImage(index, -1)}
                    disabled={index === 0}
                  >
                    {t("details.moveUp")}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary/70 hover:text-primary"
                    onClick={() => moveAtlasImage(index, 1)}
                    disabled={index === fields.detailsPageAtlasImages.length - 1}
                  >
                    {t("details.moveDown")}
                  </button>
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary/70 hover:text-primary"
                    onClick={() =>
                      (() => {
                        revokePreview(file.id);
                        onChange({
                          detailsPageAtlasImages: fields.detailsPageAtlasImages.filter(
                            (item) => item.id !== file.id
                          )
                        });
                      })()
                    }
                  >
                    {t("details.remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-primary/60">
            {t("details.noAtlas")}
          </p>
        )}
      </div>
    </div>
  );
}
