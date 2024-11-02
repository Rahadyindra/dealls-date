import { AuthController } from "../controller/AuthController";
import { SwipeController } from "../controller/SwipeController";
import express from "express";
import { userAuthentication } from "../middlewares/CheckUserAuth";

const routerAuth = express.Router();

routerAuth.post("/register", AuthController.register);
routerAuth.post("/login", AuthController.login);

routerAuth.use(userAuthentication);
routerAuth.get("/hayo", SwipeController.yeay);
routerAuth.post("/logout", AuthController.logout);

export default routerAuth;
