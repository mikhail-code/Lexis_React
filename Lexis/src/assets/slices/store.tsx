import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
import { createSelector } from "@reduxjs/toolkit"; // Assuming you use Redux Toolkit

export const selectUser = createSelector(
  (state: RootState) => state.user,
  (user) => user
);

export interface RootState {
  user: ReturnType<typeof userReducer>;
}

export default store;