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
      res.status(401).json({ message: "Please login first" });
    }
    const decodedToken = verifyToken(access_token);
    if (!decodedToken) {
      res.status(403).json({ message: "Invalid token" });
    }
    const id = decodedToken?.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    req.user = user as UserResponse;
    next();
  } catch (err) {
    next(err);
  }
}
