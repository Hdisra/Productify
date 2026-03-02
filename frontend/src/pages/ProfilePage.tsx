import { Link, useNavigate } from "react-router";
import { useDeleteProduct, useMyProducts } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  EditIcon,
  EyeIcon,
  PackageIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: products, isLoading } = useMyProducts();
  const deleteProduct = useDeleteProduct();

  const handleDelete = (id: string) => {
    if (confirm("Delete this product?")) deleteProduct.mutate(id);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-base-content/60 text-sm lg:text-base">
            Manage your listings
          </p>
        </div>
        <Link
          to={"/create"}
          className="btn btn-primary btn-sm gap-1 lg:text-base"
        >
          <PlusIcon className="size-4 lg:size-5" /> New
        </Link>
      </div>

      {/* Product amount */}
      <div className="stats bg-base-300 w-full">
        <div className="stat">
          <div className="stat-title lg:text-base">Total Products</div>
          <div className="stat-value text-primary">{products?.length || 0}</div>
        </div>
      </div>

      {/* Products */}
      {products?.length === 0 ? (
        <div className="card bg-base-300">
          <div className="card-body items-center text-center py-16">
            <PackageIcon className="size-16 text-base-content/20" />
            <h3 className="card-title text-base-content/50">No products yet</h3>
            <p className="text-base-content/40 text-sm">
              Start by creating your first product
            </p>
            <Link
              to={"/create"}
              className="btn btn-primary btn-sm mt-4 lg:text-sm"
            >
              Create Product
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {products?.map((product) => (
            <div key={product.id} className="card card-side bg-base-300">
              <figure className="w-32 shrink-0">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base lg:text-lg">
                  {product.title}
                </h2>
                <p className="text-sm text-base-content/60 line-clamp-1">
                  {product.description}
                </p>
                <div className="card-actions justify-end mt-2">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1 lg:text-sm"
                  >
                    <EyeIcon className="size-4 lg:size-5" /> View
                  </button>
                  <button
                    onClick={() => navigate(`/edit/${product.id}`)}
                    className="btn btn-ghost btn-xs gap-1 lg:text-sm"
                  >
                    <EditIcon className="size-4 lg:size-5" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="btn btn-ghost btn-xs text-error gap-1 lg:text-sm"
                    disabled={deleteProduct.isPending}
                  >
                    <Trash2Icon className="size-4 lg:size-5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
