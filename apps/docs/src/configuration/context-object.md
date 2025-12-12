# The Context Object

The context object is the single source of truth passed into both:

1. The `requestHandler` — to fetch data.
2. The `stateManager` — to persist and restore state.

It contains everything ReactList knows about the current list view, bundled into a neat, opinionated object.

```js
{
  endpoint: String,
  version: Number,
  meta: Object,
  page: Number,
  perPage: Number,
  sortBy: String,
  sortOrder: String,
  filters: Object,
  search: String,
  attrSettings: Object,
  isRefresh: Boolean
}
```

## 🔑 `endpoint`

- Type: `String`

This is the identifier for the data source - usually the API endpoint or a unique key for the listing.

- Used to build request URLs in your `requestHandler`
- Acts as a namespace in `stateManager` for saving/restoring data
- Passed as a prop to `<ReactList>`

## 🔢 `version`

- Type: `Number`
- Default: `1`

The version number of the list configuration. Used for state management versioning.

- Helps namespace state in `stateManager`
- Useful for migrating state when list structure changes
- Passed as a prop to `<ReactList>`

## 📦 `meta`

- Type: `Object`
- Default: `{}`

Additional metadata or configuration options for the list.

- Useful for passing extra data to the `requestHandler`
- Can be used to customize the list based on specific requirements
- Passed as a prop to `<ReactList>`
- Also returned in the `requestHandler` response and available in the list state

## 📄 `page`

- Type: `Number`

The current page number, controlled internally by ReactList.

- Automatically updated on user interactions like "next page" or "go to page"
- Starts from `1` by default
- For `loadMore` mode, always starts at `1`

## 📊 `perPage`

- Type: `Number`

The number of items to show per page.

- ReactList handles this as part of state
- Passed to the API to limit the result size
- Useful for paginated responses (limit, pageSize, etc.)
- Default: `25`

## ↕️ `sortBy`

- Type: `String`
- Default: `""`

The field or column name to sort by.

- Controlled by the user via sorting UI
- Optional, but useful for sortable tables
- Works in tandem with `sortOrder`
- Empty string means no sorting

## ⬆️ `sortOrder`

- Type: `String`
- Default: `"desc"`

The direction of sorting — either `"asc"` (ascending) or `"desc"` (descending).

- Works with `sortBy` to define how the list should be ordered
- Can also be an empty string to clear sorting

## 🎛️ `filters`

- Type: `Object`
- Default: `{}`

An object representing filter values applied by the user.

- Can contain any number of filter keys and values
- Completely dynamic - ReactList doesn't enforce the shape
- Supports both simple values and complex filter objects (e.g., `{ status: { _eq: 'active' } }`)

## 🔍 `search`

- Type: `String`
- Default: `""`

This is the global search term entered by the user, typically via a text input box.

- Useful for filtering data based on a single search query
- Can be used in conjunction with `filters` for more advanced filtering
- Empty string means no search

## 🎨 `attrSettings`

- Type: `Object`
- Default: `{}`

Settings for attribute/column visibility and configuration.

- Used by `<ReactListAttributes>` component
- Typically contains settings like `{ [attrName]: { visible: boolean } }`
- Persisted in `stateManager` if configured
- Only included in `stateManager` context, not in `requestHandler` context

## 🔄 `isRefresh`

- Type: `Boolean`
- Default: `false`

When the refresh is triggered from `<ReactListRefresh>` or the `refresh` method is called explicitly, this value is `true`.

- Use this to skip cache layers and force hit APIs, or show special loading states
- Offer a retry option without changing filters or pagination
- Only included in `requestHandler` context, not in `stateManager` context

## Context in Request Handler

When passed to `requestHandler`, the context includes:

```js
{
  endpoint,
  version,
  meta,
  page,
  perPage,
  search,
  sortBy,
  sortOrder,
  filters,
  isRefresh,  // Only in requestHandler
}
```

**Note:** `attrSettings` is NOT included in the `requestHandler` context, only in the `stateManager` context.

## Context in State Manager

When passed to `stateManager` methods, the context includes:

```js
{
  endpoint,
  version,
  meta,
  page,
  perPage,
  search,
  sortBy,
  sortOrder,
  filters,
  attrSettings,  // Only in stateManager
}
```

**Note:** `isRefresh` is NOT included in the `stateManager` context, only in the `requestHandler` context.

## Example Usage

### In Request Handler

```js
const requestHandler = async (context) => {
  const {
    endpoint,
    version,
    meta,
    page,
    perPage,
    search,
    sortBy,
    sortOrder,
    filters,
    isRefresh,  // Available here
  } = context;

  // Build API request
  const url = `/api/${endpoint}?page=${page}&limit=${perPage}`;
  // ...
};
```

### In State Manager

```js
const stateManager = {
  set(context) {
    const {
      endpoint,
      version,
      page,
      perPage,
      search,
      sortBy,
      sortOrder,
      filters,
      attrSettings,  // Available here
    } = context;

    // Save to storage
    localStorage.setItem(endpoint, JSON.stringify({
      page,
      perPage,
      // ...
    }));
  },
};
```
