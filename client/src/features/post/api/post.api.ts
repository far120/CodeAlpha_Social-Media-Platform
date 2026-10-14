import type { Ipost, ICreatePostData } from "../type/post.types";
import axiosClient from "../../../lib/axios";

export const createPost = async (post: ICreatePostData): Promise<Ipost> => {
  const response = await axiosClient.post("/posts", post);
  return response.data?.data ?? response.data;
};

export const getAllPost = async (): Promise<Ipost[]> => {
  const response = await axiosClient.get("/posts");
  return response.data?.data ?? response.data;
};

export const getPostById = async (id: string): Promise<Ipost> => {
  const response = await axiosClient.get(`/posts/${id}`);
  return response.data?.data ?? response.data;
};

export const updatePost = async (id: string, post: Partial<Ipost>): Promise<Ipost> => {
  const response = await axiosClient.patch(`/posts/${id}`, post);
  return response.data?.data ?? response.data;
};

export const deletePost = async (id: string): Promise<Ipost> => {
  const response = await axiosClient.delete(`/posts/${id}`);
  return response.data?.data ?? response.data;
};

export const toggleLikePost = async (id: string): Promise<any> => {
  const response = await axiosClient.post(`/posts/${id}/like`);
  return response.data?.data ?? response.data;
};
