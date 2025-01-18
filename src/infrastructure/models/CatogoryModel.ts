import mongoose, { Document, Schema } from "mongoose";

export interface ICatogoryDocument extends Document {
  name: string;
  image: string;
  createdAt: Date;
}

const CategorySchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const CategoryModel = mongoose.model<ICatogoryDocument>(
  "Category",
  CategorySchema
);
