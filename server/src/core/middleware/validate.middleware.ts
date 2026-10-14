import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        message: error.issues[0].message,
      });
    }
    next(error);
  }
};


