import { Request, Response, NextFunction } from "express";
import { comparePassword, hashPassword } from "../helpers/Bcrypt";
import User from "../database/models/User";
import Profile from "../database/models/Profile";
import UserInService from "../database/services/UserInService";
import { createToken } from "../helpers/Jwt";

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  age: number;
  gender?: string;
  bio?: string;
  profilePicture?: string;
  displayName: string;
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
    const {
      username,
      email,
      password,
      age,
      gender,
      bio,
      profilePicture,
      displayName,
    } = req.body as unknown as RegisterCredentials;
    if (!username || !email || !password) {
      throw { name: "invalid" };
    }
    const hashedPass = hashPassword(password);

    const user = await User.create({
      username,
      email,
      password: hashedPass,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await Profile.create({
      userId: user.id,
      bio,
      age,
      gender,
      profilePicture,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName,
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
      throw { name: "invalid" };
    }
    const loginUser = await UserInService.findByEmail(email);
    if (!loginUser) {
      throw { name: "bad.login" };
    }
    const checkPass = comparePassword(password, loginUser.password);
    if (!checkPass) {
      throw { name: "bad.login" };
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
      message: "Logout successful",
    });
  } catch (err) {
    next(err);
  }
}
