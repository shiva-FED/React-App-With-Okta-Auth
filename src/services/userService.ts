import type { User } from "../types/user";
import API from "./api";

export const getUsers = () => {
  return API.get<User[]>("/users");
};

export const getUserByEmail = (email: string) => {
  return API.get<User[]>(`/users?email=${email}`);
};

export const updateUser = (id: number, data?: User) => {
  return API.put<User>(`/users/${id}`, data);
};

export const deleteuser = (id: number) => {
  return API.delete(`/users/${id}`);
};