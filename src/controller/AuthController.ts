import { Request, Response, NextFunction } from "express";
import {
  loginExecuteProcessor,
  logoutExecuteProcessor,
  registerExecuteProcessor,
} from "./executor/AuthExecutor";

export class AuthController {
  static async register(
    this: void,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await registerExecuteProcessor(req, res, next);
  }

  static async login(this: void,req: Request, res: Response, next: NextFunction) {
   await loginExecuteProcessor(req, res, next);
  }

  static async logout(this: void,req: Request, res: Response, next: NextFunction) {
   await logoutExecuteProcessor(req, res, next);
  }
}
