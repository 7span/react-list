import { memo, useCallback, useMemo } from "react";
import type { ReactNode } from "react";
import { useListContext } from "../context/list-provider";

type ReactListGoToScope = {
  setPage: (page: number, addContext?: Record<string, unknown>) => void;
  page: number;
  pages: number[];
  pagesCount: number;
};

type ReactListGoToProps = {
  children?:
    | ReactNode
    | ((scope: ReactListGoToScope) => ReactNode);
};

export const ReactListGoTo = memo(({ children }: ReactListGoToProps) => {
  const { listState } = useListContext();
  const { data, count, pagination, setPage, loader, error } = listState;
  const { page, perPage } = pagination;
  const { initialLoading, isLoading } = loader;

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
    }),
    [setPage, page, pages, pagesCount]
  );

  if (initialLoading) return null;

  if (!data || data.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div className="react-list-go-to">
      {typeof children === "function" ? (
        children(scope)
      ) : children ? (
        children
      ) : (
        <select value={page} onChange={handlePageChange}>
          {pages.map((pageNum) => (
            <option key={`page-${pageNum}`} value={pageNum}>
              Page {pageNum}
            </option>
          ))}
        </select>
      )}
    </div>
  );
});
