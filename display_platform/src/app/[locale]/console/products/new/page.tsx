"use client";

import { ProductWizard } from "@/components/organisms/product-wizard/product-wizard";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <ProductWizard mode="new" />
    </div>
  );
}

