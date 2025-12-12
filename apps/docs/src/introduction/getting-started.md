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

## Configuring the Plugin

Before using ReactList in your components, you need to configure it globally with your preferred `requestHandler`. This is the function ReactList will use to fetch data whenever listing state changes (like page, filters, etc.).

::: code-group

```js [main.js]
import React from "react";
import ReactList from "@7span/react-list";
import axios from "axios";

function App() {
  const requestHandler = async (requestData) => {
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

    // Make the API request as per your requirements
    const response = await axios.get(`${import.meta.baseUrl}/api/${endpoint}`, {
      params: {
        page,
        limit: perPage,
        search: search,
        // ...
      },
    });

    const data = response.data;

    return {
      items: data, // Array of data items
      count: data?.count ?? 0, // Total count of items available
    };
  };

  return (
    <ReactList requestHandler={requestHandler}>
      {/* Your list rendering logic */}
    </ReactList>
  );
}

export default App;
```

:::

## Using in Components

Once the plugin is configured, you can use the `<ReactList>` component anywhere in your app to power listing views. ReactList handles the reactive state (pagination, filters, isLoading, etc.) - you handle the markup.

::: code-group

```react [users.react]
<template>
  <ReactList endpoint="users" :per-page="5" pagination-mode="pagination">
    <template #default>
      <ReactListInitialLoader />
      <ReactListLoader />
      <ReactListError />
      <ReactListItems #default="{ items }">
        <!-- Render your list items here -->
        <pre>{{ items }}</pre>
      </ReactListItems>
      <ReactListInitialLoader />
      <ReactListLoader />
      <ReactListError />
      <ReactListItems />
      <ReactListPagination />
      <ReactListPagination />
    </template>
  </ReactList>
</template>
```

:::

::: tip
ReactList does not render your UI. It only gives you the data and state you need — your components stay 100% in control of layout and design.
:::

Let's break down what ReactList offers - configuration options, the components, and props that power your listings.
