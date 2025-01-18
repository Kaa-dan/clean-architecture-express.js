import express from "express";
import mongoose from "mongoose";
import { setupSwagger } from "./interface/swagger/swagger";
import { logger } from "./infrastructure/logger/logger";
import { authRoutes } from "./interface/routes/AuthRoute";
import { productRoutes } from "./interface/routes/ProductRoute";
import dotenv from "dotenv";
import { categoryRoutes } from "./interface/routes/CategoryRoute";

dotenv.config();

const app = express();

app.use(express.json());

setupSwagger(app);

const PORT = 3000;

// Auth routes
app.use("/api/auth", authRoutes);

// Category routes (protected)
app.use("/api/categories", categoryRoutes);

// Product routes (protected)
app.use("/api/products", productRoutes);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.DB_URL as string)
  .then(() => {
    app.listen(3000, () => {
      logger.info(`server is running on port ${PORT}`);
    });
  })
  .catch(console.error);
