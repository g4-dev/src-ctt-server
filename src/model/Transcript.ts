import { Model, DataTypes, nanoid } from "../deps.ts";

export interface ITranscript {
  name: string;
  content: string;
  status: string;
}

const STATUSES = ["done", "progress", "canceled"];

export class Transcript extends Model {
  static table = "transcript";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      ...DataTypes.enum(STATUSES),
      allowNull: false,
    },
  };

  static defaults = {
    id: nanoid(),
    status: "done",
  };

  static getStatus() {
    return [];
  }
}
