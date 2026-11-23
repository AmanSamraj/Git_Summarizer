
import { LoaderCircle } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-[#527A62] text-white hover:bg-[#3F634C]",
    secondary:
      "bg-[#EEEEE8] text-[#202824] hover:bg-[#E4E2DA]",
    outline:
      "border border-[#E4E2DA] bg-white text-[#202824] hover:bg-[#F5F3EE]",
    ghost:
      "text-[#777B75] hover:bg-[#EEEEE8] hover:text-[#202824]",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-sm",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-[#527A62]/30
        disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <LoaderCircle size={15} className="animate-spin" />}
      {children}
    </button>
  );
}
