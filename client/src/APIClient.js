import HTTPClient from "./HTTPClient.js";
const API_BASE = `/api`;

const getAllItems = () => {
  return HTTPClient.get(`${API_BASE}/items`);
};

const getAllUsers = () => {
  return HTTPClient.get(`${API_BASE}/users`);
};

const getUserById = (id) => {
  return HTTPClient.get(`${API_BASE}/users/${id}`);
};

const getItemById = (id) => {
  return HTTPClient.get(`${API_BASE}/items/${id}`);
};

const addItem = (item) => {
  return HTTPClient.post(`${API_BASE}/items`, item)
}


export default {
  getAllUsers,
  getUserById,
  getItemById,
  getAllItems, 
  addItem
};