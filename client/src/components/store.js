import { configureStore } from "@reduxjs/toolkit";
import textSettingsUpdater from "./App/Footer/Widget/textSettingsUpdater";

export default configureStore({
  reducer: {
    textSettings: textSettingsUpdater,
  },
});
