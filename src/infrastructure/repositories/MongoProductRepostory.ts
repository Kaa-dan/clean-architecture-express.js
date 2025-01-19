import { ProductModel } from "../models/ProductModel";
import { Product } from "../../domain/entities/Product";
import { ProductRepository } from "../../domain/interfaces/respositories/ProductRepository";

export class MongoProductRepository implements ProductRepository {
  async create(product: Product): Promise<Product> {
    const newProduct = await ProductModel.create({
      name: product.name,
      description: product.description,
      price: product.price,
    });

    return this.mapToProduct(newProduct);
  }

  async update(id: string, product: Product): Promise<Product | null> {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name: product.name,
        description: product.description,
        price: product.price
      },
      { new: true }
    );

    if (!updatedProduct) return null;
    return this.mapToProduct(updatedProduct);
  }

  async delete(id: string): Promise<boolean> {
    const result = await ProductModel.findByIdAndDelete(id);
    return !!result;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    if (!product) return null;
    return this.mapToProduct(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find();
    return products.map(product => this.mapToProduct(product));
  }

  private mapToProduct(doc: any): Product {
    return new Product(
      doc._id.toString(),
      doc.name,
      doc.description,
      doc.price,
      doc.createdBy.toString(),
      doc.createdAt
    );
  }
}