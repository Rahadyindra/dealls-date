import { NumberColorFormat } from "@faker-js/faker/.";
import Profile from "../models/Profile";
import User from "../models/User";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export default class ProfileInService {
  static async pagingProfileForTodayByUserId(
    userId: number,
    page: number
  ): Promise<Profile[] | null> {
    const ITEMS_PER_PAGE = 10;
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);

      const profiles = await Profile.findAll({
        limit: ITEMS_PER_PAGE,
        offset: offset,
        where: {
          id: {
            [Op.notIn]: Sequelize.literal(`(
        SELECT "profileId"
        FROM "swipes"
        WHERE "userId" = ${userId}
        AND "createdAt" BETWEEN '${startOfToday.toISOString()}' AND '${endOfToday.toISOString()}'
      )`),
          },
        },
      });
      return profiles;
    } catch (error) {
      throw { name: "something.wrong" };
    }
  }
}
