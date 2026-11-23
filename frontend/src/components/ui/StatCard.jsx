
import { ArrowUpRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  change,
  icon: Icon,
  description,
}) {
  return (
    <div className="border border-[#E4E2DA] bg-white p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-[#777B75]">{label}</p>

        {Icon && (
          <div className="text-[#527A62]">
            <Icon size={18} strokeWidth={1.7} />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <h2 className="text-3xl font-semibold tracking-tight text-[#202824]">
          {value}
        </h2>

        {change && (
          <span className="mb-1 inline-flex items-center text-xs font-medium text-[#527A62]">
            <ArrowUpRight size={13} />
            {change}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-2 text-xs text-[#92958E]">{description}</p>
      )}
    </div>
  );
}
