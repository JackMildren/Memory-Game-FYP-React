import { configureStore } from "@reduxjs/toolkit";
import textSettingsUpdater from "./App/Footer/Widget/textSettingsUpdater";

// Redux store setup

export default configureStore({
  reducer: {
    textSettings: textSettingsUpdater,
  },
});
