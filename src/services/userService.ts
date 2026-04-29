import axios from 'axios';

const API = 'http://localhost:5000/users';

export interface User {
  id?: number;
  name: string;
  email: string;
}

export const getUsers = () => {
  return axios.get<User[]>(API);
};

export const getUserById = (id: number) => {
  return axios.get<User>(`${API}/${id}`);
};

export const getUserByEmail = (email: string) => {
  return axios.get<User[]>(`${API}?email=${email}`);
};

export const createUser = (data: User) => {
  return axios.post<User>(API, data);
};

export const updateUser = (id: number, data: User) => {
  return axios.put<User>(`${API}/${id}`, data);
};

export const deleteUser = (id: number) => {
  return axios.delete(`${API}/${id}`);
};