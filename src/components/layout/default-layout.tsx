import { Outlet } from "react-router-dom";
import Topbar from "@/components/layout/top-bar";
import Sidebar from "@/components/layout/sidebar";
const DefaultLayout = () => {
  return (
    <div className="min-h-svh grid grid-rows-[auto_1fr] grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col gap-2 border-r bg-white p-4 min-h-svh">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
            S
          </div>
          <span className="font-semibold">Question Bank</span>
        </div>
        <Sidebar />
        <div className="mt-auto text-xs text-slate-500 px-2">
          v0.1 • Tailwind UI Skeleton
        </div>
      </aside>
      {/* Topbar + Main */}
      <div className="grid grid-rows-[auto_1fr]">
        <Topbar />
        <main className="p-4 lg:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
