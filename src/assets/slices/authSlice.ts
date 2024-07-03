import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store";
import { login } from "../actions/auth";

interface AuthState {
  token: string | null;
  isLoading: boolean;
  isExpired: boolean;
  userId: string | null; // Add userId to the auth state
}

const initialState: AuthState = {
  token: null,
  isLoading: false,
  isExpired: false,
  userId: null, // Initialize userId as null
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
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload) {
          state.token = action.payload.token; // Update the token in the state

        }
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message ?? null; // Handle login errors
      });
  },
});

export const { setToken, setIsExpired, setUserId, logout } = authSlice.actions;

export const selectUserId = (state: RootState) => state.auth.userId;

export default authSlice.reducer;
