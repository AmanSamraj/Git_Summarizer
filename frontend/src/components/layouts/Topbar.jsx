
import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[#E4E2DA] bg-[#F5F3EE] px-5 md:px-8">
      <div className="flex items-center gap-2 text-sm text-[#92958E]">
        <span>Workspace</span>
        <span>/</span>
        <span className="font-medium text-[#202824]">Overview</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden items-center gap-2 border border-[#E4E2DA] bg-white px-3 py-2 text-xs text-[#777B75] transition hover:border-[#527A62] sm:flex">
          <Search size={14} />
          <span>Search</span>
          <kbd className="ml-3 border border-[#E4E2DA] px-1.5 py-0.5 text-[10px]">
            Ctrl K
          </kbd>
        </button>

        <button className="relative flex h-9 w-9 items-center justify-center text-[#777B75] hover:bg-[#EEEEE8]">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E6B86A]" />
        </button>

        <div className="ml-1 flex items-center gap-2 border-l border-[#E4E2DA] pl-3">
          <div className="flex h-8 w-8 items-center justify-center bg-[#DCE7DC] text-xs font-semibold text-[#365841]">
            AS
          </div>
          <span className="hidden text-sm text-[#202824] sm:block">
            Developer
          </span>
        </div>
      </div>
    </header>
  );
}
