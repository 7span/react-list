# `<ReactListItems>`

This is a wrapper component to render the list of items returned by `<ReactList>`.

## children

You can use `children` callback based on your needs.

### `children`

This exposes the entire items array. You handle the looping yourself.

```jsx
<ReactList
  endpoint="users"
  perPage={10}
  paginationMode="pagination"
  // other props
>
  <ReactListItems>
    {({ items }) => (
      <div>
        {items.map((item) => (
          <pre key={item.id}>{item}</pre>
        ))}
      </div>
    )}
  </ReactListItems>
</ReactList>
```

#### children callback Props

| Name    | Description                                                                                 |
| ------- | ------------------------------------------------------------------------------------------- |
| `item`  | `Object` <br/> An individual item from the set of items returned by API                     |
| `index` | `Number` <br/> The index of the item. It will always start from the `0` for any of the page |
