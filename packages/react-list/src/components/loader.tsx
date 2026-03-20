import { memo, useMemo } from "react";
import type { ReactNode } from "react";
import { useListContext } from "../context/list-provider";

type ReactListLoaderScope = {
  isLoading: boolean;
};

type ReactListLoaderProps = {
  position?: string;
  children?: ReactNode | ((scope: ReactListLoaderScope) => ReactNode);
};

export const ReactListLoader = memo(
  ({ children, position = "overlay" }: ReactListLoaderProps) => {
    const { listState } = useListContext();
    const { loader } = listState;
    const { isLoading, initialLoading } = loader;

    const scope = useMemo(() => ({ isLoading }), [isLoading]);

    // Docs: do not show loader during the initial skeleton load.
    if (initialLoading || !isLoading) return null;

    return (
      <div data-react-list-loader-position={position}>
        {typeof children === "function" ? (
          children(scope)
        ) : (
          children || (
            <div>
              <p>Loading...</p>
            </div>
          )
        )}
      </div>
    );
  }
);
