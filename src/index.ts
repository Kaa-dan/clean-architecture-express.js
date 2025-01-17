import express from 'express';
import mongoose from 'mongoose';
import { setupSwagger } from './interface/swagger/swagger';
import { logger } from './infrastructure/logger/logger';
import { authRoutes } from './interface/routes/AuthRoute';
import { productRoutes } from './interface/routes/ProductRoute';



const app = express();
app.use(express.json());

setupSwagger(app);


// Auth routes
app.use('/api/auth',authRoutes)
// Product routes (protected)
app.use('/api/products',productRoutes)


// Connect to MongoDB and start server
mongoose.connect('mongodb://localhost:27017/clean-arch-demo')
  .then(() => {
    app.listen(3000, () => {
      logger.info( `server is running on port`)
    });
  })
  .catch(console.error);