import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Department CRUD operations
export const getAllDepts = createAsyncThunk(
  "dept/getAllDepts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/dept/departments");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createDept = createAsyncThunk(
  "dept/createDept",
  async (deptData, { rejectWithValue }) => {
    try {
      const response = await api.post("/dept/create_dept", deptData.dept);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateDept = createAsyncThunk(
  "dept/updateDept",
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/dept/update-dept/${updateData.deptId}`,
        updateData.updates
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteDept = createAsyncThunk(
  "dept/deleteDept",
  async (deleteData, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/dept/delete_dept/${deleteData.deptId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Version control operations
export const getDeptVersions = createAsyncThunk(
  "dept/getVersions",
  async (deptId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/dept/${deptId}/versions`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const revertDeptVersion = createAsyncThunk(
  "dept/revertVersion",
  async ({ deptId, versionId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/dept/${deptId}/revert/${versionId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);