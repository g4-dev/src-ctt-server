import { Model, DataTypes } from "../deps.ts";

export interface ITranscript {
  name: string;
  content: string;
  status: string; // TODO use enum to filter possible choices
}

export class Transcript extends Model {
  static table = "transcript";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING, // TODO use ENUM type to filter possible choices
  };
}
