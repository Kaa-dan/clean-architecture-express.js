import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { JwtAuthService } from './infrastructure/services/JwtAuthService';
import { RegisterUser } from './use-cases/auth/RegisterUser';
import { LoginUser } from './use-cases/auth/LoginUser';
import { AuthController } from './interface/controllers/AuthController';
import { ProductController } from './interface/controllers/ProductController';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepostory';
import { MongoUserRepository } from './infrastructure/repositories/MongoUserRepository';
import { authenticateToken } from './interface/middleware/authMiddleware';

// Define custom interface to extend Express Request
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    [key: string]: any;
  };
}

const app = express();
app.use(express.json());

// Dependencies
const userRepository = new MongoUserRepository();
const productRepository = new MongoProductRepository();
const authService = new JwtAuthService();

// Use cases
const registerUseCase = new RegisterUser(userRepository, authService);
const loginUseCase = new LoginUser(userRepository, authService);

// Controllers
const authController = new AuthController(registerUseCase, loginUseCase);
const productController = new ProductController(productRepository);

// Auth routes
app.post('/api/auth/register', async (req: Request, res: Response) => {
  await authController.register(req, res);
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  await authController.login(req, res);
});

// Product routes (protected)
app.get('/api/products', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  await productController.getAllProducts(req, res);
});

app.post('/api/products', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  await productController.createProduct(req, res);
});

app.put('/api/products/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  await productController.updateProduct(req, res);
});

app.delete('/api/products/:id', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  await productController.deleteProduct(req, res);
});

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/clean-arch-demo')
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(console.error);