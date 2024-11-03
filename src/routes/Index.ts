import express, { Router } from "express";
import authRouter from "./AuthRouter";
import { userAuthentication } from "../middlewares/CheckUserAuth";
import swipeRouter from "./SwipeRouter";
import premiumRouter from "./PremiumRouter";

const router: Router = express.Router();

router.use("/", authRouter);
router.use(userAuthentication);
router.use("/user", swipeRouter);
router.use("/premium", premiumRouter);

export default router;
