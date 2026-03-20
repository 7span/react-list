import { memo, useMemo } from "react";
import type { ReactNode } from "react";
import { useListContext } from "../context/list-provider";

type ReactListInitialLoaderScope = {
  loading: boolean;
};

type ReactListInitialLoaderProps = {
  children?: ReactNode | ((scope: ReactListInitialLoaderScope) => ReactNode);
};

export const ReactListInitialLoader = memo(
  ({ children }: ReactListInitialLoaderProps) => {
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
      {typeof children === "function" ? (
        children(scope)
      ) : (
        children || <p>Initial Loading...</p>
      )}
    </div>
  );
}
);
