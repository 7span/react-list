# `<ReactListRefresh>`

This component is a simple button that lets users manually re-fetch the list data — with the same context as the previous request.

It's ideal for refreshing stale data, busting cache, or simply giving users a sense of control like:

> Yes, we tried again. The data is still broken. But at least we tried. 😅

```jsx
<ReactList>
  <ReactListRefresh>
    {({ isLoading, refresh }) => (
      <button onClick={refresh} disabled={isLoading}>
        Refresh
      </button>
    )}
  </ReactListRefresh>
</ReactList>
```

In ReactList, your `requestHandler` function is expected to return a Promise. If that promise is rejected, ReactList catches the failure and passes the error object down to `<ReactListError>`.

This means you have full control over what gets thrown — whether it's a native Error, a custom error class, or an API error with additional info.
