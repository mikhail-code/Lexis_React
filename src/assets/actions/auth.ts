import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming Axios is installed
import { jwtDecode } from 'jwt-decode';
import { setToken, setUserId } from '../slices/authSlice';
import { setUserAsync } from '../slices/userSlice'; // Import the setUser action


interface LoginRequest {
  loginOrEmail: string;
  password: string;
}

const LOGIN_URL = "http://localhost:3000/users/login";

// This code defines a Redux Thunk action creator named login:
interface LoginResponse {
  token: string;
  user: {
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
  };
}

export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      thunkAPI.dispatch({ type: 'auth/login/pending' });
      const response = await axios.post<LoginResponse>(LOGIN_URL, {
        login: loginData.loginOrEmail,
        password: loginData.password,
      });

      console.log("In auth");
      console.log(response.data);
      thunkAPI.dispatch(setToken(response.data.token));
      thunkAPI.dispatch(setUserId(response.data.user.userID))

      // Dispatch setUserAsync and wait for it to complete
      await thunkAPI.dispatch(setUserAsync({
        userID: response.data.user.userID,
        userLogin: response.data.user.userLogin,
        name: response.data.user.name,
        surname: response.data.user.surname,
        email: response.data.user.email,
        country: response.data.user.country,
        configuration: response.data.user.configuration,
      }));

      // Now that setUserAsync has completed, dispatch the fulfilled action
      thunkAPI.dispatch({ type: 'auth/login/fulfilled' });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


// (Optional) Define a slice reducer for authentication state (if needed)
// ... (reducer logic for handling login actions)

interface RootState {
  auth: {
    token: string;
  };
}

export const checkTokenExpiration = createAsyncThunk(
  'auth/checkTokenExpiration',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState; // Type assertion here instead const token = thunkAPI.getState().auth.token;
      const token = state.auth.token;
      if (token) {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000; // JavaScript’s Date.now() returns the current time in milliseconds
        const isExpired = decodedToken.exp < currentTime; 
        return isExpired;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
);


