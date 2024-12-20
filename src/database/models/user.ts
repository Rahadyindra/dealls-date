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

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @HasOne(() => Profile)
  declare profile: Profile;

  @HasMany(() => Swipe, { as: "sentSwipes" })
  declare sentSwipes: Swipe[];

  @HasMany(() => Swipe, { as: "receivedSwipes" })
  declare receivedSwipes: Swipe[];

  @HasOne(() => UserPremiumPackage, { as: "userPremiumPackage" })
  declare userPremiumPackage: UserPremiumPackage;
}

export default User;
