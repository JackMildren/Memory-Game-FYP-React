import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  colorPalette: "true",
};

export const textSettingsUpdater = createSlice({
  name: "textSettings",

  initialState: {
    value: { ...initialState },
  },

  reducers: {
    loadSavedSettings: (state) => {
      state.value = JSON.parse(localStorage.getItem("accessSettings"));
      updateSavedSettings(state);
    },
    setLineHeight: (state, action) => {
      state.value.lineHeight = action.payload;
      updateSavedSettings(state);
    },
    setFontSize: (state, action) => {
      state.value.fontSize = action.payload;
      updateSavedSettings(state);
    },
    setWordSpacing: (state, action) => {
      state.value.wordSpacing = action.payload;
      updateSavedSettings(state);
    },
    setColorPalette: (state, action) => {
      state.value.colorPalette = action.payload;
      updateSavedSettings(state);
    },
    resetAll: (state) => {
      state.value = initialState;
      updateSavedSettings(state);
    },
  },
});

function updateSavedSettings(state) {
  localStorage.setItem("accessSettings", JSON.stringify(state.value));
}

export const {
  resetAll,
  loadSavedSettings,
  setLineHeight,
  setFontSize,
  setWordSpacing,
  setColorPalette,
} = textSettingsUpdater.actions;

export default textSettingsUpdater.reducer;
