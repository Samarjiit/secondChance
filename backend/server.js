import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import products from "./data/products.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { execPath } from "process";

dotenv.config();
const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.send("APi is running....");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use("/cart/api/products", productRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const environment = process.env.NODE_ENV || "development";

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
