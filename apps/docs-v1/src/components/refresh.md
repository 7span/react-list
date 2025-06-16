# `<ReactListRefresh>` - Refresh Button

The `<ReactListRefresh>` component provides a button that refreshes the list data when clicked. It's useful for allowing users to manually update the list to see the latest data.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListRefresh } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ReactListRefresh>Refresh</ReactListRefresh>
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

| Prop            | Type                | Default      | Description                                            |
| --------------- | ------------------- | ------------ | ------------------------------------------------------ |
| children        | ReactNode           | "Refresh"    | Content to display inside the refresh button.          |
| component       | String or Component | "button"     | The component to render for the refresh control.       |
| className       | String              |              | CSS class for the refresh button.                      |
| loadingText     | String              | "Loading..." | Text to display when the list is refreshing.           |
| showLoadingText | Boolean             | true         | Whether to show loading text during refresh.           |
| onClick         | Function            |              | Callback function that runs before the refresh action. |

## How It Works

The `<ReactListRefresh>` component:

1. Renders a button (by default) that triggers a refresh of the list data
2. Shows a loading state while the data is being refreshed
3. Automatically calls the API to fetch fresh data
4. Maintains any active filters, sorting, and pagination settings

## Examples

### Basic Refresh Button

```jsx
import { ReactList, ReactListItems, ReactListRefresh } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <ReactListRefresh>Refresh Users</ReactListRefresh>
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

### Refresh Button with Loading State

```jsx
import { ReactList, ReactListItems, ReactListRefresh } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <ReactListRefresh
              loadingText="Refreshing users..."
              showLoadingText={true}
            >
              <span className="refresh-icon">🔄</span> Refresh
            </ReactListRefresh>
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

### Styled Refresh Button with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListRefresh } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users List</h2>
            <ReactListRefresh
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              component={({ loading, onClick }) => (
                <button
                  onClick={onClick}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
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
                      Refreshing...
                    </>
                  ) : (
                    <>
                      <svg
                        className="-ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh
                    </>
                  )}
                </button>
              )}
            />
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

### Refresh with Callback

```jsx
import { ReactList, ReactListItems, ReactListRefresh } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <ReactListRefresh
              onClick={() => {
                console.log("Refreshing users list...");
                // You could show a notification here
                // or perform additional actions before refresh
              }}
            >
              Refresh Users
            </ReactListRefresh>
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

You can also create a custom refresh component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomRefreshButton() {
  const { refresh, loading } = useReactList();

  return (
    <button
      className="custom-refresh-button"
      onClick={refresh}
      disabled={loading}
    >
      {loading ? (
        <span className="loading-indicator">⏳</span>
      ) : (
        <span className="refresh-icon">🔄</span>
      )}
      {loading ? "Refreshing..." : "Refresh Data"}
    </button>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <CustomRefreshButton />
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

### Auto-Refresh Implementation

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useState, useEffect } from "react";

function AutoRefresh() {
  const { refresh, loading } = useReactList();
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [interval, setInterval] = useState(30); // seconds

  useEffect(() => {
    let timer;

    if (autoRefresh && !loading) {
      timer = setTimeout(() => {
        refresh();
      }, interval * 1000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [autoRefresh, loading, refresh, interval]);

  return (
    <div className="auto-refresh-controls">
      <div className="manual-refresh">
        <button onClick={refresh} disabled={loading} className="refresh-button">
          {loading ? "Refreshing..." : "Refresh Now"}
        </button>
      </div>

      <div className="auto-refresh-toggle">
        <label>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={() => setAutoRefresh(!autoRefresh)}
          />
          Auto-refresh
        </label>
      </div>

      {autoRefresh && (
        <div className="interval-control">
          <label>Refresh every:</label>
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            disabled={loading}
          >
            <option value={10}>10 seconds</option>
            <option value={30}>30 seconds</option>
            <option value={60}>1 minute</option>
            <option value={300}>5 minutes</option>
          </select>
        </div>
      )}

      {autoRefresh && (
        <div className="auto-refresh-status">
          {loading ? (
            <span>Refreshing...</span>
          ) : (
            <span>Next refresh in {interval} seconds</span>
          )}
        </div>
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
            <AutoRefresh />
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
