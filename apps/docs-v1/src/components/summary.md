# `<ReactListSummary>`

This component provides metadata about the current list view, useful for showing information like:

## Basic Usage

```jsx
import { ReactList, ReactListSummary } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div>
          <ReactListSummary>
            {({ visibleCount, count, from, to }) => (
              <span>
                Showing {from}-{to} of {count} results
              </span>
            )}
          </ReactListSummary>

          <ul>
            {items.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </div>
      )}
    </ReactList>
  );
}
```

## Props

| Prop     | Type     | Description                            |
| -------- | -------- | -------------------------------------- |
| children | Function | Render prop that receives summary data |

## Render Props

| Name         | Type   | Description                        |
| ------------ | ------ | ---------------------------------- |
| visibleCount | Number | Items currently visible on page    |
| count        | Number | Total items matching current query |
| from         | Number | Starting index of current page     |
| to           | Number | Ending index of current page       |
