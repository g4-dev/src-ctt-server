import { BaseModel, Field, FieldType, Model } from "../deps.ts";

@Model("transcript")
export class TranscriptModel extends BaseModel {
  @Field({
    type: FieldType.INT,
    primary: true,
    length: 11,
    autoIncrement: true,
  })
  id: number;

  @Field({ type: FieldType.STRING, length: 30 })
  name!: string;

  @Field({ type: FieldType.LONGTEXT, length: 255 })
  content?: string;

  @Field({ type: FieldType.STRING, length: 5 })
  statut!: string;
}
