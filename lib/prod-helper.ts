// product page helper functions ,UI data ,types ,...

interface BuildUrlParams {
  search: string;
  category: string;
  discount: boolean;
  features: boolean;
  minPrice: number;
  maxPrice: number;
  sortField: string;
  sortOrder: "asc" | "desc";
  page: number;
  limit: number;
}

export type ProductFilterOption =
  | "latest"
  | "discount"
  | "features"
  | "priceAsc"
  | "priceDesc"
  | "oldest";

export const priceRange = [
  {
    label: "الكل",
    range: "0-999999",
  },
  {
    label: "0 - 50",
    range: "0-50",
  },
  {
    label: "50 - 100",
    range: "50-100",
  },
  {
    label: "100 - 250",
    range: "100-250",
  },
  {
    label: "250 - 400",
    range: "250-400",
  },
  {
    label: "أعلى من 400",
    range: "400-999999",
  },
];

export const sortOptions = [
  { value: "latest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "discount", label: "الخصومات" },
  { value: "features", label: "المميزة" },
  { value: "priceAsc", label: "السعر: الأقل أولاً" },
  { value: "priceDesc", label: "السعر: الأعلى أولاً" },
];

export function getDynamicPages(total: number, current: number): number[] {
  if (total <= 4) return Array.from({ length: total }, (_, i) => i + 1);

  const first = 1;
  const last = total;

  if (current <= 2) return [1, 2, 3, last];
  if (current >= total - 1) return [1, last - 2, last - 1, last];

  return [1, current - 1, current, last];
}

export function buildFetchUrl(params: BuildUrlParams): string {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.category) query.append("category", params.category);
  if (params.discount) query.append("discount", "true");
  if (params.features) query.append("features", "true");

  query.append("minPrice", params.minPrice.toString());
  query.append("maxPrice", params.maxPrice.toString());
  query.append("sort", params.sortField);
  query.append("order", params.sortOrder);
  query.append("page", params.page.toString());
  query.append("limit", params.limit.toString());

  return `/api/product/match?${query.toString()}`;
}
