# `<ReactListLoader>`

This component will be displayed for subsequent loading states, such as:

- Changing pages
- Applying filters
- Changing sort or search

It should render on top of existing list data, so you can show an overlay loader, spinner, or subtle loader indicator.
You can position the loader in different locations:

- Before the list starts
- At the end of the list
- As an overlay on top of the list by absolute positioning

The `isLoading` prop provided by `ReactList` can be used to create an overlay loader that appears above the `ReactListItems` component while content is loading.

```jsx
<ReactList>
  <ReactListLoader>
    <!-- Render your loader here -->
  </ReactListLoader>
</ReactList>
```
