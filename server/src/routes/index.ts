import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import auditLogRoutes from "../modules/auditLog/auditLog.routes";
import postRoutes from "../modules/posts/post.routes";
import commentRoutes from "../modules/comments/comment.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/logs", auditLogRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

export default router;