
import { useState } from "react";
import {
  Search,
  GitBranch,
  Star,
  GitFork,
  CircleDot,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Code2,
  Calendar,
  User,
} from "lucide-react";

import Button from "../components/ui/button";
import api from "../services/api";

function validateGitHubUrl(value) {
  try {
    const url = new URL(value.trim());

    if (url.hostname !== "github.com") {
      return "Please enter a valid github.com repository URL.";
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length < 2) {
      return "Enter a repository URL containing an owner and repository name.";
    }

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");

    if (!owner || !repo) {
      return "Repository owner or name is missing.";
    }

    return {
      owner,
      repo,
      cleanUrl: `https://github.com/${owner}/${repo}`,
    };
  } catch {
    return "Please enter a valid GitHub URL.";
  }
}

function RepositoryResult({ repository }) {
  const stats = [
    {
      label: "Stars",
      value: repository.stars ?? 0,
      icon: Star,
    },
    {
      label: "Forks",
      value: repository.forks ?? 0,
      icon: GitFork,
    },
    {
      label: "Open issues",
      value: repository.issues ?? 0,
      icon: CircleDot,
    },
  ];

  return (
    <section className="mt-8 overflow-hidden border border-[#E4E2DA] bg-white">
      {/* Result header */}
      <div className="border-b border-[#E4E2DA] p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#DCE7DC] text-[#527A62]">
              <GitBranch size={21} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-all text-lg font-semibold text-[#202824]">
                  {repository.fullName || `${repository.owner}/${repository.name}`}
                </h2>

                <span className="border border-[#D8E2D6] bg-[#EDF2EA] px-2 py-1 text-[10px] font-medium text-[#527A62]">
                  Analyzed
                </span>
              </div>

              <p className="mt-1 text-sm text-[#777B75]">
                {repository.description || "No repository description provided."}
              </p>
            </div>
          </div>

          {repository.url && (
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#527A62] hover:text-[#3F634C]"
            >
              View on GitHub
              <ExternalLink size={13} />
            </a>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="border border-[#E4E2DA] bg-[#FAF9F6] p-4"
            >
              <div className="flex items-center gap-2 text-[#777B75]">
                <Icon size={15} />
                <span className="text-xs">{label}</span>
              </div>

              <p className="mt-2 text-xl font-semibold text-[#202824]">
                {Number(value).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Repository information */}
      <div className="grid grid-cols-1 divide-y divide-[#E4E2DA] sm:grid-cols-2 sm:divide-y-0">
        <InfoItem
          icon={Code2}
          label="Primary language"
          value={repository.language || "Not specified"}
        />

        <InfoItem
          icon={User}
          label="Owner"
          value={repository.owner || "Unknown"}
        />

        <InfoItem
          icon={Calendar}
          label="Created"
          value={formatDate(repository.createdAt)}
        />

        <InfoItem
          icon={Calendar}
          label="Last updated"
          value={formatDate(repository.updatedAt)}
        />
      </div>
    </section>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-5">
      <div className="flex h-9 w-9 items-center justify-center bg-[#EEEEE8] text-[#777B75]">
        <Icon size={16} />
      </div>

      <div>
        <p className="text-xs text-[#92958E]">{label}</p>
        <p className="mt-1 text-sm font-medium text-[#202824]">{value}</p>
      </div>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "Not available";

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Repositories() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [repository, setRepository] = useState(null);

  async function handleAnalyze(event) {
    event.preventDefault();

    setError("");
    setRepository(null);

    const validation = validateGitHubUrl(url);

    if (typeof validation === "string") {
      setError(validation);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/repositories/analyze", {
        url: validation.cleanUrl,
      });

      const result = response.data?.data ?? response.data;

      // Adapt the backend response into the UI structure.
      setRepository({
        owner: result.owner ?? validation.owner,
        name: result.name ?? result.repo ?? validation.repo,
        fullName:
          result.full_name ??
          result.fullName ??
          `${validation.owner}/${validation.repo}`,
        description: result.description,
        url: result.html_url ?? result.url ?? validation.cleanUrl,
        stars: result.stargazers_count ?? result.stars ?? 0,
        forks: result.forks_count ?? result.forks ?? 0,
        issues: result.open_issues_count ?? result.issues ?? 0,
        language: result.language,
        createdAt: result.created_at ?? result.createdAt,
        updatedAt: result.updated_at ?? result.updatedAt,
      });
    } catch (err) {
      setError(
        err.message ||
          "Unable to analyze repository. Please check the backend connection."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setUrl("");
    setError("");
    setRepository(null);
  }

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page header */}
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#92958E]">
          GitHub workspace
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-[#202824] md:text-[30px]">
          Repository Analyzer
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#777B75]">
          Connect a GitHub repository to explore its development activity,
          commits, pull requests, and AI-generated insights.
        </p>
      </div>

      {/* Input section */}
      <section className="mt-7 border border-[#E4E2DA] bg-white p-5 md:p-7">
        <div className="mb-5 flex items-center gap-2">
          <GitBranch size={18} className="text-[#527A62]" />
          <h2 className="text-sm font-semibold text-[#202824]">
            Connect a repository
          </h2>
        </div>

        <form onSubmit={handleAnalyze}>
          <label
            htmlFor="repository-url"
            className="mb-2 block text-xs font-medium text-[#555D55]"
          >
            GitHub repository URL
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="repository-url"
              type="url"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value);
                if (error) setError("");
              }}
              placeholder="https://github.com/owner/repository"
              className="min-w-0 flex-1 border border-[#DAD9D1] bg-[#FAF9F6] px-4 py-3 text-sm text-[#202824] outline-none transition placeholder:text-[#A0A39C] focus:border-[#527A62] focus:ring-2 focus:ring-[#527A62]/10"
            />

            <Button
              type="submit"
              loading={loading}
              disabled={!url.trim() || loading}
              className="shrink-0"
            >
              <Search size={16} />
              {loading ? "Analyzing..." : "Analyze repository"}
            </Button>
          </div>

          <p className="mt-2 text-xs text-[#92958E]">
            Public GitHub repositories are supported. Paste the repository URL,
            not the profile URL.
          </p>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-4 flex items-start gap-2 border border-[#E7C9C2] bg-[#FAEEEB] p-3 text-sm text-[#A14F40]">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading message */}
        {loading && (
          <div className="mt-5 border border-[#D8E2D6] bg-[#EDF2EA] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-[#365841]">
              <Search size={15} />
              Analyzing repository
            </div>
            <p className="mt-1 text-xs text-[#667568]">
              Fetching repository information from the server...
            </p>
          </div>
        )}
      </section>

      {/* Successful analysis */}
      {repository && (
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-[#527A62]">
              <CheckCircle2 size={16} />
              Analysis completed successfully
            </div>

            <button
              onClick={handleClear}
              className="text-xs text-[#777B75] hover:text-[#202824]"
            >
              Clear result
            </button>
          </div>

          <RepositoryResult repository={repository} />
        </div>
      )}

      {/* Empty state */}
      {!repository && !loading && !error && (
        <div className="mt-7 flex flex-col items-center justify-center border border-dashed border-[#D7D7CE] px-5 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center bg-[#DCE7DC] text-[#527A62]">
            <GitBranch size={22} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-[#202824]">
            Ready to explore a repository?
          </h3>

          <p className="mt-2 max-w-sm text-xs leading-5 text-[#92958E]">
            Enter a GitHub repository URL above. We'll retrieve its details and
            prepare it for commit analysis.
          </p>
        </div>
      )}
    </div>
  );
}
