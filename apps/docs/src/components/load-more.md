# `<ReactListLoadMore>`

A headless component designed for "Load More" style pagination. It gives you full control over how the button (or UI) looks while handling the logic for fetching additional items when needed.

::: warning Heads up!
This component will only work when the `paginationMode` prop is set to `loadMore` on the root `<ReactList>` component.
:::

## Behavior

The component will return `null` (render nothing) in the following cases:
- When there are no items (`data.length === 0`)
- When there is an error

Note: The component does not check for `initialLoading` state, so it may render during initial load if there are items.

## Props

| Name      | Type       | Description                                                          |
| --------- | ---------- | -------------------------------------------------------------------- |
| `children` | `Function` | **Required.** A function that receives the load more scope object    |

## children

The `children` prop is required and must be a function. It receives a scope object with loading state, load more function, and availability status.

```jsx
<ReactList paginationMode="loadMore" endpoint="users">
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListLoadMore>
    {({ loadMore, isLoading, hasMoreItems }) => (
      <button 
        onClick={loadMore} 
        disabled={isLoading || !hasMoreItems}
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    )}
  </ReactListLoadMore>
</ReactList>
```

### children callback Props

| Name           | Type      | Description                                                                                    |
| -------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `isLoading`    | `Boolean` | `true` while the next set of items is being fetched                                           |
| `loadMore`     | `Function` | Call this function to load the next page of items. It automatically increments the page and fetches more data |
| `hasMoreItems` | `Boolean` | `true` if there are more items to load (calculated as `page * perPage < count`)              |

## Example Usage

```jsx
<ReactList paginationMode="loadMore" endpoint="posts" perPage={20}>
  <ReactListItems>
    {({ items }) => (
      <div className="posts-list">
        {items.map((post) => (
          <article key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListLoadMore>
    {({ loadMore, isLoading, hasMoreItems }) => {
      if (!hasMoreItems) {
        return <p>No more items to load</p>;
      }
      
      return (
        <div className="load-more-container">
          <button 
            onClick={loadMore} 
            disabled={isLoading}
            className="load-more-button"
          >
            {isLoading ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              'Load More Posts'
            )}
          </button>
        </div>
      );
    }}
  </ReactListLoadMore>
</ReactList>
```
