import { BaseModel, Field, FieldType, Model } from "../deps.ts";

// Define an user entity
@Model("user")
export class UserModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 30 })
  name!: string;

  @Field({ type: FieldType.STRING, length: 30 })
  familyName!: string;

  @Field({ type: FieldType.STRING, length: 30 })
  email!: string;

  @Field({ type: FieldType.STRING, length: 30 })
  token?: string;

  @Field({ type: FieldType.STRING, length: 30 })
  secret!: string;

  @Field({ type: FieldType.BOOLEAN })
  valid!: boolean;
}
