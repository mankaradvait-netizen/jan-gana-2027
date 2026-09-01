import React from "react";
import { GlassCard } from "./GlassCard";
import { clsx } from "clsx";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  variant?: "saffron" | "emerald" | "default";
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = "default",
}) => {
  return (
    <GlassCard
      variant={variant}
      className="p-5 flex items-start justify-between relative overflow-hidden group"
    >
      <div className="space-y-1.5 z-10">
        <p className="text-xs uppercase tracking-wider text-sage-400 font-semibold">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-sand-50 group-hover:scale-105 transition-transform duration-300">
          {value}
        </h3>
        {subtitle && (
          <p className="text-xs text-sand-300/80 font-normal">{subtitle}</p>
        )}
        {trend && (
          <div className="inline-flex items-center gap-1 text-xs text-emerald-400 pt-1 font-medium">
            <span>↑</span> {trend}
          </div>
        )}
      </div>

      <div
        className={clsx(
          "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 z-10",
          variant === "saffron" &&
            "bg-saffron-500/10 text-saffron-400 border-saffron-500/30 group-hover:bg-saffron-500/20 group-hover:scale-110",
          variant === "emerald" &&
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:scale-110",
          variant === "default" &&
            "bg-slate-800/80 text-sand-100 border-slate-700/80 group-hover:border-slate-600 group-hover:scale-110"
        )}
      >
        {icon}
      </div>

      {/* Decorative subtle background aura */}
      <div
        className={clsx(
          "absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-15 transition-opacity group-hover:opacity-30",
          variant === "saffron" && "bg-saffron-500",
          variant === "emerald" && "bg-emerald-500",
          variant === "default" && "bg-slate-500"
        )}
      />
    </GlassCard>
  );
};
