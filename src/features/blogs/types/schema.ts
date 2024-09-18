import { imageSchema } from "@/features/product-detail/const/product-detail-schema";
import { z } from "zod";

export const schemaDetailBlog = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  coverImage: imageSchema
});

export type TBlogDetail = z.infer<typeof schemaDetailBlog>;
