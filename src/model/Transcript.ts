import { Model, DataTypes, nanoid } from "../deps.ts";

const STATUSES = ["done", "progress", "canceled"];

export interface ITranscript {
  uuid: string;
  audio_file?: string;
  text_file?: string;
  status: string;
}

export class Transcript extends Model {
  static table = "transcript";
  static timestamps = true;

  static fields = {
    id: {
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    audio_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    text_file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      ...DataTypes.enum(STATUSES),
      allowNull: false,
    },
  };

  static defaults = {
    id: nanoid(),
    status: "progress",
  };

  static getStatus() {
    return STATUSES;
  }
}
