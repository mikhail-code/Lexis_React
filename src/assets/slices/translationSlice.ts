import { createSlice } from '@reduxjs/toolkit';
import { fetchTranslation, fetchSupportedLanguages } from '../actions/translate';

interface TranslationState {
  translatedText: string;
  languages: string[];
}

const initialState: TranslationState = {
  translatedText: '',
  languages: [],
};

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTranslation.fulfilled, (state, action) => {
        state.translatedText = action.payload;
      })
      .addCase(fetchSupportedLanguages.fulfilled, (state, action) => {
        state.languages = action.payload;
      });
  },
});

export default translationSlice.reducer;
