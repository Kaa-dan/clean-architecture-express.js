// import { UserRepository } from "../../domain/interfaces/repositories/UserRepository";
import { UserRepository } from "../../domain/interfaces/respositories/UserRepository";
import { AuthService } from "../../domain/interfaces/services/AuthService";

export class LoginUser {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.authService.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = this.authService.generateToken(user.id);
    return { token };
  }
}