import { Request, Response, NextFunction } from "express";

export class SwipeController {
  static async yeay(req: Request, res: Response, next: NextFunction) {
    res.send("AKWWKAKWAKWA");
  }
}
