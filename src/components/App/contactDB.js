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

export const { resetAll, } = contactDB.actions

export default contactDB.reducer