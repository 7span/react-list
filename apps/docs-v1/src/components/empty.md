# `<ReactListEmpty>` - Empty State

The `<ReactListEmpty>` component displays content when the list has no items. This is useful for showing empty state messages, illustrations, or call-to-action buttons.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListEmpty } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListEmpty>
            <div className="empty-state">
              <h3>No users found</h3>
              <p>There are no users matching your criteria.</p>
            </div>
          </ReactListEmpty>

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

| Prop     | Type      | Default | Description                                |
| -------- | --------- | ------- | ------------------------------------------ |
| children | ReactNode |         | Content to display when the list is empty. |

## When to Use

The `<ReactListEmpty>` component is designed to display when:

1. The API returns an empty array of items
2. The filtered results return no items
3. The search query returns no matching items

This component helps improve user experience by providing clear feedback and guidance when no data is available.

## Examples

### Simple Empty State

```jsx
import { ReactList, ReactListItems, ReactListEmpty } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, filters, search }) => (
        <div className="users-container">
          <ReactListEmpty>
            <div className="empty-state">
              <h3>No users found</h3>
              {search ? (
                <p>No users match your search "{search}".</p>
              ) : Object.keys(filters).length > 0 ? (
                <p>No users match your current filters.</p>
              ) : (
                <p>There are no users in the system.</p>
              )}
            </div>
          </ReactListEmpty>

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

### Empty State with Call-to-Action

```jsx
import { ReactList, ReactListItems, ReactListEmpty } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, reset }) => (
        <div className="users-container">
          <ReactListEmpty>
            <div className="empty-state">
              <h3>No users found</h3>
              <p>There are no users matching your criteria.</p>
              <button className="reset-button" onClick={() => reset()}>
                Reset Filters
              </button>
            </div>
          </ReactListEmpty>

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

### Styled Empty State with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListEmpty } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, reset }) => (
        <div className="users-container">
          <ReactListEmpty>
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no users matching your criteria.
              </p>
              <button
                className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => reset()}
              >
                Reset Filters
              </button>
            </div>
          </ReactListEmpty>

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

### Custom Implementation with Hook

You can also create a custom empty state component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomEmptyState() {
  const { items, loading, error, search, filters, reset } = useReactList();

  // Only show when not loading, no error, and items array is empty
  if (loading || error || items.length > 0) {
    return null;
  }

  return (
    <div className="custom-empty-state">
      <div className="empty-icon">📭</div>
      <h3>No Results Found</h3>

      {search ? (
        <p>No results match your search "{search}".</p>
      ) : Object.keys(filters).length > 0 ? (
        <p>No results match your current filters.</p>
      ) : (
        <p>There are no items available.</p>
      )}

      {(search || Object.keys(filters).length > 0) && (
        <button onClick={() => reset()}>Clear All Filters</button>
      )}
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomEmptyState />

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

### Empty State with Create New Option

```jsx
import { ReactList, ReactListItems, ReactListEmpty } from "@7span/react-list";
import { useState } from "react";

function UsersList() {
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <ReactList endpoint="/api/users">
      {({ items, refresh }) => (
        <div className="users-container">
          {showCreateForm ? (
            <div className="create-form">
              <h3>Create New User</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Submit form logic here
                  // After successful creation:
                  setShowCreateForm(false);
                  refresh(); // Refresh the list
                }}
              >
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" name="name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" />
                </div>
                <div className="form-actions">
                  <button type="submit">Create User</button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <ReactListEmpty>
              <div className="empty-state">
                <h3>No users found</h3>
                <p>There are no users in the system yet.</p>
                <button
                  className="create-button"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create New User
                </button>
              </div>
            </ReactListEmpty>
          )}

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
