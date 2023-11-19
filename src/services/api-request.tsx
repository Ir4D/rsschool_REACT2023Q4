import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ApiResponse {
  data: [];
}

interface AnimeItem {
  mal_id: number;
  title: string;
  title_japanese: string;
  year: number;
  type: string;
  images?: { jpg: { image_url: string } };
  image_url: string;
  score: string;
  rating: string;
}

interface ApiDetailsResponse {
  data: AnimeItem;
}

type GetDataQueryParams = {
  searchTerm: string;
  limit?: number;
  page?: number;
};

type GetDataDetailsQueryParams = {
  id: string | undefined;
};

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.jikan.moe/v4',
  }),
  endpoints: (build) => ({
    getData: build.query<ApiResponse, GetDataQueryParams>({
      query: ({ searchTerm = '', limit = 12, page = 1 }) =>
        `/anime?q=${searchTerm}&limit=${limit}&page=${page}`,
    }),
    getDataDetails: build.query<ApiDetailsResponse, GetDataDetailsQueryParams>({
      query: ({ id = 0 }) => `/anime/${id}`,
    }),
  }),
});

export const { useGetDataQuery, useGetDataDetailsQuery } = apiService;
