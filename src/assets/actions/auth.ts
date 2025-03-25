import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { jwtDecode } from 'jwt-decode';
import { setToken, setUserId } from '../slices/authSlice';
import { setUserAsync } from '../slices/userSlice';

// Configure axios to handle authentication
let isRefreshing = false;
interface QueueItem {
  resolve: (value?: string | null) => void;
  reject: (reason?: Error) => void;
}

let failedQueue: QueueItem[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If another request is already refreshing the token, wait for it
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${AUTH_URL}/refresh`);
        const { token } = response.data;

        localStorage.setItem('token', token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        originalRequest.headers.Authorization = `Bearer ${token}`;

        processQueue(null, token);
        return axios(originalRequest);
      } catch (refreshError) {
        const error = refreshError instanceof Error ? refreshError : new Error('Token refresh failed');
        processQueue(error, null);
        // If refresh token fails, logout the user
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

interface LoginRequest {
  loginOrEmail: string;
  password: string;
}

interface ApiError {
  message: string;
  statusCode: number;
}

// Use environment variable or configuration file for API URLs
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const AUTH_URL = `${API_BASE_URL}/auth`;

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

export const login = createAsyncThunk<LoginResponse, LoginRequest, { rejectValue: ApiError }>(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post<LoginResponse>(`${AUTH_URL}/login`, {
        login: loginData.loginOrEmail,
        password: loginData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.data.token || !response.data.user) {
        throw new Error('Invalid response format from server');
      }

      // Store token in localStorage and Redux
      localStorage.setItem('token', response.data.token);
      thunkAPI.dispatch(setToken(response.data.token));
      thunkAPI.dispatch(setUserId(response.data.user.userID));

      // Update user information
      await thunkAPI.dispatch(setUserAsync({
        userID: response.data.user.userID,
        userLogin: response.data.user.userLogin,
        name: response.data.user.name,
        surname: response.data.user.surname,
        email: response.data.user.email,
        country: response.data.user.country,
        configuration: response.data.user.configuration,
      }));

      return response.data;
    // } catch (error) {
    //   const axiosError = error as AxiosError<ApiError>;
    //   return thunkAPI.rejectWithValue({
    //     message: axiosError.response?.data?.message || 'An error occurred during login',
    //     statusCode: axiosError.response?.status || 500
    //   });
    // }

    // more info
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error("Full Axios Error Object:", axiosError); // Log the entire error object
      console.error("Axios Error Response:", axiosError.response); // Log just the response part
      return thunkAPI.rejectWithValue({
        message: axiosError.response?.data?.message || 'An error occurred during login',
        statusCode: axiosError.response?.status || 500
      });
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


