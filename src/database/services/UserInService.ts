import { Op } from "sequelize";
import Swipe from "../models/Swipe";
import User from "../models/User"; // Adjust the path as necessary
import Profile from "../models/Profile";
import { Sequelize } from "sequelize-typescript";

export default class UserInService {
  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user");
    }
  }

}
