import api from "../../utils/api.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentEmployee } from "../emp/empThunk.js";


const handleError = (error) =>
  error?.response?.data?.message || error.message || "Something went wrong";

// Thunk to get current user
export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/auth/me", { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(handleError(error));
        }
    }
);

// Thunk to login user and fetch current user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (credentials, { dispatch, rejectWithValue }) => {
      try {
        await api.post("/auth/login", credentials, { withCredentials: true });
        const user = await dispatch(getCurrentUser()).unwrap();
        try {
          await dispatch(getCurrentEmployee({ userId: user.data._id })).unwrap();
        } catch (error) {
          console.warn("Failed to fetch employee:", error);
        }
        return user;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    }
  );
  

