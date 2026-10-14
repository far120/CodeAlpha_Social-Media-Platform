import type { IPopulatedComment } from "../type/comment.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllComment, createComment, updateComment, deleteComment } from "../api/comment.api";

export const useGetAllComment = (postId: string) => {
  return useQuery<IPopulatedComment[]>({
    queryKey: ["comments", postId],
    queryFn: () => getAllComment(postId),
    enabled: Boolean(postId),
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, content }: { postId: string; content: string }) =>
      createComment(postId, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, id, content }: { postId: string; id: string; content: string }) =>
      updateComment(postId, id, content),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, id }: { postId: string; id: string }) =>
      deleteComment(postId, id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["comments", variables.postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};