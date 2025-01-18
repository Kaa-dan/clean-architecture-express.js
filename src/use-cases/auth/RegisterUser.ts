import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/interfaces/respositories/UserRepository";
import { AuthService } from "../../domain/interfaces/services/AuthService";

export class RegisterUser {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await this.authService.hashPassword(password);
    const user = new User(email, hashedPassword);

    return await this.userRepository.create(user);
  }
}
