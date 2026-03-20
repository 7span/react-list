import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

import type { ReactNode } from "react";

type ReactListRefreshScope = {
  isLoading: boolean;
  refresh: () => void;
};

type ReactListRefreshProps = {
  children?: ReactNode | ((scope: ReactListRefreshScope) => ReactNode);
};

export const ReactListRefresh = memo(({ children }: ReactListRefreshProps) => {
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

  if (typeof children === "function") return children(scope);
  if (children) return children;

  return (
    <div className="react-list-refresh">
      <button onClick={handleRefresh} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
});
