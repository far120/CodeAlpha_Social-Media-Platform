import express from "express";
import asyncHandler from "express-async-handler";
import {
  createPostService,
  getPostService,
  getPostsService,
  updatePostService,
  deletePostService,
  toggleLikePostService,
} from "./post.service";

export const createPost = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;

  const postData = {
    ...req.body,
    user: userId,
    image: imagePath,
  };

  const post = await createPostService(postData);
  res.status(201).json({
    status: "success",
    data: post,
  });
});

export const getPosts = asyncHandler(async (req: express.Request, res: express.Response) => {
  const posts = await getPostsService(req.query);
  res.status(200).json({
    status: "success",
    data: posts,
  });
});

export const getPostById = asyncHandler(async (req: express.Request, res: express.Response) => {
  const post = await getPostService(req.params.id as string);
  res.status(200).json({
    status: "success",
    data: post,
  });
});

export const updatePost = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const updateData = { ...req.body };
  
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const post = await updatePostService(req.params.id as string, updateData, userId);
  res.status(200).json({
    status: "success",
    data: post,
  });
});

export const deletePost = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  await deletePostService(req.params.id as string, userId);
  
  res.status(200).json({
    status: "success",
    message: "Post deleted successfully",
  });
});

export const toggleLikePostController = asyncHandler(async (req: express.Request, res: express.Response) => {
  const userId = (req as any).user?._id || req.user.id;
  const result = await toggleLikePostService(req.params.id as string, userId);
  
  res.status(200).json({
    status: "success",
    data: result,
  });
});
