# `<ReactListPerPage>` - Items Per Page

The `<ReactListPerPage>` component provides a control for changing the number of items displayed per page. It automatically manages the per-page state and triggers API requests with the appropriate pagination parameters.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListPerPage } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ReactListPerPage options={[10, 20, 50, 100]} />
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

| Prop            | Type                | Default           | Description                                                     |
| --------------- | ------------------- | ----------------- | --------------------------------------------------------------- |
| options         | Array               | [10, 25, 50, 100] | Array of numbers representing the available per-page options.   |
| component       | String or Component | "select"          | The component to render for the per-page control.               |
| label           | String              | "Items per page:" | Label text to display before the control.                       |
| showLabel       | Boolean             | true              | Whether to show the label.                                      |
| className       | String              |                   | CSS class for the per-page control container.                   |
| selectClassName | String              |                   | CSS class for the select element.                               |
| labelClassName  | String              |                   | CSS class for the label element.                                |
| onChange        | Function            |                   | Callback function that runs when the per-page value is changed. |

## How It Works

The `<ReactListPerPage>` component:

1. Renders a select control (by default) for changing the number of items per page
2. Automatically updates the per-page parameter in the ReactList context
3. Triggers a new API request with the updated pagination parameters
4. Maintains the per-page state across page refreshes (if a state manager is configured)

## Examples

### Basic Per-Page Selector

```jsx
import { ReactList, ReactListItems, ReactListPerPage } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ReactListPerPage options={[5, 10, 25, 50]} label="Show:" />
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

### Styled Per-Page with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListPerPage } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="flex justify-end mb-4">
            <ReactListPerPage
              options={[10, 25, 50, 100]}
              label="Show:"
              className="flex items-center space-x-2"
              labelClassName="text-sm text-gray-600"
              selectClassName="block pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
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

### Custom Per-Page Component

```jsx
import { ReactList, ReactListItems, ReactListPerPage } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ReactListPerPage
              options={[5, 10, 25, 50, 100]}
              component={({ options, value, onChange }) => (
                <div className="custom-per-page">
                  <span className="per-page-label">Display:</span>
                  <div className="per-page-buttons">
                    {options.map((option) => (
                      <button
                        key={option}
                        className={`per-page-button ${
                          value === option ? "active" : ""
                        }`}
                        onClick={() => onChange(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            />
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

### Per-Page with Custom Options

```jsx
import { ReactList, ReactListItems, ReactListPerPage } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, perPage }) => (
        <div className="users-container">
          <div className="list-header">
            <h2>Users List</h2>
            <div className="list-controls">
              <ReactListPerPage
                options={[10, 25, 50, 100, "All"]}
                component={({ options, value, onChange }) => (
                  <div className="per-page-control">
                    <label htmlFor="per-page-select">Show:</label>
                    <select
                      id="per-page-select"
                      value={value}
                      onChange={(e) => {
                        const val = e.target.value;
                        onChange(val === "All" ? 1000 : parseInt(val, 10));
                      }}
                    >
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <span>items</span>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="list-info">
            Showing {perPage === 1000 ? "All" : perPage} items per page
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

You can also create a custom per-page component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomPerPage() {
  const { perPage, setPerPage } = useReactList();

  const options = [5, 10, 25, 50, 100];

  return (
    <div className="custom-per-page">
      <label htmlFor="custom-per-page-select">Results per page:</label>
      <select
        id="custom-per-page-select"
        value={perPage}
        onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <CustomPerPage />
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

### Per-Page with Pagination Info

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPerPage,
  useReactList,
} from "@7span/react-list";

function PaginationInfo() {
  const { items, page, perPage, pagination } = useReactList();

  if (!pagination || !pagination.total) {
    return null;
  }

  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, pagination.total);
  const total = pagination.total;

  return (
    <div className="pagination-info">
      Showing {start}-{end} of {total} items
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-header">
            <PaginationInfo />
            <ReactListPerPage options={[10, 25, 50, 100]} />
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

### Responsive Per-Page Options

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useState, useEffect } from "react";

function ResponsivePerPage() {
  const { perPage, setPerPage } = useReactList();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine available options based on screen size
  const getOptions = () => {
    if (windowWidth < 640) {
      // Mobile
      return [5, 10, 25];
    } else if (windowWidth < 1024) {
      // Tablet
      return [10, 25, 50];
    } else {
      // Desktop
      return [10, 25, 50, 100];
    }
  };

  const options = getOptions();

  return (
    <div className="responsive-per-page">
      <label htmlFor="responsive-per-page-select">Show:</label>
      <select
        id="responsive-per-page-select"
        value={perPage}
        onChange={(e) => setPerPage(parseInt(e.target.value, 10))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="list-controls">
            <ResponsivePerPage />
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
