import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListInitialLoader = memo(({ children }) => {
  const { listState } = useListContext();
  const { loader } = listState;
  const { initialLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        padding: "20px",
        textAlign: "center",
      },
      defaultLoader: {
        fontSize: "16px",
        color: "#4B5563",
        margin: 0,
        animation: "pulse 1.5s infinite ease-in-out",
      },
      "@keyframes pulse": {
        "0%": { opacity: 0.6 },
        "50%": { opacity: 1 },
        "100%": { opacity: 0.6 },
      },
    }),
    []
  );

  const scope = useMemo(
    () => ({
      loading: initialLoading,
    }),
    [initialLoading]
  );

  if (!initialLoading) {
    return null;
  }

  return (
    <div className="react-list-initial-loader" style={styles.container}>
      {children ? (
        children(scope)
      ) : (
        <p style={styles.defaultLoader}>Initial Loading...</p>
      )}
    </div>
  );
});
