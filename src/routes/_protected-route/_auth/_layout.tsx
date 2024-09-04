import SideBar from "@/components/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected-route/_auth/_layout")({
  component: Index,
});
function Index() {
  return (
    <div className="flex">
      <SideBar />
      <main className="p-16 flex justify-center items-center w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
