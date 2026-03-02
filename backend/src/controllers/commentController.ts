import type { Request, Response } from "express";
import * as queries from "../db/queries";

export const createComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { productId } = req.params;
    const { content } = req.body;

    if (!content)
      return res.status(400).json({ error: "Comment content is required" });

    const product = await queries.getProductById(productId as string);
    if (!product)
      return res.status(404).json({
        error: "Product not found",
      });

    const comment = await queries.createComment({
      content,
      userId,
      productId: productId as string,
    });

    return res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating the comment: ", error);
    return res.status(500).json({
      error: "Failed to create the comment",
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { commentId } = req.params;

    // Checking if comment exists and belongs to user
    const existingComment = await queries.getCommentById(commentId as string);
    if (!existingComment)
      return res.status(404).json({
        error: "Comment not found",
      });
    if (existingComment.userId !== userId)
      return res.status(403).json({
        error: "You can only delete your own comments",
      });

    await queries.deleteComment(commentId as string);
    return res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the comment: ", error);
    return res.status(500).json({
      error: "Failed to delete the comment",
    });
  }
};
