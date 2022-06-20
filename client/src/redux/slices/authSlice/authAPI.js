import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("auth/registerUser", async (signupCredentials, thunkAPI) => {
    try {
        const {data} = await axios.post("/api/auth/register", signupCredentials);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const loginUser = createAsyncThunk("auth/loginUser", async (loginCredentials, thunkAPI) => {
    try {
        const {data} = await axios.post("/api/auth/login", loginCredentials);
        if (data) {localStorage.setItem("user", JSON.stringify(data.user))}
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("user");
});