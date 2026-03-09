import { baseApi } from './baseApi';
import type { VehicleResponse } from '../types/apiTypes';

export interface VehicleCreate {
  registration_no: string;
  status?: string;
  assigned_rider_id?: string | null;
}

export const vehicleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<VehicleResponse[], void>({
      query: () => '/vehicles/',
      providesTags: ['Vehicle'],
    }),
    createVehicle: builder.mutation<VehicleResponse, VehicleCreate>({
      query: (body) => ({
        url: '/vehicles/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    updateVehicle: builder.mutation<VehicleResponse, Partial<VehicleCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/vehicles/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Vehicle'],
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vehicle'],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApi;
