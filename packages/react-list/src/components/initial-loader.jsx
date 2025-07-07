import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListInitialLoader = memo(({ children }) => {
  const { listState } = useListContext();
  const { loader } = listState;
  const { initialLoading } = loader;

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
    <div className="react-list-initial-loader">
      {children || <p>Initial Loading...</p>}
    </div>
  );
});
