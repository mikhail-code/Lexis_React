import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import translationReducer from './translationSlice';
import dictionariesReducer from './dictionariesSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    translation: translationReducer,
    dictionaries: dictionariesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;