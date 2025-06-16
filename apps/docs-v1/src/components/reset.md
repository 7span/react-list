# `<ReactListReset>` - Reset Button

The `<ReactListReset>` component provides a button that resets all filters, sorting, and search parameters to their default values. It's useful for allowing users to quickly clear all applied list modifications.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListReset } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ReactListReset>Reset Filters</ReactListReset>
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

## Props

| Prop           | Type                | Default  | Description                                          |
| -------------- | ------------------- | -------- | ---------------------------------------------------- |
| children       | ReactNode           | "Reset"  | Content to display inside the reset button.          |
| component      | String or Component | "button" | The component to render for the reset control.       |
| className      | String              |          | CSS class for the reset button.                      |
| resetPage      | Boolean             | true     | Whether to reset the page number to 1.               |
| resetPerPage   | Boolean             | false    | Whether to reset the items per page to default.      |
| resetSortBy    | Boolean             | true     | Whether to reset the sort field.                     |
| resetSortOrder | Boolean             | true     | Whether to reset the sort order.                     |
| resetSearch    | Boolean             | true     | Whether to reset the search query.                   |
| resetFilters   | Boolean             | true     | Whether to reset all filters.                        |
| onClick        | Function            |          | Callback function that runs before the reset action. |

## How It Works

The `<ReactListReset>` component:

1. Renders a button (by default) that triggers a reset of list parameters
2. Clears filters, sorting, search, and pagination settings based on prop configuration
3. Automatically calls the API to fetch data with the reset parameters
4. Can be configured to reset only specific parameters

## Examples

### Basic Reset Button

```jsx
import { ReactList, ReactListItems, ReactListReset } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, filters, search, sortBy }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            {(Object.keys(filters).length > 0 || search || sortBy) && (
              <ReactListReset>Clear All Filters</ReactListReset>
            )}
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Reset Specific Parameters

```jsx
import { ReactList, ReactListItems, ReactListReset } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, filters, search }) => (
        <div className="users-container">
          <div className="list-controls">
            {Object.keys(filters).length > 0 && (
              <ReactListReset
                resetFilters={true}
                resetSearch={false}
                resetSortBy={false}
                resetSortOrder={false}
                resetPage={true}
                resetPerPage={false}
              >
                Clear Filters
              </ReactListReset>
            )}

            {search && (
              <ReactListReset
                resetFilters={false}
                resetSearch={true}
                resetSortBy={false}
                resetSortOrder={false}
                resetPage={true}
                resetPerPage={false}
              >
                Clear Search
              </ReactListReset>
            )}
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Styled Reset Button with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListReset } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, filters, search, sortBy }) => (
        <div className="users-container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users List</h2>
            {(Object.keys(filters).length > 0 || search || sortBy) && (
              <ReactListReset className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg
                  className="-ml-0.5 mr-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Reset All
              </ReactListReset>
            )}
          </div>

          <ReactListItems>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((user) => (
                <div key={user.id} className="p-4 border rounded shadow">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Reset with Callback

```jsx
import { ReactList, ReactListItems, ReactListReset } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <ReactListReset
              onClick={() => {
                console.log("Resetting all filters...");
                // You could show a notification here
                // or perform additional actions before reset
              }}
            >
              Reset All
            </ReactListReset>
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Implementation with Hook

You can also create a custom reset component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomResetButton() {
  const {
    reset,
    filters,
    search,
    sortBy,
    setFilters,
    setSearch,
    setSortBy,
    setSortOrder,
    goToFirstPage,
  } = useReactList();

  // Check if any filters are applied
  const hasFilters = Object.keys(filters).length > 0;
  const hasSearch = !!search;
  const hasSort = !!sortBy;
  const hasAnyModification = hasFilters || hasSearch || hasSort;

  // Custom reset function to reset only specific parameters
  const resetFiltersOnly = () => {
    setFilters({});
    goToFirstPage();
  };

  const resetSearchOnly = () => {
    setSearch("");
    goToFirstPage();
  };

  const resetSortOnly = () => {
    setSortBy(null);
    setSortOrder(null);
  };

  if (!hasAnyModification) {
    return null; // Don't show reset button if nothing to reset
  }

  return (
    <div className="custom-reset-controls">
      {hasAnyModification && (
        <button className="reset-all-button" onClick={reset}>
          Reset All
        </button>
      )}

      {hasFilters && (
        <button className="reset-filters-button" onClick={resetFiltersOnly}>
          Clear Filters
        </button>
      )}

      {hasSearch && (
        <button className="reset-search-button" onClick={resetSearchOnly}>
          Clear Search
        </button>
      )}

      {hasSort && (
        <button className="reset-sort-button" onClick={resetSortOnly}>
          Clear Sorting
        </button>
      )}
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <CustomResetButton />
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Reset with Applied Filters Summary

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListReset,
  useReactList,
} from "@7span/react-list";

function AppliedFilters() {
  const {
    filters,
    search,
    sortBy,
    sortOrder,
    setFilters,
    setSearch,
    setSortBy,
    setSortOrder,
    goToFirstPage,
  } = useReactList();

  // Check if any filters are applied
  const hasFilters = Object.keys(filters).length > 0;
  const hasSearch = !!search;
  const hasSort = !!sortBy;

  if (!hasFilters && !hasSearch && !hasSort) {
    return null;
  }

  // Helper to format filter values for display
  const formatFilterValue = (value) => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return value;
  };

  // Helper to format sort field for display
  const formatSortField = (field) => {
    return field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="applied-filters">
      <h3>Applied Filters:</h3>
      <div className="filter-tags">
        {hasSearch && (
          <div className="filter-tag">
            <span>Search: {search}</span>
            <button
              className="remove-filter"
              onClick={() => {
                setSearch("");
                goToFirstPage();
              }}
            >
              ×
            </button>
          </div>
        )}

        {hasSort && (
          <div className="filter-tag">
            <span>
              Sort: {formatSortField(sortBy)} (
              {sortOrder === "asc" ? "Ascending" : "Descending"})
            </span>
            <button
              className="remove-filter"
              onClick={() => {
                setSortBy(null);
                setSortOrder(null);
              }}
            >
              ×
            </button>
          </div>
        )}

        {hasFilters &&
          Object.entries(filters).map(([key, value]) => (
            <div key={key} className="filter-tag">
              <span>
                {key}: {formatFilterValue(value)}
              </span>
              <button
                className="remove-filter"
                onClick={() => {
                  const newFilters = { ...filters };
                  delete newFilters[key];
                  setFilters(newFilters);
                  goToFirstPage();
                }}
              >
                ×
              </button>
            </div>
          ))}

        <ReactListReset className="reset-all-button">Clear All</ReactListReset>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
          </div>

          <AppliedFilters />

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```
