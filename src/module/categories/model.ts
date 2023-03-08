import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "Category";
export const COLLECTION_NAME = "categories";

export default interface Category extends Document {
  name: string;
}

const schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoryModel = model<Category>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
