import { Category } from "../../entities/Category";

export interface CategoryRepository {
  create(category: Category): Promise<Category>;
//   update(id: string): Promise<boolean>;
//   delete(id: string): Promise<boolean>;
//   findById(id: string): Promise<Category | null>;
  findAll(): Promise<Category[]>;
}
