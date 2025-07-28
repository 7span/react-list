import { memo, useCallback, useMemo } from "react";

import { useReactListContext } from "../context/list-provider";

export const ReactListPerPage = memo(
  ({ children, options = [10, 25, 50, 100] }) => {
    const { listState } = useReactListContext();
    const { data, pagination, setPerPage, loader, error } = listState;
    const { perPage } = pagination;
    const { initialLoading } = loader;

    const serializedOptions = useMemo(() => {
      return options.map((item) => {
        if (typeof item !== "object") {
          return {
            value: item,
            label: item,
          };
        }
        return item;
      });
    }, [options]);

    const handlePerPageChange = useCallback(
      (e) => {
        setPerPage(Number(e.target.value));
      },
      [setPerPage]
    );

    const scope = useMemo(
      () => ({
        perPage,
        setPerPage,
        options: serializedOptions,
      }),
      [perPage, setPerPage, serializedOptions]
    );

    if (initialLoading) return null;

    if (!data || data.length === 0) {
      return null;
    }

    if (error) {
      return null;
    }

    return (
      <div className="react-list-per-page">
        {children ? (
          children(scope)
        ) : (
          <select value={perPage} onChange={handlePerPageChange}>
            {serializedOptions.map((option) => (
              <option key={`option-${option.value}`} value={option.value}>
                {option.label} items per page
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
);
