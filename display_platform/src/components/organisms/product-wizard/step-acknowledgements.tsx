"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { FormField } from "@/components/molecules/form-field";
import { createId } from "@/lib/id";
import type { Acknowledgement, ProductFields } from "@/lib/types";

export function validateAcknowledgements(_fields: ProductFields) {
  return {};
}

export function StepAcknowledgements({
  fields,
  onChange
}: {
  fields: ProductFields;
  onChange: (next: Partial<ProductFields>) => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const t = useTranslations("wizard");

  function addItem() {
    if (!name.trim()) return;
    const updatedItem: Acknowledgement = {
      id: editingId ?? createId("ack"),
      name: name.trim(),
      url: url.trim() || undefined,
      note: note.trim() || undefined
    };

    if (editingId) {
      onChange({
        acknowledgements: fields.acknowledgements.map((item) =>
          item.id === editingId ? updatedItem : item
        )
      });
    } else {
      onChange({
        acknowledgements: [...fields.acknowledgements, updatedItem]
      });
    }

    setName("");
    setUrl("");
    setNote("");
    setEditingId(null);
  }

  function removeItem(id: string) {
    onChange({
      acknowledgements: fields.acknowledgements.filter((item) => item.id !== id)
    });
  }

  function startEdit(item: Acknowledgement) {
    setName(item.name);
    setUrl(item.url ?? "");
    setNote(item.note ?? "");
    setEditingId(item.id);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-primary/10 bg-surface/70 p-5">
        <p className="text-sm font-semibold text-primary">{t("ack.title")}</p>
        <p className="mt-1 text-xs text-primary/60">
          {t("ack.subtitle")}
        </p>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <FormField label={t("ack.productName")} htmlFor="ack-name" required>
            <Input
              id="ack-name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder={t("ack.productNamePlaceholder")}
            />
          </FormField>
          <FormField label={t("ack.url")} htmlFor="ack-url">
            <Input
              id="ack-url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder={t("ack.urlPlaceholder")}
            />
          </FormField>
        </div>
        <FormField label={t("ack.note")} htmlFor="ack-note">
          <Textarea
            id="ack-note"
            rows={3}
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder={t("ack.notePlaceholder")}
          />
        </FormField>
        <div className="mt-4 flex justify-end">
          <Button type="button" size="sm" onClick={addItem}>
            {editingId ? t("ack.update") : t("ack.add")}
          </Button>
        </div>
      </div>

      {fields.acknowledgements.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-primary/20 bg-surface/60 p-6 text-center text-sm text-primary/60">
          {t("ack.empty")}
        </div>
      ) : (
        <div className="space-y-3">
          {fields.acknowledgements.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-primary/10 bg-surface/70 p-4"
            >
              <div>
                <p className="text-sm font-semibold text-primary">{item.name}</p>
                {item.url ? (
                  <p className="text-xs text-primary/60">{item.url}</p>
                ) : null}
                {item.note ? (
                  <p className="mt-2 text-xs text-primary/60">{item.note}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => startEdit(item)}
                >
                  {t("ack.edit")}
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                >
                  {t("ack.remove")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
