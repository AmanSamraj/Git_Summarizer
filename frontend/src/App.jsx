
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function PlaceholderPage({ title, description }) {
  return (
    <div className="min-h-[400px]">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#92958E]">
        Developer workspace
      </p>

      <h1 className="text-2xl font-semibold tracking-tight text-[#202824]">
        {title}
      </h1>

      <p className="mt-2 text-sm text-[#777B75]">{description}</p>

      <div className="mt-8 flex min-h-[280px] flex-col items-center justify-center border border-dashed border-[#D7D7CE] bg-white/50 text-center">
        <p className="text-sm font-medium text-[#202824]">
          This module is under development.
        </p>

        <p className="mt-2 text-xs text-[#92958E]">
          We'll build this section step by step.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/repositories"
            element={
              <PlaceholderPage
                title="Repositories"
                description="Connect and analyze GitHub repositories."
              />
            }
          />

          <Route
            path="/commits"
            element={
              <PlaceholderPage
                title="Commits"
                description="Explore repository commit history."
              />
            }
          />

          <Route
            path="/pull-requests"
            element={
              <PlaceholderPage
                title="Pull Requests"
                description="Review pull requests and AI summaries."
              />
            }
          />

          <Route
            path="/analytics"
            element={
              <PlaceholderPage
                title="Analytics"
                description="Understand development activity and repository trends."
              />
            }
          />

          <Route
            path="/reports"
            element={
              <PlaceholderPage
                title="Reports"
                description="Generate repository activity reports."
              />
            }
          />

          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Manage workspace preferences."
              />
            }
          />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
