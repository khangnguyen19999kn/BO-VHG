import { z } from "zod";

export const userCreateSchema = z.object({
  username: z.string().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Mật khẩu xác nhận phải trùng với mật khẩu",
})
export type TUserCreateSchema = z.infer<typeof userCreateSchema>;

export const userUpdateSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  currentPassword: z.string().min(1,"Bạn phải nhập mật khẩu để chỉnh sửa"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length < 1) {
    return false;
  }
  if (data.confirmPassword && data.confirmPassword.length < 1) {
    return false;
  }
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true; 
}, {
  path: ["confirmPassword"],
  message: "Mật khẩu xác nhận phải trùng với mật khẩu",
});
export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>;
