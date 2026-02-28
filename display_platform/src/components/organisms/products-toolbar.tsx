"use client";

import { FilterBar } from "@/components/molecules/filter-bar";
import { SearchBar } from "@/components/molecules/search-bar";
import { SortSelect } from "@/components/molecules/sort-select";
import type { SortOption } from "@/components/molecules/sort-select";
import type { ClassificationTag, ProductStatus, Region } from "@/lib/types";

export function ProductsToolbar({
  query,
  status,
  region,
  tags,
  tagOptions,
  sort,
  sortDisabled,
  showDemoListings,
  onQueryChange,
  onStatusChange,
  onRegionChange,
  onTagsChange,
  onSortChange,
  onShowDemoChange
}: {
  query: string;
  status: "all" | ProductStatus;
  region: "all" | Region;
  tags: ClassificationTag[];
  tagOptions: readonly ClassificationTag[];
  sort: SortOption;
  sortDisabled?: boolean;
  showDemoListings: boolean;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: "all" | ProductStatus) => void;
  onRegionChange: (value: "all" | Region) => void;
  onTagsChange: (value: ClassificationTag[]) => void;
  onSortChange: (value: SortOption) => void;
  onShowDemoChange: (value: boolean) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
        <SearchBar value={query} onChange={onQueryChange} />
        <SortSelect value={sort} onChange={onSortChange} disabled={sortDisabled} />
      </div>
      <FilterBar
        status={status}
        region={region}
        tags={tags}
        tagOptions={tagOptions}
        showDemoListings={showDemoListings}
        onStatusChange={onStatusChange}
        onRegionChange={onRegionChange}
        onTagsChange={onTagsChange}
        onShowDemoChange={onShowDemoChange}
      />
    </div>
  );
}
