import { BaseModel, Where } from "../../deps.ts";
import { conn } from "@/config.ts";

let model: BaseModel;

export const does = {
  init(newModel: BaseModel) {
    model = newModel;
  },

  async exist(id: number) {
    conn();
    return (await model.findOne(Where.from({ id: id }))) !== undefined;
  },
};
