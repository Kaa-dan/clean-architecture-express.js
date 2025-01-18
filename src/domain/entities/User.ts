import { Types } from "mongoose";

export class User {
  public _id?: string;
  constructor(
    public email: string,
    public password: string,
    public createdAt: Date = new Date()
  ) {}
}
