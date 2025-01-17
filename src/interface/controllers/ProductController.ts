import { Request, Response } from 'express';
import { ProductRepository } from '../../domain/interfaces/respositories/ProductRepository';

export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productRepository.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products' });
    }
  };

  async createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productRepository.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product' });
    }
  };

  async updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await this.productRepository.update(req.params.id, req.body);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error updating product' });
    }
  };

  async deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const success = await this.productRepository.delete(req.params.id);
      if (!success) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting product' });
    }
  };
}