# `<ReactListLoader>` - Loading State

The `<ReactListLoader>` component displays content during any loading state, including both initial loading and subsequent loading when changing pages, applying filters, or sorting. This is useful for showing loading indicators or overlay spinners.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListLoader } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListLoader>
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          </ReactListLoader>

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

| Prop           | Type      | Default | Description                                                   |
| -------------- | --------- | ------- | ------------------------------------------------------------- |
| children       | ReactNode |         | Content to display during loading.                            |
| initialOnly    | Boolean   | false   | Whether to show only during initial loading.                  |
| subsequentOnly | Boolean   | false   | Whether to show only during subsequent loading (not initial). |

## When to Use

The `<ReactListLoader>` component is designed for all loading states, including:

1. Initial loading when the list is first loaded
2. Subsequent loading when changing pages, applying filters, or sorting

You can use the `initialOnly` and `subsequentOnly` props to control when the loader appears:

- Use `initialOnly={true}` to show the loader only during the initial load (equivalent to `<ReactListInitialLoader>`)
- Use `subsequentOnly={true}` to show the loader only during subsequent loads (after the initial load)

## Examples

### Simple Overlay Loader

```jsx
import { ReactList, ReactListItems, ReactListLoader } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container relative">
          <ReactListLoader>
            <div className="loading-overlay">
              <div className="spinner"></div>
              <p>Loading...</p>
            </div>
          </ReactListLoader>

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

### Subsequent Loading Only

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListLoader,
  ReactListInitialLoader,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          {/* Show full-page loader for initial load */}
          <ReactListInitialLoader>
            <div className="full-page-loader">
              <div className="spinner"></div>
              <p>Loading users...</p>
            </div>
          </ReactListInitialLoader>

          {/* Show smaller indicator for subsequent loads */}
          <ReactListLoader subsequentOnly={true}>
            <div className="corner-loader">
              <div className="spinner-small"></div>
              <p>Updating...</p>
            </div>
          </ReactListLoader>

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

### Animated Loader with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListLoader } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="relative space-y-6">
          <ReactListLoader>
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                <span className="mt-2 text-blue-500">Loading...</span>
              </div>
            </div>
          </ReactListLoader>

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

You can also create a custom loader using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomLoader() {
  const { loading, initialLoading } = useReactList();

  if (!loading) {
    return null;
  }

  // Different styles for initial vs subsequent loading
  const isInitial = initialLoading;

  return (
    <div className={`custom-loader ${isInitial ? "initial" : "subsequent"}`}>
      <div className="loader-content">
        <div
          className={`spinner ${isInitial ? "spinner-large" : "spinner-small"}`}
        ></div>
        <p>{isInitial ? "Loading users..." : "Updating..."}</p>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomLoader />

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

### Loading Progress Bar

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useState, useEffect } from "react";

function LoadingProgressBar() {
  const { loading } = useReactList();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      // Reset progress when loading starts
      setProgress(0);

      // Simulate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Gradually increase up to 90%
          const next = prev + (90 - prev) * 0.1;
          return Math.min(next, 90);
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      // Complete the progress when loading finishes
      setProgress(100);

      // Reset after animation completes
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  if (progress === 0) {
    return null;
  }

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          transition: loading ? "width 0.1s ease" : "width 0.3s ease",
        }}
      ></div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <LoadingProgressBar />

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
