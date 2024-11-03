import PremiumPackage from "../models/PremiumPackage";

export default class PremiumPackageInService {
  static async findAllAvailable(): Promise<PremiumPackage[]> {
    const availablePackage = await PremiumPackage.findAll();
    return availablePackage;
  }
}
