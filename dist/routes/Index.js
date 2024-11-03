"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const CheckUserAuth_1 = require("../middlewares/CheckUserAuth");
const SwipeRouter_1 = __importDefault(require("./SwipeRouter"));
const PremiumRouter_1 = __importDefault(require("./PremiumRouter"));
const router = express_1.default.Router();
router.use("/", AuthRouter_1.default);
router.use(CheckUserAuth_1.userAuthentication);
router.use("/user", SwipeRouter_1.default);
router.use("/premium", PremiumRouter_1.default);
exports.default = router;
