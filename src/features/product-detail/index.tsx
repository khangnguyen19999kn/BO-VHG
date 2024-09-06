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
import SelectSizeField from "@/features/product-detail/components/select-sizes-field";
import SelectTypeField from "@/features/product-detail/components/select-type-field";
import {
  productDetailSchema,
  TProductDetail,
} from "@/features/product-detail/product-detail-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface IProductDetailProps {
  title: string;
}

export default function ProductDetail({ title }: IProductDetailProps) {
  const form = useForm<TProductDetail>({
    resolver: zodResolver(productDetailSchema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      image: [],
      material: "",
      type: "",
      size: [],
    },
  });

  const handleSubmit = (data: TProductDetail) => {
    console.log(data);
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
          <FormField
            control={form.control}
            name={"image"}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ảnh bìa</FormLabel>
                <FormControl>
                  <Input type="file" multiple onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const blobs: Blob[] = Array.from(files);
                      field.onChange(blobs);                   
                  }} } />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SelectTypeField
            control={form.control}
            name="type"
            label="Loại sản phẫm"
          />
          <SelectSizeField
            control={form.control}
            name="size"
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
          <EditorField
            control={form.control}
            name="description"
            label="Mô tả sản phẩm"
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
