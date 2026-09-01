"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import { STATES_AND_UTS } from "@/lib/data/statesData";
import {
  Home,
  Droplet,
  Zap,
  Flame,
  Wifi,
  Smartphone,
  Laptop,
  Car,
  Tv,
  Radio,
  ArrowLeft,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export interface HousingFormData {
  state: string;
  district: string;
  address: string;
  houseType: string;
  wallMaterial: string;
  roofMaterial: string;
  drinkingWater: string;
  electricitySource: string;
  latrineType: string;
  cookingFuel: string;
  drainage: string;
  hasBathingFacility: boolean;
  assets: {
    smartPhone: boolean;
    internet: boolean;
    laptopComputer: boolean;
    television: boolean;
    twoWheeler: boolean;
    fourWheeler: boolean;
    radio: boolean;
  };
}

interface Step2HousingProps {
  data: HousingFormData;
  setData: React.Dispatch<React.SetStateAction<HousingFormData>>;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Housing: React.FC<Step2HousingProps> = ({
  data,
  setData,
  onNext,
  onBack,
}) => {
  const updateField = (field: keyof HousingFormData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAsset = (assetKey: keyof HousingFormData["assets"]) => {
    setData((prev) => ({
      ...prev,
      assets: {
        ...prev.assets,
        [assetKey]: !prev.assets[assetKey],
      },
    }));
  };

  const isValid = data.state && data.district && data.address && data.houseType;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="saffron" size="md">
          <Home className="w-3.5 h-3.5" /> Step 2 of 4: Phase 1 Housing Census
        </Badge>
        <h3 className="text-2xl font-bold font-display text-sand-50">
          Household & Dwelling Infrastructure
        </h3>
        <p className="text-xs text-sage-400">
          Provide information about your living structure, available amenities, and household assets.
        </p>
      </div>

      <GlassCard variant="saffron" className="p-6 sm:p-8 space-y-6">
        {/* Geographic Location */}
        <div className="space-y-4 border-b border-slate-800 pb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-400">
            1. Geographic Location
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200">
                State / Union Territory <span className="text-saffron-400">*</span>
              </label>
              <select
                value={data.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-xs sm:text-sm text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="">Select State / UT</option>
                {STATES_AND_UTS.map((s) => (
                  <option key={s.code} value={s.name}>
                    {s.name} ({s.code})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200">
                District / City <span className="text-saffron-400">*</span>
              </label>
              <input
                type="text"
                value={data.district}
                onChange={(e) => updateField("district", e.target.value)}
                placeholder="e.g. Pune, Central Delhi, Bengaluru"
                className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-xs sm:text-sm text-sand-100 placeholder-sage-600 focus:outline-none focus:border-saffron-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-sand-200">
              Complete Residential Address / Building Info <span className="text-saffron-400">*</span>
            </label>
            <input
              type="text"
              value={data.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="Flat/House No., Building Name, Street / Locality, PIN Code"
              className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-xs sm:text-sm text-sand-100 placeholder-sage-600 focus:outline-none focus:border-saffron-500"
            />
          </div>
        </div>

        {/* Structural Type */}
        <div className="space-y-4 border-b border-slate-800 pb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-400">
            2. Dwelling Structural Characteristics
          </h4>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-sand-200">House Type</label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: "Pucca", label: "Pucca (Concrete/Brick)", desc: "Permanent solid walls and roof" },
                { id: "Semi-Pucca", label: "Semi-Pucca", desc: "Mix of permanent and temporary materials" },
                { id: "Kutcha", label: "Kutcha (Thatch/Mud)", desc: "Temporary or unburnt mud/bamboo structure" },
              ].map((ht) => (
                <button
                  type="button"
                  key={ht.id}
                  onClick={() => updateField("houseType", ht.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    data.houseType === ht.id
                      ? "bg-saffron-500/20 border-saffron-500 text-sand-50 shadow-glow-saffron"
                      : "bg-obsidian-900 border-slate-800 text-sage-400 hover:border-slate-700"
                  }`}
                >
                  <p className="font-bold text-xs text-sand-100">{ht.label}</p>
                  <p className="text-[10px] text-sage-400 mt-0.5 leading-tight">{ht.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200">Predominant Wall Material</label>
              <select
                value={data.wallMaterial}
                onChange={(e) => updateField("wallMaterial", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="Burnt Brick / Concrete">Burnt Brick / Concrete</option>
                <option value="Stone Packed with Mortar">Stone Packed with Mortar</option>
                <option value="Mud / Unburnt Brick">Mud / Unburnt Brick</option>
                <option value="Wood / Bamboo / Reeds">Wood / Bamboo / Reeds</option>
                <option value="GI / Metal / Asbestos Sheets">GI / Metal / Asbestos Sheets</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200">Predominant Roof Material</label>
              <select
                value={data.roofMaterial}
                onChange={(e) => updateField("roofMaterial", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="Reinforced Concrete (RCC)">Reinforced Concrete (RCC)</option>
                <option value="Tiles / Slate">Tiles / Slate</option>
                <option value="Metal / Corrugated Sheets">Metal / Corrugated Sheets</option>
                <option value="Thatch / Grass / Wood">Thatch / Grass / Wood</option>
              </select>
            </div>
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="space-y-4 border-b border-slate-800 pb-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-400">
            3. Household Amenities & Utilities
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-blue-400" /> Drinking Water Source
              </label>
              <select
                value={data.drinkingWater}
                onChange={(e) => updateField("drinkingWater", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="Treated Tap Water inside premises">Treated Tap Water inside premises</option>
                <option value="Treated Tap Water outside premises">Treated Tap Water outside premises</option>
                <option value="Covered Well / Tube-well / Borewell">Covered Well / Tube-well / Borewell</option>
                <option value="Hand Pump / Spring">Hand Pump / Spring</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Primary Lighting Source
              </label>
              <select
                value={data.electricitySource}
                onChange={(e) => updateField("electricitySource", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="Electricity Grid Connection">Electricity Grid Connection</option>
                <option value="Solar Home Power System">Solar Home Power System</option>
                <option value="Kerosene / Other">Kerosene / Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-saffron-400" /> Primary Cooking Fuel
              </label>
              <select
                value={data.cookingFuel}
                onChange={(e) => updateField("cookingFuel", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="LPG / Piped PNG (Piped Natural Gas)">LPG / Piped PNG (Piped Natural Gas)</option>
                <option value="Biogas / Electric Induction">Biogas / Electric Induction</option>
                <option value="Firewood / Charcoal / Biomass">Firewood / Charcoal / Biomass</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-sand-200">Latrine Facility Type</label>
              <select
                value={data.latrineType}
                onChange={(e) => updateField("latrineType", e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-saffron-500"
              >
                <option value="Flush Latrine connected to piped sewer">Flush Latrine connected to piped sewer</option>
                <option value="Flush Latrine connected to septic tank">Flush Latrine connected to septic tank</option>
                <option value="Twin-Pit Latrine">Twin-Pit Latrine</option>
                <option value="Community / Shared Latrine">Community / Shared Latrine</option>
              </select>
            </div>
          </div>
        </div>

        {/* Digital & Physical Assets Multi-Select */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-saffron-400">
            4. Digital & Household Asset Ownership
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { key: "smartPhone", label: "Smartphones", icon: <Smartphone className="w-4 h-4" /> },
              { key: "internet", label: "Broadband / Wi-Fi", icon: <Wifi className="w-4 h-4" /> },
              { key: "laptopComputer", label: "Laptop / Computer", icon: <Laptop className="w-4 h-4" /> },
              { key: "television", label: "Television", icon: <Tv className="w-4 h-4" /> },
              { key: "twoWheeler", label: "Two-Wheeler", icon: <Car className="w-4 h-4" /> },
              { key: "fourWheeler", label: "Four-Wheeler / Car", icon: <Car className="w-4 h-4" /> },
              { key: "radio", label: "Radio / Transistor", icon: <Radio className="w-4 h-4" /> },
            ].map((asset) => {
              const active = data.assets[asset.key as keyof HousingFormData["assets"]];
              return (
                <button
                  type="button"
                  key={asset.key}
                  onClick={() => toggleAsset(asset.key as keyof HousingFormData["assets"])}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
                    active
                      ? "bg-emerald-500/20 border-emerald-500 text-sand-50 shadow-glow-emerald"
                      : "bg-obsidian-900 border-slate-800 text-sage-400 hover:border-slate-700"
                  }`}
                >
                  <span className={active ? "text-emerald-400" : "text-sage-500"}>
                    {asset.icon}
                  </span>
                  <span>{asset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-4 gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sand-200 text-xs font-bold transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Step 1
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!isValid}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 hover:to-saffron-400 disabled:opacity-50 disabled:cursor-not-allowed text-sand-50 text-xs font-bold transition-all shadow-glow-saffron flex items-center gap-2"
          >
            <span>Proceed to Step 3: Family Members</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};
