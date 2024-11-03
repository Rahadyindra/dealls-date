import User from "../models/User";
import Profile from "../models/Profile";
import UserPremiumPackage from "../models/UserPremiumPackage";
import PremiumPackage from "../models/PremiumPackage";

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

  static async findByUserIdIncludeProfileAndPackage(
    id: number
  ): Promise<User | null> {
    try {
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: Profile,
            as: "profile",
          },
          {
            model: UserPremiumPackage,
            as: "userPremiumPackage",
            include: [
              {
                model: PremiumPackage,
                as: "premiumPackage",
              },
            ],
          },
        ],
      });
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user");
    }
  }
}
