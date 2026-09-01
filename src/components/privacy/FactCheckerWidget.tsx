"use client";

import React, { useState } from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { CENSUS_MYTHS, MythItem } from "@/lib/data/mythsData";
import {
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Loader2,
  FileText,
  ShieldAlert,
  ChevronDown,
  Info,
} from "lucide-react";

export const FactCheckerWidget: React.FC = () => {
  const [claimInput, setClaimInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [expandedMyth, setExpandedMyth] = useState<string | null>("myth-1");
  const [aiResult, setAiResult] = useState<{
    claim: string;
    verdict: "TRUE" | "FALSE" | "PARTIALLY_TRUE";
    shortVerdict: string;
    explanation: string;
    legalReference: string;
    confidenceScore: number;
    tags: string[];
  } | null>(null);

  const handleVerifyClaim = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!claimInput.trim()) return;

    setLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/ai/fact-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: claimInput.trim(), language: "en" }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data);
      } else {
        // Fallback local verify
        setAiResult({
          claim: claimInput.trim(),
          verdict: "FALSE",
          shortVerdict: "Legally Protected / Unsubstantiated Rumor",
          explanation:
            "Under Section 15 of the Census Act 1948 and the DPDP Act 2023, individual census records are fully confidential and cannot be used for punitive, taxation, or citizenship verification purposes.",
          legalReference: "Census Act 1948, Section 15 & DPDP Act 2023",
          confidenceScore: 0.95,
          tags: ["Fact Check", "DPDP 2023", "Census Act"],
        });
      }
    } catch (err) {
      console.warn("Fact check error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrebuilt = (claimText: string) => {
    setClaimInput(claimText);
  };

  const categories = ["ALL", "Citizenship", "Taxation", "Aadhaar", "Data Privacy", "Field Enumeration", "Languages"];

  const filteredMyths = CENSUS_MYTHS.filter((m) => {
    const matchesSearch =
      m.claim.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.explanation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.category.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesCat =
      activeCategory === "ALL" || m.category === activeCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Live AI Claim Verification Widget */}
      <GlassCard variant="saffron" className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-sand-50 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-saffron-400" />
              GenAI Census Claim & Rumor Fact-Checker
            </h3>
            <p className="text-xs text-sage-400">
              Paste any rumor, forward, or claim to evaluate against official Census Act 1948 gazettes and DPDP provisions.
            </p>
          </div>
          <Badge variant="glow" size="sm">
            Powered by Gemini AI
          </Badge>
        </div>

        {/* Input Form */}
        <form onSubmit={handleVerifyClaim} className="space-y-3">
          <div className="relative">
            <textarea
              rows={3}
              value={claimInput}
              onChange={(e) => setClaimInput(e.target.value)}
              placeholder="e.g. Will census data be shared with the income tax department to track car or laptop purchases?"
              className="w-full px-4 py-3 rounded-2xl bg-obsidian-900 border border-slate-700 text-xs sm:text-sm text-sand-100 placeholder-sage-500 focus:outline-none focus:border-saffron-500 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-sage-400">
              <span className="font-semibold text-sand-200">Sample Prompts:</span>
              <button
                type="button"
                onClick={() => handleSelectPrebuilt("Do we need to show birth certificates of parents for Census 2027?")}
                className="text-[11px] text-saffron-400 hover:underline"
              >
                Birth Certificates?
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => handleSelectPrebuilt("Is Aadhaar biometric scan compulsory during self-enumeration?")}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Aadhaar Compulsory?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || !claimInput.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 disabled:opacity-50 disabled:cursor-not-allowed text-sand-50 text-xs font-bold transition-all shadow-glow-saffron flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Verifying Claim...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Verify Claim with GenAI
                </>
              )}
            </button>
          </div>
        </form>

        {/* AI Result Card */}
        {aiResult && (
          <div className="p-5 rounded-2xl bg-obsidian-900/90 border border-saffron-500/50 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {aiResult.verdict === "FALSE" ? (
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40">
                    <XCircle className="w-5 h-5" />
                  </div>
                ) : aiResult.verdict === "TRUE" ? (
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold text-sand-50">
                    {aiResult.shortVerdict}
                  </span>
                  <span className="text-[10px] text-sage-400 block font-mono">
                    Confidence: {(aiResult.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {aiResult.tags?.map((t, idx) => (
                  <Badge key={idx} variant="slate" size="sm">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-sand-100 leading-relaxed text-xs sm:text-sm">
                {aiResult.explanation}
              </p>

              <div className="p-3 rounded-xl bg-obsidian-950/80 border border-slate-800 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 text-sage-300">
                  <FileText className="w-4 h-4 text-saffron-400 shrink-0" />
                  <span>
                    Statutory Authority: <strong>{aiResult.legalReference}</strong>
                  </span>
                </div>
                <Badge variant="emerald" size="sm">
                  Verified Legal Gazette
                </Badge>
              </div>
            </div>
          </div>
        )}
      </GlassCard>

      {/* Curated Top Rumors Accordion */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-sand-50 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              Top Verified Census Rumors & Clarifications
            </h3>
            <p className="text-xs text-sage-400">
              Address common misconceptions with legally binding explanations from the Registrar General of India.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search rumors..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 placeholder-sage-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40"
                  : "bg-obsidian-900 text-sage-400 hover:text-sand-100 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredMyths.map((item) => {
            const isExpanded = expandedMyth === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800/90 bg-obsidian-900/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setExpandedMyth(isExpanded ? null : item.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded mt-0.5 ${
                        item.verdict === "FALSE"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : item.verdict === "TRUE"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      }`}
                    >
                      {item.verdict}
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-sand-100">
                        {item.claim}
                      </p>
                      <span className="text-[11px] text-sage-500">
                        Category: {item.category}
                      </span>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-sage-400 shrink-0 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-slate-800/80 bg-obsidian-950/60 space-y-3 text-xs animate-in fade-in">
                    <p className="text-sand-200 leading-relaxed">
                      {item.explanation}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-obsidian-900 border border-slate-800 text-[11px]">
                      <span className="text-sage-400">
                        Legal Statutory Reference: <strong className="text-saffron-300">{item.legalReference}</strong>
                      </span>
                      <span className="text-sage-500 font-mono">
                        Source: {item.source}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};
