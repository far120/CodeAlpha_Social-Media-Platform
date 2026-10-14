import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { UserRole } from "../../modules/users/user.types";

export const authorizationMiddleware =
  (...roles: UserRole[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(new AppError("Unauthorized", 401));
      }

      const userRole = req.user.role;

      if (!roles.includes(userRole)) {
        return next(new AppError("Forbidden", 403));
      }

      next();
    } catch (err) {
      next(err);
    }
  };