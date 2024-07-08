import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import {
    fetchDictionariesFull,
  checkWordInDictionaries,
} from "../actions/dictionaries";

export interface Word {
  word: string;
  translation: string;
  transliteration?: string; 
  comment?: string; 
}
export interface DictionaryInfoItem {
  dictionaryName: string;
  dictionaryId: string;
  exists: boolean;
  lastModified?: Date;
  wordsAmount?: number;
}
export interface DictionaryInfo {
  id: string;
  tags: string[];
  name: string;
  owner: string;
  main_language: string;
  learning_language: string;
  owner_uuid: string;
  lastModified?: Date;
  wordsAmount?: number;
}
export interface Dictionary {
  id: string;
  tags: string[];
  name: string;
  owner: string;
  main_language: string;
  learning_language: string;
  owner_uuid: string;
  words: Word[];
  lastModified?: Date;
  wordsAmount?: number;
}

interface DictionariesState {
  dictionaries: Dictionary[];
  status: "idle" | "loading" | "failed";
}

const initialState: DictionariesState = {
  dictionaries: [],
  status: "idle",
};

const dictionariesSlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    // synchronous reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDictionariesFull.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDictionariesFull.fulfilled, (state, action) => {
        state.status = "idle";
        state.dictionaries = action.payload;
      })
      .addCase(fetchDictionariesFull.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(checkWordInDictionaries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkWordInDictionaries.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(checkWordInDictionaries.rejected, (state) => {
        state.status = "failed";
      });
  },
});

//   export const {} = dictionariesSlice.actions;

export const selectDictionaries = (state: RootState) =>
  state.dictionaries.dictionaries;
export const selectDictionariesStatus = (state: RootState) =>
  state.dictionaries.status;

export default dictionariesSlice.reducer;
