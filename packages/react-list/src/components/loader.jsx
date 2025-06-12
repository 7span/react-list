import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListLoader = memo(({ children, position = "overlay" }) => {
  const { listState } = useListContext();
  const { loader } = listState;
  const { isLoading, initializingState } = loader;

  const styles = useMemo(
    () => ({
      overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        zIndex: 10,
      },
      before: {
        marginBottom: "16px",
      },
      after: {
        marginTop: "16px",
      },
      defaultLoader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      },
      loadingText: {
        color: "#4B5563",
        fontSize: "14px",
      },
    }),
    []
  );

  const positionStyles = useMemo(
    () => ({
      overlay: styles.overlay,
      before: styles.before,
      after: styles.after,
    }),
    [styles]
  );

  const scope = useMemo(
    () => ({
      isLoading,
    }),
    [isLoading]
  );

  if (!initializingState && !isLoading) {
    return null;
  }

  return (
    <div style={positionStyles[position] || {}}>
      {children ? (
        children(scope)
      ) : (
        <div style={styles.defaultLoader}>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      )}
    </div>
  );
});
