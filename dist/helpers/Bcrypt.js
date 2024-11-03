"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function hashPassword(value) {
    const salt = bcryptjs_1.default.genSaltSync(8);
    const hash = bcryptjs_1.default.hashSync(value, salt);
    return hash;
}
function comparePassword(password, hashedPassword) {
    return bcryptjs_1.default.compareSync(password, hashedPassword);
}
