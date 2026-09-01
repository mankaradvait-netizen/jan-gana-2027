# Jan-Gana 2027: India's First 100% Digital Census Portal 🇮🇳

> **Google for Developers & ADYPU Hackathon Challenge**
> Production-ready, highly interactive GenAI-powered web application for Census 2027.

---

## 🎨 UI/UX & Color Theme
- **Background**: Deep Charcoal (`#0B0F12`) and Dark Obsidian Slate (`#12181F`).
- **Primary Accent**: Vibrant Warm Saffron / Burnt Terracotta (`#FF5722` / `#E65100`).
- **Secondary Accent**: Glowing Cyber Emerald (`#10B981` / `#059669`).
- **Text & Elements**: Soft Cream Sand (`#F4F4F0`) and Muted Sage (`#9CA3AF`).
- **Aesthetic**: Modern dark mode dashboard with frosted glass cards (`backdrop-blur-md`), glowing borders, smooth hover dynamics, and fluid transitions.

---

## 🚀 Core Functional Modules

### 1. Master Header & Global Navigation
- **Branding**: "Jan-Gana 2027" (Digital Census Portal / डिजिटल जनगणना २०२७).
- **10-Language Switcher**: Instant switching between English, हिन्दी (Hindi), मराठी (Marathi), বাংলা (Bengali), தமிழ் (Tamil), తెలుగు (Telugu), ગુજરાતી (Gujarati), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), and ਪੰਜਾਬੀ (Punjabi).
- **Live Countdown Timer**: Real-time ticking countdown to National Self-Enumeration Launch (April 1, 2027).
- **Live Status Ribbon**: Active self-enumeration trial badge with DPDP Act 2023 compliance mark.

### 2. Two-Phase Operational Breakdown (Phase 1 vs. Phase 2)
- Interactive side-by-side comparison & split cards:
  - **Phase 1 (House Listing & Housing Census)**: Building structural materials, drinking water, electricity, clean cooking fuel (LPG/PNG), toilets, digital assets, vehicles, and head of family.
  - **Phase 2 (Population Enumeration)**: Demographics, literacy level, occupation, mother tongue dialects, and migration drivers.
- **Interactive 31-Questions Explorer**: Searchable and filterable schedule of all 31 official census questions.

### 3. Pan-India State-Wise Schedule Tracker
- Complete dataset covering all **28 States and 8 Union Territories**.
- Filter by Region / Zone (`North`, `South`, `East`, `West`, `Central`, `North-East`) and Status (`Active Phase 1`, `Active Phase 2`, `Upcoming`, `Completed`).
- Modal drilldown for projected population (2027), literacy rate, and gender sex ratio.

### 4. 4-Step Interactive Citizen Self-Enumeration Simulator
- **Step 1: Identity & Verification**: Masked Aadhaar / Mobile number input with real-time OTP countdown and auto-fill simulation.
- **Step 2: Housing Infrastructure**: Multi-select dwelling type (Pucca/Semi-Pucca/Kutcha), water, power, LPG, and assets (smartphones, broadband, laptops).
- **Step 3: Family Demographic Roster**: Dynamic member roster with real-time field validation.
- **Step 4: Unique Census ID & Official Card**: Generates a 12-digit public tracking ID (e.g., `IND-2027-MH-849201`), scannable QR Code, printable **Digital Census Acknowledgement Card**, and celebratory confetti explosion.

### 5. Data Privacy & Anti-Misinformation Hub
- **DPDP Act 2023 & Section 15 of Census Act 1948**: Absolute legal shield against tax audits, police inquiries, and court discovery.
- **GenAI Fact-Checker Widget**: Live input box powered by Gemini AI to evaluate any rumor or forward with official legal verdicts and citations.
- **Top Curated Rumors Accordion**: Explains citizenship verification myths, property taxation fears, and privacy safeguards.

### 6. Dynamic Census Data Visualization & Analytics
- Built using **Recharts**:
  - Population Growth & Gender Ratio Trends (1951 - 2027 Projections).
  - Urban vs Rural Demographic Split (Custom Donut chart).
  - State-wise Literacy Rate Projections for 2027.
  - Household Amenities & Infrastructure Transformation (2011 vs 2027).

### 7. Jan-Gana AI Assistant (Floating Chatbot)
- Multilingual conversational chatbot powered by Gemini API with resilient built-in knowledge base.
- Pre-populated quick question pills for instant answers.

---

## 🛠️ Tech Stack & Database Architecture

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion, Lucide Icons, Recharts, Canvas-Confetti, QRCode.react.
- **Backend API Routes**:
  - `POST /api/census/register-household`: Save Phase 1 data and return generated `censusId`.
  - `POST /api/census/add-members`: Bulk insert family members linked to `censusId`.
  - `GET /api/states/schedule`: Filter live state enumeration dates.
  - `POST /api/ai/fact-check`: Verify rumors and log claims with AI.
  - `POST /api/ai/chat`: Jan-Gana AI conversational assistant.
- **Database**: PostgreSQL (Supabase / Neon DB) with **Prisma ORM** models (`User`, `Household`, `Member`, `StateSchedule`, `MisinformationClaim`) + in-memory resilient fallback store for zero-config local development.

---

## 🏃 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```
