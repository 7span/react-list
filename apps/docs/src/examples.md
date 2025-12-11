## Example

This demo wires every exported React List component together. Drop it into your app, point `endpoint` to your API, and you’ll have pagination, search, filters, per-page, go-to, summary, empty/error states, loaders, and load-more in one spot.

```jsx
import React from "react";
import ReactList, {
  ReactListProvider,
  ReactListItems,
  ReactListPagination,
  ReactListPerPage,
  ReactListGoTo,
  ReactListLoadMore,
  ReactListSummary,
  ReactListRefresh,
  ReactListSearch,
  ReactListEmpty,
  ReactListError,
  ReactListLoader,
  ReactListInitialLoader,
  ReactListAttributes,
} from "react-list";

// Minimal request handler: adjust to match your API contract.
const requestHandler = async ({
  endpoint,
  page,
  perPage,
  search,
  sortBy,
  sortOrder,
  filters,
}) => {
  const params = new URLSearchParams({
    page,
    perPage,
    search,
    sortBy,
    sortOrder,
    ...filters,
  });

  const res = await fetch(
    `${import.meta.baseUrl}/api/${endpoint}?${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch list");

  // Must return { items, count }
  return res.json();
};

const DemoList = () => (
  <ReactListProvider config={{ requestHandler }}>
    <ReactList
      endpoint="https://api.example.com/users"
      paginationMode="pagination" // or "loadMore"
      perPage={10}
      sortBy="createdAt"
      sortOrder="desc"
      filters={{ status: "active" }}
      attrs={[
        { name: "name", label: "Name" },
        { name: "email", label: "Email" },
        { name: "role", label: "Role" },
      ]}
    >
      {() => (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ReactListSearch />
            <ReactListPerPage />
            <ReactListRefresh />
          </div>

          <ReactListSummary />

          <ReactListAttributes />

          <ReactListInitialLoader />
          <ReactListLoader />
          <ReactListError />
          <ReactListEmpty />

          <ReactListItems
            renderItem={({ item }) => (
              <div className="rounded border p-3">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm text-gray-600">{item.email}</div>
                <div className="text-xs uppercase text-gray-500">
                  {item.role}
                </div>
              </div>
            )}
          />

          <div className="flex items-center gap-3">
            <ReactListPagination />
            <ReactListGoTo />
          </div>

          {/* Switch to loadMore mode to use this (paginationMode="loadMore") */}
          <ReactListLoadMore>
            {({ loadMore, hasMoreItems, isLoading }) =>
              hasMoreItems && (
                <button onClick={loadMore} disabled={isLoading}>
                  {isLoading ? "Loading..." : "Load more"}
                </button>
              )
            }
          </ReactListLoadMore>
        </div>
      )}
    </ReactList>
  </ReactListProvider>
);

export default DemoList;
```

## Component roles (quick reference)

- `ReactListProvider`: supplies `requestHandler` (and optional `stateManager`).
- `ReactList`: orchestrates fetching, pagination/sort/filter/search state.
- `ReactListItems`: renders the list (render-prop or default JSON).
- `ReactListPagination`: numbered pagination UI.
- `ReactListPerPage`: per-page selector.
- `ReactListGoTo`: jump to a specific page.
- `ReactListLoadMore`: infinite/load-more control (use with `paginationMode="loadMore"`).
- `ReactListSummary`: "showing X–Y of Z" helper.
- `ReactListRefresh`: manual refresh.
- `ReactListSearch`: debounced search box.
- `ReactListEmpty`: empty state.
- `ReactListError`: error state.
- `ReactListLoader`: overlay loader during fetches.
- `ReactListInitialLoader`: first load placeholder.
- `ReactListAttributes`: toggle attribute visibility (name/label pairs).
