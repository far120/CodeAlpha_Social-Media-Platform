import express from "express";
import asyncHandler from "express-async-handler";
import {
  createCommentService,
  getPostCommentsService,
  updateCommentService,
  deleteCommentService,
} from "./comment.service";

export const createComment = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const postId = req.params.postId as string;
  const { content } = req.body;

  const comment = await createCommentService(postId, userId, content);

  res.status(201).json({
    status: "success",
    data: comment,
  });
});

export const getPostComments = asyncHandler(async (req: express.Request, res: express.Response) => {
  const postId = req.params.postId as string;
  const comments = await getPostCommentsService(postId);

  res.status(200).json({
    status: "success",
    results: comments.length,
    data: comments,
  });
});

export const updateComment = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const commentId = req.params.id as string;
  const { content } = req.body;

  const comment = await updateCommentService(commentId, userId, content);

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

export const deleteComment = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const commentId = req.params.id as string;

  await deleteCommentService(commentId, userId);

  res.status(200).json({
    status: "success",
    message: "Comment deleted successfully",
  });
});
