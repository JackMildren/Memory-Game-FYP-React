import { configureStore } from "@reduxjs/toolkit";
import textSettingsUpdater from "./components/textSettingsUpdater";

export default configureStore ({
    reducer: {
        textSettings: textSettingsUpdater,
    }
});