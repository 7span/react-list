# Getting Started

## Installation

::: code-group

```sh [npm]
npm install @7span/react-list
```

```sh [pnpm]
pnpm add @7span/react-list
```

```sh [yarn]
yarn add @7span/react-list
```

:::

## Configuring the Provider

Before using ReactList in your components, you need to configure it globally with your preferred `requestHandler`. This is the function ReactList will use to fetch data whenever listing state changes (like page, filters, etc.).

::: code-group

```jsx [index.jsx]
import { createRoot } from "react-dom/client";
import { ReactListProvider } from "@7span/react-list";
import axios from "axios";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(
  <ReactListProvider
    requestHandler={(requestData) => {
      const {
        endpoint,
        pagination,
        search,
        filters,
        page,
        perPage,
        sortBy,
        sortOrder,
      } = requestData;

      // Make the API as per your requirements
      // This should return a Promise
      return axios
        .get(endpoint, {
          params: {
            page,
            per_page: perPage,
            sort_by: sortBy,
            sort_order: sortOrder,
            search,
            ...filters,
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
    <App />
  </ReactListProvider>
);
```

:::

## Basic Usage

Once configured, you can use ReactList components in your application:

```jsx
import {
  ReactList,
  ReactListItems,
  ReactListPagination,
} from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, loading, error }) => (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          <ReactListItems>
            {items.map((user) => (
              <div key={user.id} className="user-card">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
            ))}
          </ReactListItems>

          <ReactListPagination />
        </div>
      )}
    </ReactList>
  );
}
```

## Next Steps

Explore the documentation to learn more about:

- [Configuration Options](/configuration/options)
- [Request Handler](/configuration/request-handler)
- [State Manager](/configuration/state-manager)
- [Available Components](/components/intro)
