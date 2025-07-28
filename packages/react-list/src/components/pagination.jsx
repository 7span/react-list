import { memo, useMemo } from "react";

import { useReactListContext } from "../context/list-provider";

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
    const { listState } = useReactListContext();
    const { data, count, pagination, setPage, loader, error } = listState;
    const { page, perPage } = pagination;
    const { initialLoading, isLoading } = loader;

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
      }),
      [page, perPage, count, paginationState, pagesToDisplay, navigation]
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
      <div className="react-list-pagination">
        {renderFirst ? (
          renderFirst(scope)
        ) : (
          <button
            type="button"
            disabled={!paginationState.hasPrev}
            onClick={navigation.first}
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
          >
            Prev
          </button>
        )}

        {renderPages ? (
          renderPages(scope)
        ) : (
          <div>
            {pagesToDisplay.map((pageNum) => {
              const isActive = pageNum === page;
              const pageScope = { ...scope, page: pageNum, isActive };

              return renderPage ? (
                renderPage(pageScope)
              ) : (
                <div key={`page-${pageNum}`}>
                  {isActive ? (
                    <span>{pageNum}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigation.setPage(pageNum)}
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
          >
            Last
          </button>
        )}
      </div>
    );
  }
);
