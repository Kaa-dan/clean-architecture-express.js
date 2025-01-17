import { Request, Response, Router } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { JwtAuthService } from "../../infrastructure/services/JwtAuthService";
import { RegisterUser } from "../../use-cases/auth/RegisterUser";
import { LoginUser } from "../../use-cases/auth/LoginUser";
import { AuthController } from "../controllers/AuthController";

const router = Router()


// Dependencies
const userRepository = new MongoUserRepository();
const authService = new JwtAuthService();

// Use cases
const registerUseCase = new RegisterUser(userRepository, authService);
const loginUseCase = new LoginUser(userRepository, authService);

// Controllers
const authController = new AuthController(registerUseCase, loginUseCase);

router.post('/api/auth/register', async (req: Request, res: Response) => {
  await authController.register(req, res);
});

router.post('/api/auth/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});
export { router as authRoutes };