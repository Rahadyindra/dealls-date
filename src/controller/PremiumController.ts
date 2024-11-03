import { Request, Response, NextFunction } from "express";
import {
  applyPremiumExecuteProcessor,
  getAllAvailablePremiumPackageExecute,
  unApplyPremiumExecuteProcessor,
} from "./executor/PremiumExecutor";

export class PremiumController {
  static async getPremiumOptions(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await getAllAvailablePremiumPackageExecute(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doAppyPremium(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await applyPremiumExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async unApplyPremium(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await unApplyPremiumExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
