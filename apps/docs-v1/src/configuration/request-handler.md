# Request Handler

The `requestHandler` is a core concept in ReactList. It's a function that handles all API communication, allowing you to centralize your data fetching logic.

## Basic Configuration

The `requestHandler` is typically configured at the provider level:

```jsx
import { ReactListProvider } from "@7span/react-list";
import axios from "axios";

function App() {
  return (
    <ReactListProvider
      requestHandler={(requestData) => {
        // Implement your API request logic here
        return axios
          .get(requestData.endpoint, {
            params: {
              page: requestData.page,
              per_page: requestData.perPage,
              // other params
            },
          })
          .then((response) => {
            // Transform the response to match ReactList's expected format
            return {
              items: response.data.data,
              pagination: {
                total: response.data.meta.total,
                perPage: response.data.meta.per_page,
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
              },
            };
          });
      }}
    >
      <YourApp />
    </ReactListProvider>
  );
}
```

## Request Data

The `requestHandler` receives a `requestData` object with the following properties:

| Property     | Type    | Description                                            |
| ------------ | ------- | ------------------------------------------------------ |
| `endpoint`   | String  | The API endpoint specified in the ReactList component. |
| `page`       | Number  | Current page number.                                   |
| `perPage`    | Number  | Number of items per page.                              |
| `sortBy`     | String  | Field to sort by (if specified).                       |
| `sortOrder`  | String  | Sort direction ('asc' or 'desc').                      |
| `search`     | String  | Search query (if any).                                 |
| `filters`    | Object  | Additional filters applied to the list.                |
| `pagination` | Boolean | Whether pagination is enabled.                         |

## Response Format

Your `requestHandler` must return a Promise that resolves to an object with the following structure:

```js
{
  items: [], // Array of items to display
  pagination: {
    total: 100, // Total number of items
    perPage: 10, // Items per page
    currentPage: 1, // Current page number
    lastPage: 10 // Last page number
  }
}
```

## Examples

### REST API with Axios

```jsx
requestHandler={(requestData) => {
  const {
    endpoint,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    filters
  } = requestData;

  return axios.get(endpoint, {
    params: {
      page,
      per_page: perPage,
      sort_by: sortBy,
      sort_order: sortOrder,
      search,
      ...filters
    }
  }).then(response => {
    return {
      items: response.data.data,
      pagination: response.data.meta
    };
  });
}}
```

### GraphQL with Apollo Client

```jsx
import { gql, useQuery } from '@apollo/client';

requestHandler={(requestData) => {
  const {
    endpoint,
    page,
    perPage,
    sortBy,
    sortOrder,
    filters
  } = requestData;

  // Construct your GraphQL query
  const query = gql`
    query GetItems($page: Int!, $perPage: Int!, $sortBy: String, $sortOrder: String, $filters: FiltersInput) {
      items(page: $page, perPage: $perPage, sortBy: $sortBy, sortOrder: $sortOrder, filters: $filters) {
        data {
          id
          name
          # other fields
        }
        meta {
          total
          perPage
          currentPage
          lastPage
        }
      }
    }
  `;

  // Return a promise that resolves to the expected format
  return client.query({
    query,
    variables: {
      page,
      perPage,
      sortBy,
      sortOrder,
      filters
    }
  }).then(response => {
    return {
      items: response.data.items.data,
      pagination: response.data.items.meta
    };
  });
}}
```

## Component-Level Override

You can override the global `requestHandler` for specific instances of ReactList:

```jsx
<ReactList
  endpoint="/api/special-users"
  requestHandler={(requestData) => {
    // Custom request handler for this specific list
    // ...
  }}
>
  {/* ... */}
</ReactList>
```

This is useful for lists that require special handling or have different API response formats.
