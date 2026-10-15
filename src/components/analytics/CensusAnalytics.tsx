"use client";

import React, { useState, useMemo } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import {
  POPULATION_GROWTH_DATA,
  URBAN_RURAL_SPLIT,
  STATE_LITERACY_TOP_BOTTOM,
  DIGITAL_AMENITIES_PENETRATION,
} from "@/lib/data/analyticsData";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  GraduationCap,
  Zap,
  Sliders,
  Sparkles,
  Calculator,
  ArrowUpRight,
} from "lucide-react";

export const CensusAnalytics: React.FC = () => {
  const { t } = useLanguage();
  const [selectedChart, setSelectedChart] = useState<"pop" | "urban" | "literacy" | "amenities" | "modeler">("pop");

  // Interactive Scenario Projection Modeler Levers
  const [targetUrbanRate, setTargetUrbanRate] = useState<number>(36.6);
  const [femaleLiteracyTarget, setFemaleLiteracyTarget] = useState<number>(82.5);

  const scenarioCalculation = useMemo(() => {
    const totalPop = 1445.0; // Millions
    const urbanPop = (totalPop * (targetUrbanRate / 100)).toFixed(1);
    const ruralPop = (totalPop * (1 - targetUrbanRate / 100)).toFixed(1);
    const projectedWorkforce = (totalPop * 0.48 * (1 + (femaleLiteracyTarget - 70) * 0.004)).toFixed(1);
    const economicDividend = ((femaleLiteracyTarget - 70) * 1.8).toFixed(1);

    return {
      urbanPop,
      ruralPop,
      projectedWorkforce,
      economicDividend,
    };
  }, [targetUrbanRate, femaleLiteracyTarget]);

  const customTooltipStyle = {
    backgroundColor: "#0F1419",
    borderColor: "#FF5722",
    borderRadius: "12px",
    color: "#F4F4F0",
    fontSize: "12px",
    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.8)",
  };

  return (
    <section id="analytics" className="py-16 scroll-mt-24 space-y-10" aria-label="Census Data Analytics & Projections">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="saffron" size="lg">
          <BarChart3 className="w-4 h-4" aria-hidden="true" /> Data Intelligence & Scenario Suite
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-sand-50 tracking-tight">
          {t("analyticsTitle")}
        </h2>
        <p className="text-sm sm:text-base text-sage-400">
          {t("analyticsSubtitle")}
        </p>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2" role="tablist" aria-label="Demographic Chart Views">
          {[
            { id: "pop", label: "Population & Sex Ratio", icon: <TrendingUp className="w-3.5 h-3.5" /> },
            { id: "urban", label: "Urban vs Rural Split", icon: <PieIcon className="w-3.5 h-3.5" /> },
            { id: "literacy", label: "State Literacy Rates", icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: "amenities", label: "Amenities Transformation", icon: <Zap className="w-3.5 h-3.5" /> },
            { id: "modeler", label: "⚡ Live 2027 Scenario Modeler", icon: <Sliders className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={selectedChart === tab.id}
              onClick={() => setSelectedChart(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 ${
                selectedChart === tab.id
                  ? "bg-gradient-to-r from-saffron-600 to-emerald-600 text-sand-50 shadow-glow-saffron"
                  : "bg-obsidian-800/80 text-sage-400 hover:text-sand-100 border border-slate-800"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Card */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        {/* 1. Population Growth Trend */}
        {selectedChart === "pop" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-sand-50">
                  {t("chartPopGrowth")}
                </h3>
                <p className="text-xs text-sage-400">
                  Total Population (in Millions) alongside Females per 1,000 Males from 1951 to 2027 Projections
                </p>
              </div>
              <Badge variant="emerald" size="sm">
                Projected 2027: 1.445 Billion
              </Badge>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={POPULATION_GROWTH_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="popGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF5722" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF5722" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="sexRatioGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A232D" />
                  <XAxis dataKey="year" stroke="#9CA3AF" fontSize={11} />
                  <YAxis stroke="#9CA3AF" fontSize={11} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Area
                    type="monotone"
                    dataKey="population"
                    name="Population (Millions)"
                    stroke="#FF5722"
                    fillOpacity={1}
                    fill="url(#popGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="sexRatio"
                    name="Sex Ratio (F/1000M)"
                    stroke="#10B981"
                    fillOpacity={0.3}
                    fill="url(#sexRatioGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-obsidian-900 border border-slate-800 text-center">
                <span className="text-[10px] text-sage-400 uppercase">2027 Proj Pop</span>
                <p className="text-base font-bold text-saffron-400">1,445.0 M</p>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900 border border-slate-800 text-center">
                <span className="text-[10px] text-sage-400 uppercase">Projected Sex Ratio</span>
                <p className="text-base font-bold text-emerald-400">960 / 1000</p>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900 border border-slate-800 text-center">
                <span className="text-[10px] text-sage-400 uppercase">Male Proj</span>
                <p className="text-base font-bold text-sand-100">737.2 M</p>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-900 border border-slate-800 text-center">
                <span className="text-[10px] text-sage-400 uppercase">Female Proj</span>
                <p className="text-base font-bold text-pink-400">707.8 M</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Urban vs Rural Split */}
        {selectedChart === "urban" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-sand-50">
                  {t("chartUrbanRural")}
                </h3>
                <p className="text-xs text-sage-400">
                  Estimated distribution between Rural Villages and Urban Agglomerations
                </p>
              </div>
              <Badge variant="saffron" size="sm">
                Urban Transition Trend
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={URBAN_RURAL_SPLIT}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {URBAN_RURAL_SPLIT.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#0B0F12" strokeWidth={3} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={customTooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-400">
                    <span>Rural Sector (63.4%)</span>
                    <span>916.1 Million Citizens</span>
                  </div>
                  <p className="text-[11px] text-sage-400">
                    Approx. 192M rural households across 650,000+ gram panchayats and revenue villages.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-saffron-500/10 border border-saffron-500/30 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-saffron-400">
                    <span>Urban Sector (36.6%)</span>
                    <span>528.9 Million Citizens</span>
                  </div>
                  <p className="text-[11px] text-sage-400">
                    Approx. 128M urban households across 8,000+ statutory and census towns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. State Literacy Rates */}
        {selectedChart === "literacy" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-sand-50">
                  {t("chartLiteracy")}
                </h3>
                <p className="text-xs text-sage-400">
                  Projected Effective Literacy Rates (%) vs National Average (80.9%)
                </p>
              </div>
              <Badge variant="glow" size="sm">
                National Target: 80.9%+
              </Badge>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STATE_LITERACY_TOP_BOTTOM} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A232D" />
                  <XAxis type="number" domain={[60, 100]} stroke="#9CA3AF" fontSize={11} />
                  <YAxis type="category" dataKey="state" stroke="#9CA3AF" fontSize={11} width={85} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Bar dataKey="literacy" name="Literacy Rate (%)" fill="#10B981" radius={[0, 6, 6, 0]}>
                    {STATE_LITERACY_TOP_BOTTOM.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.state === "National Avg" ? "#FF5722" : entry.literacy >= 85 ? "#10B981" : "#34D399"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 4. Amenities Transformation */}
        {selectedChart === "amenities" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold font-display text-sand-50">
                  {t("chartAmenities")}
                </h3>
                <p className="text-xs text-sage-400">
                  Comparison of Household Access (%) between 2011 Census and 2027 Projections
                </p>
              </div>
              <Badge variant="emerald" size="sm">
                Rapid Modernization
              </Badge>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DIGITAL_AMENITIES_PENETRATION} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1A232D" />
                  <XAxis dataKey="amenity" stroke="#9CA3AF" fontSize={10} angle={-15} textAnchor="end" height={60} />
                  <YAxis domain={[0, 100]} stroke="#9CA3AF" fontSize={11} />
                  <Tooltip contentStyle={customTooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
                  <Bar dataKey="2011" name="2011 Census (%)" fill="#6B7280" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="2027" name="2027 Projection (%)" fill="#FF5722" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* 5. Live 2027 Scenario Modeler */}
        {selectedChart === "modeler" && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-display text-sand-50 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-saffron-400" />
                  Interactive Demographic Scenario Modeler (2027–2031)
                </h3>
                <p className="text-xs text-sage-400">
                  Adjust urbanization and female education levers to simulate macroeconomic & demographic outcomes in real time.
                </p>
              </div>
              <Badge variant="glow" size="sm">
                Real-Time Compute
              </Badge>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 rounded-2xl bg-obsidian-900 border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-sand-200">Urbanization Target Rate</span>
                  <span className="text-saffron-400 font-mono font-bold">{targetUrbanRate}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={50}
                  step={0.5}
                  value={targetUrbanRate}
                  onChange={(e) => setTargetUrbanRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-saffron-500"
                />
                <div className="flex justify-between text-[10px] text-sage-500">
                  <span>30% (Rural Heavy)</span>
                  <span>36.6% (2027 Baseline)</span>
                  <span>50% (Rapid Urban)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-sand-200">Female Literacy Projection</span>
                  <span className="text-emerald-400 font-mono font-bold">{femaleLiteracyTarget}%</span>
                </div>
                <input
                  type="range"
                  min={70}
                  max={95}
                  step={0.5}
                  value={femaleLiteracyTarget}
                  onChange={(e) => setFemaleLiteracyTarget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-sage-500">
                  <span>70% (2011 Baseline)</span>
                  <span>82.5% (2027 Target)</span>
                  <span>95% (Universal)</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Outputs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-saffron-500/10 border border-saffron-500/30 text-center space-y-1">
                <span className="text-[11px] text-sage-400">Urban Population</span>
                <p className="text-2xl font-bold font-display text-saffron-300 font-mono">
                  {scenarioCalculation.urbanPop} M
                </p>
                <span className="text-[10px] text-saffron-400">at {targetUrbanRate}% urban share</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                <span className="text-[11px] text-sage-400">Rural Population</span>
                <p className="text-2xl font-bold font-display text-emerald-300 font-mono">
                  {scenarioCalculation.ruralPop} M
                </p>
                <span className="text-[10px] text-emerald-400">across 6.5L villages</span>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-sage-400">Effective Workforce</span>
                <p className="text-2xl font-bold font-display text-sand-50 font-mono">
                  {scenarioCalculation.projectedWorkforce} M
                </p>
                <span className="text-[10px] text-emerald-400">Active Working Force</span>
              </div>

              <div className="p-4 rounded-xl bg-obsidian-900 border border-slate-800 text-center space-y-1">
                <span className="text-[11px] text-sage-400">Demographic Dividend</span>
                <p className="text-2xl font-bold font-display text-amber-300 font-mono flex items-center justify-center gap-1">
                  +{scenarioCalculation.economicDividend}% <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </p>
                <span className="text-[10px] text-sage-400">Productivity Boost</span>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </section>
  );
};
