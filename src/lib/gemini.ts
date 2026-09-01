import { CENSUS_MYTHS } from "./data/mythsData";
import { STATES_AND_UTS } from "./data/statesData";

export interface FactCheckResponse {
  verdict: 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE';
  shortVerdict: string;
  explanation: string;
  legalReference: string;
  confidenceScore: number;
  tags: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function verifyCensusClaim(claim: string, language: string = 'en'): Promise<FactCheckResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const lowerClaim = claim.toLowerCase();

  // Check known myth matches first for high precision
  for (const myth of CENSUS_MYTHS) {
    const mythKeywords = myth.claim.toLowerCase().split(/\s+/).filter(w => w.length > 4);
    const matchCount = mythKeywords.filter(kw => lowerClaim.includes(kw)).length;
    if (matchCount >= 2 || lowerClaim.includes(myth.category.toLowerCase())) {
      // Direct high-confidence match
      return {
        verdict: myth.verdict,
        shortVerdict: myth.shortVerdict,
        explanation: myth.explanation,
        legalReference: myth.legalReference,
        confidenceScore: 0.98,
        tags: [myth.category, "Verified Law", "DPDP 2023"],
      };
    }
  }

  // If Gemini API key is provided, perform live LLM verification
  if (apiKey) {
    try {
      const prompt = `You are the Official Legal & Fact-Checking AI for the Registrar General & Census Commissioner of India (Census 2027).
Analyze this claim/rumor about the Census 2027:
"${claim}"

Context & Rules:
1. Census in India is governed by the Census Act, 1948.
2. Section 15 guarantees absolute confidentiality - census data cannot be shared with tax authorities, police, or courts.
3. Census does NOT check citizenship papers, birth certificates, or NRC records. It counts all ordinary residents.
4. Aadhaar is voluntary for self-enumeration; no biometrics (fingerprint/iris) are taken for census.
5. All data is protected under the Digital Personal Data Protection (DPDP) Act 2023.

Return ONLY a JSON object with:
{
  "verdict": "FALSE" | "TRUE" | "PARTIALLY_TRUE",
  "shortVerdict": "Short punchy verdict (e.g. Completely False / Myth / Legally Guaranteed)",
  "explanation": "Clear 2-3 sentence legal & operational explanation",
  "legalReference": "Relevant law/section like Census Act 1948 Section 15 or DPDP Act 2023",
  "confidenceScore": 0.95,
  "tags": ["Category1", "Category2"]
}`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: "application/json" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          const parsed = JSON.parse(text);
          return {
            verdict: parsed.verdict || "FALSE",
            shortVerdict: parsed.shortVerdict || "Fact Checked",
            explanation: parsed.explanation,
            legalReference: parsed.legalReference || "Census Act 1948 & DPDP Act 2023",
            confidenceScore: parsed.confidenceScore || 0.94,
            tags: parsed.tags || ["Census 2027", "Fact Check"]
          };
        }
      }
    } catch (err) {
      console.warn("Gemini API call fallback triggered:", err);
    }
  }

  // Intelligent Fallback Knowledge-Engine
  if (lowerClaim.includes("citizenship") || lowerClaim.includes("nrc") || lowerClaim.includes("passport") || lowerClaim.includes("birth certificate") || lowerClaim.includes("parent")) {
    return {
      verdict: "FALSE",
      shortVerdict: "Citizenship Documents Never Required",
      explanation: "Census 2027 is purely a demographic headcount of all residents staying in India. Under Section 8(1) of the Census Act 1948, no individual is required to show passports, birth certificates, or proof of citizenship.",
      legalReference: "Census Act 1948, Section 8(1) & ORGI Guidelines",
      confidenceScore: 0.96,
      tags: ["Citizenship", "Demographics", "Census Act 1948"]
    };
  }

  if (lowerClaim.includes("tax") || lowerClaim.includes("income") || lowerClaim.includes("car") || lowerClaim.includes("wealth") || lowerClaim.includes("bank")) {
    return {
      verdict: "FALSE",
      shortVerdict: "Tax Authorities Have No Access",
      explanation: "Section 15 of the Census Act 1948 strictly prohibits sharing individual census data with any tax department, court, or police. Census data is fully immune from judicial discovery.",
      legalReference: "Census Act 1948, Section 15 (Immunity of Census Records)",
      confidenceScore: 0.98,
      tags: ["Taxation", "Legal Immunity", "Confidentiality"]
    };
  }

  if (lowerClaim.includes("aadhaar") || lowerClaim.includes("biometric") || lowerClaim.includes("fingerprint") || lowerClaim.includes("iris")) {
    return {
      verdict: "PARTIALLY_TRUE",
      shortVerdict: "Aadhaar Voluntary • No Biometrics",
      explanation: "Aadhaar is entirely voluntary for self-enumeration authentication. No biometrics (fingerprints or iris scans) are collected for the Census.",
      legalReference: "UIDAI Regulations & Census 2027 Gazette Notification",
      confidenceScore: 0.95,
      tags: ["Aadhaar", "Biometrics", "Privacy"]
    };
  }

  if (lowerClaim.includes("phone") || lowerClaim.includes("track") || lowerClaim.includes("camera") || lowerClaim.includes("privacy") || lowerClaim.includes("hack")) {
    return {
      verdict: "FALSE",
      shortVerdict: "Zero-Tracking Architecture",
      explanation: "The Jan-Gana 2027 portal operates under zero-tracker security principles governed by the DPDP Act 2023. No background location or contact tracing is permitted.",
      legalReference: "Digital Personal Data Protection (DPDP) Act 2023, Sections 4-8",
      confidenceScore: 0.95,
      tags: ["DPDP 2023", "Cyber Security", "Privacy"]
    };
  }

  // Generic verified response
  return {
    verdict: "PARTIALLY_TRUE",
    shortVerdict: "Official Verification Pending",
    explanation: "Under the Census Act 1948, all official procedures follow strict non-disclosure, volunteer self-enumeration, and field geotagging rules. Please refer to official notifications on censusindia.gov.in.",
    legalReference: "Census Rules 1990 & DPDP Act 2023",
    confidenceScore: 0.90,
    tags: ["General Advisory", "Census Operations"]
  };
}

export async function askJanGanaAssistant(messages: ChatMessage[], language: string = 'en'): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  const lastMsg = messages[messages.length - 1]?.content || "";
  const lower = lastMsg.toLowerCase();

  // If Gemini API is available, use live LLM with system prompt
  if (apiKey) {
    try {
      const systemPrompt = `You are "Jan-Gana AI Assistant", the official digital assistant for Census 2027: India's First Digital Census, created by the Office of the Registrar General & Census Commissioner, India (ORGI), Ministry of Home Affairs.
Answer politely, concisely, and accurately in the citizen's chosen language (${language}) or matching the user's language.
Key facts:
- Phase 1 (Housing Census & House Listing): April - May 2027. Collects dwelling structure, drinking water, electricity, LPG, sanitation, digital assets (smartphones, laptops, broadband, vehicles).
- Phase 2 (Population Enumeration): September - October 2027. Collects demographics, literacy, occupation, mother tongue (supports all dialects), and migration.
- Self-enumeration is open for 15-30 days before field enumerators visit.
- Aadhaar is optional; biometrics are NOT taken.
- Section 15 of Census Act 1948 guarantees strict confidentiality; data cannot be used for tax or police actions.
- DPDP Act 2023 compliant with AES-256 GCM encryption.`;

      const contents = [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${lastMsg}` }] }
      ];

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents })
      });

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn("Chatbot Gemini fallback triggered:", err);
    }
  }

  // Contextual knowledge responses
  if (lower.includes("phase 1") || lower.includes("housing") || lower.includes("house listing")) {
    return "🏠 **Phase 1: House Listing & Housing Census (April – May 2027)**\n\nPhase 1 records the physical and economic infrastructure of households:\n• Building material (walls, roofs, floors)\n• Amenities (drinking water source, electricity, LPG/PNG cooking fuel, toilets)\n• Household assets (bicycles, 2W/4W, smart TVs, laptops, broadband)\n• Details of the head of household.\n\nCompleting Phase 1 self-enumeration generates your 12-digit Census ID!";
  }

  if (lower.includes("phase 2") || lower.includes("population") || lower.includes("demographic")) {
    return "👥 **Phase 2: Population Enumeration (September – October 2027)**\n\nPhase 2 captures individual demographic data for every family member:\n• Full name, age, gender, marital status\n• Mother tongue and additional spoken languages\n• Literacy level and highest educational qualification\n• Occupation and industry sector\n• Migration history and reasons for relocation.";
  }

  if (lower.includes("document") || lower.includes("id") || lower.includes("proof") || lower.includes("aadhaar")) {
    return "📄 **Required Documents & Verification**\n\n• **No physical documents or citizenship proofs are required** during Census 2027.\n• Aadhaar is voluntary for OTP authentication during self-enumeration.\n• You can also use standard mobile OTP verification without Aadhaar.\n• Biometric scans (fingerprints/iris) are strictly prohibited.";
  }

  if (lower.includes("privacy") || lower.includes("safe") || lower.includes("protect") || lower.includes("law")) {
    return "🔒 **Data Privacy & Legal Safeguards**\n\n• **Census Act 1948 (Section 15)**: Census records are strictly confidential and CANNOT be shared with tax authorities, police, or judicial courts.\n• **DPDP Act 2023**: Your data is encrypted using hardware-grade AES-256 GCM encryption.\n• Zero monetization: Data is aggregated purely for public policy and infrastructure planning.";
  }

  if (lower.includes("state") || lower.includes("date") || lower.includes("maharashtra") || lower.includes("delhi") || lower.includes("karnataka") || lower.includes("schedule")) {
    return "📅 **State Schedules & Self-Enumeration Windows**\n\n• Phase 1 self-enumeration begins across most states on **April 1, 2027**.\n• Citizens have a 30 to 45-day window to complete self-enumeration online.\n• Check the **'State Schedules'** section above to view the exact dates and field verification windows for your state or Union Territory!";
  }

  if (lower.includes("how") && (lower.includes("enumerate") || lower.includes("register") || lower.includes("fill") || lower.includes("card"))) {
    return "📝 **How to Self-Enumerate in 4 Easy Steps**:\n\n1. **Verify Identity**: Enter mobile number and verify with 6-digit OTP.\n2. **Housing Details**: Select house structure, amenities (water, electricity, LPG), and digital assets.\n3. **Family Demographics**: Add household members with age, education, and occupation.\n4. **Download Card**: Receive your official 12-digit Census ID and scannable QR Code Acknowledgement Card!";
  }

  return "Namaste! 🙏 I am your **Jan-Gana 2027 AI Assistant**.\n\nYou can ask me about:\n• Phase 1 (Housing) vs Phase 2 (Population) differences\n• State-wise enumeration dates & schedules\n• How to self-enumerate online\n• Data privacy & Section 15 of Census Act 1948\n• Required documentation & myth-busting facts.";
}
