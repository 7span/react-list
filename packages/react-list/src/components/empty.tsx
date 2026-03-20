import { memo } from "react";
import { useListContext } from "../context/list-provider";

type ReactListEmptyProps = {
  children?: React.ReactNode;
};

export const ReactListEmpty = memo(({ children }: ReactListEmptyProps) => {
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
