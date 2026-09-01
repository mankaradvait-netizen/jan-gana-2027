import React from "react";
import { clsx } from "clsx";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "saffron" | "emerald" | "interactive";
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  variant = "default",
  glow = false,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border backdrop-blur-xl transition-all duration-300",
        // Base Glassmorphism Dark background
        variant === "default" &&
          "bg-obsidian-800/80 border-slate-800/80 hover:border-slate-700/90 shadow-glass",
        variant === "saffron" &&
          "bg-gradient-to-b from-obsidian-800/90 to-obsidian-900/90 border-saffron-500/30 hover:border-saffron-500/60 shadow-glass hover:shadow-glow-saffron",
        variant === "emerald" &&
          "bg-gradient-to-b from-obsidian-800/90 to-obsidian-900/90 border-emerald-500/30 hover:border-emerald-500/60 shadow-glass hover:shadow-glow-emerald",
        variant === "interactive" &&
          "bg-obsidian-800/70 border-slate-800/90 hover:border-saffron-500/50 hover:bg-obsidian-700/80 cursor-pointer shadow-glass",
        glow && "shadow-glow-saffron",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
