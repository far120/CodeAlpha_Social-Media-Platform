import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { apiLimiter } from "../core/middleware/rateLimit.middleware";
import notFound from "../core/middleware/notFound.middleware";
import globalErrorHandler from "../core/errors/errorHandler";
import { userActivityLogger } from "../core/middleware/userLogger.middleware";

import router from "../routes";

import path from "path";

const app = express();

// security
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*", // Allow all origins or specify your frontend URL
        credentials: true,
    })
);
app.use(helmet());

// logging
app.use(morgan("dev"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// rate limiting
// app.use(apiLimiter);

// Custom User Activity Audit Logger
app.use(userActivityLogger);

// routes
app.use("/api/v1",apiLimiter, router);

// not found
app.use(notFound);

// error handler
app.use(globalErrorHandler);

export default app;
