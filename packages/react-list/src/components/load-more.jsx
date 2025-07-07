import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListLoadMore = memo(({ children }) => {
  const { listState } = useListContext();
  const { data, count, pagination, setPage, loader, error } = listState;
  const { page, perPage } = pagination;
  const { isLoading } = loader;

  const hasMoreItems = useMemo(
    () => page * perPage < count,
    [page, perPage, count]
  );

  const loadMore = useCallback(() => {
    if (hasMoreItems && !isLoading) {
      setPage(page + 1);
    }
  }, [hasMoreItems, isLoading, setPage, page]);

  const scope = useMemo(
    () => ({
      isLoading,
      loadMore,
      hasMoreItems,
    }),
    [isLoading, loadMore, hasMoreItems]
  );

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  return children(scope);
});
