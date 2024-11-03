"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SwipeController_1 = require("../controller/SwipeController");
const express_1 = __importDefault(require("express"));
const swipeRouter = express_1.default.Router();
swipeRouter.get("/get-swipes", SwipeController_1.SwipeController.getPaginatedProfiles);
swipeRouter.post("/swipe", SwipeController_1.SwipeController.doSwipe);
swipeRouter.get("/get-matched", SwipeController_1.SwipeController.getMatchedProfile);
swipeRouter.patch("/unmatch", SwipeController_1.SwipeController.doUnmatch);
exports.default = swipeRouter;
