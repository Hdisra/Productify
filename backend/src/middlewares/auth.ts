import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = getAuth(req);
  if (!userId) return res.status(401).json({ error: "Unauthorized" });

  req.userId = userId;
  next();
};
