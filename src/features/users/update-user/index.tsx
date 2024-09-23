import {
  getUsersControllerFindAllQueryKey,
  useUsersControllerUpdateUser,
} from "@/api/endpoints/users/users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  TUserUpdateSchema,
  userUpdateSchema,
} from "@/features/users/const/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface IUpdateUserProps {
  defaultValues: Partial<TUserUpdateSchema>;
}

export default function UpdateUser({ defaultValues }: IUpdateUserProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const form = useForm<TUserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      ...defaultValues,
      currentPassword: "",
    },
  });
  const { mutate: updateUser } = useUsersControllerUpdateUser({
    mutation: {
      onSuccess: () => {
        setOpenDialog(false);
        toast.success("Update user thành công");
        queryClient.invalidateQueries({
          queryKey: getUsersControllerFindAllQueryKey(),
        });
      },
      onError: () => {
        toast.error("Update user thất bại");
      },
    },
  });

  const handleSubmit = (data: TUserUpdateSchema) => {
    updateUser({ data });
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button
          variant="outline"
          className="bg-yellow-200 flex gap-1 bold items-center"
        >
          <Pencil />
          <p>Sửa</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin user</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên đăng nhập</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="Nhập tên đang nhập"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tên người dùng (Được sử dụng làm tên tác giả khi đăng
                      blog)
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên người dùng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu hiện tại người dùng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập mật khẩu hiện tại người dùng"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" variant={"destructive"} onClick={() => setIsChangePassword(!isChangePassword)}>
                {isChangePassword ? "Hủy đổi mât khẩu" : "Thay đổi mật khẩu"}
              </Button>
              {isChangePassword && (
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu mới cho người dùng</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập mật khẩu mới cho người dùng"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập lại mật khẩu mới của người dùng"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <DialogFooter>
                <div className="flex justify-center">
                  <Button type="submit">Cập nhật tài khoản</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
