import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Assuming Axios is installed

interface LoginRequest {
    loginOrEmail: string;
    password: string;
  }


const LOGIN_URL = 'http://localhost:3000/users/login';

// This code defines a Redux Thunk action creator named login:
interface LoginResponse {
    // Define the shape of the response data
    token: string;
    // Add other properties as needed
  }

  export const login = createAsyncThunk<LoginResponse, LoginRequest>(
    'auth/login',
    async (loginData, thunkAPI) => {
      try {
        const response = await axios.post(LOGIN_URL, { login: loginData.loginOrEmail, password: loginData.password });
        return response.data; // Assuming response contains login data like token
      } catch (error) {
        return thunkAPI.rejectWithValue(error); // Handle errors
      }
    }
  );

// (Optional) Define a slice reducer for authentication state (if needed)
// ... (reducer logic for handling login actions)
