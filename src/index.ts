import express, { Request } from 'express';
import mongoose from 'mongoose';
import { JwtAuthService } from './infrastructure/services/JwtAuthService';
import { RegisterUser } from './use-cases/auth/RegisterUser';
import { LoginUser } from './use-cases/auth/LoginUser';
import { AuthController } from './interface/controllers/AuthController';
import { ProductController } from './interface/controllers/ProductController';
import { MongoProductRepository } from './infrastructure/repositories/MongoProductRepostory';
import { MongoUserRepository } from './infrastructure/repositories/MongoUserRepository';
import { authenticateToken } from './interface/middleware/authMiddleware';

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
app.post('/api/auth/register', (req: Request, res: Response) => authController.register(req, res));
app.post('/api/auth/login', (req: Request, res: Response) => authController.login(req, res));

// Product routes (protected)
app.get('/api/products', authenticateToken, (req: Request, res: Response) => 
  productController.getAllProducts(req, res)
);

app.post('/api/products', authenticateToken, (req: Request, res: Response) => 
  productController.createProduct(req, res)
);

app.put('/api/products/:id', authenticateToken, (req: Request, res: Response) => 
  productController.updateProduct(req, res)
);

app.delete('/api/products/:id', authenticateToken, (req: Request, res: Response) => 
  productController.deleteProduct(req, res)
);

// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/clean-arch-demo')
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(console.error);