import { createSlice } from '@reduxjs/toolkit'

export const textSettingsUpdater = createSlice({
    name: 'textSettings',

    initialState: {
        value: {
            
        },
    },

    reducers: {
        setLineHeight: (state, action) => {
            state.value.lineHeight = action.payload
        },
        setFontSize: (state, action) => {
            state.value.fontSize = action.payload
        },
        setWordSpacing: (state, action) => {
            state.value.wordSpacing = action.payload
        },
        setFontFamily: (state, action) => {
            state.value.fontFamily = action.payload
        },
        resetAll: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { resetAll, setLineHeight, setFontSize, setWordSpacing, setFontFamily } = textSettingsUpdater.actions

export default textSettingsUpdater.reducer