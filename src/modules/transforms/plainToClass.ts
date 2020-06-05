import { transformer } from "@/deps.ts";
const { plainToClass } = transformer;

export const plainToClassTransformer = {
  type: "body", // parse body params
  getTransform: (transform: any, body: any) => {
    return plainToClass(transform, body);
  },
};
