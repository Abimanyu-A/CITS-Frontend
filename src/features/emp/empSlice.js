import { createSlice } from "@reduxjs/toolkit";
import { updateEmployeeProfile, getCurrentEmployee, getAllEmployees, deleteEmployee } from "./empThunk";

const empSlice = createSlice({
  name: "emp",
  initialState: {
    employee: null,
    status: "idle",
    error: null,
    allEmployee: [],
    allStatus: "idle",
    allError: null,
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
      })
      .addCase(getAllEmployees.pending, (state) => {
        state.allEmployeesStatus = "loading";
        state.allEmployeesError = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.allEmployeesStatus = "succeeded";
        state.allEmployees = action.payload;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.allEmployeesStatus = "failed";
        state.allEmployeesError = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.allEmployee = state.allEmployee.filter(
          emp => emp._id !== action.payload.data._id
        );
        state.success = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});


export const { setEmployee, clearEmployee } = empSlice.actions;
export default empSlice.reducer;