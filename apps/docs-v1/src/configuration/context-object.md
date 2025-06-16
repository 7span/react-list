# Context Object

The Context Object is a central part of ReactList that provides access to the list's state and methods. It's available through the render props pattern in the `<ReactList>` component and through the `useReactList` hook.

## Accessing the Context

### Via Render Props

```jsx
<ReactList endpoint="/api/users">
  {(context) => {
    // Access context properties and methods
    const { items, loading, error, page, setPage } = context;

    return <div>{/* Use context to render your UI */}</div>;
  }}
</ReactList>
```

### Via Hook

```jsx
import { useReactList } from "@7span/react-list";

function MyCustomComponent() {
  const context = useReactList();
  const { items, loading, error, page, setPage } = context;

  return <div>{/* Use context to render your UI */}</div>;
}

// Must be used within a ReactList component
<ReactList endpoint="/api/users">
  <MyCustomComponent />
</ReactList>;
```

## Context Properties

### State Properties

| Property               | Type        | Description                                                  |
| ---------------------- | ----------- | ------------------------------------------------------------ |
| `items`                | Array       | The current list of items.                                   |
| `loading`              | Boolean     | Whether data is currently being loaded.                      |
| `initialLoading`       | Boolean     | Whether the initial data load is in progress.                |
| `error`                | Object/null | Error object if the request failed, null otherwise.          |
| `page`                 | Number      | Current page number.                                         |
| `perPage`              | Number      | Number of items per page.                                    |
| `sortBy`               | String      | Current sort field.                                          |
| `sortOrder`            | String      | Current sort direction ('asc' or 'desc').                    |
| `search`               | String      | Current search query.                                        |
| `filters`              | Object      | Current filters applied to the list.                         |
| `pagination`           | Object      | Pagination information (total, currentPage, lastPage, etc.). |
| `paginationMode`       | String      | Current pagination mode ('pagination' or 'loadMore').        |
| `hasPaginationHistory` | Boolean     | Whether URL history is being updated with pagination state.  |

### Methods

| Method          | Parameters               | Description                                       |
| --------------- | ------------------------ | ------------------------------------------------- |
| `setPage`       | `(page: number)`         | Change the current page.                          |
| `setPerPage`    | `(perPage: number)`      | Change the number of items per page.              |
| `setSortBy`     | `(field: string)`        | Change the sort field.                            |
| `setSortOrder`  | `(order: 'asc'\|'desc')` | Change the sort direction.                        |
| `setSearch`     | `(query: string)`        | Set the search query.                             |
| `setFilters`    | `(filters: object)`      | Set or update filters.                            |
| `refresh`       | `()`                     | Reload the current data.                          |
| `goToFirstPage` | `()`                     | Navigate to the first page.                       |
| `goToLastPage`  | `()`                     | Navigate to the last page.                        |
| `goToNextPage`  | `()`                     | Navigate to the next page.                        |
| `goToPrevPage`  | `()`                     | Navigate to the previous page.                    |
| `loadMore`      | `()`                     | Load the next page of items (in 'loadMore' mode). |
| `reset`         | `()`                     | Reset all state to defaults.                      |

## Examples

### Custom Pagination

```jsx
function CustomPagination() {
  const {
    page,
    pagination,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    setPage,
  } = useReactList();

  return (
    <div className="pagination">
      <button onClick={goToFirstPage} disabled={page === 1}>
        First
      </button>
      <button onClick={goToPrevPage} disabled={page === 1}>
        Previous
      </button>

      <span>
        Page {page} of {pagination.lastPage}
      </span>

      <button onClick={goToNextPage} disabled={page === pagination.lastPage}>
        Next
      </button>
      <button onClick={goToLastPage} disabled={page === pagination.lastPage}>
        Last
      </button>

      <select value={page} onChange={(e) => setPage(Number(e.target.value))}>
        {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map(
          (p) => (
            <option key={p} value={p}>
              Page {p}
            </option>
          )
        )}
      </select>
    </div>
  );
}
```

### Custom Sorting

```jsx
function SortableHeader({ field, label }) {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReactList();

  const handleSort = () => {
    if (sortBy === field) {
      // Toggle sort order if already sorting by this field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort field and default to descending
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  return (
    <th onClick={handleSort}>
      {label}
      {sortBy === field && <span>{sortOrder === "asc" ? "↑" : "↓"}</span>}
    </th>
  );
}
```

### Custom Filters

```jsx
function UserFilters() {
  const { filters, setFilters } = useReactList();
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    setFilters(localFilters);
  };

  const resetFilters = () => {
    setLocalFilters({});
    setFilters({});
  };

  return (
    <div className="filters">
      <div>
        <label>Status:</label>
        <select
          value={localFilters.status || ""}
          onChange={(e) => handleFilterChange("status", e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <label>Role:</label>
        <select
          value={localFilters.role || ""}
          onChange={(e) => handleFilterChange("role", e.target.value)}
        >
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      <button onClick={applyFilters}>Apply Filters</button>
      <button onClick={resetFilters}>Reset</button>
    </div>
  );
}
```
