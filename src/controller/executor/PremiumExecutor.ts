import { Request, Response, NextFunction } from "express";
import PremiumPackageInService from "../../database/services/PremiumPackageInService";
import UserInService from "../../database/services/UserInService";
import PremiumPackage from "../../database/models/PremiumPackage";
import PremiumPackageEnum from "../../enums/PremiumPackageEnum";
import UserPremiumPackage from "../../database/models/UserPremiumPackage";
import User from "../../database/models/User";
import Profile from "../../database/models/Profile";

export async function getAllAvailablePremiumPackageExecute(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const premiumPackages = await PremiumPackageInService.findAllAvailable();
    res.status(200).json(premiumPackages);
  } catch (err) {
    next(err);
  }
}

export async function applyPremiumExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.user?.id;
    const packageId = req.body.packageId;

    if (!userId) {
      throw { name: "forbidden" };
    }
    if (!packageId) {
      throw { name: "invalid.input" };
    }
    const user = await UserInService.findByUserIdIncludeProfileAndPackage(
      userId
    );
    const premiumPackage = await PremiumPackage.findByPk(packageId);
    if (!premiumPackage) {
      throw { name: "not.found" };
    }
    if (!user?.userPremiumPackage) {
      await UserPremiumPackage.create({
        userId,
        premiumPackageId: packageId,
        purchaseDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await Profile.update(
        { isVerified: premiumPackage.verifiedLabel },
        {
          where: {
            userId,
          },
        }
      );
      return res.status(201).json({
        message: `Successfully applied package ${premiumPackage?.packageName}`,
      });
    }
    if (user?.userPremiumPackage?.premiumPackage.id === +packageId) {
      throw {
        name: "cannot.apply",
        message: `You cannot apply for ${premiumPackage?.packageName}`,
      };
    }

    if (
      premiumPackage?.packageName == PremiumPackageEnum.Gold &&
      user?.userPremiumPackage?.premiumPackage.packageName ==
        PremiumPackageEnum.Platinum
    ) {
      throw {
        name: "cannot.apply",
        message: `You cannot downgrade your package`,
      };
    }

    await UserPremiumPackage.destroy({
      where: {
        userId,
      },
    });

    await UserPremiumPackage.create({
      userId,
      premiumPackageId: packageId,
      purchaseDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await Profile.update(
      { isVerified: premiumPackage.verifiedLabel },
      {
        where: {
          userId,
        },
      }
    );

    return res.status(201).json({
      message: `Successfully applied package ${premiumPackage?.packageName}`,
    });
  } catch (err) {
    next(err);
  }
}

export async function unApplyPremiumExecuteProcessor(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      throw { name: "forbidden" };
    }
    const user = await UserInService.findByUserIdIncludeProfileAndPackage(
      userId
    );
    if (!user?.userPremiumPackage) {
      throw { name: "forbidden" };
    }

    await UserPremiumPackage.destroy({
      where: {
        userId,
      },
    });

    await Profile.update(
      {
        isVerified: false,
      },
      {
        where: { userId },
      }
    );

    return res.status(201).json({
      message: "Successfully unapplied your package",
    });
  } catch (err) {
    next(err);
  }
}
