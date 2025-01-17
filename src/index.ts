import express from "express";
import { bookRoutes } from "./interface/routes/BookRoutes"

const app = express();

app.use(express.json());
app.use("/api", bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});