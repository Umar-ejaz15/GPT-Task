// services/task-by-admin.ts
import axios from "axios";

const API_URL = `${import.meta.env.VITE_CLIENT_BASE_URL}`;

export const AssignTask = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/admin/task/assign`, user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetTask = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/task`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/admin/task/${taskId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response.data);
    

    return response.data;

  } catch (error) {
    throw error;
  }
};
export const GetUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/users`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteUserById = async (userID) => {
  try {
    const response = await axios.delete(`${API_URL}/admin/users/${userID}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

    });
  } catch (error) {}
};
