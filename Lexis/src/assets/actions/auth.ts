import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; // Assuming Axios is installed
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../slices/userSlice'; // Import the setUser action


interface LoginRequest {
  loginOrEmail: string;
  password: string;
}

const LOGIN_URL = "http://localhost:3000/users/login";

// This code defines a Redux Thunk action creator named login:
interface LoginResponse {
  // Define the shape of the response data
  token: string;
  login: string;
  name: string;
  surname: string;
  email: string;
  country: string;
  configuration: {
    main_language: string;
    learning_language: string;
  };

  // Add other properties as needed
}
export const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      // Set isLoading to true before making the request
      thunkAPI.dispatch({ type: 'auth/login/pending' });

      const response = await axios.post(LOGIN_URL, {
        login: loginData.loginOrEmail,
        password: loginData.password,
      });
      thunkAPI.dispatch(setUser({
        userLogin: response.data.user.userLogin,
        name: response.data.user.name,
        surname: response.data.user.surname,
        email: response.data.user.email,
        country: response.data.user.country,
        configuration: response.data.user.configuration,
      }));


      thunkAPI.dispatch({ type: 'auth/login/fulfilled' });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Handle errors
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


