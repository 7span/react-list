import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useListContext } from "../context/list-provider";
import { hasActiveFilters } from "./utils";

/**
 * ReactList component for handling data fetching, pagination, and state management
 */
const ReactList = ({
  initialItems = [],
  children,
  endpoint,
  page = 1,
  perPage = 25,
  sortBy = "",
  sortOrder = "desc",
  count = 0,
  search = "",
  filters = {},
  attrs,
  version = 1,
  paginationMode = "pagination",
  meta = {},
  onResponse,
  afterPageChange,
  afterLoadMore,
}) => {
  const { requestHandler, setListState, stateManager } = useListContext();

  const initRef = useRef(false);

  const isLoadMore = paginationMode === "loadMore";

  const getContext = useCallback(
    (currentState) => {
      return {
        endpoint,
        version,
        meta,
        search: currentState?.search || search,
        page: currentState?.page || page,
        perPage: currentState?.perPage || perPage,
        sortBy: currentState?.sortBy || sortBy,
        sortOrder: currentState?.sortOrder || sortOrder,
        filters: currentState?.filters || filters,
        attrSettings: currentState?.attrSettings || {},
        isRefresh: false,
      };
    },
    [endpoint, version, meta, search, page, perPage, sortBy, sortOrder, filters]
  );

  const getSavedState = useCallback(() => {
    try {
      const context = getContext();
      const oldState = stateManager?.get?.(context);

      return {
        page: oldState?.page,
        perPage: oldState?.perPage,
        sortBy: oldState?.sortBy,
        sortOrder: oldState?.sortOrder,
        search: oldState?.search,
        attrSettings: oldState?.attrSettings,
        filters: oldState?.filters,
      };
    } catch (err) {
      console.error(err);
      return {};
    }
  }, [getContext, stateManager]);

  const initializeState = useCallback(() => {
    const savedState = getSavedState();

    let initialPage = page;
    if (isLoadMore) {
      initialPage = 1;
    } else if (savedState.page != null) {
      initialPage = savedState.page;
    }

    return {
      page: initialPage,
      perPage: savedState.perPage != null ? savedState.perPage : perPage,
      sortBy: savedState.sortBy != null ? savedState.sortBy : sortBy,
      sortOrder:
        savedState.sortOrder != null ? savedState.sortOrder : sortOrder,
      search: savedState.search != null ? savedState.search : search,
      filters: savedState.filters != null ? savedState.filters : filters,
      attrSettings: savedState.attrSettings || {},
      items: initialItems,
      selection: [],
      error: null,
      response: null,
      count: 0,
      isLoading: false,
      initializingState: !initialItems.length,
      confirmedPage: null,
    };
  }, [
    getSavedState,
    search,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    filters,
    isLoadMore,
  ]);

  // Initialize state with default values
  const [state, setState] = useState(initializeState);

  const updateStateManager = useCallback(
    (stateToSave) => {
      if (stateManager) {
        const context = getContext(stateToSave);
        stateManager?.set?.(context);
      }
    },
    [stateManager, getContext]
  );

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
        const previousItems = newState?.items ?? state.items;
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

        if (onResponse) onResponse(res);

        let newItems;

        if (isLoadMore) {
          newItems =
            currentState.page === 1
              ? res.items
              : [...previousItems, ...res.items];
          if (afterLoadMore) afterLoadMore(res);
        } else {
          newItems = res.items;
          if (afterPageChange) afterPageChange(res);
        }

        const updatedState = {
          ...currentState,
          response: res,
          selection: [],
          // Append items for loadMore, replace for pagination
          items:
            isLoadMore && currentState.page > 1
              ? [...previousItems, ...res.items]
              : res.items,
          count: res.count,
          initializingState: false,
          isLoading: false,
        };

        updateStateManager(updatedState);

        setState(updatedState);
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

      clearFilters: () => {
        const newState = { ...state, filters: filters, page: 1 };
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
      updateItemById: (item, id) => {
        const newItems = state.items.map((i) => {
          if (i.id === id) {
            return { ...i, ...item };
          }
          return i;
        });
        setState((prev) => ({ ...prev, items: newItems }));
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
      hasActiveFilters: hasActiveFilters(state.filters, filters),
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

  useEffect(() => {
    if (!state.initializingState) {
      return;
    }
    if (!initRef.current) {
      initRef.current = true;

      // Initialize state manager
      if (stateManager?.init) {
        const context = getContext(state);
        stateManager.init(context);
      }

      if (!initialItems.length) handlers.setPage(state.page);
    }
  }, []);

  // Watch for changes in filters prop and update internal state
  const stringifiedFilters = JSON.stringify(filters);
  useEffect(() => {
    // Skip on initial mount (handled by initializeState)
    if (!initRef.current) return;

    // Only update if filters prop actually changed from internal state
    const currentFilters = JSON.stringify(state.filters);
    if (stringifiedFilters !== currentFilters) {
      const newState = { ...state, filters, page: 1 };
      setState(newState);
      fetchData({}, newState);
    }
  }, [stringifiedFilters]);

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
    state.sortBy,
    state.sortOrder,
  ]);

  return typeof children === "function" ? children(memoizedState) : children;
};

export default ReactList;
