import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListItems = memo(({ children, renderItem }) => {
  const { listState } = useListContext();
  const { data: items = [], loader, error, setSort, sort } = listState;
  const { initialLoading } = loader;

  const styles = useMemo(
    () => ({
      container: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        width: "100%",
      },
      itemWrapper: {
        width: "100%",
      },
      defaultItem: {
        padding: "12px",
        backgroundColor: "#f9fafb",
        borderRadius: "4px",
        fontFamily: "monospace",
        fontSize: "14px",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
        overflow: "auto",
      },
    }),
    []
  );

  const scope = useMemo(
    () => ({
      items,
      setSort,
      sort,
    }),
    [items, sort, setSort]
  );

  if (initialLoading) return null;

  if (!items || items.length === 0) {
    return null;
  }

  if (error) {
    return null;
  }

  if (renderItem) {
    return (
      <div className="react-list-items" style={styles.container}>
        {items.map((item, index) => (
          <div key={item.id || index} style={styles.itemWrapper}>
            {renderItem({ item, index, styles })}
          </div>
        ))}
      </div>
    );
  }

  if (typeof children === "function") {
    return (
      <div className="react-list-items" style={styles.container}>
        {children(scope)}
      </div>
    );
  }

  return (
    <div className="react-list-items" style={styles.container}>
      {items.map((item, index) => (
        <pre key={item.id || index} style={styles.defaultItem}>
          {JSON.stringify(item, null, 2)}
        </pre>
      ))}
    </div>
  );
});
