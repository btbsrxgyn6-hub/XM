"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Divider } from "@/components/atoms/divider";
import { Modal } from "@/components/molecules/modal";
import { Stepper } from "@/components/molecules/stepper";
import { StepAcknowledgements, validateAcknowledgements } from "@/components/organisms/product-wizard/step-acknowledgements";
import { StepBasicInfo, validateBasicInfo } from "@/components/organisms/product-wizard/step-basic-info";
import { StepDescriptionAssets, validateDescriptionAssets } from "@/components/organisms/product-wizard/step-description-assets";
import { StepPreview } from "@/components/organisms/product-wizard/step-preview";
import { StepTrailer, validateTrailer } from "@/components/organisms/product-wizard/step-trailer";
import { createEmptyProductDraft } from "@/lib/product-defaults";
import { createId } from "@/lib/id";
import { useDraft } from "@/lib/hooks/use-draft";
import { useProducts } from "@/lib/hooks/use-products";
import { useAuth } from "@/lib/hooks/use-auth";
import type { Product, ProductDraft, ProductFields } from "@/lib/types";

type Mode = "new" | "edit";

export function ProductWizard({
  mode,
  productId,
  initialProduct
}: {
  mode: Mode;
  productId?: string;
  initialProduct?: Product;
}) {
  const { currentUser } = useAuth();
  const { save } = useProducts();
  const t = useTranslations("wizard");
  const validationT = useTranslations("validation");
  const draftKey = productId ?? "new";
  const { draft, setDraft, clearDraft, isRestoring } = useDraft(`product-${draftKey}`);
  const [currentStep, setCurrentStep] = useState(0);
  const [showClearModal, setShowClearModal] = useState(false);
  const [actionStatus, setActionStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message?: string;
    errors?: Record<string, string>;
  }>({ type: "idle" });

  const baseDraft: ProductDraft = useMemo(() => {
    if (initialProduct) {
      return {
        productId: initialProduct.id,
        updatedAt: initialProduct.updatedAt,
        fields: initialProduct.fields,
        coverImage: initialProduct.coverImage
      };
    }
    return createEmptyProductDraft();
  }, [initialProduct]);

  const draftState = draft ?? baseDraft;
  const fields = draftState.fields;
  const steps = [
    { title: t("steps.basic") },
    { title: t("steps.details") },
    { title: t("steps.acknowledgements") },
    { title: t("steps.trailer") },
    { title: t("steps.preview") }
  ];

  function resolveStableDraft(current: ProductDraft | null | undefined) {
    const resolved = current ?? baseDraft;
    const stableId =
      resolved.productId ?? productId ?? initialProduct?.id ?? createId("prd");
    return { resolved, stableId };
  }

  function updateFields(next: Partial<ProductFields>) {
    setDraft((prev) => {
      const { resolved, stableId } = resolveStableDraft(prev);
      return {
        ...resolved,
        productId: stableId,
        fields: {
          ...resolved.fields,
          ...next
        },
        updatedAt: new Date().toISOString()
      };
    });
  }

  function updateCoverImage(next?: string) {
    setDraft((prev) => {
      const { resolved, stableId } = resolveStableDraft(prev);
      return {
        ...resolved,
        productId: stableId,
        coverImage: next,
        updatedAt: new Date().toISOString()
      };
    });
  }

  function clearStepFields() {
    if (currentStep === 0) {
      updateFields({
        productName: "",
        officialWebsiteUrl: "",
        organizationName: "",
        submitterRelationship: "",
        contactEmail: "",
        region: undefined,
        productType: undefined
      });
    }
    if (currentStep === 1) {
      updateFields({
        introSlogan: "",
        productDetails: "",
        productDetailsFormat: "markdown",
        classificationTags: [],
        productLogo: undefined,
        productCover: undefined,
        productVideoUrl: "",
        detailsPageAtlasImages: []
      });
      updateCoverImage(undefined);
    }
    if (currentStep === 2) {
      updateFields({ acknowledgements: [] });
    }
    if (currentStep === 3) {
      updateFields({
        trailer: {
          enabled: false,
          releaseAt: undefined,
          note: "",
          reservationEnabled: false,
          reservationUrl: ""
        }
      });
    }
  }

  const stepErrors = useMemo(() => {
    if (currentStep === 0) return validateBasicInfo(fields, validationT);
    if (currentStep === 1) return validateDescriptionAssets(fields, validationT);
    if (currentStep === 2) return validateAcknowledgements(fields);
    if (currentStep === 3) return validateTrailer(fields, validationT);
    return {};
  }, [currentStep, fields, validationT]);

  const isStepValid = Object.keys(stepErrors).length === 0;

  async function handleSaveDraft(status: Product["status"] = "draft") {
    if (!currentUser) return;
    setActionStatus({ type: "loading" });
    const now = new Date().toISOString();
    const resolvedId =
      draftState.productId ?? initialProduct?.id ?? productId ?? createId("prd");
    const product: Product = {
      id: resolvedId,
      ownerUserId: currentUser.id,
      status,
      createdAt: initialProduct?.createdAt ?? now,
      updatedAt: now,
      coverImage: draftState.coverImage,
      fields
    };

    try {
      const saved = await save(product);
      clearDraft();
      if (status === "submitted") {
        setActionStatus({
          type: "success",
          message: t("status.submitted")
        });
      } else {
        setActionStatus({
          type: "success",
          message: saved ? t("status.draftSaved") : t("status.draftSavedShort")
        });
      }
    } catch (error) {
      const payload = (error as Error & { payload?: { errors?: Record<string, string> } })
        .payload;
      setActionStatus({
        type: "error",
        message: error instanceof Error ? error.message : validationT("generic"),
        errors: payload?.errors
      });
    }
  }

  async function handleSubmit() {
    await handleSaveDraft("submitted");
  }

  if (isRestoring) {
    return (
      <Card className="p-6 text-sm text-primary/60">{t("restoring")}</Card>
    );
  }

  return (
    <div className="space-y-6">
      {actionStatus.type !== "idle" ? (
        <Card
          className={
            actionStatus.type === "error"
              ? "border border-brand/35 bg-brand/10 p-4 text-sm text-primary"
              : actionStatus.type === "success"
              ? "border border-brand/25 bg-brand/8 p-4 text-sm text-primary"
              : "border border-primary/10 bg-primary/3 p-4 text-sm text-primary/70"
          }
        >
          <p className="font-semibold">
            {actionStatus.type === "loading"
              ? t("status.saving")
              : actionStatus.type === "success"
              ? t("status.success")
              : t("status.error")}
          </p>
          {actionStatus.message ? (
            <p className="mt-1 text-xs text-primary/70">{actionStatus.message}</p>
          ) : null}
          {actionStatus.type === "error" && actionStatus.errors ? (
            <ul className="mt-2 space-y-1 text-xs text-primary/70">
              {Object.entries(actionStatus.errors).map(([field, message]) => (
                <li key={field}>
                  <span className="font-semibold">{field}:</span> {message}
                </li>
              ))}
            </ul>
          ) : null}
        </Card>
      ) : null}
      <Card className="p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
          {mode === "edit" ? t("mode.edit") : t("mode.new")}
        </p>
        <Stepper steps={steps} currentStepIndex={currentStep} />
      </Card>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              {t("stepCounter", { step: currentStep + 1, total: steps.length })}
            </p>
            <p className="text-xs text-primary/60">{steps[currentStep].title}</p>
          </div>
          <Button variant="ghost" onClick={() => setShowClearModal(true)}>
            {t("clearStep")}
          </Button>
        </div>
        <Divider className="my-6" />

        {currentStep === 0 ? (
          <StepBasicInfo fields={fields} onChange={updateFields} errors={stepErrors} />
        ) : null}
        {currentStep === 1 ? (
          <StepDescriptionAssets
            fields={fields}
            coverImage={draftState.coverImage}
            onChange={updateFields}
            onCoverChange={updateCoverImage}
            errors={stepErrors}
          />
        ) : null}
        {currentStep === 2 ? (
          <StepAcknowledgements fields={fields} onChange={updateFields} />
        ) : null}
        {currentStep === 3 ? (
          <StepTrailer fields={fields} onChange={updateFields} errors={stepErrors} />
        ) : null}
        {currentStep === 4 ? (
          <StepPreview
            fields={fields}
            coverImage={draftState.coverImage}
            onSaveDraft={() => handleSaveDraft("draft")}
            onSubmit={handleSubmit}
            onBack={() => setCurrentStep(3)}
          />
        ) : null}

        {currentStep < 4 ? (
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
              disabled={currentStep === 0}
            >
              {t("actions.previous")}
            </Button>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="ghost"
                onClick={() => handleSaveDraft("draft")}
                disabled={!fields.productName}
              >
                {t("actions.saveDraft")}
              </Button>
              <Button
                onClick={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
                disabled={!isStepValid}
              >
                {t("actions.next")}
              </Button>
            </div>
          </div>
        ) : null}
      </Card>

      <Modal
        open={showClearModal}
        title={t("clearModal.title")}
        description={t("clearModal.description")}
        onConfirm={clearStepFields}
        onClose={() => setShowClearModal(false)}
        confirmLabel={t("clearModal.confirm")}
      />
    </div>
  );
}
