import { Request, Response, NextFunction } from "express";
import User from "../database/models/User";
import { verifyToken } from "../helpers/Jwt";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  isVerified: boolean;
  premiumUntil?: Date;
}

export async function userAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const access_token = req.cookies.access_token;
    if (!access_token) {
      throw { name: "please.login" };
    }
    const decodedToken = verifyToken(access_token);
    if (!decodedToken) {
      throw { message: "please.login" };
    }
    const id = decodedToken?.id;
    const user = await User.findByPk(id);
    if (!user) {
      throw { message: "please.login" };
    }

    req.user = user as UserResponse;
    next();
  } catch (err) {
    next(err);
  }
}
