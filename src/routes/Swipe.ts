import { SwipeController } from "../controller/SwipeController";
import express from "express";

const swipeRouter = express.Router();

swipeRouter.get("/get-swipes", SwipeController.getPaginatedProfiles);
swipeRouter.post("/swipe", SwipeController.doSwipe);
swipeRouter.get("/get-matched", SwipeController.getMatchedProfile);
swipeRouter.patch("/unmatch", SwipeController.doUnmatch);

export default swipeRouter;
