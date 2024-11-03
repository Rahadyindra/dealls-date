import { Request, Response, NextFunction } from "express";
import {
  loginExecuteProcessor,
  logoutExecuteProcessor,
  registerExecuteProcessor,
} from "./executor/AuthExecutor";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    registerExecuteProcessor(req, res, next);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    loginExecuteProcessor(req, res, next);
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    logoutExecuteProcessor(req, res, next);
  }
}
