import { SwipeController } from "../controller/SwipeController";
import express from "express";

const swipeRouter = express.Router();

swipeRouter.get("/get-swipes", SwipeController.getPaginatedProfiles);
swipeRouter.post("/do-swipe", SwipeController.doSwipe);
swipeRouter.get("/get-matched", SwipeController.getMatchedProfile);

export default swipeRouter;
