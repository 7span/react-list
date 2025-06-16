# `<ReactListPagination>` - Page Navigation

The `<ReactListPagination>` component provides a traditional pagination interface with page numbers and navigation controls. It automatically handles page changes and updates the list data.

## Basic Usage

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>

          <ReactListPagination />
        </div>
      )}
    </ReactList>
  );
}
```

## Props

| Prop              | Type        | Default    | Description                                        |
| ----------------- | ----------- | ---------- | -------------------------------------------------- |
| maxVisiblePages   | Number      | 5          | Maximum number of page buttons to show.            |
| showFirstLast     | Boolean     | true       | Whether to show First/Last page buttons.           |
| showPrevNext      | Boolean     | true       | Whether to show Previous/Next buttons.             |
| firstLabel        | String/Node | '«'        | Label for the First page button.                   |
| prevLabel         | String/Node | '‹'        | Label for the Previous page button.                |
| nextLabel         | String/Node | '›'        | Label for the Next page button.                    |
| lastLabel         | String/Node | '»'        | Label for the Last page button.                    |
| className         | String      | ''         | Additional CSS class for the pagination container. |
| activeClassName   | String      | 'active'   | CSS class for the active page button.              |
| disabledClassName | String      | 'disabled' | CSS class for disabled buttons.                    |
| renderPageLink    | Function    |            | Custom renderer for page links.                    |

## Customization

### Custom Styling

You can customize the appearance of the pagination component using CSS classes:

```jsx
<ReactListPagination
  className="custom-pagination"
  activeClassName="current-page"
  disabledClassName="inactive"
/>
```

### Custom Labels

You can customize the labels for navigation buttons:

```jsx
<ReactListPagination
  firstLabel="First"
  prevLabel="Previous"
  nextLabel="Next"
  lastLabel="Last"
/>
```

You can also use React components or icons:

```jsx
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

<ReactListPagination
  firstLabel={<FaAngleDoubleLeft />}
  prevLabel={<FaAngleLeft />}
  nextLabel={<FaAngleRight />}
  lastLabel={<FaAngleDoubleRight />}
/>;
```

### Custom Page Link Renderer

You can completely customize the rendering of each page link:

```jsx
<ReactListPagination
  renderPageLink={(page, isActive, onClick) => (
    <button
      key={page}
      onClick={onClick}
      className={`custom-page-link ${isActive ? "is-current" : ""}`}
      aria-current={isActive ? "page" : undefined}
    >
      {page}
    </button>
  )}
/>
```

## Examples

### Basic Pagination

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
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

          <div className="pagination-container">
            <ReactListPagination />
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Simplified Pagination

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
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

          <div className="pagination-container">
            <ReactListPagination
              showFirstLast={false}
              prevLabel="Previous"
              nextLabel="Next"
              maxVisiblePages={3}
            />
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Styled Pagination with Tailwind CSS

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
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
            <ReactListPagination
              className="flex space-x-1"
              renderPageLink={(page, isActive, onClick) => (
                <button
                  key={page}
                  onClick={onClick}
                  className={`px-3 py-1 rounded ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              )}
              firstLabel={
                <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                  «
                </span>
              }
              prevLabel={
                <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                  ‹
                </span>
              }
              nextLabel={
                <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                  ›
                </span>
              }
              lastLabel={
                <span className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">
                  »
                </span>
              }
            />
          </div>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Implementation with Hook

You can also create a completely custom pagination component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";

function CustomPagination() {
  const {
    page,
    pagination,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    setPage,
  } = useReactList();

  if (!pagination || pagination.lastPage <= 1) {
    return null;
  }

  return (
    <div className="custom-pagination">
      <button
        onClick={goToFirstPage}
        disabled={page === 1}
        className="pagination-button"
      >
        First
      </button>

      <button
        onClick={goToPrevPage}
        disabled={page === 1}
        className="pagination-button"
      >
        Previous
      </button>

      <span className="pagination-info">
        Page {page} of {pagination.lastPage}
      </span>

      <button
        onClick={goToNextPage}
        disabled={page === pagination.lastPage}
        className="pagination-button"
      >
        Next
      </button>

      <button
        onClick={goToLastPage}
        disabled={page === pagination.lastPage}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>

          <CustomPagination />
        </div>
      )}
    </ReactList>
  );
}
```
