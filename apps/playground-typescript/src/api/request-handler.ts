import type { ReactListRequestArgs, ReactListResponse } from '@7span/react-list';

export type PlaygroundItem = {
  id: number;
  name: string;
  status?: string;
  date_updated?: string;
  [key: string]: unknown;
};

type Filters = Record<string, unknown>;

const requestHandler = async (
  args: ReactListRequestArgs<Filters>,
): Promise<ReactListResponse<PlaygroundItem>> => {
  const {
    endpoint,
    page,
    perPage,
    search,
    sortBy,
    sortOrder,
    filters,
    meta,
  } = args;

  const params = new URLSearchParams();

  if (page && perPage) {
    params.append('page', String(page));
    params.append('limit', String(perPage));
  }

  if (search) params.append('search', search);

  if (sortBy) {
    params.append(
      'sort',
      sortOrder === 'desc' ? `-${sortBy}` : sortBy,
    );
  }

  if (filters && Object.keys(filters).length > 0) {
    // Keep it simple for the playground.
    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined || value === '') continue;
      params.append(`filter[${key}][_eq]`, String(value));
    }
  }

  // Example: meta support (not required by ReactList, just forwarded in args)
  if (meta && typeof meta === 'object') {
    // noop; you can add meta params here.
  }

  const queryString = params.toString();
  const url = `https://everest.7span.in/items/${endpoint}${
    queryString ? `?${queryString}` : ''
  }`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    const data: any = await response.json();

    return {
      items: (data.data ?? []) as PlaygroundItem[],
      count:
        data.meta?.total_count ??
        data.meta?.filter_count ??
        0,
      meta: data.meta ?? {},
    };
  } catch (error) {
    return {
      items: [],
      count: 0,
      meta: {},
      error: error instanceof Error ? error : undefined,
    } as unknown as ReactListResponse<PlaygroundItem>;
  }
};

export default requestHandler;

