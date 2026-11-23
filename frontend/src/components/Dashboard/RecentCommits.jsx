
import { GitCommitHorizontal, ArrowUpRight } from "lucide-react";

const commits = [
  {
    hash: "a82c1f0",
    message: "Add repository authentication flow",
    author: "Aman",
    date: "2 hours ago",
    type: "Feature",
  },
  {
    hash: "b41d9e3",
    message: "Update API response validation",
    author: "Rahul",
    date: "5 hours ago",
    type: "Fix",
  },
  {
    hash: "c09a7b2",
    message: "Refactor repository service",
    author: "Priya",
    date: "Yesterday",
    type: "Refactor",
  },
  {
    hash: "d71f4a8",
    message: "Improve dashboard loading state",
    author: "Aman",
    date: "Yesterday",
    type: "UI",
  },
];

const typeStyles = {
  Feature: "bg-[#DCE7DC] text-[#365841]",
  Fix: "bg-[#F5E3D7] text-[#9A563E]",
  Refactor: "bg-[#E5E8ED] text-[#586A80]",
  UI: "bg-[#F3E8C9] text-[#8C6A28]",
};

export default function RecentCommits() {
  return (
    <div className="divide-y divide-[#EAE8E1]">
      {commits.map((commit) => (
        <div
          key={commit.hash}
          className="flex items-start gap-3 py-4 first:pt-1 last:pb-1"
        >
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-[#EEEEE8] text-[#527A62]">
            <GitCommitHorizontal size={15} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-5 text-[#202824]">
              {commit.message}
            </p>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[#92958E]">
              <span>{commit.author}</span>
              <span>·</span>
              <span className="font-mono">{commit.hash}</span>
              <span>·</span>
              <span>{commit.date}</span>
            </div>
          </div>

          <span
            className={`mt-1 shrink-0 px-2 py-1 text-[10px] font-medium ${typeStyles[commit.type]}`}
          >
            {commit.type}
          </span>

          <button
            className="mt-1 text-[#A0A39C] hover:text-[#527A62]"
            aria-label={`View commit ${commit.hash}`}
          >
            <ArrowUpRight size={15} />
          </button>
        </div>
      ))}
    </div>
  );
}
