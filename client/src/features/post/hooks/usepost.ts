import type {
  Ipost,
  ICreatePostData,
} from "../type/post.types";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAllPost,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  toggleLikePost,
} from "../api/post.api";

// ========================================
// Get All Posts
// ========================================

export const useGetAllPost = () => {
  return useQuery<Ipost[]>({
    queryKey: ["posts"],
    queryFn: getAllPost,
  });
};

// ========================================
// Create Post
// ========================================

export const useCreatePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      post: ICreatePostData
    ) => createPost(post),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });
};

// ========================================
// Get Post By ID
// ========================================

export const useGetPostById = (
  id: string
) => {
  return useQuery<Ipost>({
    queryKey: ["posts", id],

    queryFn: () =>
      getPostById(id),

    enabled: Boolean(id),
  });
};

// ========================================
// Update Post
// ========================================

export const useUpdatePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      post,
    }: {
      id: string;
      post: Partial<Ipost>;
    }) =>
      updatePost(id, post),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });
};

// ========================================
// Delete Post
// ========================================

export const useDeletePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) => deletePost(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });
};

// ========================================
// Toggle Like
// ========================================

export const useToggleLikePost = () => {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string
    ) => toggleLikePost(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });
};