import { BookRepository } from "../domain/interfaces/BookRepository";

export class GetAllBooks {
  constructor(private bookRepository: BookRepository) {}

  async execute() {
    return await this.bookRepository.findAll();
  }
  
}
