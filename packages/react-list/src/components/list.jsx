import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useReactListContext } from "../context/list-provider";

/**
 * ReactList component for handling data fetching, pagination, and state management
 */
const ReactList = ({
  initialItems = [],
  children,
  endpoint,
  page = 1,
  listId, // Required for external refresh capabilities
  perPage = 25,
  sortBy = "",
  sortOrder = "desc",
  count = 0,
  search = "",
  filters = {},
  attrs,
  version = 1,
  requestHandler: customRequestHandler,
  paginationMode = "pagination",
  meta = {},
  onItemSelect,
  onResponse,
  afterPageChange,
  afterLoadMore,
}) => {
  const {
    requestHandler: globalRequestHandler,
    setListState,
    stateManager,
  } = useReactListContext();
  const requestHandler = customRequestHandler || globalRequestHandler;

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
        listId, // Include listId in context for state manager
      };
    },
    [
      endpoint,
      version,
      meta,
      search,
      page,
      perPage,
      sortBy,
      sortOrder,
      filters,
      listId,
    ]
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
      items: [],
      selection: [],
      error: null,
      response: null,
      count: 0,
      isLoading: false,
      initializingState: true,
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

  const [state, setState] = useState(initializeState);

  // Update state manager
  const updateStateManager = useCallback(() => {
    if (stateManager) {
      const context = getContext(state);
      stateManager?.set?.(context);
    }
  }, [stateManager, getContext, state]);

  const setItems = useCallback(
    (res) => {
      if (onResponse) onResponse(res);

      setState((prev) => {
        let newItems;
        if (isLoadMore) {
          if (prev.page === 1) {
            newItems = res.items;
          } else {
            newItems = [...prev.items, ...res.items];
          }
          if (afterLoadMore) afterLoadMore(res);
        } else {
          newItems = res.items;
          if (afterPageChange) afterPageChange(res);
        }

        return {
          ...prev,
          items: newItems,
          count: res.count,
          response: res,
          selection: [], // Reset selection on new data
          confirmedPage: prev.page,
          initializingState: false,
        };
      });
    },
    [onResponse, isLoadMore, afterLoadMore, afterPageChange]
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

        updateStateManager();
        setItems(res);
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
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
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

  const serializedAttrs = useMemo(() => {
    const attrList = attrs || Object.keys(state.items[0] || {});
    // You'll need to implement attrSerializer utility similar to Vue version
    return attrList.map((attr) =>
      typeof attr === "string" ? { name: attr } : attr
    );
  }, [attrs, state.items]);

  const isEmpty = useMemo(() => state.items.length === 0, [state.items]);
  const isInitialLoading = useMemo(
    () => state.isLoading && state.initializingState,
    [state.isLoading, state.initializingState]
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

      //Computed
      serializedAttrs,
      isEmpty,
      context: getContext(state),

      pagination: {
        page: state.page,
        perPage: state.perPage,
        hasMore: state.items.length < state.count,
      },
      loader: {
        isLoading: state.isLoading,
        initialLoading: state.initializingState,
      },
      isInitialLoading,
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
      fetchData();
    }
  }, [
    state.page,
    state.perPage,
    state.search,
    state.sortBy,
    state.sortOrder,
    state.filters,
  ]);

  useEffect(() => {
    if (onItemSelect) {
      onItemSelect(state.selection);
    }
  }, [state.selection, onItemSelect]);

  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;

      // Register this list for external refresh if listId provided
      if (listId && registerList) {
        registerList(listId, handlers.refresh);
      }

      // Initialize state manager
      if (stateManager?.init) {
        const context = getContext(state);
        stateManager.init(context);
      }

      // Initialize attrSettings if not provided
      if (!state.attrSettings || Object.keys(state.attrSettings).length === 0) {
        const initialAttrSettings = serializedAttrs.reduce((acc, attr) => {
          acc[attr.name] = { visible: true };
          return acc;
        }, {});
        setState((prev) => ({ ...prev, attrSettings: initialAttrSettings }));
      }

      // Start initial data fetch
      handlers.setPage(state.page);
    }

    // Cleanup function
    return () => {
      if (listId && unregisterList) {
        unregisterList(listId);
      }
    };
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
    state.sortBy,
    state.sortOrder,
  ]);

  return typeof children === "function" ? children(memoizedState) : children;
};

export default ReactList;
