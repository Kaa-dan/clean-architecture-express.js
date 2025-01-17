export class Product {
    constructor(
      public readonly id: string,
      public name: string,
      public description: string,
      public price: number,
      public createdBy: string,
      public createdAt: Date = new Date()
    ) {}
  }