"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthController_1 = require("../controller/AuthController");
const express_1 = __importDefault(require("express"));
const CheckUserAuth_1 = require("../middlewares/CheckUserAuth");
const routerAuth = express_1.default.Router();
routerAuth.post("/register", AuthController_1.AuthController.register);
routerAuth.post("/login", AuthController_1.AuthController.login);
routerAuth.use(CheckUserAuth_1.userAuthentication);
routerAuth.post("/logout", AuthController_1.AuthController.logout);
exports.default = routerAuth;
