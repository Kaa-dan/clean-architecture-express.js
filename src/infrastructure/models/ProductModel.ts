import mongoose, { Schema, Document } from "mongoose";

export interface IProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: Date;
  images: string[];
}

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  images: { type: [String], requierd: true },
  createdAt: { type: Date, default: Date.now },
});

export const ProductModel = mongoose.model<IProductDocument>(
  "Product",
  ProductSchema
);
