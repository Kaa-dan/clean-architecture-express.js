import { Category } from "../../domain/entities/Category";
import { CategoryRepository } from "../../domain/interfaces/respositories/CategoryRepository";
import { CategoryModel } from "../models/CatogoryModel";
import { ProductModel } from "../models/ProductModel";

export class MongoCategoryRepository implements CategoryRepository {
  async create(category: Category): Promise<Category> {
    const newCategory = await ProductModel.create({
      name: category.name,
      image: category.image,
    });
    return this.mapToCategory(newCategory);
  }

  async findAll(): Promise<Category[]> {
      const categories = await CategoryModel.find();
      return categories.map(category=>this.mapToCategory(categories))
  }

  private mapToCategory(doc: any): Category {
    return new Category(doc._id.toString(),doc.name,doc.image);
  }
}
