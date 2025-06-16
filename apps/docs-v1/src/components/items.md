# `<ReactListItems>` - Rendering List Items

The `<ReactListItems>` component is responsible for rendering the list items. It handles different states like loading, empty, and error conditions, making it easier to create a complete list interface.

## Basic Usage

```jsx
import { ReactList, ReactListItems } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <ReactListItems>
          <div className="users-grid">
            {items.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </ReactListItems>
      )}
    </ReactList>
  );
}
```

## Props

| Prop             | Type      | Default | Description                                         |
| ---------------- | --------- | ------- | --------------------------------------------------- |
| children         | ReactNode |         | The content to render when items are available.     |
| loadingComponent | ReactNode | null    | Optional component to show during loading.          |
| emptyComponent   | ReactNode | null    | Optional component to show when no items are found. |
| errorComponent   | ReactNode | null    | Optional component to show when an error occurs.    |

## Render States

The `<ReactListItems>` component handles four different states:

1. **Loading** - When data is being fetched and no items are available yet
2. **Error** - When an error occurs during data fetching
3. **Empty** - When the request succeeds but no items are returned
4. **Items** - When items are available to display

You can provide custom components for each of these states:

```jsx
import { ReactList, ReactListItems } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <ReactListItems
          loadingComponent={<div className="loading">Loading users...</div>}
          emptyComponent={<div className="empty">No users found</div>}
          errorComponent={(error) => (
            <div className="error">Error: {error.message}</div>
          )}
        >
          <div className="users-grid">
            {items.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </ReactListItems>
      )}
    </ReactList>
  );
}
```

## Alternative Approach

Alternatively, you can use the dedicated components for each state:

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
  ReactListEmpty,
  ReactListError,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ReactListInitialLoader>
            <div className="loading">Loading users...</div>
          </ReactListInitialLoader>

          <ReactListError>
            {(error) => <div className="error">Error: {error.message}</div>}
          </ReactListError>

          <ReactListEmpty>
            <div className="empty">No users found</div>
          </ReactListEmpty>

          <ReactListItems>
            <div className="users-grid">
              {items.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
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

## Using the Hook

You can also create your own custom implementation using the `useReactList` hook:

```jsx
import { ReactList, useReactList } from "@7span/react-list";

function CustomItemsList() {
  const { items, loading, error } = useReactList();

  if (loading && items.length === 0) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  if (items.length === 0) {
    return <div className="empty">No users found</div>;
  }

  return (
    <div className="users-grid">
      {items.map((user) => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      <CustomItemsList />
    </ReactList>
  );
}
```

## Examples

### Table Layout

```jsx
import { ReactList, ReactListItems } from "@7span/react-list";

function UsersTable() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, setSortBy, setSortOrder, sortBy, sortOrder }) => (
        <ReactListItems>
          <table className="users-table">
            <thead>
              <tr>
                <th
                  onClick={() => {
                    if (sortBy === "name") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("name");
                      setSortOrder("asc");
                    }
                  }}
                >
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  onClick={() => {
                    if (sortBy === "email") {
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    } else {
                      setSortBy("email");
                      setSortOrder("asc");
                    }
                  }}
                >
                  Email{" "}
                  {sortBy === "email" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ReactListItems>
      )}
    </ReactList>
  );
}
```

### Card Grid with Loading Skeleton

```jsx
import { ReactList, ReactListItems } from "@7span/react-list";

function LoadingSkeleton() {
  return (
    <div className="users-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="user-card skeleton">
          <div className="skeleton-name"></div>
          <div className="skeleton-email"></div>
        </div>
      ))}
    </div>
  );
}

function UsersGrid() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <ReactListItems loadingComponent={<LoadingSkeleton />}>
          <div className="users-grid">
            {items.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </div>
        </ReactListItems>
      )}
    </ReactList>
  );
}
```
