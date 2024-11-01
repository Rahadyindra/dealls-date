import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import UserPremiumPackage from "./UserPremiumPackage";

interface PremiumPackageAttributes {
  id: number;
  packageName: string;
  description: string;
  price: number;
  noSwipeQuota: boolean;
  verifiedLabel: boolean;
}

interface PremiumPackageCreationAttributes
  extends Optional<PremiumPackageAttributes, "id"> {}

@Table({
  tableName: "premium_packages",
  timestamps: false,
})
class PremiumPackage extends Model<
  PremiumPackageAttributes,
  PremiumPackageCreationAttributes
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare packageName: string;

  @Column({ type: DataType.TEXT })
  declare description: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  declare price: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare noSwipeQuota: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare verifiedLabel: boolean;

  @HasMany(() => UserPremiumPackage)
  declare userPremiumPackages: UserPremiumPackage[];
}

export default PremiumPackage;
