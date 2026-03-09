import { baseApi } from './baseApi';
import type { TeamResponse } from '../types/apiTypes';

export interface TeamCreate {
  name: string;
  member_ids?: string[];
}

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query<TeamResponse[], void>({
      query: () => '/teams/',
      providesTags: ['Team'],
    }),
    createTeam: builder.mutation<TeamResponse, TeamCreate>({
      query: (body) => ({
        url: '/teams/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Team'],
    }),
    updateTeam: builder.mutation<TeamResponse, Partial<TeamCreate> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/teams/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Team'],
    }),
    deleteTeam: builder.mutation<void, string>({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Team'],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApi;
