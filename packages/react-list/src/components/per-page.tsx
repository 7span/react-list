import { memo, useCallback, useMemo } from "react";
import type { ChangeEvent, ReactNode } from "react";

import { useListContext } from "../context/list-provider";

type ReactListPerPageOptionInput = number | { value: number; label: string };

type ReactListPerPageOptionSerialized = {
  value: number;
  label: string;
};

type ReactListPerPageScope = {
  perPage: number;
  setPerPage: (value: number) => void;
  options: ReactListPerPageOptionSerialized[];
};

type ReactListPerPageProps = {
  options?: ReactListPerPageOptionInput[];
  children?: (scope: ReactListPerPageScope) => ReactNode;
};

export const ReactListPerPage = memo(
  ({ children, options = [10, 25, 50, 100] }: ReactListPerPageProps) => {
    const { listState } = useListContext();
    const { data, pagination, setPerPage, loader, error } = listState;
    const { perPage } = pagination;
    const { initialLoading } = loader;

    const serializedOptions = useMemo<ReactListPerPageOptionSerialized[]>(
      () =>
        options.map((item) => {
          if (typeof item !== "object") {
            return { value: item, label: String(item) };
          }

          return { value: item.value, label: item.label };
        }),
      [options]
    );

    const handlePerPageChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
      },
      [setPerPage]
    );

    const scope = useMemo<ReactListPerPageScope>(
      () => ({
        perPage,
        setPerPage,
        options: serializedOptions,
      }),
      [perPage, setPerPage, serializedOptions]
    );

    if (initialLoading) return null;

    if (!data || data.length === 0) {
      return null;
    }

    if (error) {
      return null;
    }

    return (
      <div className="react-list-per-page">
        {children ? (
          children(scope)
        ) : (
          <select value={perPage} onChange={handlePerPageChange}>
            {serializedOptions.map((option) => (
              <option key={`option-${option.value}`} value={option.value}>
                {option.label} items per page
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
);
