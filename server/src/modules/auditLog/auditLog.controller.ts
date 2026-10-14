import { Request, Response, NextFunction } from "express";
import { getAuditLogsService, clearAuditLogsService } from "./auditLog.service";

export const getAuditLogsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAuditLogsService(req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const clearAuditLogsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await clearAuditLogsService();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
