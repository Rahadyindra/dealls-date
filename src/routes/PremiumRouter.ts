import { PremiumController } from "../controller/PremiumController";
import { SwipeController } from "../controller/SwipeController";
import express from "express";

const premiumRouter = express.Router();

premiumRouter.get("/get-options", PremiumController.getPremiumOptions);
premiumRouter.post("/apply", PremiumController.doAppyPremium);
premiumRouter.delete("/unapply", PremiumController.unApplyPremium);
export default premiumRouter;
