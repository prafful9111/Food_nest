import { baseApi } from './baseApi';
import type { FoodItemResponse, ComboResponse } from '../types/apiTypes';

export interface FoodItemCreate {
  name: string;
  price: number;
  category: string;
  available?: boolean;
  image_url?: string | null;
  tax_rate?: number;
}

export interface ComboCreate {
  name: string;
  price: number;
  available?: boolean;
  food_item_ids?: string[];
}

export const foodApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFoodItems: builder.query<FoodItemResponse[], void>({
      query: () => '/food/items',
      providesTags: ['FoodItem'],
    }),
    createFoodItem: builder.mutation<FoodItemResponse, FoodItemCreate>({
      query: (body) => ({
        url: '/food/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FoodItem'],
    }),
    updateFoodItem: builder.mutation<FoodItemResponse, Partial<FoodItemCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/food/items/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['FoodItem', 'Combo'],
    }),
    deleteFoodItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `/food/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FoodItem', 'Combo'],
    }),

    // Combos
    getCombos: builder.query<ComboResponse[], void>({
      query: () => '/food/combos',
      providesTags: ['Combo'],
    }),
    createCombo: builder.mutation<ComboResponse, ComboCreate>({
      query: (body) => ({
        url: '/food/combos',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Combo'],
    }),
  }),
});

export const {
  useGetFoodItemsQuery,
  useCreateFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
  useGetCombosQuery,
  useCreateComboMutation,
} = foodApi;
