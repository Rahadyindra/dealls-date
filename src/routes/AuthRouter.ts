import { AuthController } from "../controller/AuthController";
import { SwipeController } from "../controller/SwipeController";
import express from "express";
import { userAuthentication } from "../middlewares/CheckUserAuth";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

authRouter.use(userAuthentication);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
