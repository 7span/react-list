import type { ReactNode } from 'react';

import type {
  ReactListAttribute,
  ReactListFilters,
  ReactListItem,
  ReactListListState,
  ReactListResponse,
  ReactListSortOrder,
} from './list-provider';

export type ReactListPaginationMode = 'pagination' | 'loadMore';

export type ReactListProps<
  TItem = ReactListItem,
  TFilters extends ReactListFilters = ReactListFilters,
> = {
  initialItems?: TItem[];
  children?:
    | ReactNode
    | ((scope: ReactListListState<TItem, TFilters>) => ReactNode);

  endpoint: string;
  page?: number;
  perPage?: number;
  sortBy?: string;
  sortOrder?: ReactListSortOrder;
  count?: number;
  search?: string;
  filters?: TFilters;
  attrs?: Array<string | ReactListAttribute>;
  version?: number;
  paginationMode?: ReactListPaginationMode;
  meta?: Record<string, unknown>;
  onResponse?: (res: ReactListResponse<TItem>) => void;
  afterPageChange?: (res: ReactListResponse<TItem>) => void;
  afterLoadMore?: (res: ReactListResponse<TItem>) => void;
};

