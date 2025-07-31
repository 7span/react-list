import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListItems = memo(({ children, renderItem }) => {
  const { listState } = useListContext();
  const { data: items = [], loader, error, setSort, sort } = listState;
  const { initialLoading } = loader;

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
      <div className="react-list-items">
        {items.map((item, index) => (
          <div key={item.id || index}>{renderItem({ item, index })}</div>
        ))}
      </div>
    );
  }

  if (typeof children === "function") {
    return <div className="react-list-items">{children(scope)}</div>;
  }

  return (
    <div className="react-list-items">
      {items.map((item, index) => (
        <pre key={item.id || index}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </div>
  );
});
