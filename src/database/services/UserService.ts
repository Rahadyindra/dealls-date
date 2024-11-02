import User from "../models/User"; // Adjust the path as necessary
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  premiumUntil?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class UserService {
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

export default UserService;
