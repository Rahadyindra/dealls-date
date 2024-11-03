import { Request, Response, NextFunction } from "express";
import {
  matchedProfileExecute,
  paginatedProfilesExecute,
  swipeExecuteProcessor,
  unmatchExecuteProcessor,
} from "./executor/SwipeExecutor";

export class SwipeController {
  static async getPaginatedProfiles(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await paginatedProfilesExecute(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doSwipe(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await swipeExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async getMatchedProfile(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await matchedProfileExecute(req, res, next);
    } catch (err) {
      next(err);
    }
  }

  static async doUnmatch(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await unmatchExecuteProcessor(req, res, next);
    } catch (err) {
      next(err);
    }
  }
}
