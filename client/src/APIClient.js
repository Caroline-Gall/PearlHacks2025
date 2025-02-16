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

const getPurchasedItems = (id) => {
  return HTTPClient.get(`${API_BASE}/users/${id}/purchased`);
};

const generateSavingsReport = (data) => {
  return HTTPClient.post(`${API_BASE}/savings`, data);
};


export default {
  getAllUsers,
  getUserById,
  getItemById,
  getAllItems,
  getPurchasedItems,
  generateSavingsReport
};