import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getCurrentUser } from "./authThunk";
import api from "../../utils/api";

// Auth slice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        status: "idle",
        error: null,
        lastActivity: Date.now(),
        firstLogin: null,
    },
    reducers: {
      logout(state) {
        state.user = null;
        state.status = "idle";
        state.error = null;
      },

      updateSessionActivity(state) {
        state.lastActivity = Date.now();
      },

      resetError(state) {
        state.error = null;
      },

      setFirstLogin(state) {
        state.firstLogin = false;
      }
    },
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
                state.firstLogin = action.payload.data.firstLogin;
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


export const logoutUser = () => async (dispatch) => {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
    dispatch(logout());
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

export const { logout, updateSessionActivity, resetError, setFirstLogin } = authSlice.actions;
export default authSlice.reducer;