import express, { Router } from "express";
import authRouter from "./AuthRouter";
import { userAuthentication } from "../middlewares/CheckUserAuth";
import swipeRouter from "./Swipe";

const router: Router = express.Router();

router.use("/", authRouter);
router.use(userAuthentication);
router.use("/user", swipeRouter);

export default router;
