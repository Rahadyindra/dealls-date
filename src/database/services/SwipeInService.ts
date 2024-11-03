import { Op } from "sequelize";
import Swipe from "../models/Swipe";
import { E } from "@faker-js/faker/dist/airline-WjISwexU";
import Profile from "../models/Profile";

export default class SwipeInService {
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

  static async findAllByUserIdAndProfileId(
    userId: number,
    profileId: number
  ): Promise<Swipe[] | null> {
    const swipes = await Swipe.findAll({
      where: {
        userId,
        profileId,
        latest: true,
      },
    });
    return swipes;
  }

  static async findByUserIdAndProfileId(
    userId: number,
    profileId: number
  ): Promise<Swipe | null> {
    const swipes = await Swipe.findOne({
      where: {
        userId,
        profileId,
        latest: true,
      },
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });
    return swipes;
  }

  static async findByUserIdAndProfileIdToday(
    userId: number,
    profileId: number
  ): Promise<Swipe | null> {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const swipes = await Swipe.findOne({
      where: {
        userId,
        profileId,
        createdAt: {
          [Op.gte]: todayStart,
          [Op.lte]: todayEnd,
        },
        latest: true,
      },
      include: [
        {
          model: Profile,
          as: "profile",
        },
      ],
    });

    return swipes;
  }
}
