import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListPerPage = memo(
  ({ children, options = [10, 25, 50, 100] }) => {
    const { listState } = useListContext();
    const { data, pagination, setPerPage, loader, error } = listState;
    const { perPage } = pagination;
    const { initialLoading } = loader;

    const styles = useMemo(
      () => ({
        container: {
          display: "inline-block",
          minWidth: "150px",
        },
        select: {
          width: "100%",
          padding: "8px 12px",
          border: "1px solid #e5e7eb",
          borderRadius: "4px",
          fontSize: "14px",
          backgroundColor: "#ffffff",
          cursor: "pointer",
          outline: "none",
        },
      }),
      []
    );

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
        styles,
      }),
      [perPage, setPerPage, serializedOptions, styles]
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
      <div className="react-list-per-page" style={styles.container}>
        <select
          value={perPage}
          onChange={handlePerPageChange}
          style={styles.select}
        >
          {serializedOptions.map((option) => (
            <option key={`option-${option.value}`} value={option.value}>
              {option.label} items per page
            </option>
          ))}
        </select>
      </div>
    );
  }
);
