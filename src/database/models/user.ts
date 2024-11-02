import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Profile from "./Profile";
import Swipe from "./Swipe";
import UserPremiumPackage from "./UserPremiumPackage";
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  premiumUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
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

  @Column({ type: DataType.DATE })
  declare premiumUntil?: Date;

  @HasMany(() => Profile)
  declare profiles: Profile[];

  @HasMany(() => Swipe)
  declare swipes: Swipe[];

  @HasOne(() => UserPremiumPackage)
  declare userPremiumPackages: UserPremiumPackage;
}

export default User;
