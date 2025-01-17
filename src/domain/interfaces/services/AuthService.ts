export interface AuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    generateToken(userId: string): string;
    verifyToken(token: string): any;
  }