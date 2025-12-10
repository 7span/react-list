# `<ReactListAttributes>`

This component provides a way to manage and display attribute visibility settings for list items. It allows users to show or hide specific attributes/columns in the list view.

## Behavior

This component does not check for loading or error states. It will render regardless of the list's loading state, making it suitable for use in settings panels or configuration areas.

## Props

| Name            | Type       | Description                                                                                                                                    |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `renderAttribute` | `Function` | Optional. A function that receives attribute data and returns a React element for each attribute. Allows full control over attribute rendering |
| `children`      | `Function` `ReactNode` | Optional. Custom content to display. Can be a function that receives the scope object, or a React element |

## Usage

### With children as function (Recommended)

Use `children` as a function to access attributes and settings:

```jsx
<ReactList endpoint="users">
  <ReactListAttributes>
    {({ attrs, attrSettings, updateAttr }) => (
      <div className="attribute-settings">
        <h3>Visible Columns</h3>
        {attrs.map((attr) => (
          <label key={attr.name}>
            <input
              type="checkbox"
              checked={attrSettings?.[attr.name]?.visible ?? false}
              onChange={(e) => updateAttr(attr.name, 'visible', e.target.checked)}
            />
            {attr.label || attr.name}
          </label>
        ))}
      </div>
    )}
  </ReactListAttributes>
  
  <ReactListItems>
    {({ items }) => (
      <table>
        <thead>
          <tr>
            {attrs.filter(attr => attrSettings?.[attr.name]?.visible !== false).map(attr => (
              <th key={attr.name}>{attr.label || attr.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {attrs.filter(attr => attrSettings?.[attr.name]?.visible !== false).map(attr => (
                <td key={attr.name}>{item[attr.name]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </ReactListItems>
</ReactList>
```

### With renderAttribute prop

Use the `renderAttribute` prop to customize how each attribute is rendered:

```jsx
<ReactListAttributes
  renderAttribute={({ key, attr, updateAttr, attrSettings }) => (
    <div key={key} className="attribute-item">
      <label>
        <input
          type="checkbox"
          checked={attrSettings?.[attr.name]?.visible ?? false}
          onChange={(e) => updateAttr(attr.name, 'visible', e.target.checked)}
        />
        <span>{attr.label || attr.name}</span>
      </label>
    </div>
  )}
/>
```

### renderAttribute Parameters

| Name          | Type       | Description                                                                                    |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `key`         | `String`   | A unique key for the attribute (format: `attr-${index}`)                                      |
| `attr`        | `Object`   | The attribute object with `name` and optionally `label` properties                            |
| `updateAttr`  | `Function` | Function to update attribute settings. Call with `(attrName, settingKey, value)`             |
| `attrSettings` | `Object`   | Current attribute settings object, keyed by attribute name                                    |

### children callback Props (when used as function)

| Name          | Type       | Description                                                                                    |
| ------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `attrs`       | `Array`    | Array of attribute objects. Each attribute has `name` and optionally `label` properties       |
| `attrSettings` | `Object`   | Current attribute settings object, keyed by attribute name. Each setting can have properties like `visible` |
| `updateAttr`  | `Function` | Function to update attribute settings. Call with `(attrName, settingKey, value)`             |

## Default behavior

If no `children` or `renderAttribute` are provided, the component will render default checkboxes for each attribute:

```jsx
<ReactListAttributes />
// Renders: <label> for each attribute with a checkbox
```

The default rendering shows:
- Attribute label (or name if no label)
- Checkbox to toggle visibility
- Checked state based on `attrSettings[attr.name].visible`

## Example Usage

### Attribute visibility toggle panel

```jsx
<ReactList endpoint="products">
  <div className="list-controls">
    <ReactListAttributes>
      {({ attrs, attrSettings, updateAttr }) => (
        <div className="column-selector">
          <h4>Select Columns</h4>
          <div className="attribute-list">
            {attrs.map((attr) => (
              <label key={attr.name} className="attribute-checkbox">
                <input
                  type="checkbox"
                  checked={attrSettings?.[attr.name]?.visible ?? true}
                  onChange={(e) => updateAttr(attr.name, 'visible', e.target.checked)}
                />
                <span>{attr.label || attr.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </ReactListAttributes>
  </div>
  
  <ReactListItems>
    {({ items, attrs }) => (
      <table>
        <thead>
          <tr>
            {attrs
              .filter(attr => attrSettings?.[attr.name]?.visible !== false)
              .map(attr => (
                <th key={attr.name}>{attr.label || attr.name}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {attrs
                .filter(attr => attrSettings?.[attr.name]?.visible !== false)
                .map(attr => (
                  <td key={attr.name}>{item[attr.name]}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </ReactListItems>
</ReactList>
```

### Custom attribute renderer with icons

```jsx
<ReactListAttributes
  renderAttribute={({ key, attr, updateAttr, attrSettings }) => (
    <div key={key} className="custom-attribute-item">
      <Icon name="column" />
      <label>
        <input
          type="checkbox"
          checked={attrSettings?.[attr.name]?.visible ?? true}
          onChange={(e) => updateAttr(attr.name, 'visible', e.target.checked)}
        />
        <span className="attribute-label">{attr.label || attr.name}</span>
      </label>
    </div>
  )}
/>
```

### Attribute settings with drag and drop

```jsx
<ReactListAttributes>
  {({ attrs, attrSettings, updateAttr }) => (
    <div className="attribute-manager">
      <h3>Manage Columns</h3>
      <SortableList>
        {attrs.map((attr, index) => (
          <SortableItem key={attr.name} index={index}>
            <div className="attribute-row">
              <Icon name="drag-handle" />
              <label>
                <input
                  type="checkbox"
                  checked={attrSettings?.[attr.name]?.visible ?? true}
                  onChange={(e) => updateAttr(attr.name, 'visible', e.target.checked)}
                />
                {attr.label || attr.name}
              </label>
            </div>
          </SortableItem>
        ))}
      </SortableList>
    </div>
  )}
</ReactListAttributes>
```

## Notes

- The `attrs` array comes from the `attrs` prop passed to `<ReactList>` or is automatically generated from the first item's keys
- Attribute settings are persisted in the state manager (if configured)
- The `updateAttr` function signature is: `updateAttr(attrName, settingKey, value)`
- Currently, the main setting key is `'visible'`, but the API supports other settings for future extensibility

