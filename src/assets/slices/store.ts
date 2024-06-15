import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import translationReducer from './translationSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    translation: translationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



// export const selectUser = createSelector(
//   (state: RootState) => state.user,
//   (user) => user
// );

// export const selectToken = createSelector(
//   (state: RootState) => state.auth.token,
//   (token) => token
// );

// export const selectIsExpired = createSelector(
//   (state: RootState) => state.auth.isExpired,
//   (isExpired) => isExpired
// );

export default store;