"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { FactCheckerWidget } from "./FactCheckerWidget";
import {
  ShieldCheck,
  Lock,
  Server,
  FileKey2,
  Database,
  Award,
  EyeOff,
  Scale,
} from "lucide-react";

export const PrivacyHub: React.FC = () => {
  const { t } = useLanguage();

  const privacyPillars = [
    {
      icon: <Scale className="w-5 h-5 text-saffron-400" />,
      title: "Section 15 of Census Act 1948",
      desc: "Census records are confidential and non-admissible as evidence in any court of law. Cannot be accessed by tax departments or police.",
      badge: "Absolute Legal Shield",
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: "DPDP Act 2023 Compliance",
      desc: "Governed under India's Digital Personal Data Protection Act with rigorous consent management, audit trails, and strict purpose limitation.",
      badge: "DPDP Certified",
    },
    {
      icon: <FileKey2 className="w-5 h-5 text-amber-400" />,
      title: "Hardware-Grade AES-256 GCM",
      desc: "All network transmissions and cloud storage volumes are encrypted with AES-256 GCM and rotated cryptographic keys on sovereign HSMs.",
      badge: "End-to-End Encrypted",
    },
    {
      icon: <EyeOff className="w-5 h-5 text-blue-400" />,
      title: "Zero-Knowledge Anonymization",
      desc: "Demographic and structural analytics are pseudonymized and aggregated at ward/village levels. No individual identities are ever published or sold.",
      badge: "Zero Commercialization",
    },
  ];

  return (
    <section id="privacy" className="py-16 scroll-mt-24 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="emerald" size="lg">
          <ShieldCheck className="w-4 h-4" /> Sovereign Trust & Integrity
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-sand-50 tracking-tight">
          {t("privacyTitle")}
        </h2>
        <p className="text-sm sm:text-base text-sage-400">
          {t("privacySubtitle")}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {privacyPillars.map((p, idx) => (
          <GlassCard
            key={idx}
            className="p-5 space-y-3 relative overflow-hidden group hover:border-emerald-500/40"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-obsidian-900 border border-slate-700 flex items-center justify-center">
                {p.icon}
              </div>
              <Badge variant="slate" size="sm">
                {p.badge}
              </Badge>
            </div>

            <h3 className="text-sm font-bold text-sand-50 group-hover:text-emerald-300 transition-colors">
              {p.title}
            </h3>

            <p className="text-xs text-sage-400 leading-relaxed">
              {p.desc}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* Embedded Rumor Buster & Fact Checker */}
      <FactCheckerWidget />
    </section>
  );
};
