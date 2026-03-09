import { baseApi } from './baseApi';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenResponse, Record<string, string>>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        // FastAPI OAuth2PasswordRequestForm expects form data
        body: new URLSearchParams({
          username: credentials.email,
          password: credentials.password,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
    }),
    getMe: builder.query<UserResponse, void>({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery } = authApi;

