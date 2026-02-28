"use client";

import { useCallback, useEffect, useState } from "react";

import { listPublicProducts } from "@/lib/api";
import { getDemoCoverByIndex } from "@/lib/demoCovers";
import { ensureDemoCoverImages, seedDemoData } from "@/lib/seed";
import { getAllProducts } from "@/lib/storage";
import type { Product } from "@/lib/types";

export function useAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [initialized, setInitialized] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const all = await listPublicProducts({ sort: "newest", limit: 100 });
      if (all.length > 0) {
        const normalized = all.map((product, index) => {
          const coverImage = product.coverImage ?? "";
          const hadLegacyCover = coverImage.startsWith("/demo/cover-");
          const hadLegacyAvif =
            coverImage.startsWith("/demo/") && coverImage.endsWith(".avif");
          const needsCover = product.isSeededDemo && !product.coverImage;
          if (!hadLegacyCover && !hadLegacyAvif && !needsCover) return product;
          return {
            ...product,
            coverImage: getDemoCoverByIndex(index),
            isSeededDemo: product.isSeededDemo ?? true
          };
        });
        setProducts(normalized);
        return;
      }
      seedDemoData();
      ensureDemoCoverImages();
      setProducts(getAllProducts());
    } catch {
      seedDemoData();
      ensureDemoCoverImages();
      setProducts(getAllProducts());
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { products, refresh, isLoading: !initialized };
}
