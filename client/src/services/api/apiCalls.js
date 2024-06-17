import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const url = import.meta.env.DEV_SERVER;
const url = "http://localhost:5000";

export const registerUser = async ({ businessName, email, password }) => {
  try {
    const response = await axios.post(`${url}/auth/register`, {
      businessName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Registration error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const login = async ({ email, password }) => {
  console.log("url:", url);
  try {
    const response = await axios.post(`${url}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const authorization = async ({ token }) => {
  try {
    const response = await axios.get(`${url}/protected`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Authorization error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
