import { Model, Table, Column, DataType } from "sequelize-typescript";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  password: string;
  isPremium: boolean;
  likesToday: number;
  isVerified: boolean;
  isUnlimitedLikes: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table({
  tableName: "users", 
  timestamps: true, 
})
class User extends Model<UserAttributes, UserCreationAttributes> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.STRING })
  declare firstName: string;

  @Column({ type: DataType.STRING })
  declare lastName: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING })
  declare bio: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isPremium: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare likesToday: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isVerified: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isUnlimitedLikes: boolean;
}

export default User;
