# `<ReactListPerPage>`

This component allows users to control how many items they see per page. It's fully customizable, so you can render a dropdown, buttons, or any other UI you like.

## Behavior

The component will return `null` (render nothing) in the following cases:
- During initial loading (`initialLoading` is `true`)
- When there are no items (`data.length === 0`)
- When there is an error

## Props

| Name      | Type       | Description                                                                                                                                    |
| --------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | `Array`    | List of available per-page values. Can be an array of numbers or objects with `{ value, label }`. Default: `[10, 25, 50, 100]`                |
| `children` | `Function` | Optional. A function that receives the scope object and returns a React element                                                               |

## Options Format

The `options` prop accepts two formats:

### Array of Numbers

```jsx
<ReactListPerPage options={[10, 20, 50, 100]} />
```

Each number will be used as both the value and label.

### Array of Objects

```jsx
<ReactListPerPage 
  options={[
    { value: 10, label: '10 per page' },
    { value: 25, label: '25 per page' },
    { value: 50, label: '50 per page' },
    { value: 100, label: '100 per page' }
  ]} 
/>
```

When using objects, you have full control over the display labels.

**Note**: The component automatically serializes number arrays to the object format internally, so the `options` in the children callback will always be in the `{ value, label }` format.

## Usage

### With React children

Simply pass any React content as children:

```jsx
<ReactList endpoint="users">
  <ReactListPerPage options={[10, 25, 50]}>
    <div>Custom per page UI</div>
  </ReactListPerPage>
  
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

Use `children` as a function to access per-page data and functions:

```jsx
<ReactList endpoint="users">
  <ReactListPerPage options={[10, 25, 50, 100]}>
    {({ perPage, setPerPage, options }) => (
      <div className="per-page-selector">
        <label>Items per page:</label>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )}
  </ReactListPerPage>
  
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
| `perPage`    | `Number`   | The currently selected perPage value                                                          |
| `setPerPage` | `Function` | Function to update the number of items per page. Pass the value as the first argument (e.g., `setPerPage(50)`) |
| `options`    | `Array`    | The array of available options, serialized to `{ value, label }` format                       |

**Note**: The `options` in the callback are always in the serialized format `{ value, label }`, even if you passed a simple number array as the prop.

## Default behavior

If no `children` are provided, the component will render a default select dropdown:

```jsx
<ReactListPerPage />
// Renders: <select> with options like "10 items per page", "25 items per page", etc.
```

## Example Usage

### Custom button group

```jsx
<ReactList endpoint="products" perPage={25}>
  <ReactListPerPage options={[10, 25, 50, 100]}>
    {({ perPage, setPerPage, options }) => (
      <div className="per-page-buttons">
        <span>Show:</span>
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => setPerPage(option.value)}
            className={perPage === option.value ? 'active' : ''}
          >
            {option.label}
          </button>
        ))}
      </div>
    )}
  </ReactListPerPage>
  
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

### Custom dropdown with icons

```jsx
<ReactListPerPage 
  options={[
    { value: 10, label: '10 items' },
    { value: 25, label: '25 items' },
    { value: 50, label: '50 items' },
    { value: 100, label: '100 items' }
  ]}
>
  {({ perPage, setPerPage, options }) => (
    <div className="custom-per-page">
      <Icon name="list" />
      <select
        value={perPage}
        onChange={(e) => setPerPage(Number(e.target.value))}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )}
</ReactListPerPage>
```
