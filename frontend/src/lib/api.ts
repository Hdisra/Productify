import type {
  CreateCommentType,
  CreateUserType,
  ProductType,
  UpdateProductType,
  UserType,
} from "../types";
import api from "./axios";

// Users
export const syncUser = async (userData: CreateUserType) => {
  const { data } = await api.post<UserType>("/users/sync", userData);

  return data;
};

// Products
export const getAllProducts = async () => {
  const { data } = await api.get<ProductType[]>("/products");
  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await api.get<ProductType>(`products/${id}`);
  return data;
};

export const getUserProducts = async () => {
  const { data } = await api.get<ProductType[]>("/products/my");
  return data;
};

export const createProduct = async (productData: Partial<ProductType>) => {
  const { data } = await api.post("/products", productData);
  return data;
};

export const updateProduct = async ({
  id,
  ...productData
}: UpdateProductType) => {
  const { data } = await api.put<ProductType>(`/products/${id}`, productData);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

// Comments
export const createComment = async ({
  productId,
  content,
}: CreateCommentType) => {
  const { data } = await api.post(`/comments/${productId}`, { content });
  return data;
};

export const deleteComment = async ({ commentId }: { commentId: string }) => {
  const { data } = await api.delete(`/comments/${commentId}`);
  return data;
};
