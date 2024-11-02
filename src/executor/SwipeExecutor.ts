import { Request, Response, NextFunction } from "express";
import SwipeInService from "../database/services/SwipeInService";
import User from "../database/models/User";
import ProfileInService from "../database/services/ProfileInService";
import Swipe from "../database/models/Swipe";
import Profile from "../database/models/Profile";

interface RequestBodySwipe {
  like: boolean;
  profileId: number;
}

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

    const latestSwipes = await SwipeInService.findAllByUserIdAndLatest(userId);

    if (latestSwipes && latestSwipes.length > 0) {
      const swipeIds = latestSwipes.map((swipe) => swipe.id);

      await Swipe.update({ latest: false }, { where: { id: swipeIds } });
    }

    const { like, profileId }: RequestBodySwipe = req.body;
    if (like == undefined || !profileId) {
      throw { name: "invalid.input" };
    }
    const profile = await Profile.findByPk(profileId);
    if (!profile) {
      throw { name: "not.found" };
    }

    await Swipe.create({
      userId,
      profileId,
      like,
      latest: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const likeOrPass = like ? "liked" : "passed";
    res.status(201).json({
      message: `You ${likeOrPass} ${profile.displayName}`,
    });
  } catch (err) {
    next(err);
  }
}

export async function getMatchedProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      throw { name: "forbidden" };
    }
    const profile = await ProfileInService.findByUserId(userId);
    if (!profile) {
      throw { name: "forbidden" };
    }
    const profilesMatched =
      await ProfileInService.findAllProfileMatchedByUserId(userId, profile?.id);
    res.status(200).json(profilesMatched);
  } catch (err) {
    next(err);
  }
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
