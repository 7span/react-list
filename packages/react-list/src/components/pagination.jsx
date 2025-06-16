import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListPagination = memo(
  ({
    children,
    pageLinks = 5,
    renderFirst,
    renderPrev,
    renderPages,
    renderPage,
    renderNext,
    renderLast,
  }) => {
    const { listState } = useListContext();
    const { data, count, pagination, setPage, loader, error } = listState;
    const { page, perPage } = pagination;
    const { initialLoading, isLoading } = loader;

    const styles = useMemo(
      () => ({
        container: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
        },
        button: {
          padding: "4px 8px",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          minWidth: "60px",
          fontSize: "14px",
        },
        disabledButton: {
          opacity: 0.5,
          cursor: "not-allowed",
        },
        pagesContainer: {
          display: "flex",
          alignItems: "center",
          gap: "4px",
        },
        activePageSpan: {
          padding: "4px 8px",
          backgroundColor: "#2563eb",
          color: "#ffffff",
          borderRadius: "4px",
          minWidth: "32px",
          textAlign: "center",
        },
        pageButton: {
          padding: "4px 8px",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
          minWidth: "32px",
          textAlign: "center",
          cursor: "pointer",
          backgroundColor: "#ffffff",
          ":hover": {
            backgroundColor: "#f3f4f6",
          },
        },
      }),
      []
    );

    const paginationState = useMemo(() => {
      const pagesCount = Math.ceil(count / perPage);
      const halfWay = Math.floor(pageLinks / 2);
      const hasNext = page * perPage < count;
      const hasPrev = page !== 1;
      return { pagesCount, halfWay, hasNext, hasPrev };
    }, [count, perPage, page, pageLinks]);

    const pagesToDisplay = useMemo(() => {
      const { pagesCount, halfWay } = paginationState;
      const pages = Array.from({ length: Math.min(pageLinks, pagesCount) });

      if (page <= halfWay) {
        return pages.map((_, index) => index + 1);
      } else if (pagesCount - page < halfWay) {
        return pages.map((_, index) => pagesCount - index).reverse();
      } else {
        return pages.map((_, index) => page - halfWay + index);
      }
    }, [page, pageLinks, paginationState]);

    const navigation = useMemo(
      () => ({
        prev: () => setPage(page - 1),
        next: () => setPage(page + 1),
        first: () => setPage(1),
        last: () => setPage(paginationState.pagesCount),
        setPage: (newPage) => setPage(newPage),
      }),
      [setPage, page, paginationState.pagesCount]
    );

    const scope = useMemo(
      () => ({
        page,
        perPage,
        count,
        ...paginationState,
        pagesToDisplay,
        ...navigation,
        styles,
      }),
      [
        page,
        perPage,
        count,
        paginationState,
        pagesToDisplay,
        navigation,
        styles,
      ]
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
      <div style={styles.container}>
        {renderFirst ? (
          renderFirst(scope)
        ) : (
          <button
            type="button"
            disabled={!paginationState.hasPrev}
            onClick={navigation.first}
            style={{
              ...styles.button,
              ...(!paginationState.hasPrev && styles.disabledButton),
            }}
          >
            First
          </button>
        )}

        {renderPrev ? (
          renderPrev(scope)
        ) : (
          <button
            type="button"
            disabled={!paginationState.hasPrev}
            onClick={navigation.prev}
            style={{
              ...styles.button,
              ...(!paginationState.hasPrev && styles.disabledButton),
            }}
          >
            Prev
          </button>
        )}

        {renderPages ? (
          renderPages(scope)
        ) : (
          <div style={styles.pagesContainer}>
            {pagesToDisplay.map((pageNum) => {
              const isActive = pageNum === page;
              const pageScope = { ...scope, page: pageNum, isActive };

              return renderPage ? (
                renderPage(pageScope)
              ) : (
                <div key={`page-${pageNum}`}>
                  {isActive ? (
                    <span style={styles.activePageSpan}>{pageNum}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigation.setPage(pageNum)}
                      style={styles.pageButton}
                    >
                      {pageNum}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {renderNext ? (
          renderNext(scope)
        ) : (
          <button
            type="button"
            disabled={!paginationState.hasNext}
            onClick={navigation.next}
            style={{
              ...styles.button,
              ...(!paginationState.hasNext && styles.disabledButton),
            }}
          >
            Next
          </button>
        )}

        {renderLast ? (
          renderLast(scope)
        ) : (
          <button
            type="button"
            disabled={!paginationState.hasNext}
            onClick={navigation.last}
            style={{
              ...styles.button,
              ...(!paginationState.hasNext && styles.disabledButton),
            }}
          >
            Last
          </button>
        )}
      </div>
    );
  }
);
