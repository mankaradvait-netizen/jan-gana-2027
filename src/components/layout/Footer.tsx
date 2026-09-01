"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Shield, PhoneCall, Mail, FileText, Lock, Award, HeartHandshake } from "lucide-react";
import { Badge } from "../ui/Badge";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full border-t border-slate-800/90 bg-obsidian-950 text-sage-400 py-12 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute left-1/2 -top-24 -translate-x-1/2 w-96 h-96 bg-saffron-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Branding & Statutory Seal */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 to-emerald-500 p-0.5 shadow-glow-saffron">
                <div className="w-full h-full bg-obsidian-900 rounded-[10px] flex items-center justify-center font-black text-sm text-sand-50">
                  🇮🇳
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-sand-50">
                  {t("portalTitle")}
                </h3>
                <p className="text-[11px] text-sage-400">
                  Office of Registrar General & Census Commissioner
                </p>
              </div>
            </div>

            <p className="text-xs text-sage-400 leading-relaxed">
              Census 2027 is conducted under the statutory provisions of the <strong>Census Act, 1948</strong> and the <strong>Census Rules, 1990</strong>. All individual responses are protected by absolute confidentiality laws.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <Badge variant="emerald" size="sm">
                <Lock className="w-3 h-3" /> DPDP Act 2023
              </Badge>
              <Badge variant="saffron" size="sm">
                <Award className="w-3 h-3" /> ISO 27001 Certified
              </Badge>
            </div>
          </div>

          {/* Col 2: Legal Pillars */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-sand-100 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-saffron-400" />
              Legal Guarantees
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>Section 15 Census Act</strong>: Immune from judicial discovery, tax audits, or police action.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>Zero-Sale Policy</strong>: Census data is never commercialized or shared with third parties.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span><strong>Cryptographic Storage</strong>: AES-256 GCM hardware encryption with zero permanent biometric logs.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Census Helpline & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-sand-100 uppercase tracking-wider flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              Citizen Helpdesk
            </h4>
            <div className="space-y-2 text-xs">
              <p className="flex items-center gap-2 text-sand-200">
                <span className="font-semibold text-saffron-400">Toll-Free National Helpline:</span>
              </p>
              <p className="text-lg font-mono font-bold text-emerald-400">
                1800-11-2027
              </p>
              <p className="text-[11px] text-sage-400">
                (Available 24x7 in all 22 official Indian languages)
              </p>
              <div className="pt-1 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sage-400" />
                <a href="mailto:support@census2027.gov.in" className="hover:text-sand-100 transition-colors">
                  support@census2027.gov.in
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Official Links & Gazettes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-sand-100 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-saffron-400" />
              Official Resources
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#phases" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>→</span> Phase 1 & 2 Question Manual (31 Items)
                </a>
              </li>
              <li>
                <a href="#schedules" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>→</span> State-wise Gazette Notifications
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>→</span> DPDP Act Privacy Impact Assessment
                </a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-saffron-400 transition-colors flex items-center gap-1.5">
                  <span>→</span> Demographic Analytics Data Portal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sage-400">
          <p>
            © 2027 Registrar General & Census Commissioner, India. Hackathon Edition built for Google & ADYPU Challenge.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-400">
              <HeartHandshake className="w-3.5 h-3.5" /> Built for 1.4+ Billion Citizens
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
