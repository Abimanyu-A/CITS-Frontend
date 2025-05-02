import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getCurrentEmployee = createAsyncThunk(
    "emp/getCurrent",
    async ({ userId }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/emp/get-employee/${userId}`, { withCredentials: true});
        console.log(response)
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch current employee");
      }
    }
  )
  

export const updateEmployeeProfile = createAsyncThunk(
  "emp/updateProfile",
  async ({ employeeId, updates }, { rejectWithValue }) => {
    try {
      // Create a FormData instance to handle both text and files
      const formData = new FormData();
      console.log(updates)
      console.log(employeeId)

      // Append text data
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
      
      // Append the photo file
      if (updates.photo) {
        formData.append("photo", updates.photo);
      }
      
      // Append document files
      if (updates.documents && updates.documents.length > 0) {
        updates.documents.forEach((doc) => {
          formData.append("documents", doc);
        });
      }

      // Send the request with the FormData object
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