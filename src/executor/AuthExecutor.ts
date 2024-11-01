import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "../helpers/Bcrypt";
import User from "../database/models/User";
import Profile from "../database/models/Profile";
import UserService from "../database/services/UserService";
import { createToken } from "../helpers/Jwt";
import { AppError } from "../errorHandler/Error";

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  age: number;
  gender?: string;
  bio?: string;
  profilePicture?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export async function registerExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password, age, gender, bio, profilePicture } =
      req.body as unknown as RegisterCredentials;
    if (!username || !email || !password) {
      throw { name: "invalid" };
    }
    const hashedPass = hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPass,
      isVerified: false,
    });

    await Profile.create({
      userId: user.id,
      bio,
      age,
      gender,
      profilePicture,
    });
    res.status(201).json({
      message: "Register Successful",
    });
  } catch (err) {
    next(err);
  }
}

export async function loginExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body as unknown as LoginCredentials;
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }
    const loginUser = await UserService.findByEmail(email);
    if (!loginUser) {
      throw new AppError("Wrong username or password", 401);
    }
    const checkPass = comparePassword(password, loginUser.password);
    if (!checkPass) {
      throw { name: "badLogin" };
    }

    const access_token = createToken({
      email: loginUser.email,
      username: loginUser.username,
      id: loginUser.id,
    });

    res.cookie("access_token", access_token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      path: "/",
    });

    res.status(201).json({
      access_token,
    });
  } catch (err) {
    next(err);
  }
}

export async function logoutExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("access_token", {
      path: "/",
    });

    res.status(200).json({
      message: "Logout successful, access token cookie cleared.",
    });
  } catch (err) {
    next(err);
  }
}
