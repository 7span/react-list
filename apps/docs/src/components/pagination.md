# `<ReactListPagination>`

This component gives you full control over rendering pagination. You get all the computed state and helper functions needed to build a custom pagination layout from scratch.

::: warning Heads up!
This component will only work when the `paginationMode` prop is set to `pagination` on the root `<ReactList>` component.
:::

## Behavior

The component will return `null` (render nothing) in the following cases:
- During initial loading (`initialLoading` is `true`)
- When there are no items (`data.length === 0`)
- When there is an error

## Props

| Name        | Type       | Description                                                                                                                        |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `pageLinks` | `Number`   | Defines how many pagination buttons should be visible at once. The current (active) page is centered when possible. Default: `5`   |
| `children`  | `Function` | Optional. A function that receives the pagination scope object                                                                     |
| `renderFirst` | `Function` | Optional. Custom render function for the first page button                                                                        |
| `renderPrev`  | `Function` | Optional. Custom render function for the previous page button                                                                        |
| `renderPages` | `Function` | Optional. Custom render function for the page numbers container                                                                     |
| `renderPage`  | `Function` | Optional. Custom render function for each page number button                                                                        |
| `renderNext`  | `Function` | Optional. Custom render function for the next page button                                                                           |
| `renderLast`  | `Function` | Optional. Custom render function for the last page button                                                                           |

## Using `children` as function

The recommended way to use this component is with `children` as a function. This gives you access to all pagination state and navigation functions.

```jsx
<ReactListPagination pageLinks={5}>
  {({
    page,
    perPage,
    count,
    pagesCount,
    pagesToDisplay,
    hasNext,
    hasPrev,
    prev,
    next,
    first,
    last,
    setPage,
  }) => (
    <div className="pagination">
      <button onClick={first} disabled={!hasPrev}>
        First
      </button>
      <button onClick={prev} disabled={!hasPrev}>
        Previous
      </button>
      
      {pagesToDisplay.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => setPage(pageNum)}
          className={pageNum === page ? 'active' : ''}
        >
          {pageNum}
        </button>
      ))}
      
      <button onClick={next} disabled={!hasNext}>
        Next
      </button>
      <button onClick={last} disabled={!hasNext}>
        Last
      </button>
    </div>
  )}
</ReactListPagination>
```

### children callback Props

| Name             | Type       | Description                                                                     |
| ---------------- | ---------- | ------------------------------------------------------------------------------- |
| `page`           | `Number`   | The current active page number                                                 |
| `perPage`        | `Number`   | Items per page                                                                 |
| `count`          | `Number`   | Total number of items returned by the API                                      |
| `pagesCount`     | `Number`   | Total number of pages (calculated as `Math.ceil(count / perPage)`)             |
| `pagesToDisplay` | `Array`    | Array of visible page numbers (based on `pageLinks` prop)                     |
| `halfWay`        | `Number`   | Half of the `pageLinks` count (used for centering logic)                      |
| `hasNext`        | `Boolean`  | Is there a next page? (`page * perPage < count`)                              |
| `hasPrev`        | `Boolean`  | Is there a previous page? (`page !== 1`)                                      |
| `prev`           | `Function` | Function to navigate to the previous page (calls `setPage(page - 1)`)         |
| `next`           | `Function` | Function to navigate to the next page (calls `setPage(page + 1)`)             |
| `first`          | `Function` | Function to navigate to the first page (calls `setPage(1)`)                    |
| `last`           | `Function` | Function to navigate to the last page (calls `setPage(pagesCount)`)           |
| `setPage`        | `Function` | Function to navigate to a specific page. Pass the page number as an argument   |

## Using render props

Alternatively, you can use individual render props for each part of the pagination UI. Each render function receives the full scope object.

```jsx
<ReactListPagination
  pageLinks={5}
  renderFirst={(scope) => (
    <button onClick={scope.first} disabled={!scope.hasPrev}>
      First
    </button>
  )}
  renderPrev={(scope) => (
    <button onClick={scope.prev} disabled={!scope.hasPrev}>
      Previous
    </button>
  )}
  renderPages={(scope) => (
    <div>
      {scope.pagesToDisplay.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => scope.setPage(pageNum)}
          className={pageNum === scope.page ? 'active' : ''}
        >
          {pageNum}
        </button>
      ))}
    </div>
  )}
  renderPage={(scope) => (
    <button
      onClick={() => scope.setPage(scope.page)}
      className={scope.isActive ? 'active' : ''}
    >
      {scope.page}
    </button>
  )}
  renderNext={(scope) => (
    <button onClick={scope.next} disabled={!scope.hasNext}>
      Next
    </button>
  )}
  renderLast={(scope) => (
    <button onClick={scope.last} disabled={!scope.hasNext}>
      Last
    </button>
  )}
/>
```

### renderPage callback Props

When using `renderPage`, the scope includes an additional `isActive` property:

| Name       | Type      | Description                           |
| ---------- | --------- | ------------------------------------- |
| `page`     | `Number`  | The page number                       |
| `isActive` | `Boolean` | Whether this page is the current page |

## Default behavior

If no `children` or render props are provided, the component will render default pagination buttons:

```jsx
<ReactListPagination />
// Renders default First, Prev, page numbers, Next, Last buttons
```
