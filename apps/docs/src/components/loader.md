# `<ReactListLoader>`

This component will be displayed for subsequent loading states, such as:

- Changing pages
- Applying filters
- Changing sort or search
- Refreshing data

It should render on top of existing list data, so you can show an overlay loader, spinner, or subtle loader indicator. You can position the loader in different locations using CSS:

- Before the list starts
- At the end of the list
- As an overlay on top of the list by absolute positioning

## Behavior

The component will return `null` (render nothing) when:
- `initialLoading` is `true` (use `<ReactListInitialLoader>` for initial loads)
- `isLoading` is `false`

This component is specifically for subsequent loading states, not the initial load.

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `Function` | Optional. Custom content to display during loading. Can be a function that receives the scope object, or a React element |

## Usage

### With React children

Simply pass any React content as children to display during loading:

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
  
  <ReactListLoader>
    <div className="loader-overlay">
      <div className="spinner">Loading...</div>
    </div>
  </ReactListLoader>
</ReactList>
```

### With children as function

You can also use `children` as a function to access the loading state:

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
  
  <ReactListLoader>
    {({ isLoading }) => (
      isLoading && (
        <div className="loader-overlay">
          <Spinner />
          <p>Updating list...</p>
        </div>
      )
    )}
  </ReactListLoader>
</ReactList>
```

### children callback Props (when used as function)

| Name        | Type      | Description                                                      |
| ----------- | --------- | ---------------------------------------------------------------- |
| `isLoading` | `Boolean` | `true` during subsequent loading, `false` when not loading      |

## Default behavior

If no `children` are provided, the component will render a default loading message:

```jsx
<ReactListLoader />
// Renders: <p>Loading...</p>
```

## Example: Overlay Loader

```jsx
<ReactList endpoint="posts" perPage={10}>
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
  
  <ReactListLoader>
    {({ isLoading }) => (
      isLoading && (
        <div 
          className="loader-overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div className="spinner">
            <SpinnerIcon />
            <p>Loading...</p>
          </div>
        </div>
      )
    )}
  </ReactListLoader>
</ReactList>
```

## Difference from ReactListInitialLoader

- **`<ReactListInitialLoader>`**: Shows during the very first load, before any data is fetched
- **`<ReactListLoader>`**: Shows during subsequent loads (page changes, filter changes, etc.) when data already exists
