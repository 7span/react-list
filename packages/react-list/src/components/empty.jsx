import { memo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListEmpty = memo(({ children }) => {
  const { listState } = useListContext();
  const { data: items, loader, error } = listState;
  const { isLoading, initialLoading } = loader;

  if (items?.length > 0 || initialLoading || isLoading || error) {
    return null;
  }

  return (
    <div className="react-list-empty">
      {children || (
        <div>
          <p>No data found!</p>
        </div>
      )}
    </div>
  );
});
