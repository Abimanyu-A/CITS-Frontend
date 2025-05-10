import { createSlice } from "@reduxjs/toolkit";
import { deleteTeam, updateTeam, getAllTeams, assignTeamToDept } from "./teamThunk";

const teamSlice = createSlice({
    name: "team",
    initialState: {
        teams: [],
        hasFetched: false,
        status: "idle",
        error: null
    },
    reducers: {
        resetTeams: (state) => {
            state.teams = [];
            state.hasFetched = false;
            state.status = "idle";
            state.error = null;
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllTeams.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })
        .addCase(getAllTeams.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.teams = action.payload.data;
            state.hasFetched = true;
        })
        .addCase(getAllTeams.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(deleteTeam.fulfilled, (state, action) => {
            const teamId = action.meta.arg.teamId;
            state.teams = state.teams.filter(team => team._id !== teamId);
        })
        .addCase(updateTeam.fulfilled, (state, action) => {
            const updatedTeam = action.payload;
            state.teams = state.teams.map(team => 
                team._id === updatedTeam._id ? updateTeam : team
            );
        })
        .addCase(assignTeamToDept.fulfilled, (state, action) => {
            const updatedTeam = action.payload;
            state.teams = state.teams.map(team => 
                team._id === updatedTeam._id ? updatedTeam : team
            );
        });
    }
});

export const { resetTeams } = teamSlice.actions;
export default teamSlice.reducer;