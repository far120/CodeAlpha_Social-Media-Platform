import type { IPopulatedComment } from "../type/comment.types";
import axiosClient from "../../../lib/axios";

export const createComment = async (postId: string, content: string): Promise<IPopulatedComment> => {
  const response = await axiosClient.post(`/posts/${postId}/comments`, { content });
  return response.data?.data ?? response.data;
};

export const getAllComment = async (postId: string): Promise<IPopulatedComment[]> => {
  const response = await axiosClient.get(`/posts/${postId}/comments`);
  return response.data?.data ?? response.data;
};

export const getCommentById = async (postId: string, id: string): Promise<IPopulatedComment> => {
  const response = await axiosClient.get(`/posts/${postId}/comments/${id}`);
  return response.data?.data ?? response.data;
};

export const updateComment = async (postId: string, id: string, content: string): Promise<IPopulatedComment> => {
  const response = await axiosClient.patch(`/posts/${postId}/comments/${id}`, { content });
  return response.data?.data ?? response.data;
};

export const deleteComment = async (postId: string, id: string): Promise<any> => {
  const response = await axiosClient.delete(`/posts/${postId}/comments/${id}`);
  return response.data?.data ?? response.data;
};