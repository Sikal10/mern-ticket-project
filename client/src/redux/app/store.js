import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice/authSlice";
import ticketReducer from "../slices/ticketSlice/ticketSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        ticket: ticketReducer
    }
});