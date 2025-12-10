# `<ReactListLoadMore>`

A headless component designed for "Load More" style pagination.
It gives you full control over how the button (or UI) looks while handling the logic for fetching additional items when needed.

```jsx
<ReactList>
  <ReactListLoadMore>
    {({ loadMore, isLoading, hasMoreItems }) => (
      <button onClick={loadMore}>Load More</button>
    )}
  </ReactListLoadMore>
</ReactList>
```

::: warning Heads up!
This component will only work when the `paginationMode` prop is set to `loadMore` on the root `<ReactList>` component.
:::

## children

### `children`

A headless component designed for "Load More" style pagination.
It gives you full control over how the button (or UI) looks while handling the logic for fetching additional items when needed.

#### children callback Props

| Name           | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `isLoading`    | `Boolean` <br/> `true` while the next set of items is being fetched |
| `loadMore`     | `Function` <br/> Call this function to load the next page of items. |
| `hasMoreItems` | `Boolean` <br/> `true` if there are more items to load              |
