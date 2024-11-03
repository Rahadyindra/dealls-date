import { Request, Response, NextFunction } from "express";
import PremiumPackageInService from "../../database/services/PremiumPackageInService";
import UserInService from "../../database/services/UserInService";
import PremiumPackage from "../../database/models/PremiumPackage";
import PremiumPackageEnum from "../../enums/PremiumPackageEnum";
import UserPremiumPackage from "../../database/models/UserPremiumPackage";

export async function getAllAvailablePremiumPackage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const premiumPackages = PremiumPackageInService.findAllAvailable();
    res.status(200).json(premiumPackages);
  } catch (err) {
    next(err);
  }
}

export async function doApplyPremium(
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
    if (!user?.userPremiumPackages) {
      UserPremiumPackage.create({
        userId,
        premiumPackageId: packageId,
        purchaseDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res.status(201).json({
        message: `Successfully applied package ${premiumPackage?.packageName}`,
      });
    }
    if (user?.userPremiumPackages?.premiumPackage.id === packageId) {
      throw {
        name: "cannot.apply",
        message: `You cannot apply for ${premiumPackage?.packageName}`,
      };
    }

    if (
      premiumPackage?.packageName == PremiumPackageEnum.Gold &&
      user?.userPremiumPackages?.premiumPackage.packageName ==
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

    return res.status(201).json({
      message: `Successfully applied package ${premiumPackage?.packageName}`,
    });
  } catch (err) {
    next(err);
  }
}
