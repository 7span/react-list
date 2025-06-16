# `<ReactListSort>` - Sorting Controls

The `<ReactListSort>` component provides a way to sort list data by specific fields. It automatically manages sort state and triggers API requests with the appropriate sort parameters.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListSort } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="sort-controls">
            <ReactListSort by="name">Sort by Name</ReactListSort>
            <ReactListSort by="created_at">Sort by Date</ReactListSort>
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

| Prop        | Type                | Default  | Description                                                                                               |
| ----------- | ------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| by          | String              |          | The field name to sort by.                                                                                |
| order       | String              |          | The initial sort order ("asc" or "desc"). If not provided, clicking will toggle between "asc" and "desc". |
| component   | String or Component | "button" | The component to render for the sort control.                                                             |
| activeClass | String              | "active" | CSS class to apply when the sort is active.                                                               |
| children    | ReactNode           |          | Content to display inside the sort control.                                                               |
| onChange    | Function            |          | Callback function that runs when the sort is changed.                                                     |

## How It Works

The `<ReactListSort>` component:

1. Renders a control (button by default) for sorting by a specific field
2. Tracks the active state of the sort
3. Toggles between ascending and descending order when clicked
4. Automatically updates the sort parameters in the ReactList context
5. Triggers a new API request with the sort parameters
6. Maintains the sort state across page refreshes (if a state manager is configured)

## Examples

### Basic Sort Buttons

```jsx
import { ReactList, ReactListItems, ReactListSort } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="sort-section">
            <span>Sort by:</span>
            <ReactListSort by="name">Name</ReactListSort>
            <ReactListSort by="email">Email</ReactListSort>
            <ReactListSort by="created_at">Date Created</ReactListSort>
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

### Sort with Direction Indicator

```jsx
import { ReactList, ReactListItems, ReactListSort } from "@7span/react-list";

function SortButton({ by, children }) {
  return (
    <ReactListSort
      by={by}
      component={({ active, order, ...props }) => (
        <button {...props} className={`sort-button ${active ? "active" : ""}`}>
          {children}
          {active && (
            <span className="sort-indicator">
              {order === "asc" ? " ↑" : " ↓"}
            </span>
          )}
        </button>
      )}
    />
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="sort-section">
            <span>Sort by:</span>
            <SortButton by="name">Name</SortButton>
            <SortButton by="email">Email</SortButton>
            <SortButton by="created_at">Date Created</SortButton>
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

### Styled Sort Controls with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListSort } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex space-x-2">
              <ReactListSort
                by="name"
                component={({ active, order, ...props }) => (
                  <button
                    {...props}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                      active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Name
                    {active && (
                      <svg
                        className={`ml-1 h-4 w-4 ${
                          order === "desc" ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </button>
                )}
              />

              <ReactListSort
                by="email"
                component={({ active, order, ...props }) => (
                  <button
                    {...props}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                      active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Email
                    {active && (
                      <svg
                        className={`ml-1 h-4 w-4 ${
                          order === "desc" ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </button>
                )}
              />

              <ReactListSort
                by="created_at"
                component={({ active, order, ...props }) => (
                  <button
                    {...props}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                      active
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Date Created
                    {active && (
                      <svg
                        className={`ml-1 h-4 w-4 ${
                          order === "desc" ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </button>
                )}
              />
            </div>
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

### Sort Dropdown

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function SortDropdown() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReactList();

  const handleSortChange = (e) => {
    const value = e.target.value;

    if (value === "name_asc") {
      setSortBy("name");
      setSortOrder("asc");
    } else if (value === "name_desc") {
      setSortBy("name");
      setSortOrder("desc");
    } else if (value === "created_at_desc") {
      setSortBy("created_at");
      setSortOrder("desc");
    } else if (value === "created_at_asc") {
      setSortBy("created_at");
      setSortOrder("asc");
    }
  };

  // Determine current value
  let currentValue = "created_at_desc"; // Default
  if (sortBy === "name" && sortOrder === "asc") {
    currentValue = "name_asc";
  } else if (sortBy === "name" && sortOrder === "desc") {
    currentValue = "name_desc";
  } else if (sortBy === "created_at" && sortOrder === "asc") {
    currentValue = "created_at_asc";
  } else if (sortBy === "created_at" && sortOrder === "desc") {
    currentValue = "created_at_desc";
  }

  return (
    <div className="sort-dropdown">
      <label htmlFor="sort-select">Sort by:</label>
      <select id="sort-select" value={currentValue} onChange={handleSortChange}>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
        <option value="created_at_desc">Newest First</option>
        <option value="created_at_asc">Oldest First</option>
      </select>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <SortDropdown />

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

You can also create custom sort components using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomSortControls() {
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useReactList();

  const handleSort = (field) => {
    if (sortBy === field) {
      // Toggle order if already sorting by this field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getSortIndicator = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <div className="custom-sort-controls">
      <div className="sort-header">
        <button
          className={`sort-button ${sortBy === "name" ? "active" : ""}`}
          onClick={() => handleSort("name")}
        >
          Name {getSortIndicator("name")}
        </button>

        <button
          className={`sort-button ${sortBy === "email" ? "active" : ""}`}
          onClick={() => handleSort("email")}
        >
          Email {getSortIndicator("email")}
        </button>

        <button
          className={`sort-button ${sortBy === "created_at" ? "active" : ""}`}
          onClick={() => handleSort("created_at")}
        >
          Date {getSortIndicator("created_at")}
        </button>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomSortControls />

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

### Table Header Sorting

```jsx
import { ReactList, ReactListSort } from "@7span/react-list";

function UsersTable() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <ReactListSort
                  by="id"
                  component={({ active, order, ...props }) => (
                    <div {...props} className="table-header">
                      ID
                      {active && (
                        <span className="sort-arrow">
                          {order === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  )}
                />
              </th>
              <th>
                <ReactListSort
                  by="name"
                  component={({ active, order, ...props }) => (
                    <div {...props} className="table-header">
                      Name
                      {active && (
                        <span className="sort-arrow">
                          {order === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  )}
                />
              </th>
              <th>
                <ReactListSort
                  by="email"
                  component={({ active, order, ...props }) => (
                    <div {...props} className="table-header">
                      Email
                      {active && (
                        <span className="sort-arrow">
                          {order === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  )}
                />
              </th>
              <th>
                <ReactListSort
                  by="created_at"
                  component={({ active, order, ...props }) => (
                    <div {...props} className="table-header">
                      Created At
                      {active && (
                        <span className="sort-arrow">
                          {order === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  )}
                />
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
      )}
    </ReactList>
  );
}
```
