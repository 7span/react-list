# Components Overview

ReactList provides a set of composable components that work together to create powerful list interfaces. Each component is designed to handle a specific aspect of list rendering and interaction.

## Component Architecture

ReactList follows a provider pattern where the main `<ReactList>` component provides context to all child components. This architecture allows for:

1. **Separation of concerns** - Each component has a specific responsibility
2. **Composability** - Mix and match components as needed
3. **Flexibility** - Full control over markup and styling

## Available Components

### Core Components

| Component                               | Description                                                       |
| --------------------------------------- | ----------------------------------------------------------------- |
| [`<ReactList>`](/components/react-list) | The root component that manages state and data fetching.          |
| [`<ReactListItems>`](/components/items) | Renders the list items with support for empty and loading states. |

### Navigation Components

| Component                                         | Description                                                 |
| ------------------------------------------------- | ----------------------------------------------------------- |
| [`<ReactListPagination>`](/components/pagination) | Traditional pagination with page numbers and navigation.    |
| [`<ReactListLoadMore>`](/components/load-more)    | "Load More" button for infinite scrolling style pagination. |
| [`<ReactListPerPage>`](/components/per-page)      | Change the number of items per page.                        |
| Component                                         | Description                                                 |
| ------------------------------------------------- | --------------------------------------------------------    |
| [`<ReactListPagination>`](/components/pagination) | Traditional pagination with page numbers and navigation.    |
| [`<ReactListLoadMore>`](/components/load-more)    | "Load More" specific page.                                  |
| [`<ReactListPerPage>`](/components/per-page)      | Change the number of items per page.                        |

> > > > > > > d77db4c (removed goto content)

### State Components

| Component                                                | Description                                                |
| -------------------------------------------------------- | ---------------------------------------------------------- |
| [`<ReactListInitialLoader>`](/components/initial-loader) | Shows during the initial data load.                        |
| [`<ReactListLoader>`](/components/loader)                | Shows during subsequent data loads.                        |
| [`<ReactListEmpty>`](/components/empty)                  | Shows when no items are found.                             |
| [`<ReactListError>`](/components/error)                  | Shows when an error occurs.                                |
| [`<ReactListSummary>`](/components/summary)              | Displays pagination summary (e.g., "Showing 1-10 of 100"). |

### Interaction Components

| Component                                   | Description                          |
| ------------------------------------------- | ------------------------------------ |
| [`<ReactListSearch>`](/components/search)   | Search input for filtering the list. |
| [`<ReactListRefresh>`](/components/refresh) | Button to refresh the current data.  |

## Basic Usage Pattern

The typical pattern for using ReactList components looks like this:

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
  ReactListSearch,
  ReactListEmpty,
  ReactListError,
  ReactListInitialLoader,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-list">
          <div className="list-header">
            <h2>Users</h2>
            <ReactListSearch placeholder="Search users..." />
          </div>

          <ReactListInitialLoader>
            <div className="loading">Loading users...</div>
          </ReactListInitialLoader>

          <ReactListError>
            {(error) => (
              <div className="error">Error loading users: {error.message}</div>
            )}
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

          <div className="list-footer">
            <ReactListPagination />
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

## Custom Components

You can create your own custom components using the `useReactList` hook:

```jsx
import { useReactList } from "@7span/react-list";

function CustomItemCounter() {
  const { items, pagination } = useReactList();

  return (
    <div className="item-counter">
      Showing {items.length} of {pagination.total} items
    </div>
  );
}

// Use within a ReactList component
<ReactList endpoint="/api/users">
  {() => (
    <div>
      <CustomItemCounter />
      {/* Other components */}
    </div>
  )}
</ReactList>;
```

## Next Steps

Explore each component in detail by following the links in the tables above.
