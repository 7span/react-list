# `<ReactListSearch>` - Search Input

The `<ReactListSearch>` component provides a search input field that automatically triggers API requests with the search parameter. It's designed to work seamlessly with the ReactList context to filter list data based on user input.

## Basic Usage

```jsx
import { ReactList, ReactListItems, ReactListSearch } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <ReactListSearch placeholder="Search users..." />

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

## Props

| Prop        | Type     | Default     | Description                                                       |
| ----------- | -------- | ----------- | ----------------------------------------------------------------- |
| placeholder | String   | "Search..." | Placeholder text for the search input.                            |
| debounce    | Number   | 300         | Debounce time in milliseconds before triggering the search.       |
| minChars    | Number   | 0           | Minimum number of characters required before triggering a search. |
| className   | String   |             | CSS class for the search input.                                   |
| inputProps  | Object   |             | Additional props to pass to the input element.                    |
| paramName   | String   | "search"    | The parameter name to use in the API request.                     |
| onSearch    | Function |             | Callback function that runs when search is triggered.             |

## How It Works

The `<ReactListSearch>` component:

1. Renders an input field for user search queries
2. Debounces input to prevent excessive API calls
3. Automatically updates the search parameter in the ReactList context
4. Triggers a new API request with the search parameter
5. Maintains the search state across page refreshes (if a state manager is configured)

## Examples

### Basic Search

```jsx
import { ReactList, ReactListItems, ReactListSearch } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="search-container">
            <ReactListSearch
              placeholder="Search users by name or email..."
              debounce={500}
            />
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Search with Minimum Characters

```jsx
import { ReactList, ReactListItems, ReactListSearch } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items, search }) => (
        <div className="users-container">
          <div className="search-container">
            <ReactListSearch
              placeholder="Search users..."
              minChars={3}
              debounce={300}
            />
            {search && search.length < 3 && (
              <div className="search-hint">
                Please enter at least 3 characters
              </div>
            )}
          </div>

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Styled Search with Tailwind CSS

```jsx
import { ReactList, ReactListItems, ReactListSearch } from "@7span/react-list";

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <ReactListSearch
              placeholder="Search users..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              inputProps={{
                "aria-label": "Search users",
              }}
            />
          </div>

          <ReactListItems>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((user) => (
                <div key={user.id} className="p-4 border rounded shadow">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Search with Clear Button

```jsx
import { ReactList, ReactListItems, ReactListSearch } from "@7span/react-list";
import { useState, useEffect } from "react";

function SearchWithClear() {
  const { search, setSearch } = useReactList();
  const [inputValue, setInputValue] = useState(search || "");

  // Keep local state in sync with context
  useEffect(() => {
    setInputValue(search || "");
  }, [search]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div className="search-with-clear">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setSearch(inputValue);
          }
        }}
        placeholder="Search users..."
        className="search-input"
      />
      {inputValue && (
        <button
          className="clear-button"
          onClick={handleClear}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
      <button
        className="search-button"
        onClick={() => setSearch(inputValue)}
        aria-label="Search"
      >
        🔍
      </button>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <SearchWithClear />

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Custom Implementation with Hook

You can also create a custom search component using the `useReactList` hook:

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useState, useEffect, useRef } from "react";

function CustomSearch() {
  const { search, setSearch } = useReactList();
  const [inputValue, setInputValue] = useState(search || "");
  const debounceTimerRef = useRef(null);

  // Keep local state in sync with context
  useEffect(() => {
    setInputValue(search || "");
  }, [search]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setSearch(value);
    }, 300);
  };

  return (
    <div className="custom-search">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search users..."
        className="search-input"
      />
      <div className="search-icon">🔍</div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <CustomSearch />

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```

### Advanced Search with Multiple Fields

```jsx
import { ReactList, ReactListItems, useReactList } from "@7span/react-list";
import { useState } from "react";

function AdvancedSearch() {
  const { setSearch, setFilters } = useReactList();
  const [searchFields, setSearchFields] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (field, value) => {
    setSearchFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    // Set general search term (optional)
    if (searchFields.name) {
      setSearch(searchFields.name);
    } else {
      setSearch("");
    }

    // Set specific filters
    const filters = {};
    if (searchFields.email) filters.email = searchFields.email;
    if (searchFields.role) filters.role = searchFields.role;

    setFilters(filters);
  };

  const handleReset = () => {
    setSearchFields({
      name: "",
      email: "",
      role: "",
    });
    setSearch("");
    setFilters({});
  };

  return (
    <div className="advanced-search">
      <div className="search-fields">
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            value={searchFields.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Search by name"
          />
        </div>

        <div className="field">
          <label>Email</label>
          <input
            type="text"
            value={searchFields.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Search by email"
          />
        </div>

        <div className="field">
          <label>Role</label>
          <select
            value={searchFields.role}
            onChange={(e) => handleChange("role", e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="editor">Editor</option>
          </select>
        </div>
      </div>

      <div className="search-actions">
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

function UsersList() {
  return (
    <ReactList endpoint="/api/users">
      {({ items }) => (
        <div className="users-container">
          <AdvancedSearch />

          <ReactListItems>
            <ul>
              {items.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </ReactListItems>
        </div>
      )}
    </ReactList>
  );
}
```
