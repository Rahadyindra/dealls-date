import express from "express";
import { SwipeController } from "../controller/SwipeController";

const swipeRouter = express.Router();

swipeRouter.get("/get-swipes", SwipeController.getPaginatedProfiles);
swipeRouter.post("/swipe", SwipeController.doSwipe);
swipeRouter.get("/get-matched", SwipeController.getMatchedProfile);
swipeRouter.patch("/unmatch", SwipeController.doUnmatch);

export default swipeRouter;
