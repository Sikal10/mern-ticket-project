import {createSlice} from "@reduxjs/toolkit";
import {getAllUsers, getCurrentUser} from "./userAPI";

const initialState = {
    loading: "idle",
    currentUser: null,
    errorMsg: "",
    success: false,
    users: null
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUser: (state) => {
            state.loading = "idle"
            state.success = false
            state.errorMsg = ""
        }
    },
    extraReducers: {
        [getCurrentUser.pending]: (state) => {
            state.loading = "loading"
        },
        [getCurrentUser.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.currentUser = action.payload.user
        },
        [getCurrentUser.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        },
        [getAllUsers.pending]: (state) => {
            state.loading = "loading"
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.loading = "loaded"
            state.success = action.payload.success
            state.users = action.payload.users
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = "error"
            state.errorMsg = action.payload.error.message
        }
    }
});

//selectors
export const selectCurrentUser = state => state.user;

export const {resetUser} = userSlice.actions;
export default userSlice.reducer;