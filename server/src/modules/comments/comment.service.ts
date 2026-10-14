import { Comment } from "./comment.model";
import { Post } from "../posts/post.model";
import AppError from "../../core/errors/AppError";

export const createCommentService = async (postId: string, userId: string, content: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  const comment = await Comment.create({
    post: postId,
    user: userId,
    content,
  });

  await Post.findByIdAndUpdate(postId, {
    $push: { comments: comment._id },
  });

  return await comment.populate("user", "firstName lastName avatar email");
};

export const getPostCommentsService = async (postId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError("Post not found", 404);
  }

  return await Comment.find({ post: postId })
    .populate("user", "firstName lastName avatar email")
    .sort({ createdAt: -1 });
};

export const updateCommentService = async (commentId: string, userId: string, content: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  if (comment.user.toString() !== userId.toString()) {
    throw new AppError("Unauthorized: You can only edit your own comments", 403);
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true, runValidators: true }
  ).populate("user", "firstName lastName avatar email");

  return updatedComment;
};

export const deleteCommentService = async (commentId: string, userId: string) => {
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new AppError("Comment not found", 404);
  }

  const post = await Post.findById(comment.post);
  const isPostOwner = post && post.user.toString() === userId.toString();
  const isCommentOwner = comment.user.toString() === userId.toString();

  if (!isCommentOwner && !isPostOwner) {
    throw new AppError("Unauthorized: You cannot delete this comment", 403);
  }

  await Post.findByIdAndUpdate(comment.post, {
    $pull: { comments: comment._id },
  });

  return await Comment.findByIdAndDelete(commentId);
};
