"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Profile_1 = __importDefault(require("../models/Profile"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
class ProfileInService {
    static pagingProfileForTodayByUserId(userId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const ITEMS_PER_PAGE = 10;
            try {
                const offset = (page - 1) * ITEMS_PER_PAGE;
                const startOfToday = new Date();
                startOfToday.setHours(0, 0, 0, 0);
                const endOfToday = new Date();
                endOfToday.setHours(23, 59, 59, 999);
                const profiles = yield Profile_1.default.findAll({
                    limit: ITEMS_PER_PAGE,
                    offset: offset,
                    where: {
                        id: {
                            [sequelize_1.Op.notIn]: sequelize_typescript_1.Sequelize.literal(`(
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
                            [sequelize_1.Op.ne]: userId,
                        },
                    },
                });
                return profiles;
            }
            catch (error) {
                throw { name: "something.wrong" };
            }
        });
    }
    static findAllProfileMatchedByUserId(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const matchedProfiles = yield Profile_1.default.findAll({
                    where: {
                        id: {
                            [sequelize_1.Op.in]: sequelize_typescript_1.Sequelize.literal(`(
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
                            [sequelize_1.Op.ne]: userId,
                        },
                    },
                });
                return matchedProfiles || [];
            }
            catch (error) {
                throw { name: "not.found" };
            }
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield Profile_1.default.findOne({ where: { userId } });
                return profile;
            }
            catch (error) {
                throw new Error("Error finding user");
            }
        });
    }
}
exports.default = ProfileInService;
