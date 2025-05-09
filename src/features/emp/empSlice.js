import { createSlice } from "@reduxjs/toolkit";
import { 
  updateEmployeeProfile, 
  getCurrentEmployee, 
  getAllEmployees, 
  deleteEmployee,
  updateEmployeeDepartment,
  updateEmployeeTeam
} from "./empThunk";

const empSlice = createSlice({
  name: "emp",
  initialState: {
    employee: null,
    status: "idle",
    error: null,
    allEmployees: [],
    allEmployeesStatus: "idle",
    allEmployeesError: null,
    updateStatus: "idle",
    updateError: null,
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
        state.allEmployees = state.allEmployees.filter(
          emp => emp._id !== action.payload.data._id
        );
        state.success = true;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployeeDepartment.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateEmployeeDepartment.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        // Update the employee in state if it's the current employee
        if (state.employee && state.employee._id === action.payload.data._id) {
          state.employee = action.payload.data;
        }
        // Update the employee in allEmployees list if it exists there
        state.allEmployees = state.allEmployees.map(emp => 
          emp._id === action.payload.data._id ? action.payload.data : emp
        );
      })
      .addCase(updateEmployeeDepartment.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      })
      .addCase(updateEmployeeTeam.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateEmployeeTeam.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        // Update the employee in state if it's the current employee
        if (state.employee && state.employee._id === action.payload.data._id) {
          state.employee = action.payload.data;
        }
        // Update the employee in allEmployees list if it exists there
        state.allEmployees = state.allEmployees.map(emp => 
          emp._id === action.payload.data._id ? action.payload.data : emp
        );
      })
      .addCase(updateEmployeeTeam.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload;
      });
  }
});

export const { setEmployee, clearEmployee } = empSlice.actions;
export default empSlice.reducer;