/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * VHG Tailor API
 * API documentation
 * OpenAPI spec version: 1.3
 */

export interface UserUpdateDTO {
  /** Nhập lại mật khẩu mới (không bắt buộc) */
  confirmPassword?: string;
  /** Mật khẩu hiện tại */
  currentPassword: string;
  /** Tên đầy đủ của người dùng */
  name: string;
  /** Mật khẩu mới (không bắt buộc) */
  password?: string;
  /** Tên của người dùng */
  username: string;
}
