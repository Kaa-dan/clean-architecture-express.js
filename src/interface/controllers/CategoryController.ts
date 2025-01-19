import { Request, Response } from "express";
import { CategoryRepository } from "../../domain/interfaces/respositories/CategoryRepository";

export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}

  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryRepository.findAll();
      console.log({ categories });
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching categories" });
    }
  };

  createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryRepository.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      console.log({ error });
      res.status(500).json({ message: "Error creating category" });
    }
  };

  updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
      const category = await this.categoryRepository.update(
        req.params.id,
        req.body
      );
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error updating product" });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const success = this.categoryRepository.delete(req.params.id);
      if (!success) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error deleting product" });
    }
  };
}
