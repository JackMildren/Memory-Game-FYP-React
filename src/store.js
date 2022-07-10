import { configureStore } from "@reduxjs/toolkit";
import contactDB from "./components/contactDB";
import textSettingsUpdater from "./components/textSettingsUpdater";

export default configureStore ({
    reducer: {
        textSettings: textSettingsUpdater,
        contactDB: contactDB,
    }
});