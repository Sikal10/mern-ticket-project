import {createSlice} from "@reduxjs/toolkit";
import {getTicketNotes, createTicketNote} from "./noteAPI";

const initialState = {
    loading: "idle",
    errorMsg: "",
    success: false,
    notes: []
};

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetTicket: (state) => initialState
    },
    extraReducers: {
        [getTicketNotes.pending]: (state) => {
            state.loading = "loading"
        },
        [getTicketNotes.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.notes = action.payload.notes
        },
        [getTicketNotes.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [createTicketNote.pending]: (state) => {
            state.loading = "loading"
        },
        [createTicketNote.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.notes.push(action.payload.note)
        },
        [createTicketNote.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        }
    }
});

//selector the state
export const selectTicketNotes = state => state.note;

export const {resetTicket} = noteSlice.actions;
export default noteSlice.reducer;