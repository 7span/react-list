# `<ReactListGoTo>`

This component provides an easy way for users to jump directly to a specific page using a dropdown (or any custom UI you build).

```jsx
<ReactList>
  <ReactListGoTo>
    <!-- Render your content here -->
  </ReactListGoTo>
</ReactList>
```

## children

### `children`

#### children callback Props

| Name         | Description                                                                              |
| ------------ | ---------------------------------------------------------------------------------------- |
| `setPage`    | `Function` <br/> Function to update the current page. Takes the page number as argument. |
| `page`       | `Number` <br/> The currently active page number.                                         |
| `pages`      | `Array` <br/> Array of available page numbers (e.g., [1, 2, 3, ...]).                    |
| `pagesCount` | `Number` <br/> Total number of available pages.                                          |
