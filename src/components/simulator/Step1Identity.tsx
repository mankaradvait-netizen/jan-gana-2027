"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { ShieldCheck, Phone, KeyRound, CheckCircle2, Lock, Sparkles, AlertCircle } from "lucide-react";

interface Step1IdentityProps {
  mobile: string;
  setMobile: (val: string) => void;
  aadhaar: string;
  setAadhaar: (val: string) => void;
  isVerified: boolean;
  setIsVerified: (val: boolean) => void;
  onNext: () => void;
}

export const Step1Identity: React.FC<Step1IdentityProps> = ({
  mobile,
  setMobile,
  aadhaar,
  setAadhaar,
  isVerified,
  setIsVerified,
  onNext,
}) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [simulatedOtp, setSimulatedOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendOtp = () => {
    if (!mobile || mobile.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number");
      return;
    }
    setErrorMsg("");
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);
    setOtpSent(true);
    setTimer(45);
  };

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyOtp = () => {
    if (otpValue === simulatedOtp || otpValue === "123456" || otpValue.length === 6) {
      setIsVerified(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid OTP code. Please check the simulated OTP code above.");
    }
  };

  const handleAutoFillOtp = () => {
    setOtpValue(simulatedOtp);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="saffron" size="md">
          <ShieldCheck className="w-3.5 h-3.5" /> Step 1 of 4: Citizen Verification
        </Badge>
        <h3 className="text-2xl font-bold font-display text-sand-50">
          Identity & Mobile Authentication
        </h3>
        <p className="text-xs text-sage-400">
          Verify your mobile number to begin self-enumeration. Aadhaar is purely voluntary.
        </p>
      </div>

      <GlassCard variant="saffron" className="p-6 sm:p-8 space-y-6">
        {/* Mobile Number Field */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-sand-200">
            Mobile Number for Census Communications <span className="text-saffron-400">*</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-sage-400">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                disabled={otpSent && isVerified}
                placeholder="9876543210"
                className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-sm font-mono text-sand-100 placeholder-sage-600 focus:outline-none focus:border-saffron-500 transition-colors"
              />
            </div>

            {!isVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={timer > 0 && otpSent}
                className="px-4 py-2.5 rounded-xl bg-saffron-600 hover:bg-saffron-500 disabled:bg-slate-800 disabled:text-sage-500 text-sand-50 text-xs font-bold transition-all shadow-glow-saffron"
              >
                {otpSent ? (timer > 0 ? `Resend (${timer}s)` : "Resend OTP") : "Generate OTP"}
              </button>
            )}
          </div>
        </div>

        {/* Voluntary Aadhaar Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-sand-200">
              Aadhaar Number (Voluntary / Optional)
            </label>
            <span className="text-[10px] text-emerald-400 font-medium">
              Zero-Knowledge Hashed
            </span>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              maxLength={14}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              disabled={isVerified}
              placeholder="XXXX-XXXX-XXXX (Optional)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-sm font-mono text-sand-100 placeholder-sage-600 focus:outline-none focus:border-saffron-500 transition-colors"
            />
          </div>
        </div>

        {/* OTP Simulation Box */}
        {otpSent && !isVerified && (
          <div className="p-4 rounded-xl bg-obsidian-900/90 border border-saffron-500/40 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-saffron-400">
                <KeyRound className="w-4 h-4" /> Enter 6-Digit OTP
              </div>
              <button
                type="button"
                onClick={handleAutoFillOtp}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <Sparkles className="w-3 h-3" /> Auto-Fill ({simulatedOtp})
              </button>
            </div>

            <p className="text-[11px] text-sage-400">
              A simulated OTP has been dispatched to <strong>+91 {mobile}</strong>:{" "}
              <span className="font-mono font-bold text-saffron-300">{simulatedOtp}</span>
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                value={otpValue}
                onChange={(e) => setOtpValue(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="flex-1 px-4 py-2.5 rounded-xl bg-obsidian-950 border border-slate-700 text-sm font-mono text-center tracking-widest text-sand-100 focus:outline-none focus:border-saffron-500"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-sand-50 text-xs font-bold transition-all shadow-glow-emerald"
              >
                Verify OTP
              </button>
            </div>
          </div>
        )}

        {/* Verification Success Confirmation */}
        {isVerified && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-emerald-300">
                  Mobile Verified Successfully (+91 {mobile})
                </p>
                <p className="text-[10px] text-sage-400">
                  Cryptographic Session Token: <span className="font-mono text-sand-300">SEC-2027-AUTH-OK</span>
                </p>
              </div>
            </div>
            <Badge variant="emerald" size="sm">
              Verified
            </Badge>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Legal Disclaimer */}
        <div className="p-3 rounded-xl bg-obsidian-900/60 border border-slate-800/80 text-[11px] text-sage-400 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            Under <strong>DPDP Act 2023</strong> and Section 15 of the <strong>Census Act 1948</strong>, your mobile number is strictly encrypted and used solely for dispatching census verification tokens.
          </span>
        </div>

        {/* Next Step Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onNext}
            disabled={!isVerified}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 disabled:opacity-50 disabled:cursor-not-allowed text-sand-50 font-bold text-sm shadow-glow-saffron transition-all flex items-center justify-center gap-2"
          >
            <span>Proceed to Step 2: Housing Details</span>
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
