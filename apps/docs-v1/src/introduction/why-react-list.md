# Why React List?

## The Problem

Building list interfaces with API data in React often involves repetitive code patterns:

1. **Fetching data** from APIs with pagination, sorting, and filtering
2. **Managing state** for loading, errors, and empty states
3. **Handling user interactions** like page changes, search, and filter updates
4. **Persisting user preferences** across sessions

This leads to duplicated logic across components and makes maintenance challenging.

## The Solution

ReactList abstracts away these common patterns into a set of composable components and hooks that:

- **Centralize API logic** with a configurable request handler
- **Manage state automatically** for loading, errors, and data
- **Handle user interactions** with built-in components for pagination, search, etc.
- **Persist user preferences** with a configurable state manager

## Key Benefits

### 1. Headless Architecture

ReactList is completely UI-agnostic. It provides the logic and state management while giving you full control over the markup via render props.

```jsx
<ReactList endpoint="/api/users">
  {({ items, loading, error }) => (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {items.length === 0 && <p>No items found</p>}
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  )}
</ReactList>
```

### 2. Centralized Request Handling

Configure your API logic once using the global `requestHandler` option:

```jsx
import { ReactListProvider } from "react-list";
import axios from "axios";

function App() {
  return (
    <ReactListProvider
      requestHandler={({ endpoint, page, perPage, filters }) => {
        return axios.get(endpoint, {
          params: { page, per_page: perPage, ...filters },
        });
      }}
    >
      <YourApp />
    </ReactListProvider>
  );
}
```

### 3. Automatic Reactivity

ReactList automatically reacts to changes in props like page, filters, or params, and fetches updated data.

### 4. Flexible State Management

Persist user preferences like page, perPage, and filters in localStorage, or push them to an API.

## When to Use ReactList

ReactList is ideal for:

- Admin panels and dashboards
- Data tables and grids
- Search results pages
- Any interface that displays paginated API data

If you find yourself writing the same data fetching and pagination logic repeatedly, ReactList can help you standardize and simplify your code.
