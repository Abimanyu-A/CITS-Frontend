import api from "../../utils/api";

export const registerEmployee = async (formData) => {
    try {
      await api.post("emp/register", formData, {
        withCredentials: true,
      });
    } catch (error) {
      throw error.response?.data || new Error("Registration failed");
    }
  };


export const updateEmployee = async (employeeId, updates) => {
  try {
    const response = await api.put(`/emp/update-profile/${employeeId}`, updates, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update profile");
  }
};
