import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  records: [],
  currentRecord: null,
  employeeRecords: [],
  summary: {},
  loading: false,
  error: null,
  pagination: {
    page: 1,
    totalPages: 1,
    totalRecords: 0
  }
};

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // For admins/managers
    recordsFetched: (state, { payload }) => {
      state.records = payload.records;
      state.pagination = {
        page: payload.currentPage,
        totalPages: payload.totalPages,
        totalRecords: payload.totalRecords
      };
      state.loading = false;
    },
    // For employees
    employeeRecordsFetched: (state, { payload }) => {
      state.employeeRecords = payload.records;
      state.summary = payload.summary;
      state.loading = false;
    },
    recordFetched: (state, { payload }) => {
      state.currentRecord = payload;
      state.loading = false;
    },
    recordCreated: (state, { payload }) => {
      state.records.unshift(payload);
      state.loading = false;
    },
    recordUpdated: (state, { payload }) => {
      const index = state.records.findIndex(r => r._id === payload._id);
      if (index !== -1) state.records[index] = payload;
      if (state.currentRecord?._id === payload._id) state.currentRecord = payload;
      
      // Update in employee records if exists
      const empIndex = state.employeeRecords.findIndex(r => r._id === payload._id);
      if (empIndex !== -1) state.employeeRecords[empIndex] = payload;
      
      state.loading = false;
    },
    recordDeleted: (state, { payload }) => {
      state.records = state.records.filter(r => r._id !== payload);
      state.employeeRecords = state.employeeRecords.filter(r => r._id !== payload);
      if (state.currentRecord?._id === payload) state.currentRecord = null;
      state.loading = false;
    },
    bulkRecordsCreated: (state, { payload }) => {
      state.records = [...payload, ...state.records];
      state.loading = false;
    },
    resetAttendanceState: (state) => {
      state.currentRecord = null;
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  recordsFetched,
  employeeRecordsFetched,
  recordFetched,
  recordCreated,
  recordUpdated,
  recordDeleted,
  bulkRecordsCreated,
  resetAttendanceState
} = attendanceSlice.actions;

export default attendanceSlice.reducer;