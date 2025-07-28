import "../app.css";

import ReactList, {
  ReactListEmpty,
  ReactListError,
  ReactListGoTo,
  ReactListInitialLoader,
  ReactListItems,
  ReactListLoader,
  ReactListPagination,
  ReactListPerPage,
  ReactListProvider,
  ReactListSearch,
  ReactListSummary,
  useReactListContext,
} from "@7span/react-list";

import { Icon } from "@iconify/react";
import requestHandler from "../api/request-handler";
import { useState } from "react";

const ListWrapper = () => {
  const [sortState, setSortState] = useState({
    sortBy: "",
    sortOrder: "",
  });

  const { listState } = useReactListContext();

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});

  return (
    <div className="list-container">
      <h2 className="list-title">React List Playground</h2>
      <button onClick={() => listState.refresh()}>Refresh</button>
      <ReactList
        initialItems={[
          {
            id: "02989f79-99a8-4166-97e6-c3075a6a5d1d",
            status: "draft",
            sort: null,
            user_created: "3642ef43-6cdd-4835-9998-b10b589cf21d",
            date_created: "2023-07-18T13:52:04.000Z",
            user_updated: "3642ef43-6cdd-4835-9998-b10b589cf21d",
            date_updated: "2024-05-23T05:16:03.000Z",
            name: "Nuxt.js",
            color: "#2ECDA7",
            logo: "9274138b-a315-4b48-83a7-c8643ea7f80b",
          },
        ]}
        count={30}
        endpoint="skills"
        search={""}
        page={1}
        perPage={10}
        filters={{}}
        sortBy={sortState.sortBy}
        sortOrder={sortState.sortOrder}
        paginationMode="pagination"
      >
        <div className="list-header">
          <div className="header-left">
            {/* <ReactListSearch /> */}
            <ReactListSearch>
              {({ search, setSearch }) => (
                <div className="search-container">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search skills..."
                    className="search-input"
                  />
                </div>
              )}
            </ReactListSearch>
          </div>
          <div className="header-right">
            <div className="filter-container">
              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select
                  className="filter-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      status: value === "all" ? undefined : value,
                    }));
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="select-arrow">
                  <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Color:</label>
                <select
                  className="filter-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      color: value === "all" ? undefined : value,
                    }));
                  }}
                >
                  <option value="all">All Colors</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                </select>
                <div className="select-arrow">
                  <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-content">
          <ReactListInitialLoader>
            <div className="skeleton-loader">
              <div className="skeleton-table">
                <div className="skeleton-header">
                  <div className="skeleton-row">
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                  </div>
                </div>
                <div className="skeleton-body">
                  {[...Array(5)].map((_, index) => (
                    <div className="skeleton-row" key={index}>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ReactListInitialLoader>
          <ReactListEmpty>
            <div className="empty-state">
              <div className="empty-icon-container">
                <div className="empty-icon-bg"></div>
                <div className="empty-icon-wrapper">
                  <Icon
                    icon="mdi:file-search-outline"
                    className="w-16 h-16 text-accent-400"
                  />
                </div>
              </div>

              <h3 className="empty-title">No Data Found</h3>

              <p className="empty-description">
                We couldn't find any matching records. Try adjusting your search
                or filters.
              </p>

              <button className="refresh-button">
                <Icon icon="mdi:refresh" className="w-5 h-5" />
                Refresh
              </button>
            </div>
          </ReactListEmpty>
          <ReactListError>
            {({ error }) => (
              <div className="error-state">
                <div className="error-icon-container">
                  <Icon
                    icon="mdi:alert-circle-outline"
                    className="w-12 h-12 text-red-500"
                  />
                </div>
                <h3 className="error-title">Something went wrong</h3>
                <p className="error-message">
                  {error.message ||
                    "An unexpected error occurred while fetching data."}
                </p>
                <div className="error-details">
                  <p className="error-code">
                    {error.name}: {error.message}
                  </p>
                </div>
                <button className="refresh-button">
                  <Icon icon="mdi:refresh" className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            )}
          </ReactListError>
          <ReactListItems>
            {({ items, sort, setSort }) => {
              return (
                <div className="list-table-container">
                  <ReactListLoader>
                    <div className="loader-overlay">
                      <div className="loader-container">
                        <Icon
                          icon="svg-spinners:blocks-shuffle-3"
                          className="w-12 h-12 text-primary-500 animate-pulse"
                        />
                      </div>
                    </div>
                  </ReactListLoader>
                  <table className="list-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>
                          Name{" "}
                          <button
                            onClick={() => {
                              const sorting =
                                sort?.sortOrder === ""
                                  ? "asc"
                                  : sort?.sortOrder === "asc"
                                  ? "desc"
                                  : "";

                              setSort({
                                by: "name", // Update the sortBy state t
                                order: sorting,
                              });
                            }}
                          >
                            <Icon
                              icon={
                                sort?.sortOrder === ""
                                  ? "mi:sort"
                                  : sort?.sortOrder === "asc"
                                  ? "lucide:sort-asc"
                                  : "lucide:sort-desc"
                              }
                              className="cursor-pointer text-white size-5"
                            />
                          </button>
                        </th>
                        <th>Status</th>
                        <th>
                          Update At{" "}
                          <button
                            onClick={() => {
                              const sorting =
                                sort?.sortOrder === ""
                                  ? "asc"
                                  : sort?.sortOrder === "asc"
                                  ? "desc"
                                  : "";

                              setSort({
                                ...sort,
                                by: "date_updated", // Update the sortBy state t
                                order: sorting,
                              });
                            }}
                          >
                            <Icon
                              icon={
                                sort?.sortOrder === ""
                                  ? "mi:sort"
                                  : sort?.sortOrder === "asc"
                                  ? "lucide:sort-asc"
                                  : "lucide:sort-desc"
                              }
                              className="cursor-pointer text-white size-5"
                            />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={{ color: "black" }}>{item.name}</td>
                          <td>{item.status}</td>
                          <td>
                            {new Date(item.date_updated).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }}
          </ReactListItems>
          {/* Footer */}
          <div className="list-footer">
            <div className="footer-controls">
              <div className="control-group">
                <ReactListSummary>
                  {({ visibleCount }) => (
                    <span className="results-count">
                      {visibleCount} Results
                    </span>
                  )}
                </ReactListSummary>
              </div>

              <div className="control-group">
                <span className="control-label">Page Size:</span>
                <ReactListPerPage>
                  {({ perPage, setPerPage, options }) => (
                    <div className="select-container">
                      <select
                        value={String(perPage)}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="select-input"
                      >
                        {options.map((option) => (
                          <option
                            key={`page-size-${option.value}`}
                            value={String(option.value)}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="select-arrow">
                        <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </ReactListPerPage>
              </div>

              <div className="control-group">
                <ReactListGoTo>
                  {({ setPage, page, pagesCount }) => (
                    <div className="control-group">
                      <span className="control-label">Go to:</span>
                      <input
                        type="number"
                        min={1}
                        max={pagesCount}
                        value={page}
                        onChange={(e) => {
                          const page = Number(e.target.value);
                          setPage(page);
                        }}
                        className="page-input"
                      />
                      <span className="control-label">of {pagesCount}</span>
                    </div>
                  )}
                </ReactListGoTo>
              </div>
            </div>

            <ReactListPagination>
              {({
                page,
                pagesToDisplay,
                hasNext,
                hasPrev,
                prev,
                next,
                first,
                last,
                setPage,
              }) => (
                <div className="pagination-container">
                  <button
                    onClick={first}
                    disabled={!hasPrev}
                    className="pagination-button"
                    title="First Page"
                  >
                    <Icon icon="mdi:chevron-double-left" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={prev}
                    disabled={!hasPrev}
                    className="pagination-button"
                    title="Previous Page"
                  >
                    <Icon icon="mdi:chevron-left" className="w-4 h-4" />
                  </button>

                  <div className="pagination-pages">
                    {pagesToDisplay.map((item, index) => {
                      const isActive = item === page;

                      return (
                        <button
                          key={index}
                          onClick={() => setPage(item)}
                          className={`page-button ${isActive ? "active" : ""}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={next}
                    disabled={!hasNext}
                    className="pagination-button"
                    title="Next Page"
                  >
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={last}
                    disabled={!hasNext}
                    className="pagination-button"
                    title="Last Page"
                  >
                    <Icon icon="mdi:chevron-double-right" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </ReactListPagination>
          </div>
        </div>
      </ReactList>
      {/* <ReactList
        initialItems={[
          {
            id: "02989f79-99a8-4166-97e6-c3075a6a5d1d",
            status: "draft",
            sort: null,
            user_created: "3642ef43-6cdd-4835-9998-b10b589cf21d",
            date_created: "2023-07-18T13:52:04.000Z",
            user_updated: "3642ef43-6cdd-4835-9998-b10b589cf21d",
            date_updated: "2024-05-23T05:16:03.000Z",
            name: "Nuxt.js",
            color: "#2ECDA7",
            logo: "9274138b-a315-4b48-83a7-c8643ea7f80b",
          },
        ]}
        count={30}
        endpoint="skills"
        search={""}
        page={1}
        perPage={10}
        filters={{}}
        sortBy={sortState.sortBy}
        sortOrder={sortState.sortOrder}
        paginationMode="pagination"
      >
        <div className="list-header">
          <div className="header-left">
            <ReactListSearch>
              {({ search, setSearch }) => (
                <div className="search-container">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search skills..."
                    className="search-input"
                  />
                </div>
              )}
            </ReactListSearch>
          </div>
          <div className="header-right">
            <div className="filter-container">
              <div className="filter-group">
                <label className="filter-label">Status:</label>
                <select
                  className="filter-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      status: value === "all" ? undefined : value,
                    }));
                  }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
                <div className="select-arrow">
                  <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                </div>
              </div>

              <div className="filter-group">
                <label className="filter-label">Color:</label>
                <select
                  className="filter-select"
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      color: value === "all" ? undefined : value,
                    }));
                  }}
                >
                  <option value="all">All Colors</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="yellow">Yellow</option>
                </select>
                <div className="select-arrow">
                  <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="list-content">
          <ReactListInitialLoader>
            <div className="skeleton-loader">
              <div className="skeleton-table">
                <div className="skeleton-header">
                  <div className="skeleton-row">
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                    <div className="skeleton-cell header"></div>
                  </div>
                </div>
                <div className="skeleton-body">
                  {[...Array(5)].map((_, index) => (
                    <div className="skeleton-row" key={index}>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                      <div className="skeleton-cell"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ReactListInitialLoader>
          <ReactListEmpty>
            <div className="empty-state">
              <div className="empty-icon-container">
                <div className="empty-icon-bg"></div>
                <div className="empty-icon-wrapper">
                  <Icon
                    icon="mdi:file-search-outline"
                    className="w-16 h-16 text-accent-400"
                  />
                </div>
              </div>

              <h3 className="empty-title">No Data Found</h3>

              <p className="empty-description">
                We couldn't find any matching records. Try adjusting your search
                or filters.
              </p>

              <button className="refresh-button">
                <Icon icon="mdi:refresh" className="w-5 h-5" />
                Refresh
              </button>
            </div>
          </ReactListEmpty>
          <ReactListError>
            {({ error }) => (
              <div className="error-state">
                <div className="error-icon-container">
                  <Icon
                    icon="mdi:alert-circle-outline"
                    className="w-12 h-12 text-red-500"
                  />
                </div>
                <h3 className="error-title">Something went wrong</h3>
                <p className="error-message">
                  {error.message ||
                    "An unexpected error occurred while fetching data."}
                </p>
                <div className="error-details">
                  <p className="error-code">
                    {error.name}: {error.message}
                  </p>
                </div>
                <button className="refresh-button">
                  <Icon icon="mdi:refresh" className="w-5 h-5" />
                  Try Again
                </button>
              </div>
            )}
          </ReactListError>
          <ReactListItems>
            {({ items, sort, setSort }) => {
              return (
                <div className="list-table-container">
                  <ReactListLoader>
                    <div className="loader-overlay">
                      <div className="loader-container">
                        <Icon
                          icon="svg-spinners:blocks-shuffle-3"
                          className="w-12 h-12 text-primary-500 animate-pulse"
                        />
                      </div>
                    </div>
                  </ReactListLoader>
                  <table className="list-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>
                          Name{" "}
                          <button
                            onClick={() => {
                              const sorting =
                                sort?.sortOrder === ""
                                  ? "asc"
                                  : sort?.sortOrder === "asc"
                                  ? "desc"
                                  : "";

                              setSort({
                                by: "name", // Update the sortBy state t
                                order: sorting,
                              });
                            }}
                          >
                            <Icon
                              icon={
                                sort?.sortOrder === ""
                                  ? "mi:sort"
                                  : sort?.sortOrder === "asc"
                                  ? "lucide:sort-asc"
                                  : "lucide:sort-desc"
                              }
                              className="cursor-pointer text-white size-5"
                            />
                          </button>
                        </th>
                        <th>Status</th>
                        <th>
                          Update At{" "}
                          <button
                            onClick={() => {
                              const sorting =
                                sort?.sortOrder === ""
                                  ? "asc"
                                  : sort?.sortOrder === "asc"
                                  ? "desc"
                                  : "";

                              setSort({
                                ...sort,
                                by: "date_updated", // Update the sortBy state t
                                order: sorting,
                              });
                            }}
                          >
                            <Icon
                              icon={
                                sort?.sortOrder === ""
                                  ? "mi:sort"
                                  : sort?.sortOrder === "asc"
                                  ? "lucide:sort-asc"
                                  : "lucide:sort-desc"
                              }
                              className="cursor-pointer text-white size-5"
                            />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={{ color: "black" }}>{item.name}</td>
                          <td>{item.status}</td>
                          <td>
                            {new Date(item.date_updated).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }}
          </ReactListItems>

          <div className="list-footer">
            <div className="footer-controls">
              <div className="control-group">
                <ReactListSummary>
                  {({ visibleCount }) => (
                    <span className="results-count">
                      {visibleCount} Results
                    </span>
                  )}
                </ReactListSummary>
              </div>

              <div className="control-group">
                <span className="control-label">Page Size:</span>
                <ReactListPerPage>
                  {({ perPage, setPerPage, options }) => (
                    <div className="select-container">
                      <select
                        value={String(perPage)}
                        onChange={(e) => setPerPage(Number(e.target.value))}
                        className="select-input"
                      >
                        {options.map((option) => (
                          <option
                            key={`page-size-${option.value}`}
                            value={String(option.value)}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="select-arrow">
                        <Icon icon="mdi:chevron-down" className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </ReactListPerPage>
              </div>

              <div className="control-group">
                <ReactListGoTo>
                  {({ setPage, page, pagesCount }) => (
                    <div className="control-group">
                      <span className="control-label">Go to:</span>
                      <input
                        type="number"
                        min={1}
                        max={pagesCount}
                        value={page}
                        onChange={(e) => {
                          const page = Number(e.target.value);
                          setPage(page);
                        }}
                        className="page-input"
                      />
                      <span className="control-label">of {pagesCount}</span>
                    </div>
                  )}
                </ReactListGoTo>
              </div>
            </div>

            <ReactListPagination>
              {({
                page,
                pagesToDisplay,
                hasNext,
                hasPrev,
                prev,
                next,
                first,
                last,
                setPage,
              }) => (
                <div className="pagination-container">
                  <button
                    onClick={first}
                    disabled={!hasPrev}
                    className="pagination-button"
                    title="First Page"
                  >
                    <Icon icon="mdi:chevron-double-left" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={prev}
                    disabled={!hasPrev}
                    className="pagination-button"
                    title="Previous Page"
                  >
                    <Icon icon="mdi:chevron-left" className="w-4 h-4" />
                  </button>

                  <div className="pagination-pages">
                    {pagesToDisplay.map((item, index) => {
                      const isActive = item === page;

                      return (
                        <button
                          key={index}
                          onClick={() => setPage(item)}
                          className={`page-button ${isActive ? "active" : ""}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={next}
                    disabled={!hasNext}
                    className="pagination-button"
                    title="Next Page"
                  >
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                  </button>

                  <button
                    onClick={last}
                    disabled={!hasNext}
                    className="pagination-button"
                    title="Last Page"
                  >
                    <Icon icon="mdi:chevron-double-right" className="w-4 h-4" />
                  </button>
                </div>
              )}
            </ReactListPagination>
          </div>
        </div>
      </ReactList> */}
    </div>
  );
};

export default ListWrapper;
