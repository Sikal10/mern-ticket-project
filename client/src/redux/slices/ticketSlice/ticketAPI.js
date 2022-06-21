import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const createTicket = createAsyncThunk("ticket/createTicket", async (ticketData, thunkAPI) => {
    /** this helps to get the token from the authState since it's a protected route */
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        console.log("func fired")
        const {data} = await axios.post("/api/tickets", ticketData, config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const getTickets = createAsyncThunk("ticket/getTickets", async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const {data} = await axios.get("/api/tickets", config);
        return data;
    } catch (err) {
        console.log(err.response);
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const getTicket = createAsyncThunk("ticket/getTicket", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    try {
        const {data} = await axios.get(`/api/tickets/${id}`, config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const closeTicket = createAsyncThunk("ticket/closeTicket", async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const closeTicketData = {
        status: "closed"
    }

    try {
        const {data} = await axios.put(`/api/tickets/${id}`, closeTicketData, config);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});

export const updateTicket = createAsyncThunk("ticket/updateTicket", async (ticketData, thunkAPI) => {
    try {
        const {data} = await axios.put("/api/auth/register", ticketData);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});


export const deleteTicket = createAsyncThunk("ticket/deleteTicket", async (id, thunkAPI) => {
    try {
        const {data} = await axios.delete(`/api/tickets/${id}`);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue({error: err.response.data})
    }
});