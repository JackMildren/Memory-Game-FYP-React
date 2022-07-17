import { configureStore } from "@reduxjs/toolkit";
import contactDB from "./App/contactDB";
import textSettingsUpdater from "./App/Footer/Widget/textSettingsUpdater";

export default configureStore ({
    reducer: {
        textSettings: textSettingsUpdater,
        contactDB: contactDB,
    }
});