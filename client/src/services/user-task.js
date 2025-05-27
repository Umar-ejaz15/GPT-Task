// services/task-by.ts
import axios from "axios";

const API_URL = `${import.meta.env.VITE_CLIENT_BASE_URL}`;

export const GetTaskById = async (userID) => {
  try {
    const response = await axios.get(`${API_URL}/task/${userID}`, {
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
export const UpdateTaskDetailsByID = async (userID, taskDetails) => {
  try {
    const response = await axios.patch(`${API_URL}/task/${userID}`,taskDetails, {
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
