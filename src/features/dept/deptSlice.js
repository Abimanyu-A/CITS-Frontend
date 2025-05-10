import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllDepts, 
  deleteDept, 
  updateDept, 
  createDept,
  getDeptVersions,
  revertDeptVersion
} from "./deptThunk";

const initialState = {
  depts: [],
  versions: [], // For storing version history
  status: "idle",
  error: null,
  hasFetched: false,
  versionStatus: "idle", // Separate status for version operations
};

const deptSlice = createSlice({
  name: "dept",
  initialState,
  reducers: {
    resetDepts: () => initialState,
    clearVersions: (state) => {
      state.versions = [];
      state.versionStatus = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Department CRUD operations
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
        state.error = action.payload || action.error.message;
      })
      .addCase(createDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.depts.push(action.payload.data);
      })
      .addCase(createDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(updateDept.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDept.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.depts.findIndex(
          (dept) => dept._id === action.payload.data._id
        );
        if (index !== -1) {
          state.depts[index] = action.payload.data;
        }
      })
      .addCase(updateDept.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
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
        state.error = action.payload || action.error.message;
      })
      
      // Version control operations
      .addCase(getDeptVersions.pending, (state) => {
        state.versionStatus = "loading";
      })
      .addCase(getDeptVersions.fulfilled, (state, action) => {
        state.versionStatus = "succeeded";
        state.versions = action.payload.data;
      })
      .addCase(getDeptVersions.rejected, (state, action) => {
        state.versionStatus = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(revertDeptVersion.pending, (state) => {
        state.versionStatus = "loading";
      })
      .addCase(revertDeptVersion.fulfilled, (state, action) => {
        state.versionStatus = "succeeded";
        const index = state.depts.findIndex(
          (dept) => dept._id === action.payload.data._id
        );
        if (index !== -1) {
          state.depts[index] = action.payload.data;
        }
      })
      .addCase(revertDeptVersion.rejected, (state, action) => {
        state.versionStatus = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetDepts, clearVersions } = deptSlice.actions;
export default deptSlice.reducer;