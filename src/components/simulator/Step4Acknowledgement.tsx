"use client";

import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import confetti from "canvas-confetti";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { HousingFormData } from "./Step2Housing";
import { FamilyMember } from "./Step3Demographics";
import {
  CheckCircle2,
  Download,
  Copy,
  Printer,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  QrCode,
  Users,
  Home,
  FileCheck,
} from "lucide-react";

interface Step4AcknowledgementProps {
  censusId: string;
  mobile: string;
  housingData: HousingFormData;
  members: FamilyMember[];
  onReset: () => void;
}

export const Step4Acknowledgement: React.FC<Step4AcknowledgementProps> = ({
  censusId,
  mobile,
  housingData,
  members,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF5722", "#10B981", "#F4F4F0", "#FF7043"],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyId = () => {
    navigator.clipboard.writeText(censusId);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const headMember = members[0] || { fullName: "Citizen Head" };

  const qrPayload = JSON.stringify({
    censusId,
    state: housingData.state,
    district: housingData.district,
    membersCount: members.length,
    head: headMember.fullName,
    auth: "VERIFIED_DPDP_2027",
    ts: new Date().toISOString(),
  });

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header Congratulations */}
      <div className="text-center space-y-3">
        <Badge variant="emerald" size="lg" dot>
          <Sparkles className="w-4 h-4" /> Self-Enumeration Successfully Completed
        </Badge>
        <h3 className="text-3xl font-extrabold font-display text-sand-50">
          Digital Census Acknowledgement Card
        </h3>
        <p className="text-xs sm:text-sm text-sage-300 max-w-lg mx-auto">
          Your digital census return is officially registered. Keep this digital card or QR code ready for quick scanning by the enumerator.
        </p>
      </div>

      {/* The Printable / Downloadable Official Digital Census Card */}
      <div
        id="census-acknowledgement-card"
        className="rounded-3xl border-2 border-saffron-500/50 bg-gradient-to-b from-obsidian-850 via-obsidian-900 to-obsidian-950 p-6 sm:p-8 shadow-glass-elevated relative overflow-hidden space-y-6"
      >
        {/* Background Watermark */}
        <div className="absolute right-6 -bottom-10 opacity-5 pointer-events-none text-9xl font-black font-display text-saffron-400">
          2027
        </div>

        {/* Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-emerald-500 p-0.5 shadow-glow-saffron">
              <div className="w-full h-full bg-obsidian-900 rounded-[14px] flex items-center justify-center text-xl font-bold">
                🇮🇳
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-black font-display text-sand-50 tracking-tight">
                  JAN-GANA 2027
                </h4>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Self-Enumerated
                </span>
              </div>
              <p className="text-[11px] text-sage-400">
                Government of India • Ministry of Home Affairs • ORGI
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] text-sage-400 uppercase tracking-widest block font-semibold">
              Acknowledgement Timestamp
            </span>
            <span className="text-xs font-mono font-bold text-sand-200">
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })} • {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        {/* Central Tracking ID & QR Code Hero */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-5 rounded-2xl bg-obsidian-900/90 border border-saffron-500/30">
          <div className="md:col-span-2 space-y-2">
            <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Official 12-Digit Census Tracking ID
            </span>
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-sand-50 bg-gradient-to-r from-sand-50 to-saffron-300 bg-clip-text text-transparent">
                {censusId}
              </span>
              <button
                type="button"
                onClick={handleCopyId}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-saffron-400 hover:text-saffron-300 transition-colors"
                title="Copy Census ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <span className="text-xs text-emerald-400 font-semibold block animate-in fade-in">
                ✓ Census ID copied to clipboard!
              </span>
            )}
            <p className="text-[11px] text-sage-400 leading-relaxed">
              Show this barcode or tracking ID to your assigned enumerator during field geotagging.
            </p>
          </div>

          {/* Scannable Dynamic QR Code */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white shadow-lg">
            <QRCodeSVG
              value={qrPayload}
              size={120}
              level="H"
              fgColor="#0B0F12"
              bgColor="#FFFFFF"
            />
            <span className="text-[9px] font-mono font-bold text-slate-800 mt-1 uppercase tracking-wider">
              Scannable Census QR
            </span>
          </div>
        </div>

        {/* Summary Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Household Summary */}
          <div className="p-4 rounded-xl bg-obsidian-900/60 border border-slate-800 space-y-2">
            <h5 className="font-bold text-sand-100 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Home className="w-4 h-4 text-saffron-400" /> Phase 1 Housing Summary
            </h5>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-sage-400">Head of Household:</span>
                <span className="font-bold text-sand-100">{headMember.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">State / Region:</span>
                <span className="font-medium text-sand-200">{housingData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">District:</span>
                <span className="font-medium text-sand-200">{housingData.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">Structure Type:</span>
                <span className="font-medium text-sand-200">{housingData.houseType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">Primary Fuel:</span>
                <span className="font-medium text-sand-200">{housingData.cookingFuel.split(" ")[0]}</span>
              </div>
            </div>
          </div>

          {/* Demographics Summary */}
          <div className="p-4 rounded-xl bg-obsidian-900/60 border border-slate-800 space-y-2">
            <h5 className="font-bold text-sand-100 flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Users className="w-4 h-4 text-emerald-400" /> Phase 2 Population Summary
            </h5>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span className="text-sage-400">Total Family Members:</span>
                <span className="font-bold text-emerald-300">{members.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">Verified Mobile:</span>
                <span className="font-mono font-medium text-sand-200">+91 {mobile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">Primary Language:</span>
                <span className="font-medium text-sand-200">{headMember.motherTongue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sage-400">Status:</span>
                <span className="text-emerald-400 font-bold">Self-Enumerated (Verified)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Statutory Stamp */}
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-[11px]">
              Protected by Section 15 of Census Act 1948 & DPDP Act 2023. Non-admissible in tax/court disputes.
            </span>
          </div>
          <Badge variant="emerald" size="sm">
            Digitally Signed
          </Badge>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <button
          type="button"
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 text-sand-50 font-bold text-xs sm:text-sm shadow-glow-saffron transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Download / Print Official Card
        </button>

        <button
          type="button"
          onClick={handleCopyId}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sand-200 font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2"
        >
          <Copy className="w-4 h-4 text-saffron-400" /> Copy Tracking ID
        </button>

        <button
          type="button"
          onClick={onReset}
          className="px-5 py-3 rounded-xl bg-obsidian-900 hover:bg-obsidian-800 text-sage-400 hover:text-sand-100 text-xs font-semibold border border-slate-800 transition-all flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Start New Simulation
        </button>
      </div>
    </div>
  );
};
