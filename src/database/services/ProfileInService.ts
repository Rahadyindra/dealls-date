import { NumberColorFormat } from "@faker-js/faker/.";
import Profile from "../models/Profile";
import User from "../models/User";
import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import Swipe from "../models/Swipe";

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
        FROM "swipes" AS s1
        WHERE s1."userId" = ${userId} 
          AND (
            (DATE(s1."createdAt") = CURRENT_DATE AND s1."latest" = true)
            OR
            EXISTS (
              SELECT 1
              FROM "swipes" AS s2
              WHERE s2."userId" = s1."profileId"
                AND s2."profileId" = ${userId}
                AND s2."like" = true
                AND s1."like" = true
                AND s2."latest" = true
                AND s1."latest" = true
            )
          )
      )`),
          },
          userId: {
            [Op.ne]: userId,
          },
        },
      });
      return profiles;
    } catch (error) {
      throw { name: "something.wrong" };
    }
  }

  static async findAllProfileMatchedByUserId(
    userId: number,
    profileId: number
  ): Promise<Profile[] | []> {
    try {
      const matchedProfiles = await Profile.findAll({
        where: {
          id: {
            [Op.in]: Sequelize.literal(`(
            SELECT p1."id"
            FROM "swipes" AS s1
            JOIN "profiles" AS p1 ON s1."profileId" = p1."id"
            WHERE s1."userId" = ${userId}
              AND (
                EXISTS (
                  SELECT 1
                  FROM "swipes" AS s2
                  JOIN "profiles" AS p2 ON s2."userId" = p2."userId"
                  WHERE s2."userId" = p2."userId"
                    AND s2."profileId" = ${profileId}
                    AND s2."like" = true
                    AND s1."like" = true
                    AND s2."latest" = true
                    AND s1."latest" = true
                )
              )
          )
`),
          },
          userId: {
            [Op.ne]: userId,
          },
        },
      });
      return matchedProfiles || [];
    } catch (error) {
      throw { name: "not.found" };
    }
  }
  static async findByUserId(userId: number): Promise<Profile | null> {
    try {
      const profile = await Profile.findOne({ where: { userId } });
      return profile;
    } catch (error) {
      throw new Error("Error finding user");
    }
  }
}
