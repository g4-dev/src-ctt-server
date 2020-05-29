import { BaseModel, Where } from "https://deno.land/x/dso@v1.0.0/mod.ts";

export async function isSatisfiedBy(model: BaseModel, id: number) {
  const result = await model
    .builder()
    .select()
    .where(Where.field("id").eq(id))
    .limit(0, 1);

  return result;
}
