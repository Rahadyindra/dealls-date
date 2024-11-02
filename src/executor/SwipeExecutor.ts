import { Request, Response, NextFunction } from "express";
import SwipeInService from "../database/services/SwipeInService";
import User from "../database/models/User";
import ProfileInService from "../database/services/ProfileInService";
import Swipe from "../database/models/Swipe";

export async function paginatedProfilesExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validateQuota(req, res, next);

    const userId = req?.user?.id;
    if (!userId) {
      throw { name: "forbidden" };
    }
    const page = (req.body.page as number) || 1;
    const profiles = await ProfileInService.pagingProfileForTodayByUserId(
      userId,
      page
    );
    res.json({ page, profiles });
  } catch (err) {
    next(err);
  }
}

export async function swipeExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      throw { name: "forbidden" };
    }
    const like: boolean = req.body.like;
    const latestSwipes = await SwipeInService.findAllByUserIdAndLatest(userId);

    if (latestSwipes && latestSwipes.length > 0) {
      const swipeIds = latestSwipes.map((swipe) => swipe.id);

      await Swipe.update({ latest: false }, { where: { id: swipeIds } });
    }
  } catch (error) {}
}

async function validateQuota(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      throw { name: "forbidden" };
    }
    const swipes = (await SwipeInService.countSizeSwipedToday(userId)) || 0;
    const user = await User.findByPk(userId);
    if (!user) {
      throw { name: "forbidden" };
    }

    if (
      swipes >= 10 &&
      !user.userPremiumPackages?.premiumPackage.noSwipeQuota
    ) {
      throw { name: "no.quota" };
    }
  } catch (err) {
    next(err);
  }
}
