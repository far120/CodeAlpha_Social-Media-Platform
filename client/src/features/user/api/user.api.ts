import axiosClient from "../../../lib/axios";
import type { Iuser, IUpdateUserData, ICreateUserServicebySuperAdminData } from "../types/user.types";

export const getAllUsers = async (page = 1, limit = 10, search = "", role = ""): Promise<any> => {
  try {
    const params = new URLSearchParams();
    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));
    if (search && search.trim()) {
      params.append("search", search.trim());
      params.append("keyword", search.trim());
    }
    if (role && role !== "all") params.append("role", role);

    const response = await axiosClient.get(`/users/all-users?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async (query: string): Promise<Iuser[]> => {
  if (!query || !query.trim()) return [];
  try {
    const response = await axiosClient.get(`/users/search?q=${encodeURIComponent(query.trim())}`);
    return response.data?.data || [];
  } catch (error) {
    return [];
  }
};

export const fetchUserProfile = async (): Promise<Iuser> => {
  try {
    const response = await axiosClient.get("/users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (userData: IUpdateUserData): Promise<Iuser> => {
  try {
    const response = await axiosClient.put("/users/update/me", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string): Promise<Iuser> => {
  try {
    const response = await axiosClient.delete(`/users/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const blockUser = async (id: string): Promise<Iuser> => {
  try {
    const response = await axiosClient.put(`/users/block/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changeRoleUser = async (id: string, role: string): Promise<Iuser> => {
  try {
    const response = await axiosClient.put(`/users/role/${id}`, { role });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePasswordUser = async (
  oldPassword: string,
  newPassword: string,
  confirmPassword?: string
): Promise<Iuser> => {
  try {
    const response = await axiosClient.post("/users/change-password", {
      oldPassword,
      newPassword,
      confirmPassword: confirmPassword || newPassword,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createServicebySuperAdmin = async (
  userServiceData: ICreateUserServicebySuperAdminData
): Promise<Iuser> => {
  try {
    const response = await axiosClient.post("/users/create-user", userServiceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const aiAnalysis = async (): Promise<Iuser> => {
  try {
    const response = await axiosClient.get("/users/ai-analysis");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleFollow = async (id: string): Promise<any> => {
  try {
    const response = await axiosClient.post(`/users/${id}/follow`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async (id: string): Promise<Iuser> => {
  try {
    const response = await axiosClient.get(`/users/profile/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
