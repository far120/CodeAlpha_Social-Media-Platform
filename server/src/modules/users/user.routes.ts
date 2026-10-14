import { Router } from "express";
import {
  registerController,
  logInController,
  changePasswordController,
  getAllUsersController,
  getMeController,
  updateUserController,
  deleteUserController,
  blockUserController,
  roleOfUserController,
  createuserServicebySuperAdminController,
  toggleFollowController,
  getUserProfileController,
  AIAnalysisController,
  searchUsersController,
} from "./user.controller";
import { validate } from "../../core/middleware/validate.middleware";
import {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  updateUseSchema,
  roleOfUserSchema,
  deleteUserSchema,
  blockUserSchema,
  createuserServicebySuperAdminSchema,
} from "./user.schema";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";
import { uploadSingleImage } from "../../core/middleware/upload.middleware";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), logInController);
router.post("/change-password", authMiddleware, validate(changePasswordSchema), changePasswordController);
router.get("/all-users", authMiddleware, authorizationMiddleware("super-admin"), getAllUsersController);
router.get("/search", authMiddleware, searchUsersController);
router.get("/me", authMiddleware, getMeController);

// Update user profile (with avatar file upload)
router.put("/update/me", authMiddleware, uploadSingleImage("avatar"), validate(updateUseSchema), updateUserController);

// Toggle Follow / Unfollow user
router.post("/:id/follow", authMiddleware, toggleFollowController);

// Get User Profile with followers & following
router.get("/profile/:id", getUserProfileController);


router.delete("/delete/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(deleteUserSchema), deleteUserController);
router.put("/block/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(blockUserSchema), blockUserController);
router.put("/role/:id", authMiddleware, authorizationMiddleware("super-admin"), validate(roleOfUserSchema), roleOfUserController);
router.post("/create-user", authMiddleware, authorizationMiddleware("super-admin"), validate(createuserServicebySuperAdminSchema), createuserServicebySuperAdminController);
router.get("/ai-analysis", authMiddleware, AIAnalysisController);

export default router;