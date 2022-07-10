import { createSlice } from '@reduxjs/toolkit'

// eslint-disable-next-line
import userDB from './../../userDB.json'

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
            // console.log("displaying userDB")
            // console.log(userDB);
            // state.value = {}
        },
        writeToFile: (state, action) => {
            
        },
    },
})

export const { resetAll, getFromFile, writeToFile, } = contactDB.actions

export default contactDB.reducer