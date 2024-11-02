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
  userId: number;
  profileId: number;
  like: boolean;
  createdAt: Date;
  updatedAt: Date;
  latest: boolean;
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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  declare profileId: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare like: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  declare latest: boolean;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Profile)
  declare profile: Profile;
}

export default Swipe;
