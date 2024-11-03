"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controller/AuthController");
const express_1 = __importDefault(require("express"));
const CheckUserAuth_1 = require("../middlewares/CheckUserAuth");
const authRouter = express_1.default.Router();
authRouter.post("/register", AuthController_1.AuthController.register);
authRouter.post("/login", AuthController_1.AuthController.login);
authRouter.use(CheckUserAuth_1.userAuthentication);
authRouter.post("/logout", AuthController_1.AuthController.logout);
exports.default = authRouter;
