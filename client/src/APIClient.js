import HTTPClient from "./HTTPClient.js";
const API_BASE = `/api`;

const getAllItems = () => {
  return HTTPClient.get(`${API_BASE}/items`);
};

const getAllUsers = () => {
  return HTTPClient.get(`${API_BASE}/users`);
};

const getUserById = (id) => {
  return HTTPClient.get(`${API_BASE}/items/${id}`);
};

const getItemById = (id) => {
  return HTTPClient.get(`${API_BASE}/items/${id}`);
};


export default {
  getAllUsers,
  getUserById,
  getItemById,
  getAllItems
};