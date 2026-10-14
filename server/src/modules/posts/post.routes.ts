import { Router } from "express";
import { createPost, getPostById, getPosts, updatePost, deletePost, toggleLikePostController } from "./post.controller";
import { validate } from "../../core/middleware/validate.middleware";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { uploadSingleImage } from "../../core/middleware/upload.middleware";
import { createPostSchema, updatePostSchema } from "./post.schema";
import commentRoutes from "../comments/comment.routes";

const router = Router();

// Nested Comment Routes: /api/v1/posts/:postId/comments
router.use("/:postId/comments", commentRoutes);

// Create Post (Auth Required, image upload, schema validation)
router.post("/", authMiddleware, uploadSingleImage("image"), validate(createPostSchema), createPost);

// Get All Posts (Public)
router.get("/", getPosts);

// Get Post By ID (Public)
router.get("/:id", getPostById);

// Update Post (Auth Required & Owner Only)
router.patch("/:id", authMiddleware, uploadSingleImage("image"), validate(updatePostSchema), updatePost);

// Delete Post (Auth Required & Owner Only)
router.delete("/:id", authMiddleware, deletePost);


// Like / Unlike Post (Auth Required)
router.post("/:id/like", authMiddleware, toggleLikePostController);

export default router;