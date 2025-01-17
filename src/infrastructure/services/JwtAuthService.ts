import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { AuthService } from '../../domain/interfaces/services/AuthService';

export class JwtAuthService implements AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
  private readonly SALT_ROUNDS = 10;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(userId: string): string {
    return jwt.sign({ userId }, this.JWT_SECRET, { expiresIn: '24h' });
  }

  verifyToken(token: string): any {
    return jwt.verify(token, this.JWT_SECRET);
  }
}