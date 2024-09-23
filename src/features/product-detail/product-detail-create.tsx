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
import { IProductDetailProps } from "@/features/product-detail/product-detail-update";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ProductDetailCreate({
  title,
  typePage,
}: IProductDetailProps) {
  const form = useForm<TProductDetail>({
    resolver: zodResolver(productDetailSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      images: [],
      material: "",
      typeId: "",
      sizes: [],
      link: "",
    },
  });
  const { handleFormSubmit } = useCreateUpdateProduct({ type: typePage });

  const handleSubmit = (data: TProductDetail) => {
    handleFormSubmit(data);
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
