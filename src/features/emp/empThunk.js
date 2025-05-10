import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getCurrentEmployee = createAsyncThunk(
    "emp/getCurrent",
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/emp/get-employee/${userId}`, { withCredentials: true});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch current employee");
      }
    }
);

export const updateEmployeeProfile = createAsyncThunk(
  "emp/updateProfile",
  async ({ employeeId, updates }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      
      Object.keys(updates).forEach((key) => {
        if (
          updates[key] !== undefined &&
          key !== "photo" &&
          key !== "documents"
        ) {
          const value = updates[key];
          formData.append(key, typeof value === "object" ? JSON.stringify(value) : value);
        }
      });
      
      if (updates.photo) {
        formData.append("photo", updates.photo);
      }
      
      if (updates.documents && updates.documents.length > 0) {
        updates.documents.forEach((doc) => {
          formData.append("documents", doc);
        });
      }

      const response = await api.put(`/emp/update-profile/${employeeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, 
      });

      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  "emp/getAllEmployees",
  async(_, { rejectWithValue }) => {
    try {
      const response = await api.get('/emp/all-employees', { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to get all employees");
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "emp/deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/emp/delete-employee/${id}`, { 
        withCredentials: true 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete employee");
    }
  }
);

export const updateEmployeeDepartment = createAsyncThunk(
  "emp/updateDepartment",
  async ({ employeeId, newDept }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/emp/dept-details/${employeeId}`,
        { newDept },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update department");
    }
  }
);

export const updateEmployeeTeam = createAsyncThunk(
  "emp/updateTeam",
  async ({ employeeId, newTeam }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/emp/dept-teams/${employeeId}`,
        { newTeam },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update team");
    }
  }
);