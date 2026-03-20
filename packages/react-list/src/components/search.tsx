import { memo, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { useListContext } from "../context/list-provider";

type ReactListSearchScope = {
  search: string;
  setSearch: (value: string) => void;
};

type ReactListSearchProps = {
  debounceTime?: number;
  children?: ReactNode | ((scope: ReactListSearchScope) => ReactNode);
};

export const ReactListSearch = memo(
  ({ children, debounceTime = 500 }: ReactListSearchProps) => {
    const { listState } = useListContext();
    const { search, setSearch } = listState;

    const [localSearch, setLocalSearch] = useState(search ?? "");
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Sync local state with context when the list search value changes.
    useEffect(() => {
      if (search !== localSearch) {
        setLocalSearch(search ?? "");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleChange = (value: string) => {
      setLocalSearch(value);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        setSearch(value);
      }, debounceTime);
    };

    useEffect(() => {
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }, []);

    const scope: ReactListSearchScope = {
      search: localSearch,
      setSearch: handleChange,
    };

    return (
      <div className="react-list-search">
        {typeof children === "function" ? (
          children(scope)
        ) : children ? (
          children
        ) : (
          <input
            type="text"
            value={localSearch}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search..."
          />
        )}
      </div>
    );
  }
);

