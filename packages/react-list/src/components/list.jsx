import { useCallback, useEffect, useMemo, useState } from "react";
import { useListContext } from "../context/list-provider";

/**
 * ReactList component for handling data fetching, pagination, and state management
 */
const ReactList = ({
  children,
  endpoint,
  page = 1,
  perPage = 25,
  sortBy,
  sortOrder = "desc",
  search = "",
  filters = {},
  attrs,
  version = 1,
  hasPaginationHistory = true,
  paginationMode = "pagination",
  meta = {},
}) => {
  const { requestHandler, setListState } = useListContext();
  const isLoadMore = paginationMode === "loadMore";

  // Initialize state with default values
  const [state, setState] = useState({
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    filters,
    attrSettings: {},
    items: [],
    selection: [],
    error: null,
    response: null,
    count: 0,
    isLoading: false,
    initializingState: true,
  });

  /**
   * Fetch data from the API
   * @param {Object} addContext - Additional context to pass to the request handler
   * @param {Object} newState - New state to use for the request
   */
  const fetchData = useCallback(
    async (addContext = {}, newState = null) => {
      // Only set loading state if not initializing
      if (!state.initializingState) {
        setState((prev) => ({ ...prev, error: null, isLoading: true }));
      }

      try {
        const currentState = newState || state;
        const res = await requestHandler({
          endpoint,
          version,
          meta,
          page: currentState.page,
          perPage: currentState.perPage,
          search: currentState.search,
          sortBy: currentState.sortBy,
          sortOrder: currentState.sortOrder,
          filters: currentState.filters,
          ...addContext,
        });

        setState((prev) => ({
          ...prev,
          response: res,
          selection: [],
          // Append items for loadMore, replace for pagination
          items: isLoadMore ? [...prev.items, ...res.items] : res.items,
          count: res.count,
          initializingState: false,
          isLoading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: err,
          items: [],
          count: 0,
          initializingState: false,
          isLoading: false,
        }));
        throw err;
      }
    },
    [endpoint, version, isLoadMore, meta, requestHandler, state]
  );

  /**
   * Handlers for various actions (pagination, sorting, filtering, etc.)
   */
  const handlers = useMemo(
    () => ({
      setPage: (value, addContext) => {
        let newPage = value;
        if (value === 0) {
          newPage = "";
        }
        const newState = { ...state, page: newPage };
        setState(newState);
        if (newPage) fetchData(addContext, newState);
      },

      setPerPage: (value) => {
        const newState = { ...state, perPage: value, page: 1 };
        setState(newState);
        fetchData({}, newState);
      },

      setSearch: (value) => {
        // Only update if value changed to prevent unnecessary requests
        if (value !== state.search) {
          const newState = { ...state, search: value, page: 1 };
          setState(newState);
          fetchData({}, newState);
        }
      },

      setSort: ({ by, order }) => {
        const newState = { ...state, sortBy: by, sortOrder: order, page: 1 };
        setState(newState);
        fetchData({}, newState);
      },

      loadMore: () => {
        const newState = { ...state, page: state.page + 1 };
        setState(newState);
        fetchData({}, newState);
      },

      refresh: (addContext = { isRefresh: true }) => {
        if (isLoadMore) {
          // For loadMore, reset to page 1
          const newState = { ...state, page: 1, items: [] };
          setState(newState);
          fetchData(addContext, newState);
        } else {
          // For pagination, keep current page
          fetchData(addContext);
        }
      },

      setFilters: (filters) => {
        const newState = { ...state, filters, page: 1 };
        setState(newState);
        fetchData({}, newState);
      },

      setSelection: (selection) => setState((prev) => ({ ...prev, selection })),
    }),
    [fetchData, isLoadMore, state]
  );

  /**
   * Memoized state for context to prevent unnecessary re-renders
   */
  const memoizedState = useMemo(
    () => ({
      data: state.items,
      response: state.response,
      error: state.error,
      count: state.count,
      selection: state.selection,
      pagination: {
        page: state.page,
        perPage: state.perPage,
        hasMore: state.items.length < state.count,
      },
      loader: {
        isLoading: state.isLoading,
        initialLoading: state.initializingState,
      },
      sort: { sortBy: state.sortBy, sortOrder: state.sortOrder },
      search: state.search,
      filters: state.filters,
      attrs: attrs || Object.keys(state.items[0] || {}),
      isEmpty: state.items.length === 0,
      ...handlers,
    }),
    [
      state.items,
      state.response,
      state.error,
      state.count,
      state.selection,
      state.page,
      state.perPage,
      state.isLoading,
      state.initializingState,
      state.sortBy,
      state.sortOrder,
      state.search,
      state.filters,
      handlers,
      attrs,
    ]
  );

  // Initial data fetch
  useEffect(() => {
    if (!state.initializingState) {
      return;
    }
    handlers.setPage(state.page);
  }, []);

  // Update list state in context
  useEffect(() => {
    setListState(memoizedState);
  }, [
    setListState,
    state.items,
    state.count,
    state.error,
    state.isLoading,
    state.selection,
    state.page,
    state.perPage,
  ]);

  return children({ ...memoizedState });
};

export default ReactList;
