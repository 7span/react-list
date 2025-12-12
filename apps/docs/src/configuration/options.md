# Options

When setting up ReactList, you pass a configuration object to `<ReactListProvider>`. These options allow you to define global behavior like how API requests are handled or how state is persisted.

## Configuration Object

The configuration object passed to `<ReactListProvider>` should have the following structure:

```jsx
{
  requestHandler: Function,  // Required
  stateManager: Object       // Optional
}
```

### `requestHandler`

- Type: `Function`
- **Required**

Global request handler function used to fetch data. Receives a context object with `endpoint`, `page`, `perPage`, `filters`, and more. Must return a Promise that resolves with `{ items, count, meta? }`.

Read more about [Request Handler](/configuration/request-handler).

### `stateManager`

- Type: `Object`
- Default: `{}`
- Optional

The stateManager option allows you to customize how the listing state is saved and retrieved — for example, from localStorage, sessionStorage, or even an API.

The stateManager object should have the following methods:
- `init(context)` - Called when the list initializes
- `get(context)` - Called to retrieve saved state
- `set(context)` - Called to persist state

Read more about [State Manager](/configuration/state-manager).

## Example

```jsx
import { ReactListProvider } from '@7span/react-list';
import requestHandler from './request-handler';
import stateManager from './state-manager';

function App() {
  const config = {
    requestHandler,
    stateManager, // Optional
  };

  return (
    <ReactListProvider config={config}>
      {/* Your app */}
    </ReactListProvider>
  );
}
```
