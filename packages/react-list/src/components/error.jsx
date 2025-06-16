import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListError = memo(({ children }) => {
  const { listState } = useListContext();
  const { error, loader } = listState;
  const { isLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        width: "100%",
        padding: "32px 16px",
      },
      errorContent: {
        textAlign: "center",
        color: "#DC2626",
        padding: "32px 0",
      },
      heading: {
        fontSize: "16px",
        fontWeight: "500",
        marginBottom: "8px",
      },
      message: {
        fontSize: "14px",
        fontFamily: "monospace",
        marginTop: "8px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      },
    }),
    []
  );

  if (!error || isLoading) {
    return null;
  }

  if (children) {
    return children({ error });
  }

  return (
    <div className="react-list-error" style={styles.container}>
      <div style={styles.errorContent}>
        <h3 style={styles.heading}>Error occurred</h3>
        <pre style={styles.message}>
          {error.name}: {error.message}
        </pre>
      </div>
    </div>
  );
});
