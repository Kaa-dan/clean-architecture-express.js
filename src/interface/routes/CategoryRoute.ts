import { Request, Response, Router } from "express";
import { MongoCategoryRepository } from "../../infrastructure/repositories/MongoCategoryRepository";
import { CategoryController } from "../controllers/CategoryController";
import { authenticateToken } from "../middleware/authMiddleware";

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    [key: string]: any;
  };
}
const router = Router();

const categoryRepository = new MongoCategoryRepository();
const categoryController = new CategoryController(categoryRepository);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         image:
 *           type: string
 */

router.get(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await categoryController.getAllCategories(req, res);
  }
);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 */
router.post(
  "/",
  authenticateToken,
  async (req: AuthenticatedRequest, res: Response) => {
    await categoryController.createCategory(req, res);
  }
);

export { router as categoryRoutes };
