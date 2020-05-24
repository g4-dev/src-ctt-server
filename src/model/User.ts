import {
  BaseModel,
  Field,
  FieldType,
  Model,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

// Define an user entity
@Model("user")
export class User extends BaseModel {
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
  token: string;
}
