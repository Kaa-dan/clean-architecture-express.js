import { Request, Response } from "express";
import { GetAllBooks } from "../../use-cases/GetAllBooks";
import { DIContainer } from "../../infrastructure/DIContainer";
import { validate } from "class-validator";
import { CreateBookDto } from "../dto/CreateBookDto";

export class BookController {
  private getAllBooks = DIContainer.getGetAllBooksUseCase();

  async getAll(req: Request, res: Response) {
    const books = await this.getAllBooks.execute();
    res.json(books);
  }

  async create(req: Request, res: Response) {
    const dto = Object.assign(new CreateBookDto(), req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Proceed with the creation logic...
  }
}
