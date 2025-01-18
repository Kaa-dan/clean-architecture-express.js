import { Request, Response } from "express";
import { RegisterUser } from "../../use-cases/auth/RegisterUser";
import { LoginUser } from "../../use-cases/auth/LoginUser";
import { Types } from "mongoose";

export class AuthController {
  constructor(
    private registerUseCase: RegisterUser,
    private loginUseCase: LoginUser
  ) {}

  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await this.registerUseCase.execute(email, password);
      console.log({user})
      res.status(201).json({ id: user._id , email: user.email });

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
