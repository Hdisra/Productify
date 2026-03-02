import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import * as queries from "../db/queries";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const { email, name, imageUrl } = req.body;

    if (!email || !name || !imageUrl) {
      return res
        .status(400)
        .json({ error: "Email, name and imageUrl are required" });
    }

    const user = await queries.updateOrCreateUser({
      id: userId,
      email,
      name,
      imageUrl,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error syncing user: ", error);
    return res.status(500).json({ error: "Failed to sync user" });
  }
};
