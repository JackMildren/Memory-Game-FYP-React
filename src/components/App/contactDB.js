import { createSlice } from '@reduxjs/toolkit'
// import {readFile} from 'fs';

export const contactDB = createSlice({
    name: 'contactDB',

    initialState: {
        value: {
            
        },
    },

    reducers: {
        resetAll: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value = {}
        },
        getFromFile: (state) => {
            // readFile('./../userDB.json', (err, data) => {
            //     if (err) throw err;
            //     console.log(data);
            // });
            state.value = {}
        },
    },
})

// Action creators are generated for each case reducer function
export const { resetAll, } = contactDB.actions

export default contactDB.reducer