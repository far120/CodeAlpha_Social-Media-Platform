import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
}   

export default notFound;