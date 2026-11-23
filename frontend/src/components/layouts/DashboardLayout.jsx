
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "76px" : "248px";

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div
        className="min-h-screen transition-[margin] duration-200"
        style={{ marginLeft: sidebarWidth }}
      >
        <Topbar />

        <main className="mx-auto w-full max-w-[1600px] px-5 py-7 md:px-8 md:py-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
