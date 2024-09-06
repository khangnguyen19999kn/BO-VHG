import { z } from "zod";

export const productDetailSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  price: z.string().min(1, "Giá sản phẩm là bắt buộc"),
  description: z.string().min(1, "Mô tả sản phẩm là bắt buộc"),
  image: z.array(z.instanceof(File)),
  material: z.string().min(1, "Chất liệu sản phẩm là bắt buộc"),
  size: z.array(z.string().min(1, "Chọn ít nhất 1 size")),
  type: z.string().min(1, "Loại sản phẩm là bắt buộc"),
});

export type TProductDetail = z.infer<typeof productDetailSchema>;
