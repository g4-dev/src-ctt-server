import {
  BaseModel,
  Field,
  FieldType,
  Model,
} from "https://deno.land/x/dso@v1.0.0/mod.ts";

@Model("transcript")
export class Transcript extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 30 })
  name: string;

  @Field({ type: FieldType.LONGTEXT, length: 255 })
  content: string;

  @Field({ type: FieldType.STRING, length: 5 })
  statut: string;
}
