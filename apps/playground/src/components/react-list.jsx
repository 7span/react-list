import requestHandler from "../api/request-handler";

function stateManagerKey(endpoint, version) {
  return `react-list--${endpoint}--${version}`;
}
export default {
  stateManager: {
    init(context) {
      const { endpoint, version } = context;
      const allKeys = `react-list--${endpoint}--`;
      const latestKey = stateManagerKey(endpoint, version);
      const staleKeys = Object.keys(localStorage).filter(
        (key) => key.startsWith(allKeys) && key != latestKey
      );
      staleKeys.forEach((key) => localStorage.removeItem(key));
    },

    set(context) {
      const {
        endpoint,
        version,
        search,
        page,
        perPage,
        sortBy,
        sortOrder,
        filters,
        attrSettings,
      } = context;
      const key = stateManagerKey(endpoint, version);
      localStorage.setItem(
        key,
        JSON.stringify({
          search,
          page,
          perPage,
          sortBy,
          sortOrder,
          filters,
          attrSettings,
        })
      );
    },

    get(context) {
      const { endpoint, version } = context;
      const key = stateManagerKey(endpoint, version);
      try {
        if (localStorage.getItem(key)) {
          return JSON.parse(localStorage.getItem(key));
        } else {
          return null;
        }
      } catch {
        return null;
      }
    },
  },

  requestHandler,
};
