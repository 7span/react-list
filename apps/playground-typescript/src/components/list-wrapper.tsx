import { useMemo, useState } from "react";

import ReactList, {
  ReactListEmpty,
  ReactListError,
  ReactListGoTo,
  ReactListInitialLoader,
  ReactListItems,
  ReactListLoader,
  ReactListPagination,
  ReactListPerPage,
  ReactListProvider,
  ReactListSearch,
  ReactListSummary,
} from "@7span/react-list";

import { Icon } from "@iconify/react";

import reactListOptions from "./react-list";
import type { PlaygroundItem } from "../api/request-handler";

type Filters = Record<string, unknown>;

export default function ListWrapper() {
  const [filters, setFilters] = useState<Filters>({});
  const paginationMode = "pagination" as const;

  // Stable render-prop children for the search component.
  const searchChildren = useMemo(
    () =>
      ({
        search,
        setSearch,
      }: {
        search: string;
        setSearch: (value: string) => void;
      }) => (
        <div className="w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-6xl p-6">
        <ReactListProvider config={reactListOptions}>
          <ReactList
            count={30}
            endpoint="skills"
            search=""
            page={1}
            perPage={10}
            filters={filters}
            paginationMode={paginationMode}
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-2xl font-bold">
                React List TypeScript Playground
              </h2>

              <div className="flex items-center gap-3">
                <ReactListSearch>{searchChildren}</ReactListSearch>

                <button
                  type="button"
                  className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-100"
                  onClick={() => setFilters({})}
                >
                  Clear filters
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <ReactListInitialLoader>
                <div className="p-6">
                  <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
                  <div className="mt-4 space-y-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-20 w-full animate-pulse rounded-lg bg-gray-100"
                      />
                    ))}
                  </div>
                </div>
              </ReactListInitialLoader>

              <div className="p-6">
                <div className="space-y-3">
                  <ReactListEmpty>
                    <div className="py-8 text-center">
                      <div className="text-sm font-medium text-gray-600">
                        No data found
                      </div>
                    </div>
                  </ReactListEmpty>

                  <ReactListError>
                    {({ error }: { error: Error }) => (
                      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <div className="flex items-start gap-3">
                          <Icon
                            icon="mdi:alert-circle-outline"
                            className="mt-0.5"
                          />
                          <div>
                            <div className="font-semibold">{error.name}</div>
                            <div>{error.message}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ReactListError>

                  <ReactListItems>
                    {({ items }) => (
                      <div className="space-y-3">
                        {items.map((item, idx) => {
                          const row = item as PlaygroundItem;

                          return (
                            <div
                              key={(row?.id ?? idx).toString()}
                              className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3"
                            >
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-gray-500">
                                  ID {row?.id}
                                </div>

                                <div className="truncate text-sm font-medium text-gray-900">
                                  {row?.name}
                                </div>

                                <div className="mt-1 text-sm text-gray-700">
                                  Updated:{" "}
                                  {row?.date_updated
                                    ? new Date(
                                        row.date_updated,
                                      ).toLocaleString()
                                    : "-"}
                                </div>
                              </div>

                              <div className="shrink-0 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                                {row?.status ?? "-"}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </ReactListItems>
                </div>

                <div className="mt-4">
                  <ReactListLoader>
                    {({ isLoading }: { isLoading: boolean }) =>
                      isLoading ? (
                        <div className="border-t border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
                          Loading...
                        </div>
                      ) : null
                    }
                  </ReactListLoader>
                </div>
              </div>

              <div className="border-t border-gray-200 bg-gray-50 p-4 rounded-b-xl">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <ReactListSummary>
                    {({ visibleCount, count }) => (
                      <div className="text-sm text-gray-700">
                        {visibleCount} results
                        {typeof count === "number" ? ` (total ${count})` : ""}
                      </div>
                    )}
                  </ReactListSummary>

                  <div className="flex flex-wrap items-center gap-3">
                    <ReactListPerPage>
                      {({ perPage, setPerPage, options }) => (
                        <select
                          value={perPage}
                          onChange={(e) => setPerPage(Number(e.target.value))}
                          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                        >
                          {options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </ReactListPerPage>

                    <ReactListGoTo>
                      {({ setPage, page, pagesCount }) => (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            max={pagesCount}
                            value={page}
                            onChange={(e) => setPage(Number(e.target.value))}
                            className="w-20 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-600">
                            of {pagesCount}
                          </span>
                        </div>
                      )}
                    </ReactListGoTo>

                    <ReactListPagination pageLinks={5}>
                      {({
                        page,
                        pagesToDisplay,
                        hasPrev,
                        hasNext,
                        prev,
                        next,
                        first,
                        last,
                        setPage,
                      }) => (
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={first}
                            disabled={!hasPrev}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                          >
                            First
                          </button>

                          <button
                            type="button"
                            onClick={prev}
                            disabled={!hasPrev}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                          >
                            Prev
                          </button>

                          <div className="flex items-center gap-1">
                            {pagesToDisplay.map((p) => (
                              <button
                                key={p}
                                type="button"
                                onClick={() => setPage(p)}
                                disabled={p === page}
                                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                              >
                                {p}
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={next}
                            disabled={!hasNext}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                          >
                            Next
                          </button>

                          <button
                            type="button"
                            onClick={last}
                            disabled={!hasNext}
                            className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm disabled:opacity-50"
                          >
                            Last
                          </button>
                        </div>
                      )}
                    </ReactListPagination>
                  </div>
                </div>
              </div>
            </div>
          </ReactList>
        </ReactListProvider>
      </div>
    </div>
  );
}
