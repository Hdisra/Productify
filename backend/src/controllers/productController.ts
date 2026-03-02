import type { Request, Response } from "express";

import * as queries from "../db/queries";
import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await queries.getallProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error generating the product: ", error);
    return res.status(500).json({ error: "Failed to get products" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await queries.getProductById(id as string);

    if (!product) return res.status(404).json({ error: "Product not found" });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error getting the product: ", error);
    return res.status(500).json({
      error: "Failed to get product",
    });
  }
};

export const getUserProducts = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const products = await queries.getProductsByUserId(userId);
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error getting the user products: ", error);
    return res.status(500).json({
      error: "Failed to get user products",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const { title, description, imageUrl } = req.body;

    if (!title || !description || !imageUrl)
      return res.status(400).json({
        error: "Title, description and imageUrl are required",
      });

    const product = await queries.createProduct({
      title,
      description,
      imageUrl,
      userId,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating the product: ", error);
    return res.status(500).json({
      error: "Failed to create the product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;
    const { title, description, imageUrl } = req.body;

    // Checking if products exists and belongs to the user
    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found" });
    if (existingProduct.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only update your own products" });

    const product = await queries.updateProduct(id as string, {
      title,
      description,
      imageUrl,
    });

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating the product: ", error);
    return res.status(500).json({
      error: "Failed to update the product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { id } = req.params;

    // Check if product exists and belongs to the user
    const existingProduct = await queries.getProductById(id as string);
    if (!existingProduct)
      return res.status(404).json({ error: "Product not found" });
    if (existingProduct.userId !== userId)
      return res
        .status(403)
        .json({ error: "You can only delete your own products" });

    await queries.deleteProduct(id as string);
    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting the product: ", error);
    return res.status(500).json({
      error: "Failed to delete the product",
    });
  }
};
