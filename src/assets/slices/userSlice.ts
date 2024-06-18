import { createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
  userID: string;
  userLogin: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  configuration: {
    base_language: string;
    learning_languages: string[];
  };
}
// UserState interface defines the structure of the user data stored in the slice:
// user: An optional object representing the user information.
// login: Optional string for the user's login name.
// configuration: Optional object for user-specific settings (language in this example).

interface UserState {
  // user: User | null;
  userLogin: string;
  userID: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  configuration: {
    base_language: string;
    learning_languages: string[];
  };
}
const initialState: UserState = {
  userLogin: "",
  userID: "",
  name: "",
  surname: "",
  email: "",
  country: "",
  configuration: {
    base_language: "",
    learning_languages: [],
  },
};
// initialState defines the initial state of the user slice.
// user is set to null, indicating no logged-in user initially.
const selectUserState = (state: RootState) => state.user;

export const selectUserData = createSelector(
  selectUserState,
  (userState: UserState) => userState
);

export const selectUserLogin = createSelector(
  selectUserState,
  (userState: UserState) => userState.userLogin
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      if (action.payload) {
        // console.log("In userSlice");
        // console.log(action.payload);
        Object.assign(state, action.payload);
        // console.log("state.user " + state.userLogin) // so we have user login here...
      } else {
        // Handle the case when action.payload is null
        // You can reset the state to its initial value or perform any other necessary actions
        Object.assign(state, initialState);
        // console.log("state.user " + state.userLogin) // so we have user login here...
      }
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

