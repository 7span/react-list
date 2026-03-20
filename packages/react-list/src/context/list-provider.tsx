import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

import type {
  ReactListContextValue,
  ReactListFilters,
  ReactListItem,
  ReactListItemId,
  ReactListListState,
  ReactListProviderConfig,
  ReactListResponse,
  ReactListRequestHandler,
  ReactListStateManager,
} from "../types";

const ListContext = createContext<ReactListContextValue | null>(null);

type ReactListProviderProps = {
  children: ReactNode;
  config: ReactListProviderConfig;
};

const noop = () => {};

export const ReactListProvider = ({ children, config }: ReactListProviderProps) => {
  const { requestHandler, stateManager = {} } = config;

  if (!requestHandler) {
    throw new Error("ListProvider: requestHandler is required.");
  }

  const [listState, setListState] = useState<ReactListListState<any, ReactListFilters>>({
    data: [],
    response: null as ReactListResponse<any> | null,
    error: null,
    count: 0,
    selection: [] as ReactListItemId[],
    pagination: {
      page: 1,
      perPage: 25,
      hasMore: false,
    },
    loader: {
      isLoading: false,
      initialLoading: true,
    },
    sort: {
      sortBy: "",
      sortOrder: "desc",
    },
    hasActiveFilters: false,
    search: "",
    filters: {},
    attrs: [],
    attrSettings: {},
    isEmpty: true,

    // These actions are replaced by `ReactList` once it mounts.
    setPage: noop,
    setPerPage: noop,
    setSearch: noop,
    setSort: noop,
    loadMore: noop,
    clearFilters: noop,
    refresh: noop,
    setFilters: noop,
    updateAttr: noop,
    updateItemById: noop,
    setSelection: noop,
  });

  const value: ReactListContextValue = useMemo(
    () => ({
      requestHandler: requestHandler as ReactListRequestHandler,
      stateManager: stateManager as ReactListStateManager,
      listState,
      setListState,
    }),
    [requestHandler, stateManager, listState]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useListContext = (): ReactListContextValue => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useListContext must be used within a ListProvider");
  }
  return context;
};
