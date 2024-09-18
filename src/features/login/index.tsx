import { useAuthControllerLogin } from "@/api/endpoints/auth/auth";
import AnimatedGridPattern from "@/components/animated-grid-pattern";
import TypingAnimation from "@/components/typing-animation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const formLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type TFormLogin = z.infer<typeof formLoginSchema>;
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { mutate: loginMutation } = useAuthControllerLogin({
    mutation: {
      onSuccess: () => {
        login();
        navigate({ to: "/products" });
        toast.success("Đăng nhập thành công");
      },

      onError: () => {
        toast.error("Đăng nhập thất bại");
      },
    },
  });
  const form = useForm<TFormLogin>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (data: TFormLogin) => {
    loginMutation({ data });
  };
  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full relative">
        <AnimatedGridPattern />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <TypingAnimation text="VHG Tailor Back Office" />
        </div>
      </div>
      <div className=" w-1/2 h-full bg-slate-500 flex justify-center items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-1/3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
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
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
