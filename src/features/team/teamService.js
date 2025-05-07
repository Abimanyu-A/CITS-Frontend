import api from "../../utils/api";

export const getAllTeams = async () => {
    try {
        await api.post("team/get", {
            withcredentials: true,
        });
    } catch (error) {
        throw error.response?.data || new Error("Creation failed");
    }
};