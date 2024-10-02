import { z } from "zod";

export const imageSchema = z.object({
  url: z.string(),
  public_id: z.string(),
});

export const productDetailSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  price: z.string().min(1, "Giá sản phẩm là bắt buộc"),
  description: z.string().min(1, "Mô tả sản phẩm là bắt buộc"),
  shortDescription: z.string().min(1, "Mô tả ngắn sản phẩm là bắt buộc"),
  images: z.array(imageSchema).min(1, "Hình ảnh sản phẩm là bắt buộc"),
  material: z.string().min(1, "Chất liệu sản phẩm là bắt buộc"),
  sizes: z.array(z.string().min(1, "Chọn ít nhất 1 size")),
  typeId: z.string().min(1, "Loại sản phẩm là bắt buộc"),
  link: z.string().min(1, "Link sản phẩm là bắt buộc"),
});

export type TProductDetail = z.infer<typeof productDetailSchema>;
