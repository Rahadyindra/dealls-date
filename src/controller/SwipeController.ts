import { Request, Response, NextFunction } from "express";
import {
  matchedProfileExecute,
  paginatedProfilesExecute,
  swipeExecuteProcessor,
  unmatchExecuteProcessor,
} from "./executor/SwipeExecutor";

export class SwipeController {
  static async getPaginatedProfiles(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      paginatedProfilesExecute(req, res, next);
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

  static async getMatchedProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      matchedProfileExecute(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doUnmatch(req: Request, res: Response, next: NextFunction) {
    try {
      unmatchExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
