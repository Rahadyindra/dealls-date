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
exports.registerExecuteProcessor = registerExecuteProcessor;
exports.loginExecuteProcessor = loginExecuteProcessor;
exports.logoutExecuteProcessor = logoutExecuteProcessor;
const Bcrypt_1 = require("../../helpers/Bcrypt");
const User_1 = __importDefault(require("../../database/models/User"));
const Profile_1 = __importDefault(require("../../database/models/Profile"));
const UserInService_1 = __importDefault(require("../../database/services/UserInService"));
const Jwt_1 = require("../../helpers/Jwt");
function registerExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, email, password, age, gender, bio, profilePicture, displayName, } = req.body;
            if (!username || !email || !password) {
                throw { name: "invalid" };
            }
            const hashedPass = (0, Bcrypt_1.hashPassword)(password);
            const user = yield User_1.default.create({
                username,
                email,
                password: hashedPass,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            yield Profile_1.default.create({
                userId: user.id,
                bio,
                age,
                gender,
                profilePicture,
                isVerified: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                displayName,
            });
            res.status(201).json({
                message: "Register Successful",
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function loginExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                throw { name: "invalid" };
            }
            const loginUser = yield UserInService_1.default.findByEmail(email);
            if (!loginUser) {
                throw { name: "bad.login" };
            }
            const checkPass = (0, Bcrypt_1.comparePassword)(password, loginUser.password);
            if (!checkPass) {
                throw { name: "bad.login" };
            }
            const access_token = (0, Jwt_1.createToken)({
                email: loginUser.email,
                username: loginUser.username,
                id: loginUser.id,
            });
            res.cookie("access_token", access_token, {
                httpOnly: true,
                secure: true,
                maxAge: 3600000,
                path: "/",
            });
            res.status(201).json({
                access_token,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function logoutExecuteProcessor(req, res, next) {
    try {
        res.clearCookie("access_token", {
            path: "/",
        });
        res.status(200).json({
            message: "Logout successful",
        });
    }
    catch (err) {
        next(err);
    }
}
