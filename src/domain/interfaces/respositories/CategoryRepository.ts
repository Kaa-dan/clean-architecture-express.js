import { Category } from "../../entities/Category";

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
  update(id: string,category:Category): Promise<Category | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}
