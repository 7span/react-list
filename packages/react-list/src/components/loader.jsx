import { memo, useMemo } from "react";

import { useReactListContext } from "../context/list-provider";

export const ReactListLoader = memo(({ children, position = "overlay" }) => {
  const { listState } = useReactListContext();
  const { loader } = listState;
  const { isLoading, initializingState } = loader;

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
    <div>
      {children || (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
});
