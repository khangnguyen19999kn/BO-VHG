import { useAuthControllerSignup } from "@/api/endpoints/auth/auth";
import { getUsersControllerFindAllQueryKey } from "@/api/endpoints/users/users";
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
  TUserCreateSchema,
  userCreateSchema,
} from "@/features/users/const/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { FilePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateUser() {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: createUser } = useAuthControllerSignup({
    mutation: {
      onSuccess: () => {
        setOpenDialog(false);
        toast.success("Tạo user thành công");
        queryClient.invalidateQueries({
          queryKey: getUsersControllerFindAllQueryKey(),
        });
      },
      onError: () => {
        toast.error("Tạo user thất bại");
      },
    },
  });
  const form = useForm<TUserCreateSchema>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: TUserCreateSchema) => {
    createUser({ data });
  };
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Button
          onClick={() => form.reset()}
          className="bg-green-500 flex gap-1 bold items-center"
        >
          <FilePlus />
          <p>Tạo user mới</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tạo user mới</DialogTitle>
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
                      <Input placeholder="Nhập tên đang nhập" {...field} />
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu người dùng</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập mật khẩu người dùng"
                        {...field}
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
                    <FormLabel>Xác nhận mật khẩu</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập lại mật khẩu người dùng"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="flex justify-center">
                  <Button type="submit">
                    Tạo tài khoản
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
