
import { UserModel } from "../mongodb/models/UserModel";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/respositories/UserRepository";

export class MongoUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    
    return new User(
      user._id.toString(),
      user.email,
      user.password,
      user.name,
      user.createdAt
    );
  }

  async create(user: User): Promise<User> {
    const newUser = await UserModel.create({
      email: user.email,
      password: user.password,
      name: user.name
    });

    return new User(
      newUser._id.toString(),
      newUser.email,
      newUser.password,
      newUser.name,
      newUser.createdAt
    );
  }
}