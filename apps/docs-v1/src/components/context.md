# `<ReactListContext>` - List Context Provider

The `<ReactListContext>` component is a context provider that makes the list state and methods available to all child components. It's automatically created by the `<ReactList>` component, so you typically don't need to use it directly unless you're building a custom implementation.

## Basic Usage

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

function CustomListComponent() {
  // Access list state and methods using the useReactList hook
  const {
    items,
    loading,
    error,
    page,
    perPage,
    totalItems,
    totalPages,
    setPage,
    setPerPage,
    // ... other state and methods
  } = useReactList();

  // Use the list state and methods to build your custom component
  return <div>{/* Your custom list implementation */}</div>;
}

function App() {
  return (
    <ReactListContext
      endpoint="/api/users"
      defaultPerPage={10}
      defaultSortBy="created_at"
      defaultSortOrder="desc"
      // ... other configuration options
    >
      <CustomListComponent />
    </ReactListContext>
  );
}
```

## Props

The `<ReactListContext>` component accepts all the same props as the `<ReactList>` component:

| Prop               | Type      | Default      | Description                                                   |
| ------------------ | --------- | ------------ | ------------------------------------------------------------- |
| endpoint           | String    |              | The API endpoint to fetch data from.                          |
| children           | ReactNode |              | Child components that will have access to the list context.   |
| defaultPage        | Number    | 1            | The initial page number.                                      |
| defaultPerPage     | Number    | 10           | The initial number of items per page.                         |
| defaultSortBy      | String    | null         | The initial field to sort by.                                 |
| defaultSortOrder   | String    | 'asc'        | The initial sort order ('asc' or 'desc').                     |
| defaultFilters     | Object    | {}           | The initial filters to apply.                                 |
| defaultSearch      | String    | ''           | The initial search query.                                     |
| pageParamName      | String    | 'page'       | The query parameter name for the page number.                 |
| perPageParamName   | String    | 'per_page'   | The query parameter name for items per page.                  |
| sortByParamName    | String    | 'sort_by'    | The query parameter name for the sort field.                  |
| sortOrderParamName | String    | 'sort_order' | The query parameter name for the sort order.                  |
| searchParamName    | String    | 'search'     | The query parameter name for the search query.                |
| totalItemsPath     | String    | 'meta.total' | The path to the total items count in the API response.        |
| dataPath           | String    | 'data'       | The path to the items array in the API response.              |
| metaPath           | String    | 'meta'       | The path to the metadata in the API response.                 |
| onSuccess          | Function  |              | Callback function called when data is successfully fetched.   |
| onError            | Function  |              | Callback function called when an error occurs.                |
| fetchOptions       | Object    | {}           | Additional options to pass to the fetch function.             |
| autoLoad           | Boolean   | true         | Whether to automatically load data when the component mounts. |
| transformRequest   | Function  |              | Function to transform the request before sending.             |
| transformResponse  | Function  |              | Function to transform the response after receiving.           |

## Context Value

The `<ReactListContext>` component provides the following values through the React context API, which can be accessed using the `useReactList` hook:

| Property/Method   | Type     | Description                                                   |
| ----------------- | -------- | ------------------------------------------------------------- |
| items             | Array    | The current list of items.                                    |
| loading           | Boolean  | Whether data is currently being loaded.                       |
| initialLoading    | Boolean  | Whether the initial data is being loaded.                     |
| subsequentLoading | Boolean  | Whether subsequent data (after initial load) is being loaded. |
| error             | Object   | Error object if an error occurred during data fetching.       |
| empty             | Boolean  | Whether the list is empty.                                    |
| page              | Number   | The current page number.                                      |
| perPage           | Number   | The current number of items per page.                         |
| totalItems        | Number   | The total number of items across all pages.                   |
| totalPages        | Number   | The total number of pages.                                    |
| sortBy            | String   | The current field being sorted by.                            |
| sortOrder         | String   | The current sort order ('asc' or 'desc').                     |
| filters           | Object   | The current filters applied to the list.                      |
| search            | String   | The current search query.                                     |
| setPage           | Function | Function to change the current page.                          |
| setPerPage        | Function | Function to change the number of items per page.              |
| setSortBy         | Function | Function to change the sort field.                            |
| setSortOrder      | Function | Function to change the sort order.                            |
| setFilters        | Function | Function to set filters.                                      |
| setSearch         | Function | Function to set the search query.                             |
| refresh           | Function | Function to refresh the data.                                 |
| reset             | Function | Function to reset all parameters to their defaults.           |
| goToFirstPage     | Function | Function to go to the first page.                             |
| goToLastPage      | Function | Function to go to the last page.                              |
| goToNextPage      | Function | Function to go to the next page.                              |
| goToPrevPage      | Function | Function to go to the previous page.                          |
| hasNextPage       | Boolean  | Whether there is a next page.                                 |
| hasPrevPage       | Boolean  | Whether there is a previous page.                             |

## Examples

### Custom List Implementation

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

function CustomPagination() {
  const {
    page,
    totalPages,
    goToFirstPage,
    goToPrevPage,
    goToNextPage,
    goToLastPage,
    setPage,
  } = useReactList();

  return (
    <div className="custom-pagination">
      <button onClick={goToFirstPage} disabled={page === 1}>
        First
      </button>
      <button onClick={goToPrevPage} disabled={page === 1}>
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button onClick={goToNextPage} disabled={page === totalPages}>
        Next
      </button>
      <button onClick={goToLastPage} disabled={page === totalPages}>
        Last
      </button>
    </div>
  );
}

function CustomSearch() {
  const { search, setSearch } = useReactList();

  return (
    <div className="custom-search">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

function CustomItems() {
  const { items, loading, error, empty } = useReactList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (empty) {
    return <div>No items found.</div>;
  }

  return (
    <ul className="custom-items-list">
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function CustomList() {
  return (
    <div className="custom-list">
      <CustomSearch />
      <CustomItems />
      <CustomPagination />
    </div>
  );
}

function App() {
  return (
    <ReactListContext
      endpoint="/api/users"
      defaultPerPage={10}
      defaultSortBy="created_at"
      defaultSortOrder="desc"
    >
      <CustomList />
    </ReactListContext>
  );
}
```

### Accessing List State in Deeply Nested Components

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

function DeeplyNestedComponent() {
  // Access list state and methods even in deeply nested components
  const { items, loading, refresh } = useReactList();

  return (
    <div>
      <button onClick={refresh}>Refresh Data</button>
      <p>Total items: {items.length}</p>
      {loading && <p>Refreshing...</p>}
    </div>
  );
}

function MiddleComponent() {
  return (
    <div>
      <h3>Middle Component</h3>
      <DeeplyNestedComponent />
    </div>
  );
}

function App() {
  return (
    <ReactListContext endpoint="/api/users">
      <div>
        <h2>App</h2>
        <MiddleComponent />
      </div>
    </ReactListContext>
  );
}
```

### Multiple Lists with Separate Contexts

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

function UsersList() {
  const { items, loading } = useReactList();

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <ul>
      {items.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

function ProductsList() {
  const { items, loading } = useReactList();

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <ul>
      {items.map((product) => (
        <li key={product.id}>
          {product.name} - ${product.price}
        </li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h2>Users</h2>
      <ReactListContext endpoint="/api/users">
        <UsersList />
      </ReactListContext>

      <h2>Products</h2>
      <ReactListContext endpoint="/api/products">
        <ProductsList />
      </ReactListContext>
    </div>
  );
}
```

### Custom API Integration

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

// Custom function to transform the request before sending
function customRequestTransformer(params) {
  // Add custom headers or modify request parameters
  return {
    ...params,
    headers: {
      ...params.headers,
      "X-Custom-Header": "CustomValue",
    },
    // Map our parameters to the format expected by the API
    queryParams: {
      ...params.queryParams,
      pageNumber: params.queryParams.page,
      pageSize: params.queryParams.per_page,
      // Remove the original parameters
      page: undefined,
      per_page: undefined,
    },
  };
}

// Custom function to transform the response after receiving
function customResponseTransformer(response) {
  // Transform the API response to match the expected format
  return {
    data: response.results,
    meta: {
      total: response.totalCount,
      current_page: response.currentPage,
      per_page: response.pageSize,
      total_pages: Math.ceil(response.totalCount / response.pageSize),
    },
  };
}

function CustomList() {
  const { items, loading, error, empty } = useReactList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (empty) {
    return <div>No items found.</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <ReactListContext
      endpoint="/api/custom-users-endpoint"
      transformRequest={customRequestTransformer}
      transformResponse={customResponseTransformer}
      totalItemsPath="totalCount"
      dataPath="results"
      fetchOptions={{
        credentials: "include",
        mode: "cors",
      }}
    >
      <CustomList />
    </ReactListContext>
  );
}
```

### Using Event Callbacks

```jsx
import { ReactListContext, useReactList } from "@7span/react-list";

function ListWithCallbacks() {
  const { items, loading, error } = useReactList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

function App() {
  return (
    <ReactListContext
      endpoint="/api/users"
      onSuccess={(data) => {
        console.log("Data loaded successfully:", data);
        // You could trigger analytics events, show notifications, etc.
      }}
      onError={(error) => {
        console.error("Error loading data:", error);
        // You could log errors to a service, show error notifications, etc.
      }}
    >
      <ListWithCallbacks />
    </ReactListContext>
  );
}
```
