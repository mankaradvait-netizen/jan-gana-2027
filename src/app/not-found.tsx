import React from "react";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian-950 flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-saffron-500/20 text-saffron-400 flex items-center justify-center border border-saffron-500/40 shadow-glow-saffron">
        <FileQuestion className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono font-bold text-saffron-400 uppercase tracking-widest">
          Error 404
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-sand-50">
          Census Document Not Found
        </h2>
        <p className="text-xs text-sage-400">
          The requested page or census schedule record does not exist on the Jan-Gana 2027 portal.
        </p>
      </div>

      <a
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-500 text-sand-50 text-xs font-bold transition-all shadow-glow-saffron flex items-center gap-2"
      >
        <Home className="w-4 h-4" /> Back to Jan-Gana 2027 Portal
      </a>
    </div>
  );
}
