# State Manager

The `stateManager` in ReactList handles persisting user preferences like page number, filters, and sorting across page refreshes or navigation.

## Default Behavior

By default, ReactList uses a built-in localStorage-based state manager that:

1. Saves the current state when it changes
2. Restores the state when the component mounts
3. Uses the `endpoint` prop as a unique key to store state for different lists

## Custom State Manager

You can provide your own state manager to customize how state is persisted:

```jsx
import { ReactListProvider } from "@7span/react-list";

function App() {
  const customStateManager = {
    // Save state to your preferred storage
    save: (key, state) => {
      // Example: Save to localStorage with custom prefix
      localStorage.setItem(`my-app:${key}`, JSON.stringify(state));

      // Or send to an API
      // api.saveUserPreferences(key, state);
    },

    // Load state from your storage
    load: (key) => {
      // Example: Load from localStorage with custom prefix
      const saved = localStorage.getItem(`my-app:${key}`);
      return saved ? JSON.parse(saved) : null;

      // Or fetch from an API
      // return api.getUserPreferences(key);
    },

    // Clear state (optional)
    clear: (key) => {
      localStorage.removeItem(`my-app:${key}`);
      // Or clear from API
      // api.clearUserPreferences(key);
    },
  };

  return (
    <ReactListProvider stateManager={customStateManager}>
      <YourApp />
    </ReactListProvider>
  );
}
```

## State Manager Interface

A custom state manager must implement the following methods:

| Method  | Parameters     | Return         | Description                                    |
| ------- | -------------- | -------------- | ---------------------------------------------- |
| `save`  | `(key, state)` | void           | Saves the state for the given key.             |
| `load`  | `(key)`        | Object or null | Loads the state for the given key.             |
| `clear` | `(key)`        | void           | (Optional) Clears the state for the given key. |

## State Structure

The state object that gets saved has the following structure:

```js
{
  page: 2,
  perPage: 10,
  sortBy: 'created_at',
  sortOrder: 'desc',
  search: 'query',
  filters: { status: 'active' }
}
```

## State Key Generation

By default, ReactList uses the `endpoint` prop as the key for state storage. You can make this more specific by adding a `version` prop:

```jsx
<ReactList endpoint="/api/users" version="1.2">
  {/* ... */}
</ReactList>
```

This will generate a storage key like `/api/users:1.2`, allowing you to invalidate old state when your API or UI changes.

## Disabling State Persistence

To disable state persistence for a specific ReactList instance, you can pass a null state manager:

```jsx
<ReactList endpoint="/api/users" stateManager={null}>
  {/* ... */}
</ReactList>
```

## Examples

### Session Storage Manager

```jsx
const sessionStorageManager = {
  save: (key, state) => {
    sessionStorage.setItem(`react-list:${key}`, JSON.stringify(state));
  },
  load: (key) => {
    const saved = sessionStorage.getItem(`react-list:${key}`);
    return saved ? JSON.parse(saved) : null;
  },
  clear: (key) => {
    sessionStorage.removeItem(`react-list:${key}`);
  },
};
```

### API-Based Manager

```jsx
const apiStateManager = {
  save: async (key, state) => {
    const userId = getCurrentUserId(); // Your auth logic
    await fetch("/api/user-preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        key,
        state,
      }),
    });
  },
  load: async (key) => {
    const userId = getCurrentUserId(); // Your auth logic
    const response = await fetch(
      `/api/user-preferences?userId=${userId}&key=${key}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.state;
    }
    return null;
  },
  clear: async (key) => {
    const userId = getCurrentUserId(); // Your auth logic
    await fetch(`/api/user-preferences?userId=${userId}&key=${key}`, {
      method: "DELETE",
    });
  },
};
```

### URL Query Params Manager

```jsx
import { useNavigate, useLocation } from "react-router-dom";

function ListWithUrlState() {
  const navigate = useNavigate();
  const location = useLocation();

  const urlStateManager = {
    save: (key, state) => {
      const searchParams = new URLSearchParams(location.search);
      Object.entries(state).forEach(([k, v]) => {
        if (v !== null && v !== undefined) {
          if (typeof v === "object") {
            searchParams.set(k, JSON.stringify(v));
          } else {
            searchParams.set(k, v);
          }
        } else {
          searchParams.delete(k);
        }
      });
      navigate({ search: searchParams.toString() }, { replace: true });
    },
    load: (key) => {
      const searchParams = new URLSearchParams(location.search);
      const state = {};

      ["page", "perPage", "sortBy", "sortOrder", "search"].forEach((param) => {
        if (searchParams.has(param)) {
          state[param] = searchParams.get(param);
          // Convert numeric strings to numbers
          if (["page", "perPage"].includes(param)) {
            state[param] = parseInt(state[param], 10);
          }
        }
      });

      // Handle filters object if present
      if (searchParams.has("filters")) {
        try {
          state.filters = JSON.parse(searchParams.get("filters"));
        } catch (e) {
          state.filters = {};
        }
      }

      return Object.keys(state).length > 0 ? state : null;
    },
    clear: (key) => {
      navigate({ search: "" }, { replace: true });
    },
  };

  return (
    <ReactList endpoint="/api/users" stateManager={urlStateManager}>
      {/* ... */}
    </ReactList>
  );
}
```
