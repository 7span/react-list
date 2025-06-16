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

  const styles = useMemo(
    () => ({
      button: {
        padding: "8px 16px",
        backgroundColor: "#4B5563",
        color: "#ffffff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        opacity: isLoading || !hasMoreItems ? 0.5 : 1,
        pointerEvents: isLoading || !hasMoreItems ? "none" : "auto",
      },
    }),
    [isLoading, hasMoreItems]
  );

  const scope = useMemo(
    () => ({
      isLoading,
      loadMore,
      hasMoreItems,
      styles,
    }),
    [isLoading, loadMore, hasMoreItems, styles]
  );

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  return children(scope);
});
