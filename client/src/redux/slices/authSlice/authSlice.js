import {createSlice} from "@reduxjs/toolkit";
import {registerUser, logoutUser,  loginUser} from "./authAPI";

const initialState = {
    loading: "idle",
    user: null,
    errorMsg: "",
    success: false,
    accessToken: null
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
            state.user = action.payload.user
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
            state.accessToken = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [logoutUser.fulfilled]: (state) => {
            state.user = null
        }
    }
});

//selectors
export const selectAuthUser = state => state.auth;

export const {resetUser} = authSlice.actions;
export default authSlice.reducer;