import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import { Optional } from "sequelize";
import Profile from "./Profile"; // Import Profile model
import Swipe from "./Swipe"; // Import Swipe model
import UserPremiumPackage from "./UserPremiumPackage"; // Import UserPremiumPackage model

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  premiumUntil?: Date; // Optional as it might not apply to all users
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users",
  timestamps: true,
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isVerified: boolean;

  @Column({ type: DataType.DATE })
  declare premiumUntil?: Date;

  // Associations
  @HasMany(() => Profile)
  declare profiles: Profile[];

  @HasMany(() => Swipe)
  declare swipes: Swipe[];

  @HasMany(() => UserPremiumPackage)
  declare userPremiumPackages: UserPremiumPackage[];
}

export default User;
