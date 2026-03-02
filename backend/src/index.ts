import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); // Enable cors and allowing the sending of cookies from the frontend
app.use(clerkMiddleware()); // Auth obj
app.use(express.json()); // Parses  JSON object
app.use(express.urlencoded({ extended: true })); // Parses form data

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

const port = ENV.PORT || 3000;

app.listen(port, () => {
  console.log("Server running on PORT: " + port);
});
