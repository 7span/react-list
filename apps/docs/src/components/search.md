# `<ReactListSearch>`

This component provides a customizable way to integrate search into your list. It handles search state internally and offers a debounced update mechanism to prevent excessive API calls while typing.

## How it works

The component maintains a local search state that is synchronized with the list's search state. When you type, the local state updates immediately (for responsive UI), but the actual search query sent to the API is debounced. This prevents making an API call on every keystroke.

## Props

| Name           | Type                | Description                                                                                                                                    |
| -------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `debounceTime` | `Number`            | Time in milliseconds to debounce the search input. Default: `500`                                                                              |
| `children`     | `Function | ReactNode` | Optional. Custom content to display. Can be a function that receives the scope object, or a React element (defaults to an input field) |

## Usage

### With children as function (Recommended)

Use `children` as a function to access the search state and setter:

```jsx
<ReactList endpoint="users">
  <ReactListSearch>
    {({ search, setSearch }) => (
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
    )}
  </ReactListSearch>
  
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )}
  </ReactListItems>
</ReactList>
```

### With React children

You can also pass React elements as children, though using a function is recommended for better control:

```jsx
<ReactListSearch>
  <div className="search-container">
    <input type="text" placeholder="Search..." />
  </div>
</ReactListSearch>
```

### children callback Props

| Name        | Type       | Description                                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `search`    | `String`   | Current search query string (local state - updates immediately as you type)                   |
| `setSearch` | `Function` | Function to update the search string. The value is debounced before updating the list state. Pass the search value as the first argument (e.g., `setSearch('query')`) |

## Important Notes

### Local State vs List State

- **`search` in scope**: This is the **local state** that updates immediately as you type. It's synchronized with the list's search state, but may differ briefly during typing.
- **Debounced updates**: The `setSearch` function debounces the value before updating the list's search state, which triggers the API call.

### Debouncing

The debounce mechanism works as follows:
1. User types in the input
2. Local `search` state updates immediately (UI stays responsive)
3. After `debounceTime` milliseconds of no typing, the debounced value is sent to the list
4. List state updates and triggers a new API call

## Default behavior

If no `children` are provided, the component will render a default input field:

```jsx
<ReactListSearch />
// Renders: <input type="text" value={search} onChange={...} placeholder="Search..." />
```

## Example Usage

### Custom search input with icon

```jsx
<ReactList endpoint="products">
  <ReactListSearch debounceTime={300}>
    {({ search, setSearch }) => (
      <div className="search-input-wrapper">
        <Icon name="search" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="search-input"
        />
        {search && (
          <button onClick={() => setSearch('')}>
            <Icon name="clear" />
          </button>
        )}
      </div>
    )}
  </ReactListSearch>
  
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )}
  </ReactListItems>
</ReactList>
```

### Search with custom debounce time

```jsx
<ReactListSearch debounceTime={1000}>
  {({ search, setSearch }) => (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search (1 second delay)..."
    />
  )}
</ReactListSearch>
```

A longer debounce time (e.g., 1000ms) means the API call will wait longer after the user stops typing, reducing the number of requests but making the search feel less responsive.

### Advanced: Accessing actual list search state

If you need to access the actual list search state (not the local debounced state), you can use the list context directly:

```jsx
import { useListContext } from '@7span/react-list';

function CustomSearch() {
  const { listState } = useListContext();
  const { search: listSearch, setSearch } = listState;
  
  // listSearch is the actual search value used by the list
  // This updates only after debouncing
}
```
