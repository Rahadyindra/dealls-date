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
exports.seed = seed;
const Profile_1 = __importDefault(require("../database/models/Profile"));
const User_1 = __importDefault(require("../database/models/User"));
const faker_1 = require("@faker-js/faker");
const Bcrypt_1 = require("../helpers/Bcrypt");
const PremiumPackage_1 = __importDefault(require("../database/models/PremiumPackage"));
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const userCount = yield User_1.default.count();
        if (userCount > 5) {
            console.log("Users already exist. Seeding skipped.");
            return;
        }
        const users = Array.from({ length: 30 }).map(() => ({
            username: faker_1.faker.internet.username(),
            email: faker_1.faker.internet.email(),
            password: (0, Bcrypt_1.hashPassword)(faker_1.faker.internet.password()),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));
        const createdUsers = yield User_1.default.bulkCreate(users, { returning: true });
        const profiles = createdUsers.map((user) => ({
            userId: user.id,
            bio: faker_1.faker.lorem.sentence(),
            age: faker_1.faker.number.int({ min: 20, max: 50 }),
            gender: faker_1.faker.datatype.boolean() ? "male" : "female",
            profilePicture: faker_1.faker.image.avatar(),
            isVerified: faker_1.faker.datatype.boolean(),
            createdAt: new Date(),
            updatedAt: new Date(),
            displayName: faker_1.faker.internet.displayName(),
        }));
        yield Profile_1.default.bulkCreate(profiles);
        yield PremiumPackage_1.default.bulkCreate([
            {
                packageName: "Gold",
                description: "Extended access with more features",
                price: 19.99,
                noSwipeQuota: true,
                verifiedLabel: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                packageName: "Platinum",
                description: "Full access with all features and premium support",
                price: 29.99,
                noSwipeQuota: true,
                verifiedLabel: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        console.log("Seeding completed successfully.");
    });
}
