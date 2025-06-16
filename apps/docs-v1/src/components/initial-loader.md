# `<ReactListInitialLoader>` - Initial Loading State

The `<ReactListInitialLoader>` component displays content only during the initial data loading phase. This is useful for showing loading indicators or skeleton screens when the list is first loaded.

## Basic Usage

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ReactListInitialLoader>
            <div className="loading-indicator">Loading users...</div>
          </ReactListInitialLoader>

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
| children | ReactNode |         | Content to display during initial loading. |

## When to Use

The `<ReactListInitialLoader>` component is specifically designed for the initial loading state when:

1. The list is being loaded for the first time
2. No items have been loaded yet

It will not display during subsequent loading states, such as when changing pages or applying filters. For those cases, use the `<ReactListLoader>` component instead.

## Examples

### Simple Text Loader

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListInitialLoader>
            <div className="loading-message">Loading users...</div>
          </ReactListInitialLoader>

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

### Skeleton Loader

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
} from "@7span/react-list";

function SkeletonLoader() {
  return (
    <div className="users-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="user-card skeleton">
          <div className="skeleton-name"></div>
          <div className="skeleton-email"></div>
          <div className="skeleton-actions"></div>
        </div>
      ))}
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListInitialLoader>
            <SkeletonLoader />
          </ReactListInitialLoader>

          <ReactListItems>
            <div className="users-grid">
              {items.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <div className="actions">
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
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

### Animated Loader with Tailwind CSS

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="space-y-6">
          <ReactListInitialLoader>
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-lg text-gray-600">
                Loading users...
              </span>
            </div>
          </ReactListInitialLoader>

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

You can also create a custom initial loader using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomInitialLoader() {
  const { initialLoading } = useReactList();

  if (!initialLoading) {
    return null;
  }

  return (
    <div className="custom-loader">
      <div className="loader-spinner"></div>
      <p className="loader-text">Fetching users data...</p>
      <p className="loader-subtext">This may take a moment</p>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <CustomInitialLoader />

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

### Combined with Other State Components

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListInitialLoader,
  ReactListEmpty,
  ReactListError,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          {/* Initial loading state */}
          <ReactListInitialLoader>
            <div className="loading-indicator">Loading users...</div>
          </ReactListInitialLoader>

          {/* Error state */}
          <ReactListError>
            {(error) => (
              <div className="error-message">
                <h3>Error loading users</h3>
                <p>{error.message}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
              </div>
            )}
          </ReactListError>

          {/* Empty state */}
          <ReactListEmpty>
            <div className="empty-message">
              <h3>No users found</h3>
              <p>Try adjusting your filters or search criteria.</p>
            </div>
          </ReactListEmpty>

          {/* Items display */}
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

          {/* Pagination */}
          <ReactListPagination />
        </div>
      )}
    </ReactList>
  );
}
```
