"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PremiumController_1 = require("../controller/PremiumController");
const express_1 = __importDefault(require("express"));
const premiumRouter = express_1.default.Router();
premiumRouter.get("/get-options", PremiumController_1.PremiumController.getPremiumOptions);
premiumRouter.post("/apply", PremiumController_1.PremiumController.doAppyPremium);
premiumRouter.delete("/unapply", PremiumController_1.PremiumController.unApplyPremium);
exports.default = premiumRouter;
