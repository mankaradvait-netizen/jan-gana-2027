import React from "react";
import { clsx } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "saffron" | "emerald" | "slate" | "warning" | "glow";
  size?: "sm" | "md" | "lg";
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "saffron",
  size = "md",
  className,
  dot = false,
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium rounded-full border transition-all",
        // Sizes
        size === "sm" && "px-2.5 py-0.5 text-xs",
        size === "md" && "px-3 py-1 text-xs",
        size === "lg" && "px-3.5 py-1.5 text-sm",
        // Variants
        variant === "saffron" &&
          "bg-saffron-500/10 text-saffron-400 border-saffron-500/30 shadow-sm",
        variant === "emerald" &&
          "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-sm",
        variant === "slate" &&
          "bg-slate-800/80 text-sand-200 border-slate-700/80",
        variant === "warning" &&
          "bg-amber-500/10 text-amber-300 border-amber-500/30",
        variant === "glow" &&
          "bg-gradient-to-r from-saffron-500/20 to-emerald-500/20 text-sand-50 border-saffron-500/40 shadow-glow-saffron",
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            "w-1.5 h-1.5 rounded-full animate-pulse",
            variant === "saffron" && "bg-saffron-400",
            variant === "emerald" && "bg-emerald-400",
            variant === "warning" && "bg-amber-400",
            variant === "slate" && "bg-slate-400",
            variant === "glow" && "bg-emerald-400"
          )}
        />
      )}
      {children}
    </span>
  );
};
