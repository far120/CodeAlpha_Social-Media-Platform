import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "../logger/logger";
import auditLogModel from "../../modules/auditLog/auditLog.model";

export const userActivityLogger = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();

    // Attempt to decode user information from authorization token if req.user is not set yet
    let userEmail = "Guest";
    let userRole = "guest";
    let userId: string | undefined = undefined;
    let userName = "Guest User";

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const tokenValue = authHeader.split(" ")[1];
            const decodedToken = jwt.decode(tokenValue) as any;
            if (decodedToken) {
                userId = decodedToken.id || decodedToken._id;
                userEmail = decodedToken.email || userEmail;
                userRole = decodedToken.role || userRole;
                if (decodedToken.firstName) {
                    userName = `${decodedToken.firstName} ${decodedToken.lastName || ""}`.trim();
                }
            }
        } catch {
            // Ignore token decoding errors in logger middleware
        }
    }

    // Once response finishes, calculate execution time and record activity log
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        const statusCode = res.statusCode;

        // Check if req.user was populated during route handling
        const reqUser = (req as any).user;
        if (reqUser) {
            userId = reqUser._id || reqUser.id || userId;
            userEmail = reqUser.email || userEmail;
            userRole = reqUser.role || userRole;
            if (reqUser.firstName) {
                userName = `${reqUser.firstName} ${reqUser.lastName || ""}`.trim();
            }
        }

        const userInfo = `👤 User [Email: ${userEmail} | Role: ${userRole}]`;
        const actionLog = `${userInfo} executed -> [${req.method}] ${req.originalUrl} | Status: ${statusCode} | Duration: ${duration}ms | IP: ${req.ip}`;

        // 1. Write to Winston Logger
        if (statusCode >= 400) {
            logger.warn(actionLog);
        } else {
            logger.info(actionLog);
        }

        // 2. Save activity record asynchronously into MongoDB AuditLog collection
        // Skip static assets or health checks if needed
        if (!req.originalUrl.includes("/health") && !req.originalUrl.includes("/public")) {
            auditLogModel
                .create({
                    user: userId ? (userId as any) : undefined,
                    userEmail,
                    userName,
                    userRole,
                    method: req.method,
                    endpoint: req.originalUrl,
                    statusCode,
                    durationMs: duration,
                    ip: req.ip || req.socket.remoteAddress || "127.0.0.1",
                    userAgent: req.headers["user-agent"] || "",
                })
                .catch((err) => {
                    logger.error("Failed to save audit log into MongoDB:", err);
                });
        }
    });

    next();
};
