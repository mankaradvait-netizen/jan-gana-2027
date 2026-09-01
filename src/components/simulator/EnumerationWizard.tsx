"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Step1Identity } from "./Step1Identity";
import { Step2Housing, HousingFormData } from "./Step2Housing";
import { Step3Demographics, FamilyMember } from "./Step3Demographics";
import { Step4Acknowledgement } from "./Step4Acknowledgement";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { CheckCircle2, ShieldCheck, Home, Users, Award, Sparkles } from "lucide-react";

export const EnumerationWizard: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Step 1 State
  const [mobile, setMobile] = useState<string>("9820145678");
  const [aadhaar, setAadhaar] = useState<string>("");
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Step 2 State (Housing)
  const [housingData, setHousingData] = useState<HousingFormData>({
    state: "Maharashtra",
    district: "Pune",
    address: "Flat 402, Shivajinagar Heights, FC Road",
    houseType: "Pucca",
    wallMaterial: "Burnt Brick / Concrete",
    roofMaterial: "Reinforced Concrete (RCC)",
    drinkingWater: "Treated Tap Water inside premises",
    electricitySource: "Electricity Grid Connection",
    latrineType: "Flush Latrine connected to piped sewer",
    cookingFuel: "LPG / Piped PNG (Piped Natural Gas)",
    drainage: "Closed Drainage",
    hasBathingFacility: true,
    assets: {
      smartPhone: true,
      internet: true,
      laptopComputer: true,
      television: true,
      twoWheeler: true,
      fourWheeler: true,
      radio: false,
    },
  });

  // Step 3 State (Demographics)
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: "mem-init-1",
      fullName: "Rajesh Ramchandra Deshmukh",
      age: 44,
      gender: "MALE",
      relationToHead: "Head of Family",
      maritalStatus: "Currently Married",
      motherTongue: "Marathi",
      literacyLevel: "Post Graduate / Doctorate",
      occupation: "Employed in Private Sector",
      migrationReason: "None (Resident since birth)",
    },
    {
      id: "mem-init-2",
      fullName: "Pooja Rajesh Deshmukh",
      age: 41,
      gender: "FEMALE",
      relationToHead: "Spouse",
      maritalStatus: "Currently Married",
      motherTongue: "Marathi",
      literacyLevel: "Graduate / Bachelor's Degree",
      occupation: "Employed in Private Sector",
      migrationReason: "Marriage",
    },
    {
      id: "mem-init-3",
      fullName: "Aarav Rajesh Deshmukh",
      age: 15,
      gender: "MALE",
      relationToHead: "Son / Daughter",
      maritalStatus: "Never Married",
      motherTongue: "Marathi",
      literacyLevel: "Secondary (10th)",
      occupation: "Student",
      migrationReason: "None (Resident since birth)",
    },
  ]);

  // Step 4 State
  const [censusId, setCensusId] = useState<string>("IND-2027-MH-849201");

  const stepsList = [
    { num: 1, title: "Identity", icon: <ShieldCheck className="w-4 h-4" /> },
    { num: 2, title: "Housing", icon: <Home className="w-4 h-4" /> },
    { num: 3, title: "Demographics", icon: <Users className="w-4 h-4" /> },
    { num: 4, title: "Census ID", icon: <Award className="w-4 h-4" /> },
  ];

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Call Register Household API
      const hhRes = await fetch("/api/census/register-household", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: housingData.state,
          district: housingData.district,
          address: housingData.address,
          houseType: housingData.houseType,
          amenities: {
            drinkingWater: housingData.drinkingWater,
            electricity: housingData.electricitySource,
            latrineType: housingData.latrineType,
            cookingFuel: housingData.cookingFuel,
          },
          assets: housingData.assets,
          mobileNumber: mobile,
        }),
      });

      let generatedId = `IND-2027-${(housingData.state.substring(0, 2) || "IN").toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;

      if (hhRes.ok) {
        const hhData = await hhRes.json();
        if (hhData.censusId) {
          generatedId = hhData.censusId;
        }
      }

      setCensusId(generatedId);

      // 2. Call Add Members API
      await fetch("/api/census/add-members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          censusId: generatedId,
          members: members.map((m) => ({
            fullName: m.fullName,
            age: Number(m.age),
            gender: m.gender,
            relationToHead: m.relationToHead,
            maritalStatus: m.maritalStatus,
            motherTongue: m.motherTongue,
            literacyLevel: m.literacyLevel,
            occupation: m.occupation,
            migrationReason: m.migrationReason,
          })),
        }),
      });

      setCurrentStep(4);
    } catch (err) {
      console.warn("API registration fallback:", err);
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setCurrentStep(1);
    setIsVerified(false);
  };

  return (
    <section id="simulator" className="py-16 scroll-mt-24 space-y-10">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <Badge variant="saffron" size="lg">
          <Sparkles className="w-4 h-4" /> Live Interactive Module
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-sand-50 tracking-tight">
          {t("wizardTitle")}
        </h2>
        <p className="text-sm sm:text-base text-sage-400">
          {t("wizardSubtitle")}
        </p>
      </div>

      {/* Progress Indicator Bar */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="relative flex items-center justify-between">
          {/* Connector Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-800 w-full z-0" />
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-saffron-500 to-emerald-500 transition-all duration-500 z-0"
            style={{
              width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%`,
            }}
          />

          {stepsList.map((s) => (
            <div
              key={s.num}
              className="relative z-10 flex flex-col items-center gap-1.5"
            >
              <button
                type="button"
                onClick={() => {
                  if (s.num < currentStep) setCurrentStep(s.num);
                }}
                disabled={s.num > currentStep}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                  currentStep === s.num
                    ? "bg-gradient-to-tr from-saffron-600 to-emerald-500 text-sand-50 shadow-glow-saffron scale-110 border border-sand-50/40"
                    : currentStep > s.num
                    ? "bg-emerald-600 text-sand-50 shadow-glow-emerald border border-emerald-400"
                    : "bg-obsidian-900 text-sage-500 border border-slate-800"
                }`}
              >
                {currentStep > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
              </button>
              <span
                className={`text-[11px] font-semibold hidden sm:block ${
                  currentStep >= s.num ? "text-sand-100" : "text-sage-500"
                }`}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Render Area */}
      <div className="pt-2">
        {currentStep === 1 && (
          <Step1Identity
            mobile={mobile}
            setMobile={setMobile}
            aadhaar={aadhaar}
            setAadhaar={setAadhaar}
            isVerified={isVerified}
            setIsVerified={setIsVerified}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2Housing
            data={housingData}
            setData={setHousingData}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Step3Demographics
            members={members}
            setMembers={setMembers}
            onNext={handleFinalSubmit}
            onBack={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <Step4Acknowledgement
            censusId={censusId}
            mobile={mobile}
            housingData={housingData}
            members={members}
            onReset={resetAll}
          />
        )}
      </div>
    </section>
  );
};
