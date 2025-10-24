import axios from 'axios';
const BASE_URL = "api/auth";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const login = async (email, password) => {
  try {
    const response  = await api.post("/login", {
      email,
      password,
    });
    return response; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/logout");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};


export const getMe = async () => {
  try {
    const response = await api.get("/me");
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createUser = async (email, password) => {
  try {
    const { data } = await api.post("/register", {
      email,
      password,
    });

    return data; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post("/forgot-password", {
      email,
    });

    return data; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    console.log("Front: reset password called", token, newPassword)
    const { data } = await api.post("/reset-password", {
      token,
      newPassword
    },
    { withCredentials: true } );

    return data; 
  } catch (err) {
    console.error(err);
    throw err;
  }
};

let onUnauthorizedLogout = null; // callback géré par le contexte

export const setLogoutHandler = (fn) => {
  onUnauthorizedLogout = fn;
};

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const isMeRequest = err.config?.url?.includes("/me");
      if (!isMeRequest && onUnauthorizedLogout) {
        console.warn("Expired session - Deconnecting user");
        onUnauthorizedLogout();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
