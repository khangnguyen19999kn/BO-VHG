import { useAuthControllerLogout } from "@/api/endpoints/auth/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export default function SideBar() {
  const itemsNavbar = [
    {
      name: "Products management",
      path: "/products",
    },
    {
      name: "Users management",
      path: "/users",
    },
  ];
  const { logout } = useAuth();
  const { mutate: authLogout } = useAuthControllerLogout({
    mutation: {
      onSuccess: () => {
        logout();
        toast.success("Đăng xuất thành công");
      },

      onError: () => {
        toast.error("Đăng xuất thất bại");
      },
    },
  });
  const handleLogout = () => {
    authLogout();
  };
  return (
    <div className="w-56 bg-red-900 h-screen py-16 p-1 sticky top-0">
      <div className="relative w-full h-full flex flex-col gap-2 ">
        <div className="w-full bg-orange-300 h-16 text-center">Logo Navbar</div>
        {itemsNavbar.map((item) => (
          <Link to={item.path} key={item.name} className="w-full">
            {({ isActive }) => (
              <NavigateButton isActive={isActive}>{item.name}</NavigateButton>
            )}
          </Link>
        ))}
        <div className="w-full absolute bottom-0 left-0">
          <div className="text-center mb-5">
            <p className="font-semibold">Xin chào </p>
            <p className="bold">Admin</p>
          </div>
          <Button
            className="w-full"
            variant={"destructive"}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
function NavigateButton({
  children,
  isActive,
  ...props
}: {
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Button
      className="w-full"
      {...props}
      variant={isActive ? "default" : "ghost"}
    >
      {children}
    </Button>
  );
}
