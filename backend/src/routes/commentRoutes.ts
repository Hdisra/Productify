import { Router } from "express";
import { requireAuth } from "@clerk/express";
import * as commentController from "../controllers/commentController";
import { validateUserId } from "../middlewares/auth";

const router = Router();

// Adds a comment to a product (protected route)
router.post(
  "/:productId",
  requireAuth(),
  validateUserId,
  commentController.createComment,
);

// Deletes a comment (protected router - owner only)
router.delete(
  "/:commentId",
  requireAuth(),
  validateUserId,
  commentController.deleteComment,
);

export default router;
