import type * as React from 'react';

export type ReactListItemId = string | number;

export type ReactListItem = Record<string, unknown> & {
  id?: ReactListItemId;
};

export type ReactListFilters = Record<string, unknown>;

export type ReactListSortOrder = '' | 'asc' | 'desc' | (string & {});

export type ReactListAttrSettings = Record<
  string,
  {
    visible: boolean;
  }
>;

export type ReactListRequestArgs<
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  endpoint: string;
  version: number;
  meta: Record<string, unknown>;
  page: number;
  perPage: number;
  search: string;
  sortBy: string;
  sortOrder: ReactListSortOrder;
  filters: TFilters;
} & Record<string, unknown>;

export type ReactListResponse<TItem = ReactListItem> = {
  items: TItem[];
  count: number;
  meta?: unknown;
  [key: string]: unknown;
};

export type ReactListRequestHandler<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = (args: ReactListRequestArgs<TFilters>) => Promise<ReactListResponse<TItem>>;

export type ReactListPersistedState<
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: ReactListSortOrder;
  search?: string;
  attrSettings?: ReactListAttrSettings;
  filters?: TFilters;
};

export type ReactListContext<TFilters extends ReactListFilters = ReactListFilters> = {
  endpoint: string;
  version: number;
  meta: Record<string, unknown>;
  search: string;
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: ReactListSortOrder;
  filters: TFilters;
  attrSettings: ReactListAttrSettings;
  isRefresh: boolean;
};

export type ReactListStateManager<
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  init?: (context: ReactListContext<TFilters>) => void;
  get?: (context: ReactListContext<TFilters>) => ReactListPersistedState<TFilters> | null;
  set?: (context: ReactListContext<TFilters>) => void;
};

export type ReactListProviderConfig<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  requestHandler: ReactListRequestHandler<TItem, TFilters>;
  stateManager?: ReactListStateManager<TFilters>;
};

export type ReactListPaginationState = {
  page: number;
  perPage: number;
  hasMore: boolean;
};

export type ReactListLoaderState = {
  isLoading: boolean;
  initialLoading: boolean;
};

export type ReactListSort = {
  sortBy: string;
  sortOrder: ReactListSortOrder;
};

export type ReactListAttribute = {
  name: string;
  label?: string;
};

export type ReactListActions<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  setPage: (value: number, addContext?: Record<string, unknown>) => void;
  setPerPage: (value: number) => void;
  setSearch: (value: string) => void;
  setSort: (args: { by: string; order: ReactListSortOrder }) => void;
  loadMore: () => void;
  clearFilters: () => void;
  refresh: (addContext?: Record<string, unknown>) => void;
  setFilters: (filters: TFilters) => void;
  updateAttr: (attrName: string, settingKey: string, value: unknown) => void;
  updateItemById: (item: Partial<TItem>, id: ReactListItemId) => void;
  setSelection: (selection: ReactListItemId[]) => void;
};

export type ReactListListState<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  data: TItem[];
  response: ReactListResponse<TItem> | null;
  error: Error | null;
  count: number;
  selection: ReactListItemId[];
  pagination: ReactListPaginationState;
  loader: ReactListLoaderState;
  sort: ReactListSort;
  hasActiveFilters: boolean;
  search: string;
  filters: TFilters;
  attrs: ReactListAttribute[];
  attrSettings: ReactListAttrSettings;
  isEmpty: boolean;
  // Actions are appended by the main `ReactList` component.
} & ReactListActions<TItem, TFilters>;

export type ReactListContextValue<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  requestHandler: ReactListRequestHandler<TItem, TFilters>;
  stateManager: ReactListStateManager<TFilters>;
  listState: ReactListListState<TItem, TFilters>;
  setListState: React.Dispatch<React.SetStateAction<ReactListListState<TItem, TFilters>>>;
};

