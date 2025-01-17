import { MongoBookRepository } from "./repositories/MongoBookRepository";
import { GetAllBooks } from "../use-cases/GetAllBooks";

class DIContainer {
  private static _bookRepository = new MongoBookRepository();

  static getBookRepository() {
    return this._bookRepository;
  }

  static getGetAllBooksUseCase() {
    return new GetAllBooks(this.getBookRepository());
  }
}

export { DIContainer };