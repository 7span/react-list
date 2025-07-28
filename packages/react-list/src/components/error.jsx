import { memo } from "react";
import { useReactListContext } from "../context/list-provider";

export const ReactListError = memo(({ children }) => {
  const { listState } = useReactListContext();
  const { error, loader } = listState;
  const { isLoading } = loader;

  if (!error || isLoading) {
    return null;
  }

  return (
    <div className="react-list-error">
      {typeof children === "function"
        ? children({ error })
        : children || (
            <div>
              <h3>Error occurred</h3>
              <pre>
                {error.name}: {error.message}
              </pre>
            </div>
          )}
    </div>
  );
});
