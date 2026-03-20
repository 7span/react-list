import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

import type { ReactNode } from "react";

type ReactListSummaryScope = {
  from: number;
  to: number;
  visibleCount: number;
  count: number;
};

type ReactListSummaryProps = {
  children?: ReactNode | ((scope: ReactListSummaryScope) => ReactNode);
};

export const ReactListSummary = memo(
  ({ children }: ReactListSummaryProps) => {
  const { listState } = useListContext();
  const { data, count, pagination, loader, error } = listState;
  const { page, perPage } = pagination;
  const { initialLoading, isLoading } = loader;

  const summaryData = useMemo(() => {
    const from = page * perPage - perPage + 1;
    const to = Math.min(page * perPage, count);
    const visibleCount = data?.length || 0;

    return { from, to, visibleCount };
  }, [page, perPage, count, data]);

  const scope = useMemo(
    () => ({
      ...summaryData,
      count,
    }),
    [summaryData, count]
  );

  if (initialLoading) return null;

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div className="react-list-summary">
      {typeof children === "function" ? (
        children(scope)
      ) : children ? (
        children
      ) : (
        <span>
          Showing <span>{summaryData.visibleCount}</span> items (
          <span>
            {summaryData.from} - {summaryData.to}
          </span>
          ) out of <span>{count}</span>
        </span>
      )}
    </div>
  );
  }
);
