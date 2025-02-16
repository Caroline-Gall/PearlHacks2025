import HTTPClient from "./HTTPClient.js";
const API_BASE = `/api`;

const createUser = (first_name, last_name, email, file_num, file_type, role_id, county_id, company_id, is_admin) => {
  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    file_num: file_num,
    file_type: file_type,
    role_id: role_id,
    county_id: county_id,
    company_id: company_id,
    is_admin: is_admin
  }
  return HTTPClient.post(`${API_BASE}/users`, data);
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
  createUser,
  getAllUsers,
  getUserById,
  getItemById
};