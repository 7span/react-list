# `<ReactListEmpty>`

This component is your friendly fallback when there's nothing to see here. It automatically appears when the list has been fetched and the API returns an empty array — no items to show.

## Behavior

The component will return `null` (render nothing) in the following cases:
- When there are items (`items.length > 0`)
- During initial loading (`initialLoading` is `true`)
- During subsequent loading (`isLoading` is `true`)
- When there is an error

The component only renders when:
- The API call has completed successfully
- There are no items to display (`items.length === 0`)
- There are no errors

## Props

| Name      | Type       | Description                                                                     |
| --------- | ---------- | ------------------------------------------------------------------------------- |
| `children` | `ReactNode` | Optional. Custom content to display for the empty state                        |

## Usage

Render anything you'd like — text, icon, image, call to action — for the empty state:

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
  
  <ReactListEmpty>
    <div className="empty-state">
      <Icon name="inbox" />
      <h3>No users found</h3>
      <p>Try adjusting your filters or search.</p>
      <button>Clear Filters</button>
    </div>
  </ReactListEmpty>
</ReactList>
```

## Default behavior

If no `children` are provided, the component will render a default empty state message:

```jsx
<ReactListEmpty />
// Renders: <p>No data found!</p>
```

## Example Usage

### Custom empty state with illustration

```jsx
<ReactList endpoint="products">
  <ReactListItems>
    {({ items }) => (
      <div className="products-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListEmpty>
    <div className="empty-products">
      <img src="/empty-products.svg" alt="No products" />
      <h2>No products found</h2>
      <p>We couldn't find any products matching your criteria.</p>
      <div className="empty-actions">
        <button onClick={() => clearFilters()}>Clear Filters</button>
        <button onClick={() => refresh()}>Refresh</button>
      </div>
    </div>
  </ReactListEmpty>
</ReactList>
```

### Empty state with call to action

```jsx
<ReactList endpoint="posts">
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    )}
  </ReactListItems>
  
  <ReactListEmpty>
    <div className="empty-posts">
      <Icon name="file-text" size={64} />
      <h3>No posts yet</h3>
      <p>Get started by creating your first post!</p>
      <button onClick={() => navigate('/posts/new')}>
        Create Post
      </button>
    </div>
  </ReactListEmpty>
</ReactList>
```

### Conditional empty state based on search/filters

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
  
  <ReactListEmpty>
    {({ hasActiveFilters, search }) => (
      <div className="empty-state">
        {search || hasActiveFilters ? (
          <>
            <h3>No results found</h3>
            <p>Try adjusting your search or filters.</p>
            <button onClick={clearFilters}>Clear All</button>
          </>
        ) : (
          <>
            <h3>No users yet</h3>
            <p>Get started by adding your first user.</p>
          </>
        )}
      </div>
    )}
  </ReactListEmpty>
</ReactList>
```

**Note**: The example above shows accessing `hasActiveFilters` and `search` from the empty state, but the component doesn't actually provide these in its scope. You would need to access them from the list context if needed.
