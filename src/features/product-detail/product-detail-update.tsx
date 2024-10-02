import { getProductsControllerFindOneQueryOptions } from "@/api/endpoints/products/products";
import EditorField from "@/components/Editor/editor-field";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputMultiImage from "@/features/product-detail/components/input-image";
import SelectSizeField from "@/features/product-detail/components/select-sizes-field";
import SelectTypeField from "@/features/product-detail/components/select-type-field";
import {
  TProductDetail,
  productDetailSchema,
} from "@/features/product-detail/const/product-detail-schema";
import useCreateUpdateProduct from "@/features/product-detail/hooks/useCreateUpdateProduct";
import { Route } from "@/routes/_protected-route/_auth/_layout/products/edit/$id";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export interface IProductDetailProps {
  title: string;
  typePage: "create" | "update";
}

export default function ProductDetailUpdate({
  title,
  typePage,
}: IProductDetailProps) {
  const postId = Route.useParams().id;
  const { data: post } = useSuspenseQuery(
    getProductsControllerFindOneQueryOptions(postId)
  );
  const defaultValues: TProductDetail = {
    ...post.data,
    price: post.data.price.toString(),
    typeId: post.data.typeId.toString(),
  };
  const form = useForm<TProductDetail>({
    resolver: zodResolver(productDetailSchema),
    defaultValues,
  });
  const { handleFormSubmit } = useCreateUpdateProduct({ type: typePage });

  const handleSubmit = (data: TProductDetail) => {
    handleFormSubmit(data, postId);
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-3xl bold mb-5">{title}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên sản phẩm</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá của sản phẩm</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập giá của sản phẫm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputMultiImage
            control={form.control}
            name="images"
            label="Ảnh của sản phẫm"
            folderName="products"
          />

          <SelectTypeField
            control={form.control}
            name="typeId"
            label="Loại sản phẫm"
          />
          <SelectSizeField
            control={form.control}
            name="sizes"
            label="Chọn những size khả dụng cho sản phẩm"
          />
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chất liệu của sản phẩm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập chất liệu này của sản phẩm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Sale</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập link mua sản phẩm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shortDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mô tả ngắn cho sản phẩm (Dùng để hiển thị trong card)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập mô tả ngắn cho sản phẩm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <EditorField
            control={form.control}
            name="description"
            label="Mô tả sản phẩm"
            folderName="products"
          />
          <Button type="submit">{typePage === "create" ? "Tạo" : "Lưu"}</Button>
        </form>
      </Form>
    </div>
  );
}
