import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4' }),
  endpoints: (builder) => ({
    getDataList: builder.query({
      query: () => '/anime',
    }),
  }),
});

export const { useGetDataListQuery } = apiSlice;
