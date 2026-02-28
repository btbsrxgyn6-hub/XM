"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  createProduct,
  deleteProduct,
  duplicateProduct,
  listMyProducts,
  submitProduct,
  updateProduct
} from "@/lib/api";
import type { Product, ProductStatus } from "@/lib/types";
import { useAuth } from "@/lib/hooks/use-auth";

function sortByUpdatedAtDesc(a: Product, b: Product) {
  return b.updatedAt.localeCompare(a.updatedAt);
}

export function useProducts() {
  const { currentUser } = useAuth();
  const ownerUserId = currentUser?.id ?? null;
  const [products, setProducts] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  const refresh = useCallback(async () => {
    if (!ownerUserId) {
      setProducts([]);
      setInitialized(true);
      return;
    }
    try {
      const data = await listMyProducts({ status: "all", limit: 100 });
      setProducts(data.sort(sortByUpdatedAtDesc));
    } finally {
      setInitialized(true);
    }
  }, [ownerUserId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const counts = useMemo(() => {
    const byStatus = products.reduce<Record<ProductStatus, number>>(
      (acc, p) => {
        acc[p.status] += 1;
        return acc;
      },
      { draft: 0, submitted: 0, published: 0 }
    );

    return {
      total: products.length,
      ...byStatus
    };
  }, [products]);

  const remove = useCallback(
    async (id: string) => {
      await deleteProduct(id);
      await refresh();
    },
    [refresh]
  );

  const save = useCallback(
    async (product: Product) => {
      if (!ownerUserId) return null;
      let saved: Product | null = null;
      const payload = { id: product.id, fields: product.fields, iconKey: product.iconKey };
      try {
        saved = await updateProduct({ id: product.id, fields: product.fields, iconKey: product.iconKey });
      } catch (error) {
        if (error instanceof Error && (error as Error & { status?: number }).status === 404) {
          saved = await createProduct(payload);
        } else {
          throw error;
        }
      }

      if (product.status === "submitted" && saved) {
        saved = await submitProduct(saved.id);
      }

      await refresh();
      return saved;
    },
    [ownerUserId, refresh]
  );

  const duplicate = useCallback(
    async (product: Product) => {
      if (!ownerUserId) return null;
      const cloned = await duplicateProduct(product.id);
      await refresh();
      return cloned;
    },
    [ownerUserId, refresh]
  );

  return { products, counts, refresh, save, remove, duplicate, isLoading: !initialized };
}
