# `<ReactListInitialLoader>`

This component is for the very first load — when the list has not yet received any data. This is useful to show a skeleton loader or shimmer when the user first visits the page.

## Behavior

The component will return `null` (render nothing) when `initialLoading` is `false`. It only renders during the initial data fetch, before any items have been loaded.

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `ReactNode` | Optional. Custom content to display during initial loading. Can be a function that receives the scope object, or a React element |

## Usage

### With React children

Simply pass any React content as children to display during the initial load:

```jsx
<ReactList endpoint="users">
  <ReactListInitialLoader>
    <div className="skeleton-loader">
      <div className="skeleton-header"></div>
      <div className="skeleton-body">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton-row"></div>
        ))}
      </div>
    </div>
  </ReactListInitialLoader>
  
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

### With children as function

You can also use `children` as a function to access the loading state:

```jsx
<ReactList endpoint="users">
  <ReactListInitialLoader>
    {({ loading }) => (
      <div className="initial-loader">
        {loading && (
          <div className="spinner">
            <p>Loading initial data...</p>
          </div>
        )}
      </div>
    )}
  </ReactListInitialLoader>
  
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

### children callback Props (when used as function)

| Name      | Type      | Description                                                      |
| --------- | --------- | ---------------------------------------------------------------- |
| `loading` | `Boolean` | `true` during initial loading, `false` once data has been loaded |

## Default behavior

If no `children` are provided, the component will render a default loading message:

```jsx
<ReactListInitialLoader />
// Renders: <p>Initial Loading...</p>
```

## Example: Skeleton Loader

```jsx
<ReactList endpoint="posts" perPage={10}>
  <ReactListInitialLoader>
    <div className="skeleton-container">
      <div className="skeleton-table">
        <div className="skeleton-header">
          <div className="skeleton-cell header"></div>
          <div className="skeleton-cell header"></div>
          <div className="skeleton-cell header"></div>
        </div>
        <div className="skeleton-body">
          {[...Array(5)].map((_, index) => (
            <div className="skeleton-row" key={index}>
              <div className="skeleton-cell"></div>
              <div className="skeleton-cell"></div>
              <div className="skeleton-cell"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ReactListInitialLoader>
  
  <ReactListItems>
    {({ items }) => (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </ReactListItems>
</ReactList>
```
