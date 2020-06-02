import { does } from "./does.ts";
import { BaseModel } from "../../deps.ts";

const initDataModule = (model: BaseModel) => does.init(model);
const doesExist = (id: number) => does.exist(id);

export { initDataModule, doesExist };
