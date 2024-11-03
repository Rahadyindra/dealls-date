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
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!err.name) {
            console.error(err);
        }
        if (err.name === "invalid.input") {
            res.status(401).json({ message: "Invalid Input" });
        }
        else if (err.name === "not.found") {
            res.status(404).json({ message: "Stuff you looking for doesn't exist" });
        }
        else if (err.name === "bad.login") {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else if (err.name === "already.matched") {
            res
                .status(401)
                .json({ message: "You are already matched with this person" });
        }
        else if (err.name === "please.login" || err.name === "JsonWebTokenError") {
            res.status(401).json({
                message: "You must login first",
            });
        }
        else if (err.name === "forbidden") {
            res.status(403).json({
                message: "You don't have permission to do this action",
            });
        }
        else if (err.name === "bad.login") {
            res.status(401).json({ message: "Invalid email or password" });
        }
        else if (err.name === "cannot.apply") {
            res.status(401).json({ message: err.message });
        }
        else if (err.name === "no.quota") {
            res.status(403).json({
                message: "You are out of swiping quota",
            });
        }
        else if (err.name === "SequelizeUniqueConstraintError" ||
            err.name === "SequelizeValidationError") {
            res.status(401).json({
                message: err.message,
            });
        }
        else {
            res.status(500).json({ message: "Something is wrong with the server" });
        }
    });
}
