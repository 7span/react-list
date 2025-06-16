# `<ReactListFilter>` - Filter Controls

The `<ReactListFilter>` component provides a way to filter list data based on specific criteria. It automatically manages filter state and triggers API requests with the appropriate filter parameters.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListFilter } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="filters">
            <ReactListFilter name="status" value="active" />
            <ReactListFilter name="role" value="admin" />
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

| Prop        | Type                | Default  | Description                                             |
| ----------- | ------------------- | -------- | ------------------------------------------------------- |
| name        | String              |          | The filter parameter name to use in the API request.    |
| value       | Any                 |          | The filter value to apply.                              |
| component   | String or Component | "button" | The component to render for the filter control.         |
| activeClass | String              | "active" | CSS class to apply when the filter is active.           |
| children    | ReactNode           |          | Content to display inside the filter control.           |
| onChange    | Function            |          | Callback function that runs when the filter is changed. |

## How It Works

The `<ReactListFilter>` component:

1. Renders a control (button by default) for applying a specific filter
2. Tracks the active state of the filter
3. Automatically updates the filter parameters in the ReactList context
4. Triggers a new API request with the filter parameters
5. Maintains the filter state across page refreshes (if a state manager is configured)

## Examples

### Basic Filter Buttons

```jsx
import { ReactList, ReactListItems, ReactListFilter } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="filter-section">
            <h3>Status:</h3>
            <div className="filter-buttons">
              <ReactListFilter name="status" value="all">
                All
              </ReactListFilter>
              <ReactListFilter name="status" value="active">
                Active
              </ReactListFilter>
              <ReactListFilter name="status" value="inactive">
                Inactive
              </ReactListFilter>
            </div>
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

### Filter with Custom Component

```jsx
import { ReactList, ReactListItems, ReactListFilter } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="filter-section">
            <h3>Role:</h3>
            <div className="filter-select">
              <ReactListFilter name="role" value="all" component="select">
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="editor">Editor</option>
              </ReactListFilter>
            </div>
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

### Styled Filters with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListFilter } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Filter by Status:
            </h3>
            <div className="flex space-x-2">
              <ReactListFilter
                name="status"
                value="all"
                activeClass="bg-blue-600 text-white"
                component={(props) => (
                  <button
                    {...props}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      props.active
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  />
                )}
              >
                All
              </ReactListFilter>

              <ReactListFilter
                name="status"
                value="active"
                activeClass="bg-blue-600 text-white"
                component={(props) => (
                  <button
                    {...props}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      props.active
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  />
                )}
              >
                Active
              </ReactListFilter>

              <ReactListFilter
                name="status"
                value="inactive"
                activeClass="bg-blue-600 text-white"
                component={(props) => (
                  <button
                    {...props}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      props.active
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  />
                )}
              >
                Inactive
              </ReactListFilter>
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

### Multiple Filter Groups

```jsx
import { ReactList, ReactListItems, ReactListFilter } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="filters-container">
            <div className="filter-group">
              <h3>Status:</h3>
              <div className="filter-options">
                <ReactListFilter name="status" value="all">
                  All
                </ReactListFilter>
                <ReactListFilter name="status" value="active">
                  Active
                </ReactListFilter>
                <ReactListFilter name="status" value="inactive">
                  Inactive
                </ReactListFilter>
              </div>
            </div>

            <div className="filter-group">
              <h3>Role:</h3>
              <div className="filter-options">
                <ReactListFilter name="role" value="all">
                  All
                </ReactListFilter>
                <ReactListFilter name="role" value="admin">
                  Admin
                </ReactListFilter>
                <ReactListFilter name="role" value="user">
                  User
                </ReactListFilter>
                <ReactListFilter name="role" value="editor">
                  Editor
                </ReactListFilter>
              </div>
            </div>

            <div className="filter-group">
              <h3>Department:</h3>
              <div className="filter-options">
                <ReactListFilter name="department" value="all">
                  All
                </ReactListFilter>
                <ReactListFilter name="department" value="sales">
                  Sales
                </ReactListFilter>
                <ReactListFilter name="department" value="marketing">
                  Marketing
                </ReactListFilter>
                <ReactListFilter name="department" value="engineering">
                  Engineering
                </ReactListFilter>
                <ReactListFilter name="department" value="support">
                  Support
                </ReactListFilter>
              </div>
            </div>
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

You can also create custom filter components using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomFilters() {
  const { filters, setFilters } = useReactList();

  const handleStatusChange = (status) => {
    setFilters((prev) => ({
      ...prev,
      status,
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setFilters((prev) => ({
      ...prev,
      role: role === "all" ? undefined : role,
    }));
  };

  return (
    <div className="custom-filters">
      <div className="status-filters">
        <h3>Status:</h3>
        <div className="button-group">
          <button
            className={filters.status === "active" ? "active" : ""}
            onClick={() => handleStatusChange("active")}
          >
            Active
          </button>
          <button
            className={filters.status === "inactive" ? "active" : ""}
            onClick={() => handleStatusChange("inactive")}
          >
            Inactive
          </button>
          <button
            className={!filters.status ? "active" : ""}
            onClick={() => handleStatusChange(undefined)}
          >
            All
          </button>
        </div>
      </div>

      <div className="role-filter">
        <h3>Role:</h3>
        <select value={filters.role || "all"} onChange={handleRoleChange}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="editor">Editor</option>
        </select>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomFilters />

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

### Filter with Reset Button

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListFilter,
  useReactList,
} from "@7span/react-list";

function FilterWithReset() {
  const { filters, setFilters } = useReactList();

  const handleReset = () => {
    setFilters({});
  };

  return (
    <div className="filter-with-reset">
      <div className="filter-options">
        <ReactListFilter name="status" value="active">
          Active
        </ReactListFilter>
        <ReactListFilter name="status" value="inactive">
          Inactive
        </ReactListFilter>
        <ReactListFilter name="status" value="pending">
          Pending
        </ReactListFilter>
      </div>

      {Object.keys(filters).length > 0 && (
        <button className="reset-button" onClick={handleReset}>
          Reset Filters
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
          <FilterWithReset />

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
