import { Request, Response, NextFunction } from "express";
import { getAllAvailablePremiumPackage } from "./executor/PremiumExecutor";

export class PremiumController {
  static async getPremiumOptions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      getAllAvailablePremiumPackage(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doAppyPremium(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      getAllAvailablePremiumPackage(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
