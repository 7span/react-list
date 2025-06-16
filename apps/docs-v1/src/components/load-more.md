# `<ReactListLoadMore>` - Infinite Scrolling

The `<ReactListLoadMore>` component provides a "Load More" button for implementing infinite scrolling or load-more pagination. It's an alternative to traditional pagination that allows users to progressively load more content.

## Basic Usage

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListLoadMore,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items }) => (
        <div>
          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>

          <ReactListLoadMore>Load More</ReactListLoadMore>
        </div>
      )}
    </ReactList>
  );
}
```

## Props

| Prop                | Type        | Default      | Description                                                              |
| ------------------- | ----------- | ------------ | ------------------------------------------------------------------------ |
| children            | ReactNode   | 'Load More'  | Content to display inside the button.                                    |
| className           | String      | ''           | Additional CSS class for the button.                                     |
| loadingText         | String/Node | 'Loading...' | Text to display when loading.                                            |
| disabled            | Boolean     | false        | Whether the button is disabled.                                          |
| autoLoad            | Boolean     | false        | Whether to automatically load more items when scrolling near the bottom. |
| threshold           | Number      | 200          | Distance from bottom (in pixels) to trigger autoLoad.                    |
| hideWhenNoMorePages | Boolean     | true         | Whether to hide the button when there are no more pages.                 |

## Customization

### Custom Button Text

```jsx
<ReactListLoadMore>Show More Users</ReactListLoadMore>
```

### Custom Loading Text

```jsx
<ReactListLoadMore loadingText="Fetching more users...">
  Show More Users
</ReactListLoadMore>
```

### Auto-Loading on Scroll

```jsx
<ReactListLoadMore
  autoLoad={true}
  threshold={300}
  loadingText={<div className="spinner"></div>}
>
  Load More Manually
</ReactListLoadMore>
```

## Examples

### Basic Load More Button

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListLoadMore,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items }) => (
        <div className="users-container">
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

          <div className="load-more-container">
            <ReactListLoadMore className="load-more-button">
              Load More Users
            </ReactListLoadMore>
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Auto-Loading with Infinite Scroll

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListLoadMore,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items, loading }) => (
        <div className="users-container">
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

          <div className="load-more-container">
            {/* Auto-load more items when scrolling near the bottom */}
            <ReactListLoadMore
              autoLoad={true}
              threshold={200}
              loadingText={
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <span>Loading more users...</span>
                </div>
              }
            >
              {/* This content is shown if auto-loading fails or user scrolls up */}
              Click to load more
            </ReactListLoadMore>

            {/* Optional loading indicator at the bottom */}
            {loading && (
              <div className="bottom-loader">
                <div className="spinner"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Styled Load More Button with Tailwind CSS

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListLoadMore,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items }) => (
        <div className="space-y-6">
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

          <div className="flex justify-center">
            <ReactListLoadMore
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              loadingText={
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              }
            >
              Load More Users
            </ReactListLoadMore>
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Implementation with Hook

You can also create a completely custom load more component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useEffect, useRef, useState } from "react";

function CustomLoadMore() {
  const { loadMore, loading, pagination } = useReactList();
  const [autoLoading, setAutoLoading] = useState(false);
  const loaderRef = useRef(null);

  // No more pages to load
  if (pagination.currentPage >= pagination.lastPage) {
    return null;
  }

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (!autoLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          pagination.currentPage < pagination.lastPage
        ) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loading, pagination, loadMore, autoLoading]);

  return (
    <div className="custom-load-more" ref={loaderRef}>
      <button
        onClick={loadMore}
        disabled={loading}
        className="load-more-button"
      >
        {loading ? "Loading more items..." : "Load More"}
      </button>

      <div className="auto-load-toggle">
        <label>
          <input
            type="checkbox"
            checked={autoLoading}
            onChange={(e) => setAutoLoading(e.target.checked)}
          />
          Auto-load on scroll
        </label>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items }) => (
        <div>
          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>

          <CustomLoadMore />
        </div>
      )}
    </ReactList>
  );
}
```
