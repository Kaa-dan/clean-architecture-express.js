import { InMemoryBookRepository } from "./repositories/InMemoryBookRepository";
import { GetAllBooks } from "../use-cases/GetAllBooks";

class DIContainer {
  private static _bookRepository = new InMemoryBookRepository();

  static getBookRepository() {
    return this._bookRepository;
  }

  static getGetAllBooksUseCase() {
    return new GetAllBooks(this.getBookRepository());
  }
}

export { DIContainer };