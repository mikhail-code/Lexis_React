import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Word } from "../slices/dictionariesSlice";

interface ApiError {
  message: string;
  statusCode: number;
}

export interface Dictionary {
  id: string;
  name: string;
  tags: string[];
  main_language: string;
  learning_language: string;
  words: Word[];
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface DictionaryWithWordCheck extends Dictionary {
  hasWord: boolean;
}

interface DictionaryResponse {
  message: string;
  dictionary: Dictionary;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const DICTIONARIES_URL = `${API_BASE_URL}/dictionaries`;

export interface NewDictionaryData {
  name: string;
  tags?: string[];
  main_language?: string;
  learning_language?: string;
  words?: Word[];
}

export const addNewDictionary = createAsyncThunk<DictionaryResponse, NewDictionaryData, { rejectValue: ApiError }>(
    "dictionaries/addNew",
    async (dictionaryData: NewDictionaryData, thunkAPI) => {
      try {
        const response = await axios.post(DICTIONARIES_URL, {
          name: dictionaryData.name,
          tags: dictionaryData.tags || [],
          main_language: dictionaryData.main_language || "English",
          learning_language: dictionaryData.learning_language || "Hebrew",
          words: dictionaryData.words || []
        });
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return thunkAPI.rejectWithValue({
          message: axiosError.response?.data?.message || "Error creating new dictionary",
          statusCode: axiosError.response?.status || 500
        });
      }
    }
  );
  
  
  export const deleteDictionaryById = createAsyncThunk<{ dictionaryId: string }, string, { rejectValue: ApiError }>(
    "dictionaries/deleteById",
    async (dictionaryId: string, thunkAPI) => {
      try {
        await axios.delete(`${DICTIONARIES_URL}/${dictionaryId}`);
        return { dictionaryId };
      } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        return thunkAPI.rejectWithValue({
          message: axiosError.response?.data?.message || "Error deleting dictionary",
          statusCode: axiosError.response?.status || 500
        });
      }
    }
  );
  


export const fetchDictionaryData = createAsyncThunk(
    "dictionaries/:dictionaryId",
    async (params: { dictionaryId: string }, thunkAPI) => {
      try {
        const response = await axios.get(`${DICTIONARIES_URL}/${params.dictionaryId}`);

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Error fetching dictionary");
      }
    }
  );

export const fetchDictionariesFull = createAsyncThunk<Dictionary[], void, { rejectValue: ApiError }>(
  "dictionaries/fetchDictionariesWithWords",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${DICTIONARIES_URL}/withWords`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return thunkAPI.rejectWithValue({
        message: axiosError.response?.data?.message || "Error fetching dictionaries with words",
        statusCode: axiosError.response?.status || 500
      });
    }
  }
);

export const fetchDictionariesInfo = createAsyncThunk<Dictionary[], void, { rejectValue: ApiError }>(
  "dictionaries/fetchDictionaries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(DICTIONARIES_URL);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return thunkAPI.rejectWithValue({
        message: axiosError.response?.data?.message || "Error fetching dictionaries",
        statusCode: axiosError.response?.status || 500
      });
    }
  }
);

export const addWordToDictionary = createAsyncThunk(
  "dictionaries/addWord",
  async (params: { dictionaryId: string; word: Word }, thunkAPI) => {
    try {
      const { dictionaryId, word } = params;
      const response = await axios.post(
        `${DICTIONARIES_URL}/${dictionaryId}/word`,
        word
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error adding word");
    }
  }
);

export const deleteWordFromDictionary = createAsyncThunk(
  "dictionaries/deleteWord",
  async (params: { dictionaryId: string; word: string }, thunkAPI) => {
    try {
      const { dictionaryId, word } = params;
      await axios.delete(`${DICTIONARIES_URL}/${dictionaryId}/word`, {
        data: { word },
      });
    } catch (error) {
      return thunkAPI.rejectWithValue("Error deleting word");
    }
  }
);

export const checkWordInDictionaries = createAsyncThunk<DictionaryWithWordCheck[], string, { rejectValue: ApiError }>(
  "dictionaries/checkWordInDictionaries",
  async (word: string, thunkAPI) => {
    try {
      if (!word) {
        throw new Error("Word parameter is required.");
      }

      // Configure axios to use traditional array parameter serialization
      const response = await axios.get(`${DICTIONARIES_URL}/checked`, {
        params: { word },
        paramsSerializer: {
          indexes: null // This ensures params are sent as word=value instead of word[]=value
        }
      });

      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected response format.");
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return thunkAPI.rejectWithValue({
        message: axiosError.response?.data?.message || "Error checking word in dictionaries",
        statusCode: axiosError.response?.status || 500
      });
    }
  }
);
