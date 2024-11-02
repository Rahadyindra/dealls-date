import { Op } from "sequelize";
import Swipe from "../models/Swipe";
import { E } from "@faker-js/faker/dist/airline-WjISwexU";

class SwipeInService {
  static async countSizeSwipedToday(userId: number): Promise<number | null> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const swipes = await Swipe.count({
        where: {
          userId: userId,
          createdAt: {
            [Op.gte]: today,
            [Op.lt]: tomorrow,
          },
        },
      });
      return swipes;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Error finding user");
    }
  }

  static async findAllByUserIdAndLatest(
    userId: number
  ): Promise<Swipe[] | null> {
    const swipes = await Swipe.findAll({
      where: {
        userId: userId,
        latest: true,
      },
    });
    return swipes;
  }
}

export default SwipeInService;
