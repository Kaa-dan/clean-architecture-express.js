import { UserModel } from "../models/UserModel";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/respositories/UserRepository";

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;

    return new User(user.email, user.password);
  }

  async create(user: User): Promise<User> {
    const newUser = await UserModel.create({
      email: user.email,
      password: user.password,
    });

    return new User(newUser.email, newUser.password);
  }
}
