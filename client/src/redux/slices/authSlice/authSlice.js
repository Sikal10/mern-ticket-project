import {createSlice} from "@reduxjs/toolkit";
import {registerUser, logoutUser,  loginUser} from "./authAPI";

const initialState = {
    loading: "idle",
    user: JSON.parse(localStorage.getItem("user")) || null,
    errorMsg: "",
    success: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.loading = "idle"
            state.success = false
            state.errorMsg = ""
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.loading = "loading"
        },
        [registerUser.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
        },
        [registerUser.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [loginUser.pending]: (state) => {
            state.loading = "loading"
        },
        [loginUser.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.user = action.payload
            state.isAuthenticated = true
        },
        [loginUser.rejected]: (state, action) => {
            state.user = null
            state.loading = "error"
            state.errorMsg = action.payload.error.message
            state.isAuthenticated = false
        },
        [logoutUser.fulfilled]: (state) => {
            state.user = null
            state.isAuthenticated = false
        }
    }
});

//selectors
export const selectAuthUser = state => state.auth;

export const {resetUser} = authSlice.actions;
export default authSlice.reducer;