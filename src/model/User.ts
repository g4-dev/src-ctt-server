import { Model, DataTypes } from "../deps.ts";

export class User extends Model {
  static table = "user";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    token: DataTypes.STRING,
  };
}
