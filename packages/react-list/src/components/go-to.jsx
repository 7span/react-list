import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListGoTo = memo(({ children }) => {
  const { listState } = useListContext();
  const { data, count, pagination, setPage, loader, error } = listState;
  const { page, perPage } = pagination;
  const { initialLoading, isLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        display: "inline-block",
        minWidth: "120px",
      },
      select: {
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
        backgroundColor: "#fff",
        cursor: "pointer",
        outline: "none",
      },
    }),
    []
  );

  const { pages, pagesCount } = useMemo(() => {
    const pagesCount = Math.ceil(count / perPage);
    const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
    return { pages, pagesCount };
  }, [count, perPage]);

  const handlePageChange = useCallback(
    (e) => {
      setPage(Number(e.target.value));
    },
    [setPage]
  );

  const scope = useMemo(
    () => ({
      setPage,
      page,
      pages,
      pagesCount,
      styles,
    }),
    [setPage, page, pages, pagesCount, styles]
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
    <div className="react-list-go-to" style={styles.container}>
      <select value={page} onChange={handlePageChange} style={styles.select}>
        {pages.map((pageNum) => (
          <option key={`page-${pageNum}`} value={pageNum}>
            Page {pageNum}
          </option>
        ))}
      </select>
    </div>
  );
});
