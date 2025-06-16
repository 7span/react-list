# Configuration Options

ReactList can be configured both globally (via the provider) and locally (via component props). Here's a comprehensive guide to all available options.

## Global Configuration

These options are set when initializing the ReactListProvider:

```jsx
import { ReactListProvider } from "@7span/react-list";

function App() {
  return (
    <ReactListProvider
      requestHandler={customRequestHandler}
      stateManager={customStateManager}
      defaultOptions={{
        perPage: 20,
        paginationMode: "loadMore",
        // other default options
      }}
    >
      <YourApp />
    </ReactListProvider>
  );
}
```

### Available Global Options

| Option           | Type     | Default                       | Description                                                                                                |
| ---------------- | -------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `requestHandler` | Function | Required                      | The function that handles API requests. See [Request Handler](/configuration/request-handler) for details. |
| `stateManager`   | Object   | Built-in localStorage manager | Manages state persistence. See [State Manager](/configuration/state-manager) for details.                  |
| `defaultOptions` | Object   | See below                     | Default options for all ReactList instances.                                                               |

### Default Options Object

| Option                 | Type    | Default      | Description                                           |
| ---------------------- | ------- | ------------ | ----------------------------------------------------- |
| `perPage`              | Number  | 25           | Default number of items per page.                     |
| `page`                 | Number  | 1            | Default starting page.                                |
| `sortOrder`            | String  | 'desc'       | Default sort order ('asc' or 'desc').                 |
| `paginationMode`       | String  | 'pagination' | Default pagination mode ('pagination' or 'loadMore'). |
| `hasPaginationHistory` | Boolean | true         | Whether to update URL with pagination state.          |

## Component-Level Configuration

Each ReactList component can override global settings:

```jsx
<ReactList
  endpoint="/api/users"
  page={2}
  perPage={10}
  sortBy="created_at"
  sortOrder="asc"
  search="john"
  filters={{ role: "admin" }}
  paginationMode="loadMore"
  hasPaginationHistory={false}
  requestHandler={customRequestHandler}
  version="1.0"
>
  {/* ... */}
</ReactList>
```

### Available Component Props

| Prop                   | Type          | Default        | Description                                   |
| ---------------------- | ------------- | -------------- | --------------------------------------------- |
| `endpoint`             | String        | Required       | The API endpoint to fetch data from.          |
| `page`                 | Number        | 1              | Initial page number.                          |
| `perPage`              | Number        | 25             | Number of items per page.                     |
| `sortBy`               | String        | null           | Field to sort by.                             |
| `sortOrder`            | String        | 'desc'         | Sort direction ('asc' or 'desc').             |
| `search`               | String        | ''             | Search query.                                 |
| `filters`              | Object        | {}             | Additional filters to apply.                  |
| `paginationMode`       | String        | 'pagination'   | Pagination mode ('pagination' or 'loadMore'). |
| `hasPaginationHistory` | Boolean       | true           | Whether to update URL with pagination state.  |
| `requestHandler`       | Function      | Global handler | Override the global request handler.          |
| `version`              | String/Number | null           | Version identifier for state management.      |

## Priority Order

When determining which value to use, ReactList follows this priority order:

1. Component props (highest priority)
2. Persisted state (if available)
3. Global default options
4. Built-in defaults (lowest priority)

This allows for flexible configuration at different levels of your application.
