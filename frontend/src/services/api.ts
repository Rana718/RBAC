import axios, { AxiosError } from "axios";
import { User, Role } from "../types";

const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL);

interface ErrorResponse {
  message: string;
}
export const api = {
  // User endpoints
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data.message ||
          "Failed to fetch users. Please try again later.",
      );
    }
  },

  async createUser(user: Omit<User, "_id">): Promise<User> {
    try {
      const response = await axios.post<User>(`${API_URL}/users`, user);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw new Error(
        axiosError.response?.data.message ||
          "Failed to create user. Please check your input and try again.",
      );
    }
  },

  async updateUser(id: string, user: Omit<User, "_id">): Promise<User> {
    try {
      const response = await axios.put<User>(`${API_URL}/users/${id}`, user);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 404) {
        throw new Error("User not found");
      }
      if (axiosError.response?.status === 400) {
        throw new Error(
          axiosError.response.data.message || "Failed to update user",
        );
      }
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    console.log("Attempting to delete user with ID:", id);
    
    if (!id) {
      throw new Error("User ID is required");
    }

    try {
      await axios.delete(`${API_URL}/users/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;
      console.log("Delete error response:", axiosError.response?.data);
      if (axiosError.response?.status === 400) {
        throw new Error(axiosError.response.data.detail || "Invalid user ID");
      }
      if (axiosError.response?.data?.detail) {
        throw new Error(axiosError.response.data.detail);
      }
      throw new Error("Failed to delete user");
    }
  },

  // Role endpoints
  async getRoles(): Promise<Role[]> {
    try {
      const response = await axios.get<Role[]>(`${API_URL}/roles`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 500) {
        throw new Error(
          axiosError.response.data.message || "Failed to fetch roles",
        );
      }
      throw error;
    }
  },

  async updateRole(id: string, role: Omit<Role, "_id">): Promise<Role> {
    try {
      const response = await axios.put<Role>(`${API_URL}/roles/${id}`, role);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 404) {
        throw new Error("Role not found");
      }
      if (axiosError.response?.status === 400) {
        throw new Error(
          axiosError.response.data.message || "Failed to update role",
        );
      }
      throw error;
    }
  },

  async createRole(role: Omit<Role, "_id">): Promise<Role> {
    try {
      const response = await axios.post<Role>(`${API_URL}/roles`, role);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 400) {
        throw new Error(
          axiosError.response.data.message || "Failed to create role",
        );
      }
      throw error;
    }
  },

  async deleteRole(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/roles/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.status === 404) {
        throw new Error("Role not found");
      }
      if (axiosError.response?.status === 500) {
        throw new Error(
          axiosError.response.data.message || "Failed to delete role",
        );
      }
      throw error;
    }
  },
};
