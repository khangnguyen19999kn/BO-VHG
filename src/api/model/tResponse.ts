/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * VHG Tailor API
 * API documentation
 * OpenAPI spec version: 1.3
 */
import type { ProductResponseDto } from "./productResponseDto";

export interface TResponse {
  /** Dữ liệu chứa danh sách sản phẩm */
  data: ProductResponseDto[];
  /** Trạng thái của yêu cầu */
  status: string;
}
