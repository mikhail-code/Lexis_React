import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: { login?: string; configuration?: { main_language: string; learning_language: string } } | null;
}
// UserState interface defines the structure of the user data stored in the slice:
// user: An optional object representing the user information.
// login: Optional string for the user's login name.
// configuration: Optional object for user-specific settings (language in this example).

const initialState: UserState = {
  user: null,
};
// initialState defines the initial state of the user slice.
// user is set to null, indicating no logged-in user initially.

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ login?: string; configuration?: { main_language: string; learning_language: string } } | null>) {
      state.user = action.payload;
    },
  },
});


export const { setUser } = userSlice.actions;
export default userSlice.reducer;


// This code defines a slice for user data using createSlice from Redux Toolkit.
// The state interface (UserState) defines the user object structure:
// login: Optional string for username/login.
// configuration: Optional object with language settings.
// The initial state sets user to null, indicating no logged-in user.
// The setUser reducer updates the state with the provided user object.