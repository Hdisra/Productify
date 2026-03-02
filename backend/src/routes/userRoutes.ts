import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";
import { validateUserId } from "../middlewares/auth";

const router = Router();

// Sync the clerk user to DB
router.post("/sync", requireAuth(), validateUserId, syncUser);

export default router;
