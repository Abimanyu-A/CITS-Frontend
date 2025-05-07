import { createSlice } from "@reduxjs/toolkit";
import { getAllDepts, deleteDept, updateDept, createDept } from "./deptThunk";

const initialState = {
  depts: [],
  status: "idle",
  error: null,
  hasFetched: false,
};

const deptSlice = createSlice({
  name: "dept",
  initialState,
  reducers: {
    resetDepts: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDepts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllDepts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.depts = action.payload.data;
        state.hasFetched = true;
      })
      .addCase(getAllDepts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.depts.push(action.payload);
      })
      .addCase(createDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.depts.findIndex(
          (dept) => dept._id === action.payload._id
        );
        if (index !== -1) {
          state.depts[index] = action.payload;
        }
      })
      .addCase(updateDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.depts = state.depts.filter(
          (dept) => dept._id !== action.payload.data._id
        );
      })
      .addCase(deleteDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { resetDepts } = deptSlice.actions;
export default deptSlice.reducer;