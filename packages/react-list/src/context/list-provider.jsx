import { createContext, useContext, useMemo, useState } from "react";

const ListContext = createContext(null);

export const ReactListProvider = ({ children, config }) => {
  const { requestHandler, stateManager = {} } = config;
  const [listState, setListState] = useState({
    data: [],
    response: null,
    error: null,
    count: 0,
    selection: [],
    pagination: {
      page: 1,
      perPage: 25,
    },
    loader: {
      isLoading: false,
      initialLoading: true,
    },
    sort: {
      sortBy: null,
      sortOrder: "desc",
    },
    search: "",
    filters: {},
    attrs: [],
    isEmpty: true,
    isInitializing: true,
  });

  if (!requestHandler) {
    throw new Error("ListProvider: requestHandler is required.");
  }

  const value = useMemo(
    () => ({
      requestHandler,
      stateManager,
      listState,
      setListState,
    }),
    [requestHandler, stateManager, listState]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useListContext must be used within a ListProvider");
  }
  return context;
};
