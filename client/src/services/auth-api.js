import axios from "axios";
const API_URL = import.meta.env.VITE_CLIENT_BASE_URL;

export const Register = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("❌ Error Data:", error.response.data);
      console.log("❌ Status:", error.response.status);
      console.log("❌ Headers:", error.response.headers);
    } else if (error.request) {
      console.log("❌ No Response Received:", error.request);
    } else {
      console.log("❌ Error", error.message);
    }
  }
};

export const Login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, user, {
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
