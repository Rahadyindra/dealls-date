import express, { Router } from "express";
import routerAuth from "./Auth";

const router: Router = express.Router();

router.use("/", routerAuth);

export default router;
