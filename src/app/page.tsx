"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { PhaseBreakdown } from "@/components/phases/PhaseBreakdown";
import { StateScheduleTracker } from "@/components/schedules/StateScheduleTracker";
import { PrivacyHub } from "@/components/privacy/PrivacyHub";
import {
  Sparkles,
  Users,
  ShieldCheck,
  Globe2,
  Calendar,
  ArrowRight,
  Lock,
  Zap,
} from "lucide-react";

// Dynamic Code Splitting for Heavy Interactive Modules (Boosts Efficiency & Initial LCP Score)
const EnumerationWizard = dynamic(
  () => import("@/components/simulator/EnumerationWizard").then((mod) => mod.EnumerationWizard),
  {
    loading: () => (
      <div className="py-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-saffron-500/20 text-saffron-400 mx-auto animate-pulse flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="text-xs text-sage-400 mt-3">Loading Self-Enumeration Engine...</p>
      </div>
    ),
    ssr: false,
  }
);

const CensusAnalytics = dynamic(
  () => import("@/components/analytics/CensusAnalytics").then((mod) => mod.CensusAnalytics),
  {
    loading: () => (
      <div className="py-16 text-center">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 mx-auto animate-pulse flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
        <p className="text-xs text-sage-400 mt-3">Loading Demographic Intelligence Suite...</p>
      </div>
    ),
    ssr: false,
  }
);

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian-950 text-sand-50 relative overflow-hidden">
      {/* Background Decorative Gradients & Mesh */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-saffron-500/15 via-emerald-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[800px] -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[1600px] -right-40 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-10 relative z-10">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section className="text-center space-y-8 pt-6 pb-8" aria-label="Introduction">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-850 border border-saffron-500/40 text-xs font-semibold text-saffron-300 shadow-glow-saffron">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Digital Census 2027 • Official Self-Enumeration Portal</span>
          </div>

          {/* Master Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-sand-50 leading-[1.1]">
              Counting Every Voice.{" "}
              <span className="bg-gradient-to-r from-saffron-400 via-saffron-500 to-emerald-400 bg-clip-text text-transparent">
                Digitally, Securely.
              </span>
            </h1>

            <p className="text-sm sm:text-lg text-sage-300 max-w-2xl mx-auto leading-relaxed">
              India’s first 100% paperless digital census empowering 1.4+ billion citizens with self-enumeration, sovereign privacy under the DPDP Act 2023, and real-time demographic intelligence.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#simulator"
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-saffron-600 via-saffron-500 to-saffron-600 hover:from-saffron-500 hover:to-saffron-400 text-sand-50 font-bold text-sm sm:text-base shadow-glow-saffron transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            >
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              <span>Begin Self-Enumeration Simulator</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#schedules"
              className="px-7 py-4 rounded-2xl bg-obsidian-800/90 hover:bg-slate-800 text-sand-100 font-bold text-sm sm:text-base border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Calendar className="w-5 h-5 text-emerald-400" aria-hidden="true" />
              <span>State Schedules (36 States & UTs)</span>
            </a>

            <a
              href="#privacy"
              className="px-6 py-4 rounded-2xl bg-obsidian-800/90 hover:bg-slate-800 text-sand-100 font-bold text-sm sm:text-base border border-slate-700 hover:border-saffron-500/50 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            >
              <ShieldCheck className="w-5 h-5 text-saffron-400" aria-hidden="true" />
              <span>AI Fact-Checker</span>
            </a>
          </div>

          {/* Live Key Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <StatCard
              title="Projected Population"
              value="1.445 B"
              subtitle="Estimated for Census 2027"
              icon={<Users className="w-6 h-6" />}
              trend="100% Digital Geo-tagging"
              variant="saffron"
            />
            <StatCard
              title="Total Coverage"
              value="36"
              subtitle="28 States + 8 Union Territories"
              icon={<Globe2 className="w-6 h-6" />}
              variant="emerald"
            />
            <StatCard
              title="Data Security"
              value="AES-256"
              subtitle="DPDP Act 2023 Compliant"
              icon={<Lock className="w-6 h-6" />}
              variant="default"
            />
            <StatCard
              title="Self-Enumeration"
              value="30–45 d"
              subtitle="Direct Citizen Pre-fill Window"
              icon={<Zap className="w-6 h-6" />}
              variant="emerald"
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. PHASE BREAKDOWN MODULE */}
        {/* ========================================================================= */}
        <PhaseBreakdown />

        {/* ========================================================================= */}
        {/* 3. STATE-WISE SCHEDULE & TRACKER */}
        {/* ========================================================================= */}
        <StateScheduleTracker />

        {/* ========================================================================= */}
        {/* 4. GUIDED SELF-ENUMERATION SIMULATOR (Dynamically Loaded for Max Speed) */}
        {/* ========================================================================= */}
        <EnumerationWizard />

        {/* ========================================================================= */}
        {/* 5. DATA PRIVACY & ANTI-MISINFORMATION HUB */}
        {/* ========================================================================= */}
        <PrivacyHub />

        {/* ========================================================================= */}
        {/* 6. DYNAMIC DEMOGRAPHIC VISUALIZATION & ANALYTICS */}
        {/* ========================================================================= */}
        <CensusAnalytics />
      </div>
    </div>
  );
}
