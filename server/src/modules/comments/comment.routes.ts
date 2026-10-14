import { Router } from "express";
import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} from "./comment.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { validate } from "../../core/middleware/validate.middleware";
import { createCommentSchema, updateCommentSchema } from "./comment.schema";

const router = Router({ mergeParams: true });

// Create comment on post: POST /api/v1/posts/:postId/comments
router.post("/", authMiddleware, validate(createCommentSchema), createComment);

// Get comments for post: GET /api/v1/posts/:postId/comments
router.get("/", getPostComments);

// Update comment: PATCH /api/v1/comments/:id
router.patch("/:id", authMiddleware, validate(updateCommentSchema), updateComment);

// Delete comment: DELETE /api/v1/comments/:id
router.delete("/:id", authMiddleware, deleteComment);

export default router;
