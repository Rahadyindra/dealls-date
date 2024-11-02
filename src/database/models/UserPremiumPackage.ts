import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./User";
import PremiumPackage from "./PremiumPackage";
import { Optional } from "sequelize";

interface UserPremiumPackageAttributes {
  id: number;
  userId: number;
  premiumPackageId: number;
  purchaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPremiumPackageCreationAttributes
  extends Optional<UserPremiumPackageAttributes, "id"> {}

@Table({
  tableName: "user_premium_packages",
  timestamps: true,
})
class UserPremiumPackage extends Model<
  UserPremiumPackageAttributes,
  UserPremiumPackageCreationAttributes
> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  declare userId: number;

  @ForeignKey(() => PremiumPackage)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare premiumPackageId: number;

  @Column({ type: DataType.DATE, allowNull: false })
  declare purchaseDate: Date;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => PremiumPackage)
  declare premiumPackage: PremiumPackage;
}

export default UserPremiumPackage;
