# `useReactList` - React List Hook

The `useReactList` hook provides access to the list state and methods from any component within the `<ReactList>` or `<ReactListContext>` component tree. This hook is the foundation for building custom list components and accessing list data and functionality.

## Basic Usage

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomPagination() {
  // Access list state and methods using the useReactList hook
  const { page, totalPages, goToNextPage, goToPrevPage } = useReactList();

  return (
    <div className="custom-pagination">
      <button onClick={goToPrevPage} disabled={page === 1}>
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button onClick={goToNextPage} disabled={page === totalPages}>
        Next
      </button>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ul>
            {items.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>

          <CustomPagination />
        </div>
      )}
    </ReactList>
  );
}
```

## Available Properties and Methods

The `useReactList` hook returns an object with the following properties and methods:

### State Properties

| Property          | Type    | Description                                                   |
| ----------------- | ------- | ------------------------------------------------------------- |
| items             | Array   | The current list of items.                                    |
| loading           | Boolean | Whether data is currently being loaded.                       |
| initialLoading    | Boolean | Whether the initial data is being loaded.                     |
| subsequentLoading | Boolean | Whether subsequent data (after initial load) is being loaded. |
| error             | Object  | Error object if an error occurred during data fetching.       |
| empty             | Boolean | Whether the list is empty.                                    |
| page              | Number  | The current page number.                                      |
| perPage           | Number  | The current number of items per page.                         |
| totalItems        | Number  | The total number of items across all pages.                   |
| totalPages        | Number  | The total number of pages.                                    |
| sortBy            | String  | The current field being sorted by.                            |
| sortOrder         | String  | The current sort order ('asc' or 'desc').                     |
| filters           | Object  | The current filters applied to the list.                      |
| search            | String  | The current search query.                                     |
| hasNextPage       | Boolean | Whether there is a next page.                                 |
| hasPrevPage       | Boolean | Whether there is a previous page.                             |

### Methods

| Method        | Parameters               | Description                                 |
| ------------- | ------------------------ | ------------------------------------------- |
| setPage       | (page: number)           | Sets the current page number.               |
| setPerPage    | (perPage: number)        | Sets the number of items per page.          |
| setSortBy     | (field: string)          | Sets the field to sort by.                  |
| setSortOrder  | (order: 'asc' or 'desc') | Sets the sort order.                        |
| setFilters    | (filters: object)        | Sets the filters to apply to the list.      |
| setSearch     | (query: string)          | Sets the search query.                      |
| refresh       | ()                       | Refreshes the data with current parameters. |
| reset         | ()                       | Resets all parameters to their defaults.    |
| goToFirstPage | ()                       | Goes to the first page.                     |
| goToLastPage  | ()                       | Goes to the last page.                      |
| goToNextPage  | ()                       | Goes to the next page.                      |
| goToPrevPage  | ()                       | Goes to the previous page.                  |

## Examples

### Custom Search Component

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomSearch() {
  const { search, setSearch } = useReactList();
  const [localSearch, setLocalSearch] = useState(search);

  // Handle local search state to avoid too many API calls
  const handleChange = (e) => {
    setLocalSearch(e.target.value);
  };

  // Update the actual search after a delay
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(localSearch);
  };

  // Clear search
  const handleClear = () => {
    setLocalSearch("");
    setSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className="custom-search">
      <input
        type="text"
        value={localSearch}
        onChange={handleChange}
        placeholder="Search users..."
      />

      <button type="submit">Search</button>

      {localSearch && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </form>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <CustomSearch />

          <ul>
            {items.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Filters Component

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomFilters() {
  const { filters, setFilters, goToFirstPage } = useReactList();

  // Apply a single filter
  const applyFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
    goToFirstPage(); // Go back to first page when applying filters
  };

  // Remove a single filter
  const removeFilter = (name) => {
    const newFilters = { ...filters };
    delete newFilters[name];
    setFilters(newFilters);
    goToFirstPage();
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({});
    goToFirstPage();
  };

  return (
    <div className="custom-filters">
      <div className="filter-controls">
        <div className="filter-group">
          <h4>Status</h4>
          <button
            className={filters.status === "active" ? "active" : ""}
            onClick={() => applyFilter("status", "active")}
          >
            Active
          </button>
          <button
            className={filters.status === "inactive" ? "active" : ""}
            onClick={() => applyFilter("status", "inactive")}
          >
            Inactive
          </button>
        </div>

        <div className="filter-group">
          <h4>Role</h4>
          <button
            className={filters.role === "admin" ? "active" : ""}
            onClick={() => applyFilter("role", "admin")}
          >
            Admin
          </button>
          <button
            className={filters.role === "user" ? "active" : ""}
            onClick={() => applyFilter("role", "user")}
          >
            User
          </button>
          <button
            className={filters.role === "guest" ? "active" : ""}
            onClick={() => applyFilter("role", "guest")}
          >
            Guest
          </button>
        </div>
      </div>

      {Object.keys(filters).length > 0 && (
        <div className="active-filters">
          <h4>Active Filters:</h4>
          {Object.entries(filters).map(([key, value]) => (
            <span key={key} className="filter-tag">
              {key}: {value}
              <button onClick={() => removeFilter(key)}>×</button>
            </span>
          ))}
          <button onClick={clearAllFilters}>Clear All</button>
        </div>
      )}
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <CustomFilters />

          <ul>
            {items.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Sorting Component

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomSorting() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReactList();

  // Toggle sort for a field
  const toggleSort = (field) => {
    if (sortBy === field) {
      // If already sorting by this field, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Otherwise, set the new sort field and default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Helper to show sort direction indicator
  const getSortIndicator = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="custom-sorting">
      <button onClick={() => toggleSort("name")}>
        Sort by Name {getSortIndicator("name")}
      </button>
      <button onClick={() => toggleSort("created_at")}>
        Sort by Date {getSortIndicator("created_at")}
      </button>
      <button onClick={() => toggleSort("email")}>
        Sort by Email {getSortIndicator("email")}
      </button>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <CustomSorting />

          <ul>
            {items.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Table with Sortable Headers

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function SortableHeader({ field, children }) {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReactList();

  const handleClick = () => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <th onClick={handleClick} className="sortable-header">
      {children}
      {sortBy === field && (
        <span className="sort-indicator">
          {sortOrder === "asc" ? " ↑" : " ↓"}
        </span>
      )}
    </th>
  );
}

function CustomTable() {
  const { items, loading, error, empty } = useReactList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (empty) {
    return <div>No users found.</div>;
  }

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <SortableHeader field="id">ID</SortableHeader>
          <SortableHeader field="name">Name</SortableHeader>
          <SortableHeader field="email">Email</SortableHeader>
          <SortableHeader field="created_at">Created At</SortableHeader>
        </tr>
      </thead>
      <tbody>
        {items.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.created_at).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      <CustomTable />
    </ReactList>
  );
}
```

### Custom Loading States

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomLoadingStates() {
  const { items, loading, initialLoading, subsequentLoading, error, empty } =
    useReactList();

  if (initialLoading) {
    return (
      <div className="initial-loading">
        <div className="spinner"></div>
        <p>Loading users for the first time...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (empty) {
    return (
      <div className="empty-state">
        <p>No users found.</p>
      </div>
    );
  }

  return (
    <div className="users-list">
      {subsequentLoading && (
        <div className="overlay-loading">
          <div className="spinner"></div>
        </div>
      )}

      <ul>
        {items.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      <CustomLoadingStates />
    </ReactList>
  );
}
```

### Complete Custom List Implementation

```jsx
import { ReactList, useReactList } from "@7span/react-list";
import { useState } from "react";

function CustomList() {
  // Get all list state and methods
  const {
    items,
    loading,
    initialLoading,
    subsequentLoading,
    error,
    empty,
    page,
    perPage,
    totalItems,
    totalPages,
    sortBy,
    sortOrder,
    filters,
    search,
    setPage,
    setPerPage,
    setSortBy,
    setSortOrder,
    setFilters,
    setSearch,
    refresh,
    reset,
    goToFirstPage,
    goToLastPage,
    goToNextPage,
    goToPrevPage,
    hasNextPage,
    hasPrevPage,
  } = useReactList();

  // Local state for search input
  const [searchInput, setSearchInput] = useState(search);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    goToFirstPage();
  };

  // Toggle sort for a field
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Apply a filter
  const applyFilter = (name, value) => {
    setFilters({ ...filters, [name]: value });
    goToFirstPage();
  };

  // Remove a filter
  const removeFilter = (name) => {
    const newFilters = { ...filters };
    delete newFilters[name];
    setFilters(newFilters);
    goToFirstPage();
  };

  // Render loading state
  if (initialLoading) {
    return <div className="loading">Loading users...</div>;
  }

  // Render error state
  if (error) {
    return (
      <div className="error">
        <p>Error: {error.message}</p>
        <button onClick={refresh}>Try Again</button>
      </div>
    );
  }

  // Render empty state
  if (empty) {
    return (
      <div className="empty">
        <p>No users found.</p>
        {(Object.keys(filters).length > 0 || search) && (
          <button onClick={reset}>Clear Filters</button>
        )}
      </div>
    );
  }

  return (
    <div className="custom-list">
      {/* Search */}
      <div className="list-header">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search users..."
          />
          <button type="submit">Search</button>
        </form>

        <button onClick={refresh} className="refresh-button">
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-buttons">
          <div className="filter-group">
            <span>Status:</span>
            <button
              className={filters.status === "active" ? "active" : ""}
              onClick={() => applyFilter("status", "active")}
            >
              Active
            </button>
            <button
              className={filters.status === "inactive" ? "active" : ""}
              onClick={() => applyFilter("status", "inactive")}
            >
              Inactive
            </button>
          </div>
        </div>

        {/* Active filters */}
        {Object.keys(filters).length > 0 && (
          <div className="active-filters">
            <span>Active Filters:</span>
            {Object.entries(filters).map(([key, value]) => (
              <span key={key} className="filter-tag">
                {key}: {value}
                <button onClick={() => removeFilter(key)}>×</button>
              </span>
            ))}
            <button onClick={() => setFilters({})}>Clear All</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-container">
        {subsequentLoading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => toggleSort("id")}>
                ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => toggleSort("name")}>
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => toggleSort("email")}>
                Email {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th onClick={() => toggleSort("created_at")}>
                Created At{" "}
                {sortBy === "created_at" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          Showing {(page - 1) * perPage + 1} to{" "}
          {Math.min(page * perPage, totalItems)} of {totalItems} users
        </div>

        <div className="pagination-controls">
          <button onClick={goToFirstPage} disabled={page === 1}>
            First
          </button>
          <button onClick={goToPrevPage} disabled={!hasPrevPage}>
            Previous
          </button>

          <span className="page-indicator">
            Page {page} of {totalPages}
          </span>

          <button onClick={goToNextPage} disabled={!hasNextPage}>
            Next
          </button>
          <button onClick={goToLastPage} disabled={page === totalPages}>
            Last
          </button>
        </div>

        <div className="per-page-selector">
          <label>
            Items per page:
            <select
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactList
      endpoint="/api/users"
      defaultPerPage={10}
      defaultSortBy="created_at"
      defaultSortOrder="desc"
    >
      <CustomList />
    </ReactList>
  );
}
```

### Using Multiple Hooks in Different Components

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function ListControls() {
  const { refresh, reset, filters, search, sortBy } = useReactList();
  const hasModifications = Object.keys(filters).length > 0 || search || sortBy;

  return (
    <div className="list-controls">
      <button onClick={refresh}>Refresh</button>
      {hasModifications && <button onClick={reset}>Reset All</button>}
    </div>
  );
}

function ListStats() {
  const { totalItems, page, perPage } = useReactList();

  return (
    <div className="list-stats">
      Showing {(page - 1) * perPage + 1} to{" "}
      {Math.min(page * perPage, totalItems)} of {totalItems} items
    </div>
  );
}

function ListItems() {
  const { items, loading, error, empty } = useReactList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (empty) {
    return <div>No items found.</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function ListPagination() {
  const {
    page,
    totalPages,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
  } = useReactList();

  return (
    <div className="list-pagination">
      <button onClick={goToFirstPage} disabled={page === 1}>
        First
      </button>
      <button onClick={goToPrevPage} disabled={page === 1}>
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button onClick={goToNextPage} disabled={page === totalPages}>
        Next
      </button>
      <button onClick={goToLastPage} disabled={page === totalPages}>
        Last
      </button>
    </div>
  );
}

function App() {
  return (
    <ReactList endpoint="/api/users">
      <div className="list-container">
        <div className="list-header">
          <h2>Users</h2>
          <ListControls />
          <ListStats />
        </div>

        <ListItems />

        <div className="list-footer">
          <ListPagination />
        </div>
      </div>
    </ReactList>
  );
}
```
