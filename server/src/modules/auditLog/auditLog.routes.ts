import { Router } from "express";
import { getAuditLogsController, clearAuditLogsController } from "./auditLog.controller";
import { authMiddleware } from "../../core/middleware/auth.middleware";
import { authorizationMiddleware } from "../../core/middleware/authorization.middleware";

const router = Router();


router.get("/activity", authMiddleware, authorizationMiddleware("super-admin"), getAuditLogsController);
router.delete("/clear", authMiddleware, authorizationMiddleware("super-admin"), clearAuditLogsController);

export default router;
