import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getTicketNotes = createAsyncThunk("ticket/getTicketNotes", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const {data} = await axios.get(`/api/tickets/${id}/notes`, config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const createTicketNote = createAsyncThunk("ticket/createTicketNotes", async ({ticketId, note}, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const ticketData = {
        note
    }

    try {
        const {data} = await axios.post(`/api/tickets/${ticketId}/notes`, ticketData, config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});
