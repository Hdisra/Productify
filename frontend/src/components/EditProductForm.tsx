import React, { useState } from "react";
import type { ProductType } from "../types";
import { Link } from "react-router";
import {
  ArrowLeftIcon,
  FileTextIcon,
  ImageIcon,
  SaveIcon,
  TypeIcon,
} from "lucide-react";

type EditProductFormProps = {
  product: ProductType;
  isPending: boolean;
  isError: boolean;
  onSubmit: (formData: any) => void;
};

type UpdateProduct = Pick<ProductType, "title" | "description" | "imageUrl">;

export default function EditProductForm({
  product,
  isPending,
  isError,
  onSubmit,
}: EditProductFormProps) {
  const [formData, setFormData] = useState<UpdateProduct>({
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to={"/profile"}
        className="btn btn-ghost btn-sm gap-1 mb-4 lg:text-base"
      >
        <ArrowLeftIcon className="size-4 lg:size-5" /> Back
      </Link>

      <div className="card bg-base-300">
        <div className="card-body">
          <h1 className="card-title">
            <SaveIcon className="size-5 text-primary" />
            Edit Product
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="space-y-4 mt-4"
          >
            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <TypeIcon className="size-4 lg:size-5 text-base-content/50" />
              <input
                type="text"
                placeholder="Product title"
                className="grow"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2 bg-base-200">
              <ImageIcon className="size-4 text-base-content/50" />
              <input
                type="url"
                placeholder="Image Url"
                className="grow"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                required
              />
            </label>

            {formData.imageUrl && (
              <div className="rounded-box overflow-hidden mt-5">
                <img
                  src={formData.imageUrl}
                  alt="Image Preview"
                  className="w-full h-40 object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              </div>
            )}

            <div className="form-control">
              <div className="flex items-start gap-2 p-3 rounded-box bg-base-200 border border-base-300">
                <FileTextIcon className="size-4 text-base-content/50 mt-1" />
                <textarea
                  placeholder="Description"
                  className="grow bg-transparent resize-none focus:outline-none min-h-24"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {isError && (
              <div
                role="alert"
                className="alert alert-error alert-sm justify-center"
              >
                <span>Failed to update. Try again</span>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full lg:text-base"
            >
              {isPending ? (
                <span className="loading loading-spinner" />
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
