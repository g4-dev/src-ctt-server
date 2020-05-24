import {
  BaseModel,
  dso,
  Field,
  FieldType,
  Model,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

// Define an user entity
@Model("users")
class UserModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 30 })
  name: string;

  @Field({ type: FieldType.STRING, length: 30 })
  apiKey: string;
}

export const userModel = dso.define(UserModel);
