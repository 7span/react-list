# `<ReactListPagination>`

This component gives you full control over rendering pagination. You get all the computed state and helper functions needed to build a custom pagination layout from scratch.

```jsx
<ReactListPagination pageLinks={5}>
  {{
    first: () => null,
    prev: () => null,
    page: () => null,
    next: () => null,
    last: () => null,
  }}
</ReactListPagination>
```

::: warning Heads up!
This component will only work when the `paginationMode` prop is set to `pagination` on the root `<ReactList>` component.
:::

## Props

| Name        | Description                                                                                                                        |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `pageLinks` | `Number` <br/> Defines how many pagination buttons should be visible at once. The current (active) page is centered when possible. |

## Slots

Following children callback are available:

### `children`

Use this to render the entire pagination manually. The children callback exposes a set of scoped variables that let you access and render the list state however you like.

```jsx
<ReactListPagination>
  {{
    children: ({
      page,
      perPage,
      count,
      //   other props
    }) => <>{/* Render your pagination UI here */}</>,
  }}
</ReactListPagination>
```

<a id="pagination_children_callback_props"></a>

#### children callback Props

| Name             | Description                                                                     |
| ---------------- | ------------------------------------------------------------------------------- |
| `page`           | `Number` <br/> The current active page number                                   |
| `perPage`        | `Number` <br/> Items per page                                                   |
| `count`          | `Number` <br/> Total number of items returned by the API                        |
| `pagesCount`     | `Number` <br/> Total number of pages                                            |
| `pagesToDisplay` | `Array` <br/> Array of visible page numbers (based on pageLinks prop)           |
| `halfWay`        | `Number` <br/> Half of the pageLinks count (used for centering logic)           |
| `hasNext`        | `Boolean` <br/> Is there a next page?                                           |
| `hasPrev`        | `Boolean` <br/> Is there a previous page?                                       |
| `prev`           | `Function` <br/> Go to previous page                                            |
| `next`           | `Function` <br/> Go to next page                                                |
| `first`          | `Function` <br/> Go to first page                                               |
| `last`           | `Function` <br/> Go to last page                                                |
| `setPage`        | `Function` <br/> Navigate to specific page. Pass the page number as an argument |

### `first`

Button for navigating to the first page.

### `prev`

Button for navigating to the previous page.

### `pages`

Render visible page numbers.

### `page`

Button for each visible page number.

Additionally, following helper children callback props are available:

### Helper children callback Props

| Name       | Description                           |
| ---------- | ------------------------------------- |
| `page`     | `Number` <br/> The page number        |
| `isActive` | `Boolean` <br/> If the page is active |

### `next`

Button for navigating to the next page.

### `last`

Button for navigating to the last page.
