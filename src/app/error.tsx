"use client";

import React from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/40 shadow-lg">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold font-display text-sand-50">
          Something went wrong
        </h2>
        <p className="text-xs text-sage-400">
          An unexpected error occurred while processing census state records. Your data remains protected and secure.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 text-sand-50 text-xs font-bold transition-all shadow-glow-saffron flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Try Again
        </button>

        <a
          href="/"
          className="px-5 py-2.5 rounded-xl bg-obsidian-800 hover:bg-slate-800 text-sand-200 text-xs font-semibold border border-slate-700 transition-all flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Return Home
        </a>
      </div>
    </div>
  );
}
