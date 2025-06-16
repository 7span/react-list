import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListSummary = memo(({ children }) => {
  const { listState } = useListContext();
  const { data, count, pagination, loader, error } = listState;
  const { page, perPage } = pagination;
  const { initialLoading, isLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        padding: "8px 0",
        fontSize: "14px",
        color: "#4B5563",
      },
      text: {
        display: "inline-block",
      },
      highlight: {
        fontWeight: "500",
        color: "#111827",
      },
    }),
    []
  );

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
      styles,
    }),
    [summaryData, count, styles]
  );

  if (initialLoading) return null;

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-summary" style={styles.container}>
      <span style={styles.text}>
        Showing <span style={styles.highlight}>{summaryData.visibleCount}</span>{" "}
        items (
        <span style={styles.highlight}>
          {summaryData.from} - {summaryData.to}
        </span>
        ) out of <span style={styles.highlight}>{count}</span>
      </span>
    </div>
  );
});
