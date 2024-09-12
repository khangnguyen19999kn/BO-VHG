import { getProductsControllerFindOneQueryOptions } from "@/api/endpoints/products/products";
import ProductDetailUpdate from "@/features/product-detail/poduct-detail-update";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected-route/_auth/_layout/products/edit/$id"
)({
  loader: ({ context: { queryClient }, params: { id } }) =>
    queryClient.ensureQueryData(getProductsControllerFindOneQueryOptions(id)),
  component: () => (
    <ProductDetailUpdate title="Product Detail Edit" typePage="update" />
  ),
});
