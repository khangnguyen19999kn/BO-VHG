import {
  useProductsControllerCreate,
  useProductsControllerUpdate,
} from "@/api/endpoints/products/products";
import { CreateProductDto } from "@/api/model";
import { TProductDetail } from "@/features/product-detail/const/product-detail-schema";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export default function useCreateUpdateProduct({
  type,
}: {
  type: "create" | "update";
}) {
  const navigate = useNavigate();
  const { mutate: createProduct, isPending: isCreateProductLoading } =
    useProductsControllerCreate({
      mutation: {
        onSuccess: () => {
          toast.success("Create product successfully");
          navigate({ to: "/products" });
        },
        onError: () => {
          toast.error("Create product failed");
        },
      },
    });
  const { mutate: updateProduct, isPending: isUpdateProductLoading } =
    useProductsControllerUpdate({
      mutation: {
        onSuccess: () => {
          toast.success("Update product successfully");
          navigate({ to: "/products" });
        },
        onError: () => {
          toast.error("Update product failed");
        },
      },
    });
  const convertDataToFormData = (data: TProductDetail): CreateProductDto => {
    return {
      ...data,
      price: Number(data.price),
      typeId: Number(data.typeId),
    };
  };
  const handleFormSubmit = (data: TProductDetail, id?: string) => {
    const formData = convertDataToFormData(data);
    if (type === "create") {
      createProduct({ data: formData });
    } else {
      updateProduct({ id: id!, data: formData });
    }
  };
  return {
    handleFormSubmit,
    isCreateProductLoading,
    isUpdateProductLoading,
  };
}
