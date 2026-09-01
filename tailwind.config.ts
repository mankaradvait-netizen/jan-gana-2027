import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F12",
        obsidian: {
          950: "#070A0C",
          900: "#0B0F12",
          850: "#0F1419",
          800: "#12181F",
          700: "#1A232D",
          600: "#24303E",
        },
        saffron: {
          400: "#FF7043",
          500: "#FF5722",
          600: "#E65100",
          700: "#BF360C",
          glow: "rgba(255, 87, 34, 0.35)",
        },
        emerald: {
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          glow: "rgba(16, 185, 129, 0.35)",
        },
        sand: {
          50: "#FAFAF8",
          100: "#F4F4F0",
          200: "#E8E8E0",
          300: "#D3D3C7",
        },
        sage: {
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(to right, rgba(255, 87, 34, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        "glow-saffron": "0 0 25px -5px rgba(255, 87, 34, 0.4)",
        "glow-emerald": "0 0 25px -5px rgba(16, 185, 129, 0.4)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-elevated": "0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 20px 0 rgba(255, 87, 34, 0.15)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-breathe": "glowBreathe 3s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glowBreathe: {
          "0%": { boxShadow: "0 0 15px -3px rgba(255, 87, 34, 0.3)" },
          "100%": { boxShadow: "0 0 30px 2px rgba(16, 185, 129, 0.4)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
