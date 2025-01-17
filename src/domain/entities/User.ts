export class User {
    constructor(
      public readonly id: string,
      public email: string,
      public password: string,
      public name: string,
      public createdAt: Date = new Date()
    ) {}
  }
  