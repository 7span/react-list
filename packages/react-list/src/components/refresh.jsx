import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListRefresh = memo(({ children }) => {
  const { listState } = useListContext();
  const { loader, refresh } = listState;
  const { isLoading, initialLoading } = loader;

  const handleRefresh = useCallback(() => {
    refresh({ isRefresh: true });
  }, [refresh]);

  const scope = useMemo(
    () => ({
      isLoading,
      refresh: handleRefresh,
    }),
    [isLoading, handleRefresh]
  );

  if (initialLoading) return null;

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-refresh">
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
});
