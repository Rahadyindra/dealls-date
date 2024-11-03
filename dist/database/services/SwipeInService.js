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
const sequelize_1 = require("sequelize");
const Swipe_1 = __importDefault(require("../models/Swipe"));
const Profile_1 = __importDefault(require("../models/Profile"));
class SwipeInService {
    static countSizeSwipedToday(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const tomorrow = new Date(today);
                tomorrow.setDate(today.getDate() + 1);
                const swipes = yield Swipe_1.default.count({
                    where: {
                        userId: userId,
                        createdAt: {
                            [sequelize_1.Op.gte]: today,
                            [sequelize_1.Op.lt]: tomorrow,
                        },
                    },
                });
                return swipes;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                throw new Error("Error finding user");
            }
        });
    }
    static findAllByUserIdAndProfileId(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const swipes = yield Swipe_1.default.findAll({
                where: {
                    userId,
                    profileId,
                    latest: true,
                },
            });
            return swipes;
        });
    }
    static findByUserIdAndProfileId(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const swipes = yield Swipe_1.default.findOne({
                where: {
                    userId,
                    profileId,
                    latest: true,
                },
                include: [
                    {
                        model: Profile_1.default,
                        as: "profile",
                    },
                ],
            });
            return swipes;
        });
    }
    static findByUserIdAndProfileIdToday(userId, profileId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);
            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);
            const swipes = yield Swipe_1.default.findOne({
                where: {
                    userId,
                    profileId,
                    createdAt: {
                        [sequelize_1.Op.gte]: todayStart,
                        [sequelize_1.Op.lte]: todayEnd,
                    },
                    latest: true,
                },
                include: [
                    {
                        model: Profile_1.default,
                        as: "profile",
                    },
                ],
            });
            return swipes;
        });
    }
}
exports.default = SwipeInService;
