# `<ReactList>` - The Root Component

The root component that wires everything together. It manages the entire data lifecycle — state, filters, pagination, search, and API calls — and provides context for all child components.

It's the only component you must include. Every other component depends on the context provided by `<ReactList>`.

```jsx
import { ReactList } from "@7span/react-list";

function MyList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, loading, error }) => <div>{/* Child Components*/}</div>}
    </ReactList>
  );
}
```

## Props

| Prop                 | Default    | Type                                                                                                                                                             |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| endpoint             |            | `String` - _required_<br />The unique identifier for the data source. Passed to the requestHandler. It can be a URL or part of URL.                              |
| page                 | 1          | `Number`<br />Initial page value.                                                                                                                                |
| perPage              | 25         | `Number`<br />Initial number of items per page.                                                                                                                  |
| sortBy               |            | `String`<br />Initial sorting field.                                                                                                                             |
| sortOrder            | desc       | `String`<br />Initial sorting direction. Should be either **asc** or **desc**.                                                                                   |
| search               |            | `String` <br />Initial search term.                                                                                                                              |
| filters              | {}         | `Object`<br />Initial filters to apply to the list.                                                                                                              |
| requestHandler       |            | `Function`<br />Override the global `requestHandler` defined during plugin setup — ideal for module-specific logic.                                              |
| version              |            | `String` `Number`<br />Optional identifier for `stateManager`. You can use this with `endpoint` to generate new unique keys for state and delete old stale keys. |
| hasPaginationHistory | true       | `Boolean`<br />ReactList will append the current page number to the URL query params — improving back button support.                                            |
| paginationMode       | pagination | `String`<br />**pagination**: Shows page numbers and traditional navigation.<br />**loadMore**: Loads more items on scroll or button click.                      |

## Events

| Name            | Arguments                  | Description                                         |
| --------------- | -------------------------- | --------------------------------------------------- |
| onItemSelect    | `(item, index)`            | Called when an item is selected                     |
| onResponse      | `(response)`               | Called after a successful API response              |
| afterPageChange | `(newPage, previousPage)`  | Called after the page changes                       |
| afterLoadMore   | `(newItems, currentItems)` | Called after more items are loaded in loadMore mode |

## Render Props

The `<ReactList>` component uses render props to expose its context to child components. The function child receives an object with the following properties:

| Key           | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| items         | Array of items returned from the API                             |
| loading       | Boolean indicating if data is being loaded                       |
| error         | Error object if the request failed, null otherwise               |
| page          | Current page number                                              |
| perPage       | Number of items per page                                         |
| sortBy        | Current sort field                                               |
| sortOrder     | Current sort direction ('asc' or 'desc')                         |
| search        | Current search query                                             |
| filters       | Current filters applied to the list                              |
| pagination    | Object with pagination info (total, currentPage, lastPage, etc.) |
| setPage       | Function to change the current page                              |
| setPerPage    | Function to change the number of items per page                  |
| setSortBy     | Function to change the sort field                                |
| setSortOrder  | Function to change the sort direction                            |
| setSearch     | Function to set the search query                                 |
| setFilters    | Function to set or update filters                                |
| refresh       | Function to reload the current data                              |
| goToFirstPage | Function to navigate to the first page                           |
| goToLastPage  | Function to navigate to the last page                            |
| goToNextPage  | Function to navigate to the next page                            |
| goToPrevPage  | Function to navigate to the previous page                        |
| loadMore      | Function to load the next page of items (in 'loadMore' mode)     |
| reset         | Function to reset all state to defaults                          |

## Examples

### Basic Usage

```jsx
import { ReactList } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, loading, error }) => (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          {items.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ReactList>
  );
}
```

### With Sorting and Filtering

```jsx
import { ReactList } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList
      endpoint="/api/users"
      sortBy="created_at"
      sortOrder="desc"
      filters={{ status: "active" }}
    >
      {({ items, loading, error, setSortBy, setSortOrder, setFilters }) => (
        <div>
          <div className="filters">
            <select
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, status: e.target.value }))
              }
              defaultValue="active"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue="created_at"
            >
              <option value="created_at">Created Date</option>
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>

            <select
              onChange={(e) => setSortOrder(e.target.value)}
              defaultValue="desc"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          {items.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </ReactList>
  );
}
```

### Load More Mode

```jsx
import { ReactList } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users" paginationMode="loadMore">
      {({ items, loading, error, loadMore, pagination }) => (
        <div>
          {loading && items.length === 0 && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          {items.length === 0 ? (
            <p>No users found</p>
          ) : (
            <>
              <ul>
                {items.map((user) => (
                  <li key={user.id}>{user.name}</li>
                ))}
              </ul>

              {pagination.currentPage < pagination.lastPage && (
                <button onClick={loadMore} disabled={loading}>
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </>
          )}
        </div>
      )}
    </ReactList>
  );
}
```
