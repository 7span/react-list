# `<ReactListError>`

This component handles errors gracefully by displaying UI when the list's API call fails. It only appears after the request completes with an error and no retry is in progress.

## Behavior

The component will return `null` (render nothing) in the following cases:
- When there is no error (`error` is `null` or `undefined`)
- During loading (`isLoading` is `true`)

The component only renders when:
- An error has occurred (`error` is not null)
- The request is not currently loading

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `Function` `ReactNode` | Optional. Custom content to display. Can be a function that receives the error object, or a React element |

## Usage

### With children as function (Recommended)

Use `children` as a function to access the error object:

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
  
  <ReactListError>
    {({ error }) => (
      <div className="error-state">
        <h3>Something went wrong</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )}
  </ReactListError>
</ReactList>
```

### With React children

You can also pass React elements as children:

```jsx
<ReactListError>
  <div className="error-message">
    <h3>Error occurred</h3>
    <p>Please try again later.</p>
  </div>
</ReactListError>
```

### children callback Props (when used as function)

| Name    | Type    | Description                                                                                    |
| ------- | ------- | ---------------------------------------------------------------------------------------------- |
| `error` | `Error` | The actual error object from the failed request. Contains `name` and `message` properties      |

## Error Object

The error provided in the callback is the exact Error instance thrown by your `requestHandler` function.

In ReactList, your `requestHandler` function is expected to return a Promise. If that promise is rejected, ReactList catches the failure and passes the error object down to `<ReactListError>`.

This means you have full control over what gets thrown — whether it's a native Error, a custom error class, or an API error with additional info.

### Error Properties

The error object typically has:
- **`name`**: The error name (e.g., "Error", "TypeError", "NetworkError")
- **`message`**: The error message describing what went wrong

You can also throw custom error objects with additional properties:

```jsx
// In your requestHandler
if (!response.ok) {
  const error = new Error(`API request failed with status ${response.status}`);
  error.status = response.status;
  error.statusText = response.statusText;
  throw error;
}
```

Then access these in the error component:

```jsx
<ReactListError>
  {({ error }) => (
    <div>
      <p>{error.message}</p>
      {error.status && <p>Status: {error.status}</p>}
    </div>
  )}
</ReactListError>
```

## Default behavior

If no `children` are provided, the component will render a default error display:

```jsx
<ReactListError />
// Renders:
// <div>
//   <h3>Error occurred</h3>
//   <pre>{error.name}: {error.message}</pre>
// </div>
```

## Example Usage

### Custom error UI with retry

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
  
  <ReactListError>
    {({ error }) => (
      <div className="error-container">
        <Icon name="alert-circle" size={48} />
        <h2>Oops! Something went wrong</h2>
        <p className="error-message">{error.message}</p>
        <div className="error-details">
          <code>{error.name}</code>
        </div>
        <div className="error-actions">
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
          <button onClick={() => refresh()}>
            Try Again
          </button>
        </div>
      </div>
    )}
  </ReactListError>
</ReactList>
```

### Error with status code handling

```jsx
<ReactListError>
  {({ error }) => {
    const statusCode = error.status || error.statusCode;
    
    if (statusCode === 404) {
      return (
        <div className="error-404">
          <h2>Not Found</h2>
          <p>The requested resource could not be found.</p>
        </div>
      );
    }
    
    if (statusCode === 500) {
      return (
        <div className="error-500">
          <h2>Server Error</h2>
          <p>Something went wrong on our end. Please try again later.</p>
        </div>
      );
    }
    
    return (
      <div className="error-generic">
        <h2>Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }}
</ReactListError>
```

### Network error handling

```jsx
<ReactListError>
  {({ error }) => {
    if (error.message.includes('network') || error.message.includes('fetch')) {
      return (
        <div className="network-error">
          <Icon name="wifi-off" />
          <h3>Network Error</h3>
          <p>Please check your internet connection and try again.</p>
        </div>
      );
    }
    
    return (
      <div className="error">
        <p>{error.message}</p>
      </div>
    );
  }}
</ReactListError>
```
