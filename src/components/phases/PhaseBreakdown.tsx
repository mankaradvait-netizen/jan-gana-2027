"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import {
  Home,
  Users,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Search,
  FileCheck,
  ChevronRight,
  Droplet,
  Zap,
  Flame,
  Wifi,
  Car,
  BookOpen,
  Briefcase,
  Globe2,
  HelpCircle,
} from "lucide-react";

export const PhaseBreakdown: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"both" | "phase1" | "phase2">("both");
  const [questionSearch, setQuestionSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const officialQuestions = [
    // Phase 1 Questions
    { id: "P1-Q1", phase: 1, category: "Housing Structure", title: "Building Number & Census House Number", desc: "Municipal or local authority identification number." },
    { id: "P1-Q2", phase: 1, category: "Housing Structure", title: "Predominant Material of Floor, Wall & Roof", desc: "Recorded as Pucca (concrete/brick), Semi-Pucca, or Kutcha (thatch/mud)." },
    { id: "P1-Q3", phase: 1, category: "Housing Structure", title: "Use of Census House", desc: "Residential, commercial, educational, workshop, or mixed use." },
    { id: "P1-Q4", phase: 1, category: "Housing Structure", title: "Condition of the House", desc: "Good, Livable, or Dilapidated." },
    { id: "P1-Q5", phase: 1, category: "Household Profile", title: "Head of Household Details & Gender", desc: "Name, gender, and category of the primary decision maker." },
    { id: "P1-Q6", phase: 1, category: "Household Profile", title: "Ownership Status of the House", desc: "Owned, Rented, or Any Other." },
    { id: "P1-Q7", phase: 1, category: "Amenities", title: "Main Source of Drinking Water", desc: "Treated tap water, well, handpump, tube-well, or spring within/outside premises." },
    { id: "P1-Q8", phase: 1, category: "Amenities", title: "Main Source of Lighting", desc: "Electricity grid, Solar power, Kerosene, or Other." },
    { id: "P1-Q9", phase: 1, category: "Amenities", title: "Access to Latrine / Toilet Facility", desc: "Flush latrine connected to piped sewer, septic tank, twin pit, or community latrine." },
    { id: "P1-Q10", phase: 1, category: "Amenities", title: "Type of Drainage System", desc: "Closed drainage, Open drainage, or No drainage." },
    { id: "P1-Q11", phase: 1, category: "Amenities", title: "Availability of Bathing Facility & Kitchen", desc: "Enclosed bathroom with roof, and separate kitchen with cooking exhaust." },
    { id: "P1-Q12", phase: 1, category: "Amenities", title: "Main Fuel Used for Cooking", desc: "LPG / Piped PNG, Biogas, Electricity, Firewood, Cow-dung cake." },
    { id: "P1-Q13", phase: 1, category: "Assets", title: "Availability of Radio / Transistor", desc: "Operational radio receiver at household." },
    { id: "P1-Q14", phase: 1, category: "Assets", title: "Availability of Television Set", desc: "Colour TV / Smart TV with DTH or Cable connection." },
    { id: "P1-Q15", phase: 1, category: "Assets", title: "Availability of Internet & Broadband Connection", desc: "Broadband Wi-Fi, optical fiber, or cellular mobile internet." },
    { id: "P1-Q16", phase: 1, category: "Assets", title: "Availability of Laptop / Desktop Computer", desc: "Personal computer with or without internet." },
    { id: "P1-Q17", phase: 1, category: "Assets", title: "Ownership of Two-Wheeler / Four-Wheeler", desc: "Motorcycle, Scooter, Moped, Car, Jeep, or Van." },
    { id: "P1-Q18", phase: 1, category: "Assets", title: "Cereal Consumed by Household", desc: "Rice, Wheat, Jowar, Bajra, Maize, Ragi, or other primary food grains." },

    // Phase 2 Questions
    { id: "P2-Q19", phase: 2, category: "Demographics", title: "Full Name and Relationship to Head", desc: "Self, Spouse, Son, Daughter, Parent, Grandchild, or Non-relative." },
    { id: "P2-Q20", phase: 2, category: "Demographics", title: "Sex / Gender", desc: "Male, Female, or Third Gender / Other." },
    { id: "P2-Q21", phase: 2, category: "Demographics", title: "Date of Birth and Completed Age", desc: "Exact age in completed years." },
    { id: "P2-Q22", phase: 2, category: "Demographics", title: "Marital Status & Age at Marriage", desc: "Never married, Currently married, Widowed, Divorced, or Separated." },
    { id: "P2-Q23", phase: 2, category: "Social / Linguistic", title: "Mother Tongue & Dialect", desc: "First language learned in childhood. Supports all 19,500+ Indian linguistic variations." },
    { id: "P2-Q24", phase: 2, category: "Social / Linguistic", title: "Other Languages Known (Subsidiary)", desc: "Up to two secondary languages spoken with proficiency." },
    { id: "P2-Q25", phase: 2, category: "Education", title: "Literacy Status (Can read & write with understanding)", desc: "Literate vs Illiterate in any language." },
    { id: "P2-Q26", phase: 2, category: "Education", title: "Highest Educational Level Attained", desc: "Primary, Middle, Matric, Higher Secondary, Diploma, Graduate, Post Graduate, Doctorate." },
    { id: "P2-Q27", phase: 2, category: "Economic", title: "Economic Activity & Worker Category", desc: "Main Worker (>6 months), Marginal Worker (<6 months), or Non-Worker." },
    { id: "P2-Q28", phase: 2, category: "Economic", title: "Occupation & Nature of Industry / Trade", desc: "Cultivator, Agricultural Labourer, Household Industry Worker, or Other Worker." },
    { id: "P2-Q29", phase: 2, category: "Economic", title: "Travel to Workplace & Mode of Transport", desc: "Foot, Bicycle, Public Bus, Train, Metro, 2W, Car." },
    { id: "P2-Q30", phase: 2, category: "Migration", title: "Birthplace & Place of Last Residence", desc: "Rural / Urban, District, State, or Foreign Country." },
    { id: "P2-Q31", phase: 2, category: "Migration", title: "Reason for Migration & Duration of Stay", desc: "Work/Employment, Business, Education, Marriage, Moved with household, Natural calamities." },
  ];

  const filteredQuestions = officialQuestions.filter((q) => {
    const matchesTab =
      activeTab === "both" ||
      (activeTab === "phase1" && q.phase === 1) ||
      (activeTab === "phase2" && q.phase === 2);

    const matchesSearch =
      q.title.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.desc.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.category.toLowerCase().includes(questionSearch.toLowerCase()) ||
      q.id.toLowerCase().includes(questionSearch.toLowerCase());

    const matchesCat =
      selectedCategory === "ALL" || q.category === selectedCategory;

    return matchesTab && matchesSearch && matchesCat;
  });

  const categories = ["ALL", "Housing Structure", "Amenities", "Assets", "Household Profile", "Demographics", "Social / Linguistic", "Education", "Economic", "Migration"];

  return (
    <section id="phases" className="py-16 scroll-mt-24 space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="saffron" size="lg">
          <Layers className="w-4 h-4" /> Operational Architecture
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-sand-50 tracking-tight">
          {t("phasesTitle")}
        </h2>
        <p className="text-sm sm:text-base text-sage-400">
          {t("phasesSubtitle")}
        </p>

        {/* View Mode Toggle Buttons */}
        <div className="inline-flex p-1.5 rounded-2xl bg-obsidian-800 border border-slate-800 shadow-inner">
          <button
            onClick={() => setActiveTab("both")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "both"
                ? "bg-gradient-to-r from-saffron-600 to-emerald-600 text-sand-50 shadow-md"
                : "text-sage-400 hover:text-sand-100"
            }`}
          >
            Side-by-Side Comparison
          </button>
          <button
            onClick={() => setActiveTab("phase1")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "phase1"
                ? "bg-saffron-600 text-sand-50 shadow-glow-saffron"
                : "text-sage-400 hover:text-sand-100"
            }`}
          >
            Phase 1 (Housing)
          </button>
          <button
            onClick={() => setActiveTab("phase2")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === "phase2"
                ? "bg-emerald-600 text-sand-50 shadow-glow-emerald"
                : "text-sage-400 hover:text-sand-100"
            }`}
          >
            Phase 2 (Population)
          </button>
        </div>
      </div>

      {/* Main Phase Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phase 1 Card */}
        {(activeTab === "both" || activeTab === "phase1") && (
          <GlassCard
            variant="saffron"
            className="p-6 sm:p-8 space-y-6 relative overflow-hidden group border-saffron-500/40"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center border border-saffron-500/40">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <Badge variant="saffron" size="sm">
                    April 2027 – May 2027
                  </Badge>
                  <span className="text-xs text-sage-400 ml-2">Stage 1 of 2</span>
                </div>
              </div>
              <Badge variant="glow" size="sm">
                Generates Census ID
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-sand-50 group-hover:text-saffron-400 transition-colors">
                {t("phase1Title")}
              </h3>
              <p className="text-xs sm:text-sm text-sage-300 mt-2 leading-relaxed">
                {t("phase1Desc")}
              </p>
            </div>

            {/* Core Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-saffron-400 font-semibold text-xs">
                  <Home className="w-4 h-4" /> Housing Structure
                </div>
                <p className="text-[11px] text-sage-400">
                  Wall, floor, and roof materials (Pucca/Semi-Pucca/Kutcha), building age & condition.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-saffron-400 font-semibold text-xs">
                  <Droplet className="w-4 h-4" /> Water & Sanitation
                </div>
                <p className="text-[11px] text-sage-400">
                  Treated tap water access, individual toilets, sewer connectivity, drainage lines.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-saffron-400 font-semibold text-xs">
                  <Flame className="w-4 h-4" /> Clean Energy & Fuel
                </div>
                <p className="text-[11px] text-sage-400">
                  LPG / PNG connections, solar power integration, electricity meter availability.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-saffron-400 font-semibold text-xs">
                  <Wifi className="w-4 h-4" /> Digital & Mobility Assets
                </div>
                <p className="text-[11px] text-sage-400">
                  Smartphones, home broadband/Wi-Fi, computers, two-wheelers, four-wheelers.
                </p>
              </div>
            </div>

            {/* Outcome Box */}
            <div className="p-4 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-saffron-300">Phase 1 Citizen Deliverable:</span>
                <p className="text-sage-300">
                  Once submitted, citizens instantly receive a unique <strong>12-digit Household Census ID & QR code</strong> for streamlined Phase 2 entry.
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        {/* Phase 2 Card */}
        {(activeTab === "both" || activeTab === "phase2") && (
          <GlassCard
            variant="emerald"
            className="p-6 sm:p-8 space-y-6 relative overflow-hidden group border-emerald-500/40"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <Badge variant="emerald" size="sm">
                    September 2027 – October 2027
                  </Badge>
                  <span className="text-xs text-sage-400 ml-2">Stage 2 of 2</span>
                </div>
              </div>
              <Badge variant="slate" size="sm">
                Individual Enumeration
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold font-display text-sand-50 group-hover:text-emerald-400 transition-colors">
                {t("phase2Title")}
              </h3>
              <p className="text-xs sm:text-sm text-sage-300 mt-2 leading-relaxed">
                {t("phase2Desc")}
              </p>
            </div>

            {/* Core Focus Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Users className="w-4 h-4" /> Demographics & Age
                </div>
                <p className="text-[11px] text-sage-400">
                  Full name, exact age, gender (Male/Female/Other), marital status, family relationships.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <BookOpen className="w-4 h-4" /> Literacy & Education
                </div>
                <p className="text-[11px] text-sage-400">
                  Literacy status, highest completed degrees, technical & professional qualifications.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Briefcase className="w-4 h-4" /> Economic & Occupation
                </div>
                <p className="text-[11px] text-sage-400">
                  Work category (Main/Marginal), nature of occupation, industry, commute modes.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900/80 border border-slate-800/80 space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <Globe2 className="w-4 h-4" /> Mother Tongue & Migration
                </div>
                <p className="text-[11px] text-sage-400">
                  Mother tongue dialects, subsidiary languages known, birthplace & migration drivers.
                </p>
              </div>
            </div>

            {/* Outcome Box */}
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <span className="font-bold text-emerald-300">Phase 2 Verification:</span>
                <p className="text-sage-300">
                  Field enumerators will geolocate the house and scan the Phase 1 QR code to confirm population roster entries in seconds.
                </p>
              </div>
            </div>
          </GlassCard>
        )}
      </div>

      {/* Interactive Official 31-Questions Explorer */}
      <GlassCard className="p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display text-sand-50 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-saffron-400" />
              {t("exploreQuestions")} (Official 31 Questions)
            </h3>
            <p className="text-xs text-sage-400">
              Browse the complete official schedule of questions mandated for Digital Census 2027
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              value={questionSearch}
              onChange={(e) => setQuestionSearch(e.target.value)}
              placeholder="Search question or topic..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-obsidian-900/90 border border-slate-700 text-xs text-sand-100 placeholder-sage-500 focus:outline-none focus:border-saffron-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-saffron-500/20 text-saffron-300 font-semibold border border-saffron-500/40"
                  : "bg-obsidian-900 text-sage-400 hover:text-sand-100 border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
          {filteredQuestions.map((q) => (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-obsidian-900/80 border border-slate-800/90 hover:border-saffron-500/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-sand-300">
                  {q.id}
                </span>
                <Badge
                  variant={q.phase === 1 ? "saffron" : "emerald"}
                  size="sm"
                >
                  Phase {q.phase}
                </Badge>
              </div>

              <h4 className="text-xs font-bold text-sand-100 group-hover:text-saffron-400 transition-colors">
                {q.title}
              </h4>
              <p className="text-[11px] text-sage-400 leading-relaxed">
                {q.desc}
              </p>

              <div className="text-[10px] text-sage-500 font-medium pt-1">
                Category: <span className="text-sand-300">{q.category}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-sage-400 pt-2">
          Showing <strong>{filteredQuestions.length}</strong> of 31 Official Questions
        </div>
      </GlassCard>
    </section>
  );
};
