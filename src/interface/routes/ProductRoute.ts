import { Request, Response, Router } from "express";
import { MongoProductRepository } from "../../infrastructure/repositories/MongoProductRepostory";
import { ProductController } from "../controllers/ProductController";
import { authenticateToken } from "../middleware/authMiddleware";

// Define custom interface to extend Express Request
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    [key: string]: any;
  };
}

const router = Router();

const productRepository = new MongoProductRepository();

const productController = new ProductController(productRepository);

router.get(
  "/api/products",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await productController.getAllProducts(req, res);
  }
);

router.post(
  "/api/products",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await productController.createProduct(req, res);
  }
);

router.put(
  "/api/products/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await productController.updateProduct(req, res);
  }
);

router.delete(
  "/api/products/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await productController.deleteProduct(req, res);
  }
);

export { router as productRoutes };
