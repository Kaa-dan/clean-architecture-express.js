import { Request, Response } from 'express';
import { RegisterUser } from '../../use-cases/auth/RegisterUser';
import { LoginUser } from '../../use-cases/auth/LoginUser';

export class AuthController {
  constructor(
    private registerUseCase: RegisterUser,
    private loginUseCase: LoginUser
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      const user = await this.registerUseCase.execute(email, password, name);
      res.status(201).json({ id: user.id, email: user.email, name: user.name });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
