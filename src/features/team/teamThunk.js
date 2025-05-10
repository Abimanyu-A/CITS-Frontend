import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const getAllTeams = createAsyncThunk(
    "team/getTeams",
    async(_, { rejectWithValue }) => {
        try {
            const response = await api.get("/team/get-all-teams",{ withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch teams");
        }
    }
);

export const deleteTeam = createAsyncThunk(
    "team/deleteTeam",
    async({ teamId }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/team/delete-team/${teamId}`, { withCredentials: true });
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete team");
        }
    }
)

export const updateTeam = createAsyncThunk(
    "team/updateTeam", 
    async({ teamId, updates }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/team/update-team/${teamId}`, updates, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update team");
        }
    }
)

export const createTeam = createAsyncThunk(
    "team/createTeam",
    async ({ team }, { rejectWithValue }) => {
        console.log(team);
        try {
            const response = await api.post("/team/create", team, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to create team");
        }
    }
);

export const assignTeamToDept = createAsyncThunk(
  'team/assignToDept',
  async ({ teamId, deptId }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/team/${teamId}/assign-dept`, { deptId });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);