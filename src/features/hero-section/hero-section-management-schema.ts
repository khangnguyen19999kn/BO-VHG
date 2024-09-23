import { imageSchema } from "@/features/product-detail/const/product-detail-schema";
import { z } from "zod";

export const heroSectionManagementSchema = z.object({
  images: z.array(imageSchema),
});
export type THeroSectionManagement = z.infer<
  typeof heroSectionManagementSchema
>;
