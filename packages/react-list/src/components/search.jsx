import { memo, useEffect, useRef, useState } from "react";

import { useReactListContext } from "../context/list-provider";

export const ReactListSearch = memo(({ children, debounceTime = 500 }) => {
  const { listState } = useReactListContext();
  const { search, setSearch } = listState;
  const [localSearch, setLocalSearch] = useState(search ?? "");
  const debounceTimerRef = useRef(null);

  // Sync local state with context when search prop changes
  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search ?? "");
    }
  }, [search]);

  const handleChange = (value) => {
    setLocalSearch(value);

    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      setSearch(value);
    }, debounceTime);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const scope = {
    search: localSearch,
    setSearch: handleChange,
  };

  return (
    <div className="react-list-search">
      {children ? (
        children(scope)
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
});
