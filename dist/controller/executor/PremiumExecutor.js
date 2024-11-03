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
exports.getAllAvailablePremiumPackageExecute = getAllAvailablePremiumPackageExecute;
exports.applyPremiumExecuteProcessor = applyPremiumExecuteProcessor;
exports.unApplyPremiumExecuteProcessor = unApplyPremiumExecuteProcessor;
const PremiumPackageInService_1 = __importDefault(require("../../database/services/PremiumPackageInService"));
const UserInService_1 = __importDefault(require("../../database/services/UserInService"));
const PremiumPackage_1 = __importDefault(require("../../database/models/PremiumPackage"));
const PremiumPackageEnum_1 = __importDefault(require("../../enums/PremiumPackageEnum"));
const UserPremiumPackage_1 = __importDefault(require("../../database/models/UserPremiumPackage"));
const Profile_1 = __importDefault(require("../../database/models/Profile"));
function getAllAvailablePremiumPackageExecute(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const premiumPackages = yield PremiumPackageInService_1.default.findAllAvailable();
            res.status(200).json(premiumPackages);
        }
        catch (err) {
            next(err);
        }
    });
}
function applyPremiumExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            const packageId = req.body.packageId;
            if (!userId) {
                throw { name: "forbidden" };
            }
            if (!packageId) {
                throw { name: "invalid.input" };
            }
            const user = yield UserInService_1.default.findByUserIdIncludeProfileAndPackage(userId);
            const premiumPackage = yield PremiumPackage_1.default.findByPk(packageId);
            if (!premiumPackage) {
                throw { name: "not.found" };
            }
            if (!(user === null || user === void 0 ? void 0 : user.userPremiumPackage)) {
                yield UserPremiumPackage_1.default.create({
                    userId,
                    premiumPackageId: packageId,
                    purchaseDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                yield Profile_1.default.update({ isVerified: premiumPackage.verifiedLabel }, {
                    where: {
                        userId,
                    },
                });
                return res.status(201).json({
                    message: `Successfully applied package ${premiumPackage === null || premiumPackage === void 0 ? void 0 : premiumPackage.packageName}`,
                });
            }
            if (((_b = user === null || user === void 0 ? void 0 : user.userPremiumPackage) === null || _b === void 0 ? void 0 : _b.premiumPackage.id) === +packageId) {
                throw {
                    name: "cannot.apply",
                    message: `You cannot apply for ${premiumPackage === null || premiumPackage === void 0 ? void 0 : premiumPackage.packageName}`,
                };
            }
            if ((premiumPackage === null || premiumPackage === void 0 ? void 0 : premiumPackage.packageName) == PremiumPackageEnum_1.default.Gold &&
                ((_c = user === null || user === void 0 ? void 0 : user.userPremiumPackage) === null || _c === void 0 ? void 0 : _c.premiumPackage.packageName) ==
                    PremiumPackageEnum_1.default.Platinum) {
                throw {
                    name: "cannot.apply",
                    message: `You cannot downgrade your package`,
                };
            }
            yield UserPremiumPackage_1.default.destroy({
                where: {
                    userId,
                },
            });
            yield UserPremiumPackage_1.default.create({
                userId,
                premiumPackageId: packageId,
                purchaseDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            yield Profile_1.default.update({ isVerified: premiumPackage.verifiedLabel }, {
                where: {
                    userId,
                },
            });
            return res.status(201).json({
                message: `Successfully applied package ${premiumPackage === null || premiumPackage === void 0 ? void 0 : premiumPackage.packageName}`,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function unApplyPremiumExecuteProcessor(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
            if (!userId) {
                throw { name: "forbidden" };
            }
            const user = yield UserInService_1.default.findByUserIdIncludeProfileAndPackage(userId);
            if (!(user === null || user === void 0 ? void 0 : user.userPremiumPackage)) {
                throw { name: "forbidden" };
            }
            yield UserPremiumPackage_1.default.destroy({
                where: {
                    userId,
                },
            });
            yield Profile_1.default.update({
                isVerified: false,
            }, {
                where: { userId },
            });
            return res.status(201).json({
                message: "Successfully unapplied your package",
            });
        }
        catch (err) {
            next(err);
        }
    });
}
