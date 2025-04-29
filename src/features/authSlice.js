import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Thunk to get current user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/auth/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch user details"
            );
        }
    }
);

// Thunk to login user and fetch current user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { dispatch, rejectWithValue }) => {
        try {
            await api.post("/auth/login", credentials, { withCredentials: true });

            // Dispatch getCurrentUser and unwrap result
            const user = await dispatch(getCurrentUser()).unwrap();
            return user;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error.message || "Failed to login user"
            );
        }
    }
);

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // loginUser
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })

            // getCurrentUser
            .addCase(getCurrentUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
