"use client";

import { useState, useEffect, useCallback } from "react";

interface ServerTableResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function useTable<T>(
  fetchUrl: string,
  options?: {
    initialPage?: number;
    pageSize?: number;
    initialSearch?: string;
    autoFetch?: boolean;
  }
) {
  const {
    initialPage = 1,
    pageSize = 10,
    initialSearch = "",
    autoFetch = true,
  } = options || {};

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pageSize.toString(),
      });

      if (search.trim()) {
        params.append("search", search.trim());
      }

      const response = await fetch(`${fetchUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`خطأ HTTP! الحالة: ${response.status}`);
      }

      const result = await response.json();

      const tableData: ServerTableResponse<T> = result.data || result;

      setData(tableData.items);
      setTotalPages(tableData.totalPages);
      setTotalItems(tableData.totalItems);
      setCurrentPageSize(tableData.pageSize);
      setHasNextPage(tableData.hasNextPage);
      setHasPrevPage(tableData.hasPrevPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل في جلب البيانات");
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [fetchUrl, page, pageSize, search]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [fetchData, autoFetch]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        setPage(newPage);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  }, [hasPrevPage]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return {
    // Data
    data,
    isLoading,
    error,

    // Pagination state
    page,
    totalPages,
    totalItems,
    pageSize: currentPageSize,
    hasNextPage,
    hasPrevPage,

    // Search state
    search,

    // Actions
    setSearch: handleSearch,
    setPage: handlePageChange,
    nextPage,
    prevPage,
    refetch,

    // Computed values
    startItem: (page - 1) * pageSize + 1,
    endItem: Math.min(page * pageSize, totalItems),
    isEmpty: data.length === 0 && !isLoading,
  };
}
