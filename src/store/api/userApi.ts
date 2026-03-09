import { baseApi } from './baseApi';
import type { UserResponse } from '../types/apiTypes';

// We define a Create type since we need to send passwords, etc.
export interface UserCreate {
  name: string;
  email: string;
  role: string;
  status?: string;
  password?: string;
  salary_detail?: any;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserResponse[], void>({
      query: () => '/users',
      providesTags: ['User'],
    }),
    createUser: builder.mutation<UserResponse, UserCreate>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<UserResponse, Partial<UserCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
