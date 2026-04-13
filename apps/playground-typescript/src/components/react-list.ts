import type {
  ReactListProviderConfig,
  ReactListRequestArgs,
  ReactListResponse,
  ReactListStateManager,
} from "@7span/react-list";

import requestHandler from "../api/request-handler";
import type { PlaygroundItem } from "../api/request-handler";

type Filters = Record<string, unknown>;

const stateManagerKey = (endpoint: string, version: number) =>
  `react-list--${endpoint}--${version}`;

const stateManager: ReactListStateManager<Filters> = {
  init(context: any) {
    const { endpoint, version } = context;
    const allKeys = `react-list--${endpoint}--`;
    const latestKey = stateManagerKey(endpoint, version);

    const staleKeys = Object.keys(localStorage).filter(
      (key) => key.startsWith(allKeys) && key !== latestKey,
    );
    staleKeys.forEach((key) => localStorage.removeItem(key));
  },
  set(context: any) {
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
      }),
    );
  },
  get(context: any) {
    const { endpoint, version } = context;
    const key = stateManagerKey(endpoint, version);

    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as any;
    } catch {
      return null;
    }
  },
};

const config: ReactListProviderConfig<PlaygroundItem, Filters> = {
  requestHandler: requestHandler as unknown as (
    args: ReactListRequestArgs<Filters>,
  ) => Promise<ReactListResponse<PlaygroundItem>>,
  stateManager,
};

export default config;
