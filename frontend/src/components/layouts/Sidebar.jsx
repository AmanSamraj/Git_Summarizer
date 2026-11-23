
import {
  LayoutDashboard,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  ChartNoAxesCombined,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  GitFork,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    title: "Workspace",
    items: [
      { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
      { name: "Repositories", path: "/repositories", icon: GitBranch },
      { name: "Commits", path: "/commits", icon: GitCommitHorizontal },
      { name: "Pull Requests", path: "/pull-requests", icon: GitPullRequest },
    ],
  },
  {
    title: "Insights",
    items: [
      { name: "Analytics", path: "/analytics", icon: ChartNoAxesCombined },
      { name: "Reports", path: "/reports", icon: FileText },
    ],
  },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-[#E4E2DA] bg-[#FAF9F6] transition-all duration-200 ${
        collapsed ? "w-[76px]" : "w-[248px]"
      }`}
    >
      {/* Logo */}
      <div className="flex h-[72px] items-center gap-3 border-b border-[#E4E2DA] px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#527A62] text-white">
          <GitFork size={19} />
        </div>

        {!collapsed && (
          <div className="whitespace-nowrap">
            <h1 className="text-[15px] font-semibold tracking-tight text-[#202824]">
              Git Summarizer
            </h1>
            <p className="text-[10px] text-[#92958E]">Developer workspace</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-6">
        {navigation.map((section) => (
          <div key={section.title} className="mb-7">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#969991]">
                {section.title}
              </p>
            )}

            <nav className="space-y-1">
              {section.items.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  title={collapsed ? name : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-[#DCE7DC] text-[#365841] font-medium"
                        : "text-[#72776F] hover:bg-[#EEEEE8] hover:text-[#202824]"
                    }`
                  }
                >
                  <Icon size={17} strokeWidth={1.8} className="shrink-0" />
                  {!collapsed && <span>{name}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="border-t border-[#E4E2DA] p-3">
        <NavLink
          to="/settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-[#72776F] hover:bg-[#EEEEE8] ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Settings size={17} />
          {!collapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-2 flex w-full items-center justify-center rounded-lg py-2 text-[#92958E] transition hover:bg-[#EEEEE8] hover:text-[#202824]"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
        </button>
      </div>
    </aside>
  );
}
