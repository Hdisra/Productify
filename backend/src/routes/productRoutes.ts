import { Router } from "express";
import * as productController from "../controllers/productController";
import { requireAuth } from "@clerk/express";
import { validateUserId } from "../middlewares/auth";

const router = Router();

// Get all products (public route)
router.get("/", productController.getAllProducts);

// Get current user's products (protected route)
router.get(
  "/my",
  requireAuth(),
  validateUserId,
  productController.getUserProducts,
);

// Get a single product  (public route)
router.get("/:id", productController.getProductById);

// Create a new product (protected route)
router.post(
  "/",
  requireAuth(),
  validateUserId,
  productController.createProduct,
);

// Update a product (protected route - owner only)
router.put(
  "/:id",
  requireAuth(),
  validateUserId,
  productController.updateProduct,
);

// Delete a product (protected route - owner only)
router.delete(
  "/:id",
  requireAuth(),
  validateUserId,
  productController.deleteProduct,
);

export default router;
