import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center space-y-6 px-4">
      {/* Glowing Emblem Skeleton */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-emerald-500 p-0.5 animate-pulse shadow-glow-saffron">
        <div className="w-full h-full bg-obsidian-900 rounded-[14px] flex items-center justify-center text-2xl">
          🇮🇳
        </div>
      </div>

      <div className="text-center space-y-2 max-w-sm">
        <h2 className="text-xl font-bold font-display text-sand-50">
          Jan-Gana 2027 Portal
        </h2>
        <p className="text-xs text-sage-400">
          Initializing secure cryptographic environment and loading state schedules...
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-obsidian-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-saffron-500 to-emerald-500 animate-[pulse_1s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
