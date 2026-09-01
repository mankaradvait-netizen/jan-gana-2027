"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { STATES_AND_UTS, StateScheduleItem } from "@/lib/data/statesData";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import {
  Search,
  Calendar,
  Filter,
  ChevronRight,
  Users,
  GraduationCap,
  Heart,
  X,
} from "lucide-react";

export const StateScheduleTracker: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [selectedStateModal, setSelectedStateModal] = useState<StateScheduleItem | null>(null);

  const zones = ["ALL", "North", "South", "East", "West", "Central", "North-East"];

  // Accessibility: Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedStateModal) {
        setSelectedStateModal(null);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedStateModal]);

  const filteredStates = useMemo(() => {
    return STATES_AND_UTS.filter((state) => {
      const matchesSearch =
        state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        state.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesZone =
        selectedZone === "ALL" || state.zone === selectedZone;

      const matchesStatus =
        selectedStatus === "ALL" || state.status === selectedStatus;

      const matchesType =
        selectedType === "ALL" || state.type === selectedType;

      return matchesSearch && matchesZone && matchesStatus && matchesType;
    });
  }, [searchQuery, selectedZone, selectedStatus, selectedType]);

  const activeCount = STATES_AND_UTS.filter(
    (s) => s.status === "ACTIVE_PHASE_1" || s.status === "ACTIVE_PHASE_2"
  ).length;

  return (
    <section id="schedules" className="py-16 scroll-mt-24 space-y-8" aria-label="State-Wise Schedule Tracker">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="emerald" size="lg">
          <Calendar className="w-4 h-4" aria-hidden="true" /> Pan-India Operations Tracker
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-sand-50 tracking-tight">
          {t("schedulesTitle")}
        </h2>
        <p className="text-sm sm:text-base text-sage-400">
          {t("schedulesSubtitle")}
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="p-4 rounded-xl bg-obsidian-800/80 border border-slate-800 text-center space-y-1">
          <span className="text-xs text-sage-400">Total States & UTs</span>
          <p className="text-2xl font-bold font-display text-sand-50">36</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
          <span className="text-xs text-emerald-400">Active Windows</span>
          <p className="text-2xl font-bold font-display text-emerald-300">{activeCount}</p>
        </div>
        <div className="p-4 rounded-xl bg-saffron-500/10 border border-saffron-500/30 text-center space-y-1">
          <span className="text-xs text-saffron-400">Upcoming Windows</span>
          <p className="text-2xl font-bold font-display text-saffron-300">
            {STATES_AND_UTS.length - activeCount}
          </p>
        </div>
        <div className="p-4 rounded-xl bg-obsidian-800/80 border border-slate-800 text-center space-y-1">
          <span className="text-xs text-sage-400">Self-Enum Window</span>
          <p className="text-xl font-bold font-display text-sand-100">30–45 Days</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <GlassCard className="p-5 space-y-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400" aria-hidden="true" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchState")}
              aria-label="Search states and union territories by name or code"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-xs sm:text-sm text-sand-100 placeholder-sage-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              aria-label="Filter states by enumeration status"
              className="px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE_PHASE_1">Phase 1 Active</option>
              <option value="ACTIVE_PHASE_2">Phase 2 Active</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="COMPLETED">Completed</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label="Filter by administrative type"
              className="px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">States & UTs</option>
              <option value="STATE">28 States</option>
              <option value="UT">8 UTs</option>
            </select>
          </div>
        </div>

        {/* Zone Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar" role="group" aria-label="Filter states by geographic zone">
          <span className="text-sage-400 font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" /> Zone:
          </span>
          {zones.map((zone) => (
            <button
              key={zone}
              onClick={() => setSelectedZone(zone)}
              aria-pressed={selectedZone === zone}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                selectedZone === zone
                  ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/40"
                  : "bg-obsidian-900 text-sage-400 hover:text-sand-100 border border-slate-800"
              }`}
            >
              {zone}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Main Schedules Table */}
      <GlassCard className="p-0 overflow-hidden max-w-6xl mx-auto border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <caption className="sr-only">Schedule of Self-Enumeration across Indian States and Union Territories</caption>
            <thead className="bg-obsidian-900/90 text-sage-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
              <tr>
                <th scope="col" className="py-3.5 px-4 sm:px-6">{t("colState")}</th>
                <th scope="col" className="py-3.5 px-4">{t("colPhase1")}</th>
                <th scope="col" className="py-3.5 px-4">{t("colPhase2")}</th>
                <th scope="col" className="py-3.5 px-4 hidden md:table-cell">{t("colField")}</th>
                <th scope="col" className="py-3.5 px-4">{t("colStatus")}</th>
                <th scope="col" className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredStates.length > 0 ? (
                filteredStates.map((item) => (
                  <tr
                    key={item.code}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedStateModal(item);
                      }
                    }}
                    onClick={() => setSelectedStateModal(item)}
                    className="hover:bg-slate-800/40 transition-colors group cursor-pointer focus-visible:bg-slate-800/60 focus-visible:outline-none"
                    aria-label={`View schedule details for ${item.name}`}
                  >
                    {/* State Name & Badge */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-obsidian-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-saffron-400 group-hover:border-saffron-500">
                          {item.code}
                        </div>
                        <div>
                          <p className="font-bold text-sand-50 group-hover:text-saffron-400 transition-colors">
                            {item.name}
                          </p>
                          <span className="text-[11px] text-sage-400">
                            {item.type === "STATE" ? "State" : "Union Territory"} • {item.zone} Zone
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Phase 1 Date */}
                    <td className="py-3.5 px-4 text-xs font-mono text-sand-200">
                      <div>
                        {item.phase1Start}
                        <span className="text-sage-500 block text-[10px]">to {item.phase1End}</span>
                      </div>
                    </td>

                    {/* Phase 2 Date */}
                    <td className="py-3.5 px-4 text-xs font-mono text-sand-200">
                      <div>
                        {item.phase2Start}
                        <span className="text-sage-500 block text-[10px]">to {item.phase2End}</span>
                      </div>
                    </td>

                    {/* Field Verification */}
                    <td className="py-3.5 px-4 text-xs text-sage-400 hidden md:table-cell">
                      {item.fieldVerification}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      {item.status === "ACTIVE_PHASE_1" && (
                        <Badge variant="emerald" size="sm" dot>
                          Phase 1 Active
                        </Badge>
                      )}
                      {item.status === "ACTIVE_PHASE_2" && (
                        <Badge variant="glow" size="sm" dot>
                          Phase 2 Active
                        </Badge>
                      )}
                      {item.status === "UPCOMING" && (
                        <Badge variant="slate" size="sm">
                          Upcoming
                        </Badge>
                      )}
                      {item.status === "COMPLETED" && (
                        <Badge variant="saffron" size="sm">
                          Completed
                        </Badge>
                      )}
                    </td>

                    {/* Action CTA */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <a
                        href="#simulator"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Start self-enumeration for ${item.name}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-saffron-500/15 hover:bg-saffron-500 text-saffron-300 hover:text-white border border-saffron-500/30 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
                      >
                        <span>Enumerate</span>
                        <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-sage-400 text-xs">
                    No states or union territories matched your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-800 bg-obsidian-900/60 flex items-center justify-between text-xs text-sage-400">
          <span>
            Showing <strong>{filteredStates.length}</strong> of 36 States & UTs
          </span>
          <span className="text-[11px] text-sage-500">
            Click or press Enter on any row for detailed demographic profiles
          </span>
        </div>
      </GlassCard>

      {/* State Detail Modal */}
      {selectedStateModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-state-title"
        >
          <div className="w-full max-w-lg rounded-2xl bg-obsidian-900 border border-saffron-500/40 p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center font-bold text-base border border-saffron-500/30">
                  {selectedStateModal.code}
                </div>
                <div>
                  <h3 id="modal-state-title" className="text-xl font-bold font-display text-sand-50">
                    {selectedStateModal.name}
                  </h3>
                  <p className="text-xs text-sage-400">
                    {selectedStateModal.type} • {selectedStateModal.zone} Zone
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStateModal(null)}
                aria-label="Close modal dialog"
                className="p-1.5 rounded-lg bg-slate-800 text-sage-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Projected Key Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-obsidian-800/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-center gap-1 text-saffron-400 text-xs">
                  <Users className="w-3.5 h-3.5" /> Pop. 2027
                </div>
                <p className="text-lg font-bold font-display text-sand-50">
                  {selectedStateModal.projectedPop2027}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs">
                  <GraduationCap className="w-3.5 h-3.5" /> Literacy
                </div>
                <p className="text-lg font-bold font-display text-emerald-300">
                  {selectedStateModal.projectedLiteracy2027}%
                </p>
              </div>

              <div className="p-3 rounded-xl bg-obsidian-800/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-center gap-1 text-pink-400 text-xs">
                  <Heart className="w-3.5 h-3.5" /> Sex Ratio
                </div>
                <p className="text-lg font-bold font-display text-pink-300">
                  {selectedStateModal.sexRatio2027}
                </p>
              </div>
            </div>

            {/* Timeline Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-slate-800 flex justify-between items-center">
                <span className="text-sage-400">Phase 1 (Housing Census):</span>
                <span className="font-mono font-bold text-saffron-300">
                  {selectedStateModal.phase1Start} to {selectedStateModal.phase1End}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-slate-800 flex justify-between items-center">
                <span className="text-sage-400">Phase 2 (Population):</span>
                <span className="font-mono font-bold text-emerald-300">
                  {selectedStateModal.phase2Start} to {selectedStateModal.phase2End}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-obsidian-800/60 border border-slate-800 flex justify-between items-center">
                <span className="text-sage-400">Field Verification:</span>
                <span className="font-medium text-sand-100">
                  {selectedStateModal.fieldVerification}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setSelectedStateModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sand-200 text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Close (Esc)
              </button>
              <a
                href="#simulator"
                onClick={() => setSelectedStateModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 text-sand-50 text-xs font-bold text-center shadow-glow-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
              >
                Self-Enumerate for {selectedStateModal.name}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
