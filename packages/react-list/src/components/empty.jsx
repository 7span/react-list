import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListEmpty = memo(({ children }) => {
  const { listState } = useListContext();
  const { data: items, loader, error } = listState;
  const { isLoading, initialLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        width: "100%",
        padding: "32px 16px",
      },
      defaultMessage: {
        textAlign: "center",
        color: "#6B7280",
        fontSize: "16px",
        fontWeight: "400",
      },
    }),
    []
  );

  if (items?.length > 0 || initialLoading || isLoading || error) {
    return null;
  }

  return (
    <div className="react-list-empty" style={styles.container}>
      {children || (
        <div style={styles.defaultMessage}>
          <p>No data found!</p>
        </div>
      )}
    </div>
  );
});
