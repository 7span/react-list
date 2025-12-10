# `<ReactListSummary>`

This component provides metadata about the current list view — great for showing things like:

> Showing 11–20 of 154 results

It gives you full control over rendering, so you can use it for any custom summary UI.

## Behavior

The component will return `null` (render nothing) in the following cases:
- During initial loading (`initialLoading` is `true`)
- When there are no items (`data.length === 0`)
- When there is an error

## Props

| Name      | Type                | Description                                                                     |
| --------- | ------------------- | ------------------------------------------------------------------------------- |
| `children` | `Function` | `ReactNode` Optional. Custom content to display. Can be a function that receives the scope object, or a React element |

## Usage

### With React children

Simply pass any React content as children to display the summary:

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListSummary>
    <span>Custom summary text</span>
  </ReactListSummary>
  
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

Use `children` as a function to access the summary data:

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListSummary>
    {({ from, to, visibleCount, count }) => (
      <div>
        Showing {visibleCount} items ({from} - {to}) out of {count}
      </div>
    )}
  </ReactListSummary>
  
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

| Name           | Type     | Description                                                                                    |
| -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| `from`         | `Number` | Starting index of the current page (calculated as `page * perPage - perPage + 1`)            |
| `to`           | `Number` | Ending index of the current page (calculated as `Math.min(page * perPage, count)`)           |
| `visibleCount` | `Number` | Number of items currently visible on the page (same as `data.length`)                         |
| `count`        | `Number` | Total number of items matching the current query (from API response)                         |

## Calculation Details

The summary values are calculated as follows:

- **`from`**: `page * perPage - perPage + 1`
  - Example: Page 2 with 10 per page = `2 * 10 - 10 + 1 = 11`
- **`to`**: `Math.min(page * perPage, count)`
  - Example: Page 2 with 10 per page and 25 total = `Math.min(20, 25) = 20`
- **`visibleCount`**: `data.length` (number of items in current page)
- **`count`**: Total count from API response

## Default behavior

If no `children` are provided, the component will render a default summary:

```jsx
<ReactListSummary />
// Renders: "Showing <visibleCount> items (<from> - <to>) out of <count>"
```

## Example Usage

```jsx
<ReactList endpoint="products" perPage={25}>
  <div className="list-header">
    <ReactListSummary>
      {({ from, to, count }) => (
        <span className="results-count">
          {count > 0 ? (
            <>Showing {from}-{to} of {count} products</>
          ) : (
            <>No products found</>
          )}
        </span>
      )}
    </ReactListSummary>
  </div>
  
  <ReactListItems>
    {({ items }) => (
      <div className="products-grid">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )}
  </ReactListItems>
</ReactList>
```
