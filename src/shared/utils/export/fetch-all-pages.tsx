import type { PageResponse } from "@/shared/types/page-response";

export async function fetchAllPages<
  T,
  F extends { page?: number; size?: number },
>(
  fetchPage: (filters: F) => Promise<PageResponse<T>>,
  filters: F,
): Promise<T[]> {
  const results: T[] = [];
  let page = 0;
  let last = false;

  while (!last) {
    const response = await fetchPage({ ...filters, page, size: 100 } as F);
    results.push(...response.content);
    last = response.last;
    page += 1;
  }

  return results;
}
