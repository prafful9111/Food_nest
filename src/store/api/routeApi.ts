import { baseApi } from './baseApi';
import type { RouteResponse } from '../types/apiTypes';

export interface RouteCreate {
  name: string;
  status?: string;
  rider_id?: string | null;
  team_id?: string | null;
  duration?: number;
  stops?: any[];
}

export const routeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoutes: builder.query<RouteResponse[], void>({
      query: () => '/routes/',
      providesTags: ['Route'],
    }),
    createRoute: builder.mutation<RouteResponse, RouteCreate>({
      query: (body) => ({
        url: '/routes/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Route'],
    }),
    updateRoute: builder.mutation<RouteResponse, Partial<RouteCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/routes/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Route'],
    }),
    deleteRoute: builder.mutation<void, string>({
      query: (id) => ({
        url: `/routes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Route'],
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useCreateRouteMutation,
  useUpdateRouteMutation,
  useDeleteRouteMutation,
} = routeApi;
