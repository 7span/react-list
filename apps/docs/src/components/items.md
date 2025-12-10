# `<ReactListItems>`

This is a wrapper component to render the list of items returned by `<ReactList>`. It provides multiple ways to render your items and handles the looping logic for you.

## Behavior

The component will return `null` (render nothing) in the following cases:
- During initial loading (`initialLoading` is `true`)
- When there are no items (`items.length === 0`)
- When there is an error

## Props

| Name        | Type       | Description                                                                                    |
| ----------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `renderItem` | `Function` | Optional. A function that receives `{ item, index }` and returns a React element for each item |
| `children`    | `Function` | Optional. A function that receives the scope object with `{ items, setSort, sort }`            |

## Rendering Options

### Using `renderItem` prop

The `renderItem` prop is a function that gets called for each item in the list. It receives the item and its index.

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListItems
    renderItem={({ item, index }) => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <p>Index: {index}</p>
      </div>
    )}
  />
</ReactList>
```

#### renderItem Parameters

| Name    | Type     | Description                                                                                 |
| ------- | -------- | ------------------------------------------------------------------------------------------- |
| `item`  | `Object` | An individual item from the set of items returned by the API                               |
| `index` | `Number` | The index of the item. It will always start from `0` for any page                          |

### Using `children` as function

When using `children` as a function, you get access to the entire items array and can handle the looping yourself. This gives you more control over the rendering.

```jsx
<ReactList endpoint="users" perPage={10}>
  <ReactListItems>
    {({ items, setSort, sort }) => (
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.email}</p>
          </div>
        ))}
      </div>
    )}
  </ReactListItems>
</ReactList>
```

#### children callback Props

| Name      | Type       | Description                                                                                    |
| --------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `items`   | `Array`    | The array of items returned by the API                                                         |
| `setSort` | `Function` | Function to update sorting. Call with `{ by: 'fieldName', order: 'asc' | 'desc' }`            |
| `sort`    | `Object`   | Current sort state with `{ sortBy: string, sortOrder: 'asc' | 'desc' }`                        |

### Default behavior

If neither `renderItem` nor `children` are provided, the component will render each item as a formatted JSON string inside a `<pre>` tag.

```jsx
<ReactListItems />
// Renders: <pre>{JSON.stringify(item, null, 2)}</pre> for each item
```
