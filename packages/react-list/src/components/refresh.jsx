import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListRefresh = memo(({ children }) => {
  const { listState } = useListContext();
  const { loader, refresh } = listState;
  const { isLoading, initialLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        display: "inline-block",
      },
      button: {
        padding: "8px 16px",
        border: "1px solid #e5e7eb",
        borderRadius: "6px",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.2s ease",
        ":hover": {
          backgroundColor: "#f3f4f6",
        },
        ":disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
        },
      },
    }),
    []
  );

  const handleRefresh = useCallback(() => {
    refresh({ isRefresh: true });
  }, [refresh]);

  const scope = useMemo(
    () => ({
      isLoading,
      refresh: handleRefresh,
    }),
    [isLoading, handleRefresh, styles]
  );

  if (initialLoading) return null;

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-refresh" style={styles.container}>
      <button
        onClick={handleRefresh}
        disabled={isLoading}
        style={{
          ...styles.button,
          ...(isLoading && styles.button[":disabled"]),
        }}
      >
        {isLoading ? "Loading..." : "Refresh"}
      </button>
    </div>
  );
});
