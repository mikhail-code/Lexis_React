import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";
import { login } from "../actions/auth";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isExpired: boolean;
  userId: string | null;
  error: string | null;
  lastLogin: number | null;
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  isExpired: false,
  userId: null,
  error: null,
  lastLogin: null
};

const selectAuthState = (state: RootState) => state.auth;

export const selectToken = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.token
);

export const selectIsExpired = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.isExpired
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isExpired = false; // Reset expiration on token update
    },
    setIsExpired: (state) => {
      state.isExpired = true;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isExpired = false;
      state.userId = null; // Clear userId on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token;
          state.userId = action.payload.user.userID;
          state.lastLogin = Date.now();
          state.isExpired = false;
          state.error = null;
        }
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message ?? action.error?.message ?? 'Login failed';
        state.token = null;
        state.userId = null;
        state.isExpired = false;
      });
  },
});

export const { setToken, setIsExpired, setUserId, logout } = authSlice.actions;

export const selectUserId = (state: RootState) => state.auth.userId;

export default authSlice.reducer;
