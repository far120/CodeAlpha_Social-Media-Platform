import { Post } from "./post.model";
import type { Ipost } from "./post.types";
import AppError from "../../core/errors/AppError";
import User from "../users/user.model";

export const createPostService = async (postData: Partial<Ipost>) => {
  const newPost = await Post.create(postData);
  await User.findByIdAndUpdate(postData.user, { $push: { posts: newPost._id } });
  return await newPost.populate("user", "firstName lastName avatar email");
};

export const getPostsService = async (query: any = {}) => {
  return await Post.find(query)
    .populate("user", "firstName lastName avatar email")
    .populate({
      path: "comments",
      populate: { path: "user", select: "firstName lastName avatar" },
    })
    .sort({ createdAt: -1 });
};

export const getPostService = async (id: string) => {
  const post = await Post.findById(id)
    .populate("user", "firstName lastName avatar email")
    .populate({
      path: "comments",
      populate: { path: "user", select: "firstName lastName avatar" },
    })
    .populate("likes", "firstName lastName avatar");

  if (!post) {
    throw new AppError("Post not found", 404);
  }
  return post;
};

export const updatePostService = async (id: string, updateData: Partial<Ipost>, userId: string) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  
  if (post.user.toString() !== userId.toString()) {
    throw new AppError("Unauthorized: You can only update your own posts", 403);
  }

  const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    .populate("user", "firstName lastName avatar email");
  
  await User.findByIdAndUpdate(userId, { $push: { posts: updatedPost?._id } });
    
  return updatedPost;
};

export const deletePostService = async (id: string, userId: string) => {
  const post = await Post.findById(id);
  if (!post) {
    throw new AppError("Post not found", 404);
  }
  
  if (post.user.toString() !== userId.toString()) {
    throw new AppError("Unauthorized: You can only delete your own posts", 403);
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  await User.findByIdAndUpdate(userId, { $pull: { posts: id } });

  return deletedPost;
};

export const toggleLikePostService = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const isLiked = post.likes.some((id) => id.toString() === userId.toString());

  if (isLiked) {
    await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
  } else {
    await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
  }

  const updatedPost = await Post.findById(postId)
    .populate("user", "firstName lastName avatar email")
    .populate("likes", "firstName lastName avatar");

  return {
    isLiked: !isLiked,
    likesCount: updatedPost?.likes.length || 0,
    post: updatedPost,
  };
};