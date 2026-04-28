import axios from 'axios';

const API = 'http://localhost:5000/users';

// Types (recommended for TS)
export interface User {
  id?: number;
  name: string;
  email: string;
}

// 🔍 Get all users (Admin)
export const getUsers = () => {
  return axios.get<User[]>(API);
};

// 🔍 Get user by ID
export const getUserById = (id: number) => {
  return axios.get<User>(`${API}/${id}`);
};

// 🔍 Get user by email (used for logged-in user)
export const getUserByEmail = (email: string) => {
  return axios.get<User[]>(`${API}?email=${email}`);
};

// ➕ Create user (Admin)
export const createUser = (data: User) => {
  return axios.post<User>(API, data);
};

// ✏️ Update user
export const updateUser = (id: number, data: User) => {
  return axios.put<User>(`${API}/${id}`, data);
};

// ❌ Delete user (Admin)
export const deleteUser = (id: number) => {
  return axios.delete(`${API}/${id}`);
};