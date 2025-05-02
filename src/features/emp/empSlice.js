import { createSlice } from "@reduxjs/toolkit";
import { updateEmployeeProfile, getCurrentEmployee } from "./empThunk";

const empSlice = createSlice({
  name: "emp",
  initialState: {
    employee: null,
    status: "idle",
    error: null
  },
  reducers: {
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    clearEmployee: (state) => {
      state.employee = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateEmployeeProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateEmployeeProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload.employee;
      })
      .addCase(updateEmployeeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getCurrentEmployee.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getCurrentEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload.data;
      })
      .addCase(getCurrentEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { setEmployee, clearEmployee } = empSlice.actions;
export default empSlice.reducer;