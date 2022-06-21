import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice/authSlice";
import ticketReducer from "../slices/ticketSlice/ticketSlice";
import userReducer from "../slices/userSlice/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        ticket: ticketReducer
    }
});