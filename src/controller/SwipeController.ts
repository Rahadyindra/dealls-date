import { Request, Response, NextFunction } from "express";
import {
  paginatedProfilesExecuteProcessor,
  swipeExecuteProcessor,
} from "../executor/SwipeExecutor";

export class SwipeController {
  static async getPaginatedProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      paginatedProfilesExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doSwipe(req: Request, res: Response, next: NextFunction) {
    try {
      swipeExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
