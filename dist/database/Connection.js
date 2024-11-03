"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const path_1 = __importDefault(require("path"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DATABASE_NAME,
    dialect: "postgres",
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    models: [path_1.default.join(__dirname, "models")],
});
exports.default = sequelize;
