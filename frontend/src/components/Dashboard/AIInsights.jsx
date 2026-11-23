
import { Sparkles, ArrowRight } from "lucide-react";

export default function AIInsights() {
  return (
    <div className="border border-[#D8E2D6] bg-[#EDF2EA] p-5">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-[#527A62]" />
        <h3 className="text-sm font-semibold text-[#365841]">
          AI repository insights
        </h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-[#4C5C4E]">
        Your repository has been most active in authentication and API development
        this week. Several recent commits indicate improvements to request
        validation and application structure.
      </p>

      <div className="mt-4 border-t border-[#D8E2D6] pt-3">
        <p className="text-xs font-medium text-[#365841]">Suggested focus</p>
        <p className="mt-1 text-xs leading-5 text-[#667568]">
          Review authentication changes and ensure API error responses remain
          consistent across services.
        </p>
      </div>

      <button className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#527A62] hover:text-[#3F634C]">
        View analysis
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
