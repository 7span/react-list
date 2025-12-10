# `<ReactListRefresh>`

This component is a simple button that lets users manually re-fetch the list data — with the same context as the previous request.

It's ideal for refreshing stale data, busting cache, or simply giving users a sense of control.

## Behavior

The component will return `null` (render nothing) during initial loading (`initialLoading` is `true`). Once the initial load is complete, the refresh button becomes available.

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `Function | ReactNode` | Optional. Custom content to display. Can be a function that receives the scope object, or a React element |

## Usage

### With children as function (Recommended)

Use `children` as a function to access the refresh function and loading state:

```jsx
<ReactList endpoint="users">
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListRefresh>
    {({ isLoading, refresh }) => (
      <button onClick={refresh} disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh'}
      </button>
    )}
  </ReactListRefresh>
</ReactList>
```

### With React children

You can also pass React elements as children, though using a function is recommended for better control:

```jsx
<ReactListRefresh>
  <button>Refresh</button>
</ReactListRefresh>
```

### children callback Props (when used as function)

| Name        | Type       | Description                                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `isLoading` | `Boolean`  | `true` while the refresh request is in progress, `false` otherwise                           |
| `refresh`   | `Function` | Function to trigger a refresh. Calls the list's refresh handler with `{ isRefresh: true }` context |

## Refresh Behavior

When `refresh()` is called:

1. For **pagination mode**: The current page is maintained, and the same page is re-fetched
2. For **loadMore mode**: The page is reset to 1, items are cleared, and fresh data is loaded

The refresh function passes `{ isRefresh: true }` as additional context to the request handler, which can be useful for:
- Bypassing cache
- Adding refresh-specific headers
- Logging refresh events

## Default behavior

If no `children` are provided, the component will render a default refresh button:

```jsx
<ReactListRefresh />
// Renders: <button onClick={refresh} disabled={isLoading}>
//            {isLoading ? 'Loading...' : 'Refresh'}
//          </button>
```

## Example Usage

### Custom refresh button with icon

```jsx
<ReactList endpoint="products">
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListRefresh>
    {({ isLoading, refresh }) => (
      <button 
        onClick={refresh} 
        disabled={isLoading}
        className="refresh-button"
      >
        <Icon 
          name="refresh" 
          className={isLoading ? 'spinning' : ''} 
        />
        <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
      </button>
    )}
  </ReactListRefresh>
</ReactList>
```

### Refresh with loading spinner

```jsx
<ReactListRefresh>
  {({ isLoading, refresh }) => (
    <div className="refresh-container">
      {isLoading && <Spinner size="small" />}
      <button 
        onClick={refresh} 
        disabled={isLoading}
        className={isLoading ? 'loading' : ''}
      >
        Refresh Data
      </button>
    </div>
  )}
</ReactListRefresh>
```

### Refresh button in header

```jsx
<div className="list-header">
  <h2>Users</h2>
  <ReactListRefresh>
    {({ isLoading, refresh }) => (
      <button 
        onClick={refresh} 
        disabled={isLoading}
        title="Refresh list"
      >
        <Icon name="refresh" />
      </button>
    )}
  </ReactListRefresh>
</div>
```

### Using refresh in request handler

You can use the `isRefresh` flag in your request handler to implement custom refresh logic:

```jsx
const requestHandler = async ({ endpoint, isRefresh, ...params }) => {
  // Add cache-busting headers when refreshing
  const headers = isRefresh 
    ? { 'Cache-Control': 'no-cache' }
    : {};
  
  const response = await fetch(`/api/${endpoint}`, {
    headers,
    // ... other params
  });
  
  return response.json();
};
```
