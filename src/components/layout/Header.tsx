"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageCode } from "@/lib/i18n/translations";
import {
  Globe,
  Clock,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Layers,
  Calendar,
  UserCheck,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "../ui/Badge";

export const Header: React.FC = () => {
  const { language, setLanguage, t, languages, currentLangInfo } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Countdown to Phase 1 Launch: April 1, 2027
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2027-04-01T00:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Accessibility: Close dropdown on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLangDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/90 bg-obsidian-950/85 backdrop-blur-2xl transition-all" role="banner">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-obsidian-900 via-obsidian-850 to-obsidian-900 border-b border-slate-800/60 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-sage-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-saffron-500 animate-ping" aria-hidden="true" />
            <span className="text-sand-100 font-medium">
              {t("govIndia")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t("dpdpBadge")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo Branding */}
          <a href="#" className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-xl" aria-label="Jan-Gana 2027 Homepage">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-emerald-500 p-0.5 shadow-glow-saffron transition-all group-hover:scale-105">
              <div className="w-full h-full bg-obsidian-900 rounded-[10px] flex items-center justify-center border border-saffron-400/20">
                <span className="text-lg font-black tracking-tighter bg-gradient-to-r from-saffron-400 to-emerald-400 bg-clip-text text-transparent">
                  🇮🇳
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-sand-50 group-hover:text-saffron-400 transition-colors">
                  {t("portalTitle")}
                </h1>
                <Badge variant="emerald" size="sm" dot>
                  Digital 2027
                </Badge>
              </div>
              <p className="text-xs text-sage-400 hidden sm:block">
                {t("portalSubtitle")}
              </p>
            </div>
          </a>

          {/* Center: Live Countdown Capsule */}
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-obsidian-800/90 border border-saffron-500/30 shadow-inner" aria-label="National launch countdown timer">
            <div className="flex items-center gap-1.5 text-xs text-saffron-400 font-semibold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 animate-pulse" aria-hidden="true" />
              <span>Launch In:</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-sand-50" aria-live="polite">
              <div className="text-center">
                <span className="text-saffron-400">{timeLeft.days}</span>
                <span className="text-[10px] text-sage-400 ml-0.5">d</span>
              </div>
              <span className="text-slate-600">:</span>
              <div className="text-center">
                <span className="text-sand-100">{String(timeLeft.hours).padStart(2, "0")}</span>
                <span className="text-[10px] text-sage-400 ml-0.5">h</span>
              </div>
              <span className="text-slate-600">:</span>
              <div className="text-center">
                <span className="text-sand-100">{String(timeLeft.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] text-sage-400 ml-0.5">m</span>
              </div>
              <span className="text-slate-600">:</span>
              <div className="text-center">
                <span className="text-emerald-400">{String(timeLeft.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] text-sage-400 ml-0.5">s</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-sage-300" role="navigation" aria-label="Primary Navigation">
            <a
              href="#phases"
              className="hover:text-saffron-400 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-lg px-2 py-1"
            >
              <Layers className="w-4 h-4 text-saffron-500" aria-hidden="true" />
              {t("navPhases")}
            </a>
            <a
              href="#schedules"
              className="hover:text-saffron-400 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-lg px-2 py-1"
            >
              <Calendar className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              {t("navSchedules")}
            </a>
            <a
              href="#simulator"
              className="text-sand-50 hover:text-saffron-400 transition-colors flex items-center gap-1.5 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-lg px-2 py-1"
            >
              <UserCheck className="w-4 h-4 text-saffron-500" aria-hidden="true" />
              {t("navSimulator")}
            </a>
            <a
              href="#privacy"
              className="hover:text-saffron-400 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-lg px-2 py-1"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              {t("navPrivacy")}
            </a>
            <a
              href="#analytics"
              className="hover:text-saffron-400 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 rounded-lg px-2 py-1"
            >
              <BarChart3 className="w-4 h-4 text-saffron-400" aria-hidden="true" />
              {t("navAnalytics")}
            </a>
          </nav>

          {/* Right Action: Language Selector & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-expanded={langDropdownOpen}
                aria-haspopup="listbox"
                aria-label={`Select Portal Language, current language is ${currentLangInfo.label}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-obsidian-800/90 border border-slate-700/80 hover:border-saffron-500/60 text-sand-100 text-xs sm:text-sm font-medium transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              >
                <Globe className="w-4 h-4 text-saffron-400" aria-hidden="true" />
                <span className="hidden sm:inline font-bold">{currentLangInfo.nativeLabel}</span>
                <span className="sm:hidden">{currentLangInfo.code.toUpperCase()}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-sage-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-obsidian-900 border border-slate-700/90 shadow-2xl p-2 z-50 backdrop-blur-2xl grid grid-cols-1 gap-1" role="listbox" aria-label="Available Languages">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-sage-400 uppercase tracking-wider border-b border-slate-800">
                    Choose Language / भाषा चुनें
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-0.5 custom-scrollbar">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        role="option"
                        aria-selected={language === l.code}
                        onClick={() => {
                          setLanguage(l.code as LanguageCode);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${
                          language === l.code
                            ? "bg-saffron-500/20 text-saffron-300 font-bold border border-saffron-500/40"
                            : "text-sand-200 hover:bg-slate-800/80 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm" aria-hidden="true">{l.flag}</span>
                          <span>{l.nativeLabel}</span>
                          <span className="text-sage-500 text-[10px]">({l.label})</span>
                        </div>
                        {language === l.code && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-saffron-400" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Self-Enumeration Button */}
            <a
              href="#simulator"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 text-sand-50 text-xs sm:text-sm font-bold shadow-glow-saffron transition-all hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-400"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>{t("startSelfEnum")}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-obsidian-800 border border-slate-700 text-sand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-obsidian-900/98 backdrop-blur-3xl px-4 py-5 space-y-4">
          <div className="p-3 rounded-xl bg-obsidian-800/80 border border-saffron-500/30 flex items-center justify-between text-xs">
            <span className="text-sage-400">Launch Countdown:</span>
            <span className="font-mono font-bold text-saffron-400">
              {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <a
              href="#phases"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-sand-100 flex items-center gap-2 border border-slate-700/60"
            >
              <Layers className="w-4 h-4 text-saffron-500" />
              {t("navPhases")}
            </a>
            <a
              href="#schedules"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-sand-100 flex items-center gap-2 border border-slate-700/60"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              {t("navSchedules")}
            </a>
            <a
              href="#simulator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-saffron-500/10 hover:bg-saffron-500/20 text-saffron-300 flex items-center gap-2 border border-saffron-500/30"
            >
              <UserCheck className="w-4 h-4 text-saffron-400" />
              {t("navSimulator")}
            </a>
            <a
              href="#privacy"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 flex items-center gap-2 border border-emerald-500/30"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              {t("navPrivacy")}
            </a>
          </div>

          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 text-center text-sand-50 font-bold flex items-center justify-center gap-2 shadow-glow-saffron"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t("startSelfEnum")}</span>
          </a>
        </div>
      )}
    </header>
  );
};
