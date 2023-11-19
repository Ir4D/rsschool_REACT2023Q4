import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse {
  data: [];
}

type GetDataQueryParams = {
  term: string;
  limit?: number;
  page?: number;
};

export const myApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jikan.moe/v4',
  }),
  endpoints: (build) => ({
    getData: build.query<ApiResponse, GetDataQueryParams>({
      query: ({ term = '', limit = 12, page = 1 }) =>
        `/anime?q=${term}&limit=${limit}&page=${page}`,
    }),
  }),
});

export const { useGetDataQuery } = myApi;
