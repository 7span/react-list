import { memo, useEffect, useRef, useState, useTransition } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListSearch = memo(({ children, debounceTime = 500 }) => {
  const { listState } = useListContext();
  const { search, setSearch } = listState;
  const [isPending, startTransition] = useTransition();
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
      startTransition(() => {
        setSearch(value);
      });
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

  const searchStyles = {
    container: {
      margin: "10px 0",
      width: "100%",
      maxWidth: "300px",
    },
    input: {
      width: "100%",
      padding: "8px 12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "14px",
      outline: "none",
    },
  };

  const scope = {
    search: localSearch,
    setSearch: handleChange,
    isPending,
  };

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-search" style={searchStyles.container}>
      <input
        type="text"
        value={localSearch}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search..."
        style={searchStyles.input}
      />
      {isPending && (
        <div
          className="search-indicator"
          style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}
        >
          Searching...
        </div>
      )}
    </div>
  );
});
