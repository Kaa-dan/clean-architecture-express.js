import { Request, Response } from "express";
import { CategoryRepository } from "../../domain/interfaces/respositories/CategoryRepository";

export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}

  getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const categories = await this.categoryRepository.findAll();
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
      console.log({error})
      res.status(500).json({ message: "Error creating category" });
    }
  };
}
