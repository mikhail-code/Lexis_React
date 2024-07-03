import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Word } from "../slices/dictionariesSlice";

const DICTIONARIES_URL = "http://localhost:3000/dictionaries";

export const addNewDictionary = createAsyncThunk(
    "dictionaries/addNew",
    async (dictionaryData: {
      name: string;
      tags?: string[];
      main_language?: string;
      learning_language?: string;
      words: Word[];
      owner: string;
    }, thunkAPI) => {
      try {
        const response = await axios.post(DICTIONARIES_URL, {
          name: dictionaryData.name || "New Dictionary",
          tags: dictionaryData.tags || [],
          main_language: dictionaryData.main_language || "English",
          learning_language: dictionaryData.learning_language || "Hebrew",
          words: dictionaryData.words || [],
          owner: dictionaryData.owner || "unknown",
        });
        console.log(dictionaryData);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue("Error creating new dictionary");
      }
    }
  );
  
  
  export const deleteDictionaryById = createAsyncThunk(
    "dictionaries/deleteById",
    async (params: { dictionaryId: string; userId: string }, thunkAPI) => {
      try {
        const { dictionaryId, userId } = params;
        await axios.delete(`${DICTIONARIES_URL}/${dictionaryId}`, {
          data: { userId },
        });
      } catch (error) {
        return thunkAPI.rejectWithValue("Error deleting dictionary");
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

export const fetchDictionariesFull = createAsyncThunk(
  "dictionaries/fetchDictionariesWithWords",
  async (params: { userId: string }, thunkAPI) => {
    try {
      const response = await axios.get(DICTIONARIES_URL + "/", {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching dictionaries with words");
    }
  }
);

export const fetchDictionariesInfo = createAsyncThunk(
  "dictionaries/fetchDictionaries",
  async (params: { userId: string }, thunkAPI) => {
    try {
      const response = await axios.get(DICTIONARIES_URL + "/", {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error fetching dictionaries");
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
        { word }
      );
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

export const checkWordInDictionaries = createAsyncThunk(
  "dictionaries/checkWordInDictionaries",
  async (params: { userId: string; word: string }, thunkAPI) => {
    try {
      if (!params.userId) {
        // Handle missing userId (e.g., show an error message)
        throw new Error("User ID is required.");
      }

      const response = await axios.get(DICTIONARIES_URL + `/checked`, {
        params, // Use params here to send them as query parameters
      });

      // Validate response data type (assuming it's an array)
      if (!Array.isArray(response.data)) {
        throw new Error("Unexpected response format.");
      }

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Error checking word in dictionaries");
    }
  }
);
