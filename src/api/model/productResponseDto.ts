/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * VHG Tailor API
 * API documentation
 * OpenAPI spec version: 1.3
 */
import type { ImageResponseDto } from "./imageResponseDto";

export interface ProductResponseDto {
  /** Mô tả của sản phẩm */
  description: string;
  /** ID của sản phẩm */
  id: string;
  /** Danh sách hình ảnh của sản phẩm */
  images: ImageResponseDto[];
  /** Link mua sản phẩm */
  link: string;
  /** Chất liệu của sản phẩm */
  material: string;
  /** Tên của sản phẩm */
  name: string;
  /** Giá của sản phẩm */
  price: number;
  /** Slug của sản phẩm */
  slug: string;
  /** Số lượt xem của sản phẩm */
  viewCount: number;
}
