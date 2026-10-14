import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";
import userModel from "../../modules/users/user.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return next(new AppError("Unauthorized", 401));
    }

    const [type, tokenValue] = token.split(" ");

    if (type !== "Bearer" || !tokenValue) {
      return next(new AppError("Unauthorized", 401));
    }

    const decodedToken = jwt.verify(tokenValue, process.env.JWT_SECRET!) as any;
    
    if (!decodedToken) {
        return next(new AppError("Unauthorized", 401));
    }
    const user = await userModel.findById(decodedToken.id);
    if (!user) {
      return next(new AppError("Unauthorized", 401));
    }
    req.user = user;


    next();
  } catch (err) {
    next(err);
  }
};