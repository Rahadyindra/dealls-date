import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  HasMany,
  ForeignKey,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import User from "./User";
import Swipe from "./Swipe";

interface ProfileAttributes {
  id: number;
  userId: number;
  bio?: string;
  age: number;
  gender?: string;
  profilePicture?: string;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

@Table({
  tableName: "profiles",
  timestamps: true,
})
class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> {
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

  @Column({ type: DataType.TEXT })
  declare bio?: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare age: number;

  @Column({ type: DataType.STRING })
  declare gender?: string;

  @Column({ type: DataType.STRING })
  declare profilePicture?: string;

  // Associations
  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Swipe)
  declare swipes: Swipe[];
}

export default Profile;