import { baseApi } from './baseApi';
import type { InventoryItemResponse } from '../types/apiTypes';

export interface InventoryItemCreate {
  name: string;
  current?: number;
  max_capacity?: number;
  unit: string;
  is_raw_material?: boolean;
}

export const inventoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInventoryItems: builder.query<InventoryItemResponse[], void>({
      query: () => '/inventory/',
      providesTags: ['InventoryItem'],
    }),
    createInventoryItem: builder.mutation<InventoryItemResponse, InventoryItemCreate>({
      query: (body) => ({
        url: '/inventory/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['InventoryItem'],
    }),
    updateInventoryItem: builder.mutation<InventoryItemResponse, Partial<InventoryItemCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/inventory/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['InventoryItem'],
    }),
    deleteInventoryItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/inventory/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InventoryItem'],
    }),
  }),
});

export const {
  useGetInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
} = inventoryApi;
