import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUser = createAsyncThunk("user/getCurrentUser", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const {data} = await axios.get("/api/users/profile", config);
        if (data) localStorage.setItem("currentUser", JSON.stringify(data.user));
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});