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
exports.AuthController = void 0;
const AuthExecutor_1 = require("./executor/AuthExecutor");
class AuthController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, AuthExecutor_1.registerExecuteProcessor)(req, res, next);
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, AuthExecutor_1.loginExecuteProcessor)(req, res, next);
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, AuthExecutor_1.logoutExecuteProcessor)(req, res, next);
        });
    }
}
exports.AuthController = AuthController;
