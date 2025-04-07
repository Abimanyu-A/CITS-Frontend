import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async(_, { rejectWithValue }) => {
        try {
            const response = await api.get("/auth/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error?.data?.message || "Failed to fetch the User details");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async(credentials, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/auth/login", credentials, { withCredentials: true });
            await dispatch(getCurrentUser());
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to login User");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {user: null, status: "idle", error: null},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;