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
const User_1 = __importDefault(require("../models/User"));
const Profile_1 = __importDefault(require("../models/Profile"));
const UserPremiumPackage_1 = __importDefault(require("../models/UserPremiumPackage"));
const PremiumPackage_1 = __importDefault(require("../models/PremiumPackage"));
class UserInService {
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ where: { email } });
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                throw new Error("Error finding user");
            }
        });
    }
    static findByUserIdIncludeProfileAndPackage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({
                    where: { id },
                    include: [
                        {
                            model: Profile_1.default,
                            as: "profile",
                        },
                        {
                            model: UserPremiumPackage_1.default,
                            as: "userPremiumPackage",
                            include: [
                                {
                                    model: PremiumPackage_1.default,
                                    as: "premiumPackage",
                                },
                            ],
                        },
                    ],
                });
                return user;
            }
            catch (error) {
                console.error("Error finding user by email:", error);
                throw new Error("Error finding user");
            }
        });
    }
}
exports.default = UserInService;
