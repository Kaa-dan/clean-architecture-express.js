// import { User } from "../entities/User";

import { User } from "../../entities/User";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  create(user: User): Promise<User>;
}