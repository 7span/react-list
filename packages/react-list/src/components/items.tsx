import { memo, useMemo } from "react";
import { useListContext } from "../context/list-provider";

import type { ReactNode } from "react";

import type {
  ReactListItem,
  ReactListSort,
  ReactListSortOrder,
} from "../types";

type ReactListItemsScope = {
  items: ReactListItem[];
  isLoading: boolean;
  setSort: (args: { by: string; order: ReactListSortOrder }) => void;
  sort: ReactListSort;
};

type ReactListItemsProps = {
  children?: ReactNode | ((scope: ReactListItemsScope) => ReactNode);
  renderItem?: (args: { item: ReactListItem; index: number }) => ReactNode;
};

export const ReactListItems = memo(
  ({ children, renderItem }: ReactListItemsProps) => {
    const { listState } = useListContext();
    const {
      data: items = [],
      loader,
      error,
      setSort,
      sort,
      pagination,
    } = listState;
    const { initialLoading, isLoading } = loader;
    const { page, perPage } = pagination;

    const serializedItems = useMemo(() => {
      return items.map((item, index) => {
        return {
          ...item,
          _index: (page - 1) * perPage + index + 1,
        };
      });
    }, [items, page, perPage]);

    const scope = useMemo(
      () => ({
        items: serializedItems,
        isLoading,
        setSort,
        sort,
      }),
      [items, sort, setSort, isLoading, serializedItems],
    );

    if (initialLoading) return null;

    if (!items || items.length === 0) {
      return null;
    }

    if (error) {
      return null;
    }

    if (renderItem) {
      return (
        <div className="react-list-items">
          {items.map((item, index) => (
            <div key={item.id || index}>{renderItem({ item, index })}</div>
          ))}
        </div>
      );
    }

    if (typeof children === "function") {
      return <div className="react-list-items">{children(scope)}</div>;
    }

    return (
      <div className="react-list-items">
        {items.map((item, index) => (
          <pre key={item.id || index}>{JSON.stringify(item, null, 2)}</pre>
        ))}
      </div>
    );
  },
);
