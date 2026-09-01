"use client";

import React from "react";
import { GlassCard } from "../ui/GlassCard";
import { Badge } from "../ui/Badge";
import {
  Users,
  UserPlus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  BookOpen,
  Briefcase,
  Globe2,
  Heart,
} from "lucide-react";

export interface FamilyMember {
  id: string;
  fullName: string;
  age: number | string;
  gender: "MALE" | "FEMALE" | "OTHER";
  relationToHead: string;
  maritalStatus: string;
  motherTongue: string;
  literacyLevel: string;
  occupation: string;
  migrationReason: string;
}

interface Step3DemographicsProps {
  members: FamilyMember[];
  setMembers: React.Dispatch<React.SetStateAction<FamilyMember[]>>;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Demographics: React.FC<Step3DemographicsProps> = ({
  members,
  setMembers,
  onNext,
  onBack,
}) => {
  const addMember = () => {
    const newMember: FamilyMember = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      fullName: "",
      age: "",
      gender: "MALE",
      relationToHead: members.length === 0 ? "Head of Family" : "Son / Daughter",
      maritalStatus: "Currently Married",
      motherTongue: "Hindi",
      literacyLevel: "Graduate / Bachelor's Degree",
      occupation: "Employed in Private Sector",
      migrationReason: "None (Resident since birth)",
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, field: keyof FamilyMember, value: any) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const isFormValid =
    members.length > 0 &&
    members.every(
      (m) =>
        m.fullName.trim().length > 1 &&
        m.age !== "" &&
        Number(m.age) >= 0 &&
        Number(m.age) <= 120
    );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <Badge variant="emerald" size="md">
          <Users className="w-3.5 h-3.5" /> Step 3 of 4: Phase 2 Population Enumeration
        </Badge>
        <h3 className="text-2xl font-bold font-display text-sand-50">
          Family Members Demographic Roster
        </h3>
        <p className="text-xs text-sage-400">
          Add all individuals normally residing in your household.
        </p>
      </div>

      {/* Members List */}
      <div className="space-y-6">
        {members.map((member, index) => (
          <GlassCard
            key={member.id}
            variant="emerald"
            className="p-6 sm:p-7 space-y-5 border-emerald-500/30 relative"
          >
            {/* Header of member card */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                  {index + 1}
                </div>
                <h4 className="text-sm font-bold text-sand-50">
                  {member.fullName || `Family Member #${index + 1}`}
                  {index === 0 && (
                    <span className="ml-2 text-[10px] text-saffron-400 font-semibold uppercase tracking-wider bg-saffron-500/10 px-2 py-0.5 rounded border border-saffron-500/30">
                      Primary Head
                    </span>
                  )}
                </h4>
              </div>

              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              )}
            </div>

            {/* Row 1: Name, Age, Gender, Relation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200">
                  Full Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  value={member.fullName}
                  onChange={(e) => updateMember(index, "fullName", e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 placeholder-sage-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200">
                  Age (Completed Years) <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  max={120}
                  value={member.age}
                  onChange={(e) => updateMember(index, "age", e.target.value)}
                  placeholder="e.g. 34"
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 placeholder-sage-600 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200">Gender</label>
                <select
                  value={member.gender}
                  onChange={(e) => updateMember(index, "gender", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other / Third Gender</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200">Relation to Head</label>
                <select
                  value={member.relationToHead}
                  onChange={(e) => updateMember(index, "relationToHead", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Head of Family">Head of Family</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Son / Daughter">Son / Daughter</option>
                  <option value="Father / Mother">Father / Mother</option>
                  <option value="Brother / Sister">Brother / Sister</option>
                  <option value="Grandchild">Grandchild</option>
                  <option value="Other Relative">Other Relative</option>
                </select>
              </div>
            </div>

            {/* Row 2: Marital, Language, Literacy, Occupation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-pink-400" /> Marital Status
                </label>
                <select
                  value={member.maritalStatus}
                  onChange={(e) => updateMember(index, "maritalStatus", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Currently Married">Currently Married</option>
                  <option value="Never Married">Never Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced / Separated">Divorced / Separated</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200 flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-emerald-400" /> Mother Tongue
                </label>
                <select
                  value={member.motherTongue}
                  onChange={(e) => updateMember(index, "motherTongue", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Hindi">Hindi</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Kannada">Kannada</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Odia">Odia</option>
                  <option value="Assamese">Assamese</option>
                  <option value="English">English</option>
                  <option value="Other Regional Dialect">Other Regional Dialect</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200 flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-saffron-400" /> Education Level
                </label>
                <select
                  value={member.literacyLevel}
                  onChange={(e) => updateMember(index, "literacyLevel", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Post Graduate / Doctorate">Post Graduate / Doctorate</option>
                  <option value="Graduate / Bachelor's Degree">Graduate / Bachelor's Degree</option>
                  <option value="Higher Secondary (12th)">Higher Secondary (12th)</option>
                  <option value="Secondary (10th)">Secondary (10th)</option>
                  <option value="Primary School">Primary School</option>
                  <option value="Literate without formal school">Literate without formal school</option>
                  <option value="Illiterate">Illiterate</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-sand-200 flex items-center gap-1">
                  <Briefcase className="w-3 h-3 text-blue-400" /> Occupation / Work
                </label>
                <select
                  value={member.occupation}
                  onChange={(e) => updateMember(index, "occupation", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-slate-700 text-xs text-sand-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Employed in Private Sector">Employed in Private Sector</option>
                  <option value="Government / PSU Service">Government / PSU Service</option>
                  <option value="Business / Self-Employed">Business / Self-Employed</option>
                  <option value="Cultivator / Farmer">Cultivator / Farmer</option>
                  <option value="Agricultural Labourer">Agricultural Labourer</option>
                  <option value="Student">Student</option>
                  <option value="Homemaker">Homemaker</option>
                  <option value="Retired / Senior">Retired / Senior</option>
                  <option value="Seeking Employment">Seeking Employment</option>
                </select>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Add Member CTA Button */}
      <button
        type="button"
        onClick={addMember}
        className="w-full py-3.5 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
      >
        <UserPlus className="w-4 h-4" /> Add Another Family Member
      </button>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sand-200 text-xs font-bold transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Housing
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!isFormValid}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed text-sand-50 text-xs font-bold transition-all shadow-glow-emerald flex items-center gap-2"
        >
          <span>Generate Digital Census ID & Card</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
