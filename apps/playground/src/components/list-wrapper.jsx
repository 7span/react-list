import { useMemo, useState } from 'react';

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
} from '@7span/react-list';

import { Icon } from '@iconify/react';

import reactListOptions from './react-list';

const STATUS_OPTIONS = [
  { label: 'All Status', value: '' },
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
];

const COLOR_OPTIONS = [
  { label: 'All Colors', value: '' },
  { label: 'Red', value: '#FF9900' },
  { label: 'Blue', value: '#FFEB0F' },
  { label: 'Green', value: '#F7DF1E' },
  { label: 'Yellow', value: '#5E24FF' },
];

export default function ListWrapper() {
  const [filters, setFilters] = useState({});

  const paginationMode = 'pagination';

  const searchChildren = useMemo(
    () =>
      ({ search, setSearch }) => (
        <div className="w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills..."
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-100">
            React List Playground (Tailwind)
          </h2>

          <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ReactListSearch>{searchChildren}</ReactListSearch>

                  <select
                    className="w-40 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    aria-label="Filter by status"
                    value={filters?.status ?? ''}
                    onChange={(e) => {
                      const nextStatus = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        status: nextStatus === '' ? undefined : nextStatus,
                      }));
                    }}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <select
                    className="w-40 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    aria-label="Filter by color"
                    value={filters?.color ?? ''}
                    onChange={(e) => {
                      const nextColor = e.target.value;
                      setFilters((prev) => ({
                        ...prev,
                        color: nextColor === '' ? undefined : nextColor,
                      }));
                    }}
                  >
                    {COLOR_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-800"
                    onClick={() => setFilters({})}
                  >
                    Clear filters
                  </button>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900 shadow-sm">
                  <ReactListInitialLoader>
                    <div className="p-6">
                      <div className="h-4 w-52 animate-pulse rounded bg-gray-700" />
                      <div className="mt-4 space-y-3">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-16 w-full animate-pulse rounded-lg bg-gray-800"
                          />
                        ))}
                      </div>
                    </div>
                  </ReactListInitialLoader>

                  <div className="p-6">
                    <ReactListEmpty>
                      <div className="py-10 text-center">
                        <div className="text-sm font-medium text-gray-300">
                          No data found
                        </div>
                      </div>
                    </ReactListEmpty>

                    <ReactListError>
                      {({ error }) => (
                        <div className="rounded-lg border border-red-900/50 bg-red-900/20 px-4 py-3 text-sm text-red-300">
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
                            const row = item ?? {};
                            return (
                              <div
                                key={(row.id ?? idx).toString()}
                                className="flex items-start justify-between gap-4 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3"
                              >
                                <div className="min-w-0">
                                  <div className="text-xs font-semibold text-gray-400">
                                    ID {row.id}
                                  </div>

                                  <div className="truncate text-sm font-medium text-gray-100">
                                    {row.name}
                                  </div>

                                  <div className="mt-1 text-sm text-gray-300">
                                    Updated:{' '}
                                    {row.date_updated
                                      ? new Date(
                                        row.date_updated,
                                      ).toLocaleString()
                                      : '-'}
                                  </div>
                                </div>

                                <div className="shrink-0 rounded-full border border-gray-800 bg-gray-900 px-3 py-1 text-xs font-medium text-gray-200">
                                  {row.status ?? '-'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </ReactListItems>

                    <ReactListLoader>
                      {({ isLoading }) =>
                        isLoading ? (
                          <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950 px-4 py-3 text-sm text-gray-200">
                            Loading...
                          </div>
                        ) : null
                      }
                    </ReactListLoader>
                  </div>

                  <div className="border-t border-gray-800 bg-gray-900 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <ReactListSummary>
                        {({ visibleCount, count }) => (
                          <div className="text-sm text-gray-300">
                            {visibleCount} results
                            {typeof count === 'number'
                              ? ` (total ${count})`
                              : ''}
                          </div>
                        )}
                      </ReactListSummary>

                      <div className="flex flex-wrap items-center gap-3">
                        <ReactListPerPage>
                          {({ perPage, setPerPage, options }) => (
                            <select
                              value={perPage}
                              onChange={(e) =>
                                setPerPage(Number(e.target.value))
                              }
                              className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
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
                                onChange={(e) =>
                                  setPage(Number(e.target.value))
                                }
                                className="w-20 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                              />
                              <span className="text-sm text-gray-400">
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
                            first,
                            prev,
                            next,
                            last,
                            setPage,
                          }) => (
                            <div className="flex flex-wrap items-center gap-2">
                              <button
                                type="button"
                                onClick={first}
                                disabled={!hasPrev}
                                className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm disabled:opacity-50"
                              >
                                First
                              </button>
                              <button
                                type="button"
                                onClick={prev}
                                disabled={!hasPrev}
                                className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm disabled:opacity-50"
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
                                    className={`rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm disabled:opacity-60 ${p === page ? 'bg-indigo-600 border-indigo-500' : ''
                                      }`}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>

                              <button
                                type="button"
                                onClick={next}
                                disabled={!hasNext}
                                className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm disabled:opacity-50"
                              >
                                Next
                              </button>
                              <button
                                type="button"
                                onClick={last}
                                disabled={!hasNext}
                                className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 shadow-sm disabled:opacity-50"
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
      </div>
    </div>
  );
}

