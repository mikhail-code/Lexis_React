import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from "./store";
import { login } from "../actions/auth";


interface AuthState {
  token: string | null;
  isExpired: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  isExpired: false,
  isLoading: false,
  error: null, // Initialize the error field
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

export const { setToken, setIsExpired } = authSlice.actions;
export default authSlice.reducer;
