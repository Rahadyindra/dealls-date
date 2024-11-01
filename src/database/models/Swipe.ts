import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./User";
import Profile from "./Profile";

interface SwipeAttributes {
  id: number;
  userId: number; // Foreign key to User
  profileId: number; // Foreign key to Profile
  swipeDirection: "like" | "pass"; // Enum for swipe direction
}

interface SwipeCreationAttributes extends Optional<SwipeAttributes, "id"> {}

@Table({
  tableName: "swipes",
  timestamps: true,
})
class Swipe extends Model<SwipeAttributes, SwipeCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @ForeignKey(() => Profile)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare profileId: number;

  @Column({ type: DataType.ENUM("like", "pass"), allowNull: false })
  declare swipeDirection: "like" | "pass";

  // Associations
  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Profile)
  declare profile: Profile;
}

export default Swipe;
