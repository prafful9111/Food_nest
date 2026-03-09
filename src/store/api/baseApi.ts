import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store/index'; // Type-only import for Redux State

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'FoodItem', 'Combo', 'InventoryItem', 'Vehicle', 'Route', 'Team', 'Task', 'Sale', 'CartHealthLog', 'RawMaterialRequest', 'RefillRequest'], // Comprehensive tagging

  endpoints: () => ({}), // Endpoints will be injected from other files
});
