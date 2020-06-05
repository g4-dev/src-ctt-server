import { Model, DataTypes } from "../deps.ts";

export class Transcript extends Model {
  static table = "user";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  };
}
