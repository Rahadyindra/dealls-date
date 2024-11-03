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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiumController = void 0;
const PremiumExecutor_1 = require("./executor/PremiumExecutor");
class PremiumController {
    static getPremiumOptions(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, PremiumExecutor_1.getAllAvailablePremiumPackageExecute)(req, res, next);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static doAppyPremium(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, PremiumExecutor_1.applyPremiumExecuteProcessor)(req, res, next);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static unApplyPremium(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, PremiumExecutor_1.unApplyPremiumExecuteProcessor)(req, res, next);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.PremiumController = PremiumController;
