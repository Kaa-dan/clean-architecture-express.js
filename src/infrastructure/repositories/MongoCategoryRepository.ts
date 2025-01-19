import { Types } from "mongoose";
import { Category } from "../../domain/entities/Category";
import { CategoryRepository } from "../../domain/interfaces/respositories/CategoryRepository";
import { CategoryModel } from "../models/CatogoryModel";

export class MongoCategoryRepository implements CategoryRepository {
  async create(category: Category): Promise<Category> {
    const newCategory = await CategoryModel.create({
      name: category.name,
      image: category.image ?? "null",
    });

    console.log({ newCategory });
    return this.mapToCategory(newCategory);
  }
  async update(id: string, category: Category): Promise<Category | null> {
    const updateCategory = await CategoryModel.findOneAndUpdate(
      new Types.ObjectId(id),
      {
        name: category.name,
        image: category.image,
      }
    );
    if (!updateCategory) return null;
    return this.mapToCategory(updateCategory);
  }

  async delete(id: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(id);
    return !!result;
  }

  async findById(id: string): Promise<Category | null> {
    const category = await CategoryModel.findById(id);
    if (!category) return null;
    return this.mapToCategory(category);
  }

  async findAll(): Promise<Category[]> {
    const categories = await CategoryModel.find();
    return categories.map((category) => this.mapToCategory(categories));
  }

  private mapToCategory(doc: any): Category {
    return new Category(doc.name, doc.image);
  }
}
