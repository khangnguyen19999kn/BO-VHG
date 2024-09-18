import SideBar from "@/components/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import Marquee from "react-fast-marquee";

export const Route = createFileRoute("/_protected-route/_auth/_layout")({
  component: Index,
});
function Index() {
  const userName = localStorage.getItem("user");
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full">
        <div className="w-full h-16 border-b border-slate-400 flex items-center">
          <Marquee>
            {`Xin chào ${userName} - Chào mừng bạn đến với VHG - Chúc bạn một ngày tốt lành nhé !!!`}
          </Marquee>
        </div>
        <main className="p-16 flex justify-center w-full h-full bg-slate-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
