import axios from 'axios';
const BASE_URL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const getExternalAPI = async (currentPage) => {
  try {
    const response = await api.get(`/todos/${currentPage}`);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};