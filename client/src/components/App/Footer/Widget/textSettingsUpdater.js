import { createSlice } from "@reduxjs/toolkit";

export const textSettingsUpdater = createSlice({
  name: "textSettings",

  initialState: {
    value: {},
  },

  reducers: {
    setLineHeight: (state, action) => {
      state.value.lineHeight = action.payload;
    },
    setFontSize: (state, action) => {
      state.value.fontSize = action.payload;
    },
    setWordSpacing: (state, action) => {
      state.value.wordSpacing = action.payload;
    },
    resetAll: (state) => {
      state.value = {};
    },
  },
});

export const { resetAll, setLineHeight, setFontSize, setWordSpacing } =
  textSettingsUpdater.actions;

export default textSettingsUpdater.reducer;
