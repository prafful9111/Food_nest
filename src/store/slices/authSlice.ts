import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserResponse } from '../types/apiTypes';

interface AuthState {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Safely parse user from local storage
let storedUser: UserResponse | null = null;
try {
  const cached = localStorage.getItem('user');
  if (cached) storedUser = JSON.parse(cached);
} catch (e) {
  console.error("Failed to parse user from local storage");
}

const initialState: AuthState = {
  user: storedUser,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserResponse; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
