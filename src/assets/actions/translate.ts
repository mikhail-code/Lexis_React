import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AxiosError {
  response?: {
    data: unknown;
  };
}

const TRANSLATION_URL = "http://localhost:3000/translation";

export const fetchTranslation = createAsyncThunk(
  "translation/fetchTranslation",
  async (
    params: { text: string; sourceLanguage: string; targetLanguage: string },
    thunkAPI
  ) => {
    const { text, sourceLanguage, targetLanguage } = params;
    console.log(text);
    console.log(sourceLanguage);
    try {
      const response = await axios.post(TRANSLATION_URL + "/translate", {
        text,
        sourceLanguage,
        targetLanguage,
      });

      return response.data.translatedText;
    } catch (error: unknown) {
      if ((error as AxiosError).response) {
        return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);


export const fetchSupportedLanguages = createAsyncThunk(
  "translation/fetchSupportedLanguages",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/getSupportedLanguages");
      return response.data.languages;
    } catch (error: unknown) {
      if ((error as AxiosError).response) {
        return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred");
    }
  }
);
