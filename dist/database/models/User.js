"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Profile_1 = __importDefault(require("./Profile"));
const Swipe_1 = __importDefault(require("./Swipe"));
const UserPremiumPackage_1 = __importDefault(require("./UserPremiumPackage"));
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.INTEGER, primaryKey: true, autoIncrement: true }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => Profile_1.default),
    __metadata("design:type", Profile_1.default)
], User.prototype, "profile", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Swipe_1.default, { as: "sentSwipes" }),
    __metadata("design:type", Array)
], User.prototype, "sentSwipes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Swipe_1.default, { as: "receivedSwipes" }),
    __metadata("design:type", Array)
], User.prototype, "receivedSwipes", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => UserPremiumPackage_1.default, { as: "userPremiumPackage" }),
    __metadata("design:type", UserPremiumPackage_1.default)
], User.prototype, "userPremiumPackage", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "users",
        timestamps: true,
    })
], User);
exports.default = User;
