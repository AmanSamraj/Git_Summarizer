
import {
  GitCommitHorizontal,
  Users,
  GitPullRequest,
  Activity,
  ArrowRight,
  GitBranch,
} from "lucide-react";

import Button from "../components/ui/button";
import StatCard from "../components/ui/StatCard";
import SectionHeader from "../components/ui/SectionHeadder";
import ActivityChart from "../components/Dashboard/ActivityChart";
import RecentCommits from "../components/Dashboard/RecentCommits";
import AIInsights from "../components/Dashboard/AIInsights";

import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#92958E]">
            Developer workspace
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#202824] md:text-[30px]">
            Overview
          </h1>

          <p className="mt-2 text-sm text-[#777B75]">
            A summary of your repository activity and development progress.
          </p>
        </div>

        <Link to="/repositories">
          <Button>
            <GitBranch size={16} />
            Analyze repository
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total commits"
          value="1,284"
          change="+12.8%"
          icon={GitCommitHorizontal}
          description="Across tracked repositories"
        />

        <StatCard
          label="Contributors"
          value="18"
          icon={Users}
          description="Active contributors"
        />

        <StatCard
          label="Pull requests"
          value="36"
          change="+4 this week"
          icon={GitPullRequest}
          description="Across all repositories"
        />

        <StatCard
          label="Activity score"
          value="82.4"
          icon={Activity}
          description="Based on recent development"
        />
      </div>

      {/* Activity and AI */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        <section className="border border-[#E4E2DA] bg-white p-5 md:p-6">
          <SectionHeader
            title="Commit activity"
            description="Daily commits during the past week"
          />

          <ActivityChart />
        </section>

        <section>
          <AIInsights />
        </section>
      </div>

      {/* Recent commits */}
      <section className="border border-[#E4E2DA] bg-white p-5 md:p-6">
        <SectionHeader
          title="Recent commits"
          description="Latest changes across your repositories"
          action={
            <Link
              to="/commits"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#527A62] hover:text-[#3F634C]"
            >
              All commits
              <ArrowRight size={14} />
            </Link>
          }
        />

        <RecentCommits />
      </section>

      {/* Repository placeholder */}
      <section className="border border-[#E4E2DA] bg-white p-5 md:p-6">
        <SectionHeader
          title="Tracked repositories"
          description="Repositories connected to your workspace"
        />

        <div className="flex flex-col items-center justify-center border border-dashed border-[#D7D7CE] py-12 text-center">
          <GitBranch size={25} className="text-[#8D988D]" />

          <h3 className="mt-3 text-sm font-medium text-[#202824]">
            No repositories connected yet
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-[#92958E]">
            Add a GitHub repository to start exploring commits, code changes, and
            AI-generated summaries.
          </p>

          <Link to="/repositories" className="mt-4">
            <Button variant="outline" size="sm">
              Connect repository
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
