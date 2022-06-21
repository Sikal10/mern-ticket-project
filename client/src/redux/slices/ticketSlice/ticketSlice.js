import {createSlice} from "@reduxjs/toolkit";
import {createTicket, getTickets, getTicket, closeTicket, updateTicket, deleteTicket} from "./ticketAPI";

const initialState = {
    loading: "idle",
    tickets: [],
    ticket: {},
    errorMsg: "",
    success: false,
};

export const authSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        resetTicket: (state) => initialState
    },
    extraReducers: {
        [createTicket.pending]: (state) => {
            state.loading = "loading"
        },
        [createTicket.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.ticket = action.payload.ticket
        },
        [createTicket.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [getTickets.pending]: (state) => {
            state.loading = "loading"
        },
        [getTickets.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.tickets = action.payload.tickets
        },
        [getTickets.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [getTicket.pending]: (state) => {
            state.loading = "loading"
        },
        [getTicket.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.ticket = action.payload.ticket
        },
        [getTicket.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [closeTicket.fulfilled]: (state, action) => {
            state.loading = "idle"
            state.tickets.map((ticket) =>
                ticket._id === action.payload._id
                    ? ticket.status = "closed"
                    : ticket
            )
        },
    }
});

//selector the state
export const selectUserTicket = state => state.ticket;

export const {resetTicket} = authSlice.actions;
export default authSlice.reducer;