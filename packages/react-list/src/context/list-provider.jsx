import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const ListContext = createContext(null);

export const ReactListProvider = ({ children, config }) => {
  const { requestHandler, stateManager = {} } = config;
  const [listInstances, setListInstances] = useState(new Map());

  if (!requestHandler) {
    throw new Error("ListProvider: requestHandler is required.");
  }

  // Register list for external refresh capabilities
  const registerList = useCallback((listId, refreshFn) => {
    setListInstances((prev) => new Map(prev).set(listId, refreshFn));
  }, []);

  // Unregister list
  const unregisterList = useCallback((listId) => {
    setListInstances((prev) => {
      const newMap = new Map(prev);
      newMap.delete(listId);
      return newMap;
    });
  }, []);

  // Refresh specific list or all lists
  const refreshList = useCallback(
    (listId, options = {}) => {
      if (listId) {
        const refreshFn = listInstances.get(listId);
        if (refreshFn) {
          refreshFn(options);
        }
      } else {
        // Refresh all lists
        listInstances.forEach((refreshFn) => {
          refreshFn(options);
        });
      }
    },
    [listInstances]
  );

  // Get list instance info

  const getListInfo = useCallback(() => {
    return {
      registeredLists: Array.from(listInstances.keys()),
      totalLists: listInstances.size,
    };
  }, [listInstances]);

  const value = useMemo(
    () => ({
      requestHandler,
      stateManager,
      registerList,
      unregisterList,
      refreshList,
      getListInfo,
    }),
    [
      requestHandler,
      stateManager,
      registerList,
      unregisterList,
      refreshList,
      getListInfo,
      onError,
    ]
  );

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useReactListContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useListContext must be used within a ListProvider");
  }
  return context;
};
