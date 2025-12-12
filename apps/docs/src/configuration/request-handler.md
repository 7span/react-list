# Request Handler

The `requestHandler` is the core of how ReactList fetches data. It's a globally defined async function that ReactList calls every time the listing state changes — whether it's the page number, filters, sorting, or search input.

You define the logic once, and ReactList handles calling it with the right parameters at the right time.

This function is responsible for:

- Making the actual API request (using fetch, axios, or your library of choice)
- Structuring the request based on the current listing state
- Returning the resolved data (ideally the list of items + any pagination metadata)

## Arguments

When called, the `requestHandler` receives a single argument - an object called `context`. This context contains everything needed to perform the API call.

Read more about [The Context Object](/configuration/context-object).

```js
const requestHandler = async (context) => {
  const {
    endpoint,
    version,
    meta,
    search,
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
    isRefresh,
  } = context;

  // Build your API request here
  // ...
};
```

## Return Value

The `requestHandler` must return a Promise that resolves with the following object:

```js
{
  items: Array,    // Required
  count: Number,  // Required
  meta?: Object   // Optional
}
```

### `items`

- Type: `Array`
- **Required**

The array of items returned from the API to show on the current page.

### `count`

- Type: `Number`
- **Required**

The total number of items matching the current filters/search. This is used for pagination calculations.

### `meta`

- Type: `Object`
- Optional

Additional metadata returned from the API. This can include pagination info, filter counts, or any other API-specific data.

## Example

```js
import axios from 'axios';

const requestHandler = async (context) => {
  const {
    endpoint,
    version,
    meta,
    page,
    perPage,
    search,
    sortBy,
    sortOrder,
    filters,
    isRefresh,
  } = context;

  try {
    // Build query parameters
    const params = new URLSearchParams();
    
    if (page && perPage) {
      params.append('page', page);
      params.append('limit', perPage);
    }
    
    if (search) {
      params.append('search', search);
    }
    
    if (sortBy) {
      params.append('sort', sortOrder === 'desc' ? `-${sortBy}` : sortBy);
    }
    
    // Add filters
    if (filters && Object.keys(filters).length > 0) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          params.append(`filter[${key}]`, value);
        }
      });
    }

    // Make the API request
    const response = await axios.get(`/api/${endpoint}`, {
      params: params.toString(),
      headers: isRefresh ? { 'Cache-Control': 'no-cache' } : {},
    });

    return {
      items: response.data.data,
      count: response.data.meta?.total_count || 0,
      meta: response.data.meta || {},
    };
  } catch (error) {
    // Throw the error so ReactList can handle it
    const err = new Error('Failed to fetch data');
    err.name = error.response?.status === 404 ? 'NotFoundError' : 'NetworkError';
    err.status = error.response?.status;
    throw err;
  }
};

export default requestHandler;
```

## Error Handling

The `requestHandler` function is expected to return a Promise. If that promise is rejected, ReactList catches the failure and passes the error object down to `<ReactListError>`.

::: warning Heads up!
If you include a catch block in the `requestHandler` function but don't explicitly throw the error, ReactList won't be able to detect and handle the error appropriately. Always re-throw errors or throw new Error objects.
:::

### Best Practices

1. **Always throw errors**: Don't catch and swallow errors. Let them propagate to ReactList.
2. **Use descriptive error messages**: This helps with debugging and user-facing error messages.
3. **Include error metadata**: Add properties like `status`, `statusCode`, or `code` to help with error handling in `<ReactListError>`.
4. **Handle `isRefresh` flag**: Use this to bypass cache or add special headers when refreshing.

## Using `isRefresh`

The `isRefresh` flag is set to `true` when the user triggers a refresh (via `<ReactListRefresh>` or programmatically). You can use this to:

- Bypass cache layers
- Add cache-busting headers
- Log refresh events
- Force a fresh API call

```js
const requestHandler = async ({ isRefresh, ...context }) => {
  const headers = isRefresh 
    ? { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' }
    : {};
  
  const response = await fetch(`/api/${context.endpoint}`, { headers });
  // ...
};
```
