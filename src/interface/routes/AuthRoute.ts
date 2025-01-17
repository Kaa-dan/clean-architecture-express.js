import { Request, Response, Router } from "express";
import { MongoUserRepository } from "../../infrastructure/repositories/MongoUserRepository";
import { JwtAuthService } from "../../infrastructure/services/JwtAuthService";
import { RegisterUser } from "../../use-cases/auth/RegisterUser";
import { LoginUser } from "../../use-cases/auth/LoginUser";
import { AuthController } from "../controllers/AuthController";

const router = Router();

// Dependencies
const userRepository = new MongoUserRepository();
const authService = new JwtAuthService();

// Use cases
const registerUseCase = new RegisterUser(userRepository, authService);
const loginUseCase = new LoginUser(userRepository, authService);

// Controllers
const authController = new AuthController(registerUseCase, loginUseCase);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/register', async (req: Request, res: Response) => {
  await authController.register(req, res);
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});

export { router as authRoutes };