import { Book } from "../../domain/entities/Book";
// import { Book } from "../../domain/enitities/Book";
import { BookRepository } from "../../domain/interfaces/BookRepository";
import { BookModel } from "../models/BookModel";

export class MongoBookRepository implements BookRepository {
  async findAll(): Promise<Book[]> {
    return await BookModel.find();
  }

  async findById(id: string): Promise<Book | null> {
    return await BookModel.findById(id);
  }

  async create(book: Book): Promise<Book> {
    const newBook = new BookModel(book);
    await newBook.save();
    return newBook;
  }

  async update(book: Book): Promise<void> {
    await BookModel.findByIdAndUpdate(book.id, book);
  }

  async delete(id: string): Promise<void> {
    await BookModel.findByIdAndDelete(id);
  }
}