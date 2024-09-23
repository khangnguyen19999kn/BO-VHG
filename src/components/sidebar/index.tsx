import { useAuthControllerLogout } from "@/api/endpoints/auth/auth";
import BoxReveal from "@/components/magicui/box-reveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export default function SideBar() {
  const itemsNavbar = [
    {
      name: "Products Management",
      path: "/products",
    },
    {
      name: "Users Management",
      path: "/users",
    },
    {
      name: "Blogs Management",
      path: "/blogs",
    },
    {
      name: "Hero Section Management",
      path: "/hero-section",
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
  const userName = localStorage.getItem("user");
  return (
    <div className="w-56 bg-white border-r h-screen py-16 p-1 sticky top-0 ">
      <div className="relative w-full h-full flex flex-col gap-4 ">
        <div className="w-full flex justify-center items-center">
          <BoxReveal boxColor={"#5046e6"} duration={0.5}>
            <div className="text-center">
              <div className="w-full h-16">
                <div className="flex justify-center items-center w-full h-full gap-2 bold text-3xl">
                  <p>V.H.G</p>
                  <Separator orientation="vertical" className="w-[2px] h-1/2" />
                  <p>Tailor</p>
                </div>
              </div>
              <p className="text-xl text-gray-500">Back Office</p>
            </div>
          </BoxReveal>
        </div>
        <Separator />
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
            <p className="bold">{userName}</p>
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
