# `<ReactListError>` - Error State

The `<ReactListError>` component displays content when an error occurs during data fetching. This is useful for showing error messages, retry buttons, or fallback content.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, refresh }) => (
        <div className="users-container">
          <ReactListError>
            {({ error }) => (
              <div className="error-state">
                <h3>Error Loading Users</h3>
                <p>{error.message || "An unexpected error occurred"}</p>
                <button onClick={refresh}>Retry</button>
              </div>
            )}
          </ReactListError>

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

| Prop     | Type                  | Default | Description                                                                                                      |
| -------- | --------------------- | ------- | ---------------------------------------------------------------------------------------------------------------- |
| children | ReactNode or Function |         | Content to display when an error occurs. If a function is provided, it receives the error object as an argument. |

## When to Use

The `<ReactListError>` component is designed to display when:

1. The API request fails with an error
2. The server returns an error response
3. There's a network issue preventing data fetching

This component helps improve user experience by providing clear error feedback and recovery options.

## Examples

### Simple Error State

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListError>
            <div className="error-state">
              <h3>Error Loading Users</h3>
              <p>An unexpected error occurred while loading users.</p>
            </div>
          </ReactListError>

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

### Error State with Retry Button

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, refresh }) => (
        <div className="users-container">
          <ReactListError>
            {({ error }) => (
              <div className="error-state">
                <h3>Error Loading Users</h3>
                <p>{error.message || "An unexpected error occurred"}</p>
                <button className="retry-button" onClick={refresh}>
                  Try Again
                </button>
              </div>
            )}
          </ReactListError>

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

### Styled Error State with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, refresh }) => (
        <div className="users-container">
          <ReactListError>
            {({ error }) => (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <svg
                  className="w-16 h-16 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Error Loading Users
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {error.message ||
                    "An unexpected error occurred while loading users."}
                </p>
                <button
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={refresh}
                >
                  Try Again
                </button>
              </div>
            )}
          </ReactListError>

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

You can also create a custom error component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomErrorState() {
  const { error, loading, refresh } = useReactList();

  // Only show when there's an error and not loading
  if (!error || loading) {
    return null;
  }

  // Determine error type and message
  let errorTitle = "Error Loading Data";
  let errorMessage = error.message || "An unexpected error occurred";

  // Handle specific error types
  if (error.status === 401 || error.status === 403) {
    errorTitle = "Authentication Error";
    errorMessage = "You do not have permission to access this data.";
  } else if (error.status === 404) {
    errorTitle = "Resource Not Found";
    errorMessage = "The requested data could not be found.";
  } else if (error.status >= 500) {
    errorTitle = "Server Error";
    errorMessage = "The server encountered an error. Please try again later.";
  }

  return (
    <div className="custom-error-state">
      <div className="error-icon">⚠️</div>
      <h3>{errorTitle}</h3>
      <p>{errorMessage}</p>
      <div className="error-actions">
        <button onClick={refresh}>Retry</button>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomErrorState />

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

### Error State with Fallback Content

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";

function UsersList() {
  // Fallback data to use when API fails
  const fallbackUsers = [
    { id: 1, name: "Fallback User 1", email: "user1@example.com" },
    { id: 2, name: "Fallback User 2", email: "user2@example.com" },
    { id: 3, name: "Fallback User 3", email: "user3@example.com" },
  ];

  return (
    <ReactList endpoint="/api/users">
      {({ items, error, refresh }) => (
        <div className="users-container">
          <ReactListError>
            {({ error }) => (
              <div className="error-state">
                <div className="error-notification">
                  <h3>Error Loading Users</h3>
                  <p>{error.message || "An unexpected error occurred"}</p>
                  <button onClick={refresh}>Try Again</button>
                </div>

                <div className="fallback-content">
                  <h4>Showing cached data:</h4>
                  <ul>
                    {fallbackUsers.map((user) => (
                      <li key={user.id}>
                        <strong>{user.name}</strong> - {user.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </ReactListError>

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

### Error Boundary Integration

```jsx
import { ReactList, ReactListItems, ReactListError } from "@7span/react-list";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary-fallback">
      <h3>Something went wrong:</h3>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function UsersList() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ReactList endpoint="/api/users">
        {({ items, refresh }) => (
          <div className="users-container">
            <ReactListError>
              {({ error }) => (
                <div className="api-error-state">
                  <h3>API Error</h3>
                  <p>{error.message || "Failed to fetch users"}</p>
                  <button onClick={refresh}>Retry</button>
                </div>
              )}
            </ReactListError>

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
    </ErrorBoundary>
  );
}
```
