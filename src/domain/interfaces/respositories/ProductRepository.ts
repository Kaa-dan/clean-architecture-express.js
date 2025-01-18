import { Product } from "../../entities/Product";
export interface ProductRepository {
  create(product: Product): Promise<Product>;
  update(id: string, product: Product): Promise<Product | null>;
  delete(id: string): Promise<boolean>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
}
