import { Router } from "express";
import { BookController } from "../controllers/BookController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/books", authenticateToken, (req, res) => BookController.getAll(req,res))

export { router as bookRoutes };