# State Manager

The `stateManager` in ReactList is an optional but powerful feature that allows you to persist user interaction state across sessions or navigations. In simpler terms: if a user applies filters, changes the page, or selects a different perPage value, you can remember those choices - so when they return, the list looks exactly how they left it.

By default, listing state lives in memory and resets on page refresh or route change. With `stateManager`, you can plug into a storage layer (like `localStorage`, `sessionStorage`, or even an API).

## Structure

The `stateManager` is an object with three optional methods:

```js
{
  init: (context) => void,    // Optional
  get: (context) => Object,    // Optional
  set: (context) => void      // Optional
}
```

## Methods

### `init(context)`

- Type: `Function`
- Optional

Called once when the list component initializes. Useful for setup logic, cleanup, or initialization tasks.

**Parameters:**
- `context` - The context object containing `endpoint`, `version`, and other list state

**Example:**
```js
init(context) {
  const { endpoint, version } = context;
  // Clean up old state for this endpoint/version
  // Initialize storage
}
```

### `get(context)`

- Type: `Function`
- Optional

Called to retrieve saved state for a specific list. Should return the saved state object or `null` if no state exists.

**Parameters:**
- `context` - The context object containing `endpoint`, `version`, and other list state

**Returns:**
- `Object | null` - The saved state object with properties like `page`, `perPage`, `sortBy`, `sortOrder`, `search`, `filters`, `attrSettings`

**Example:**
```js
get(context) {
  const { endpoint, version } = context;
  const key = `react-list-${endpoint}-${version}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : null;
}
```

### `set(context)`

- Type: `Function`
- Optional

Called whenever the list state changes (page change, filter update, etc.). Use this to persist the state.

**Parameters:**
- `context` - The context object containing the current list state

**Example:**
```js
set(context) {
  const { endpoint, version, page, perPage, sortBy, sortOrder, search, filters, attrSettings } = context;
  const key = `react-list-${endpoint}-${version}`;
  localStorage.setItem(key, JSON.stringify({
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    filters,
    attrSettings,
  }));
}
```

## Complete Example

```js
// state-manager.js
function stateManagerKey(endpoint, version) {
  return `react-list--${endpoint}--${version}`;
}

export default {
  init(context) {
    const { endpoint, version } = context;
    const allKeys = `react-list--${endpoint}--`;
    const latestKey = stateManagerKey(endpoint, version);
    
    // Clean up stale state for older versions
    const staleKeys = Object.keys(localStorage).filter(
      (key) => key.startsWith(allKeys) && key !== latestKey
    );
    staleKeys.forEach((key) => localStorage.removeItem(key));
  },

  get(context) {
    const { endpoint, version } = context;
    const key = stateManagerKey(endpoint, version);
    
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error reading state:', error);
      return null;
    }
  },

  set(context) {
    const {
      endpoint,
      version,
      search,
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
      attrSettings,
    } = context;
    
    const key = stateManagerKey(endpoint, version);
    
    try {
      localStorage.setItem(
        key,
        JSON.stringify({
          search,
          page,
          perPage,
          sortBy,
          sortOrder,
          filters,
          attrSettings,
        })
      );
    } catch (error) {
      console.error('Error saving state:', error);
    }
  },
};
```

## Usage

```jsx
import { ReactListProvider } from '@7span/react-list';
import requestHandler from './request-handler';
import stateManager from './state-manager';

function App() {
  return (
    <ReactListProvider config={{ requestHandler, stateManager }}>
      {/* Your app */}
    </ReactListProvider>
  );
}
```

## Storage Options

You can use `stateManager` to sync state with:

- **LocalStorage** - Persists across browser sessions
- **SessionStorage** - Persists only for the current session
- **Redux** - Store in Redux state
- **Zustand** - Store in Zustand store
- **React Query** - Cache with React Query
- **Remote storage APIs** - Sync with backend
- **IndexedDB** - For large amounts of data

## State Properties

The state object saved/retrieved includes:

- `page` - Current page number
- `perPage` - Items per page
- `sortBy` - Field to sort by
- `sortOrder` - Sort direction ('asc' or 'desc')
- `search` - Search query string
- `filters` - Filter object
- `attrSettings` - Attribute visibility settings

## Versioning

The `version` property in the context is used to namespace state. When you change the version, old state is automatically cleaned up (if you implement cleanup in `init`). This is useful for:

- Migrating state structure
- Resetting state when list structure changes
- Supporting multiple list configurations
