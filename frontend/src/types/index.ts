export type UserType = {
  id?: string;
  email: string | undefined;
  name: string | null;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateUserType = Pick<UserType, "email" | "name" | "imageUrl">;

export type ProductType = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserType;
  comments: CommentType[];
  userId: string;
};

export type UpdateProductType = {
  id: string;
  productData: Partial<ProductType>;
};

export type CreateCommentType = {
  productId: string;
  content: string;
};

export type CommentType = {
  id: string;
  content: string;
  product: ProductType;
  user: UserType;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
