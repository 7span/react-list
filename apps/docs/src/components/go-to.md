# `<ReactListGoTo>`

This component provides an easy way for users to jump directly to a specific page using a dropdown (or any custom UI you build).

## Behavior

The component will return `null` (render nothing) in the following cases:
- During initial loading (`initialLoading` is `true`)
- When there are no items (`data.length === 0`)
- When there is an error

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `Function` | Optional. Custom content to display. Can be a function that receives the scope object, or a React element |

## Usage

### With React children

Simply pass any React content as children:

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListGoTo>
    <div>Custom go to page UI</div>
  </ReactListGoTo>
  
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

Use `children` as a function to access page navigation data and functions:

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListGoTo>
    {({ setPage, page, pages, pagesCount }) => (
      <div className="go-to-page">
        <label>Go to page:</label>
        <input
          type="number"
          min={1}
          max={pagesCount}
          value={page}
          onChange={(e) => {
            const pageNum = Number(e.target.value);
            if (pageNum >= 1 && pageNum <= pagesCount) {
              setPage(pageNum);
            }
          }}
        />
        <span>of {pagesCount}</span>
      </div>
    )}
  </ReactListGoTo>
  
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

### children callback Props

| Name         | Type       | Description                                                                                    |
| ------------ | ---------- | ---------------------------------------------------------------------------------------------- |
| `setPage`    | `Function` | Function to update the current page. Takes the page number as argument (e.g., `setPage(5)`)  |
| `page`       | `Number`   | The currently active page number                                                              |
| `pages`      | `Array`    | Array of all available page numbers (e.g., `[1, 2, 3, 4, 5]` for 5 pages)                     |
| `pagesCount` | `Number`   | Total number of available pages (calculated as `Math.ceil(count / perPage)`)                  |

## Default behavior

If no `children` are provided, the component will render a default select dropdown:

```jsx
<ReactListGoTo />
// Renders: <select> with options for each page
```

The default select will have options like:
- Page 1
- Page 2
- Page 3
- etc.

## Example Usage

### Input field with validation

```jsx
<ReactList endpoint="products" perPage={25}>
  <div className="pagination-controls">
    <ReactListGoTo>
      {({ setPage, page, pagesCount }) => (
        <div className="go-to-input">
          <label htmlFor="page-input">Go to:</label>
          <input
            id="page-input"
            type="number"
            min={1}
            max={pagesCount}
            value={page}
            onChange={(e) => {
              const pageNum = Number(e.target.value);
              if (pageNum >= 1 && pageNum <= pagesCount) {
                setPage(pageNum);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const pageNum = Number(e.target.value);
                if (pageNum >= 1 && pageNum <= pagesCount) {
                  setPage(pageNum);
                }
              }
            }}
          />
          <span>of {pagesCount}</span>
        </div>
      )}
    </ReactListGoTo>
  </div>
  
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

### Custom dropdown

```jsx
<ReactListGoTo>
  {({ setPage, page, pages, pagesCount }) => (
    <div className="custom-dropdown">
      <select
        value={page}
        onChange={(e) => setPage(Number(e.target.value))}
      >
        {pages.map((pageNum) => (
          <option key={pageNum} value={pageNum}>
            Page {pageNum}
          </option>
        ))}
      </select>
      <span>of {pagesCount} pages</span>
    </div>
  )}
</ReactListGoTo>
```
