export interface MythItem {
  id: string;
  category: 'Citizenship' | 'Taxation' | 'Data Privacy' | 'Aadhaar' | 'Field Enumeration' | 'Languages';
  claim: string;
  verdict: 'FALSE' | 'TRUE' | 'PARTIALLY_TRUE';
  shortVerdict: string;
  explanation: string;
  legalReference: string;
  source: string;
}

export const CENSUS_MYTHS: MythItem[] = [
  {
    id: "myth-1",
    category: "Citizenship",
    claim: "Census 2027 will ask citizens to prove their citizenship by producing birth certificates or parentage documents.",
    verdict: "FALSE",
    shortVerdict: "Completely False (Myth)",
    explanation: "Under the Census Act 1948, the decennial census is purely a statistical count of all ordinary residents in the territory of India regardless of nationality. No document, passport, or birth certificate of parents is required or checked during self-enumeration or field visits.",
    legalReference: "Census Act 1948, Section 8(1) & Census Rules 1990",
    source: "Office of the Registrar General & Census Commissioner, India (ORGI)"
  },
  {
    id: "myth-2",
    category: "Taxation",
    claim: "Information submitted about household assets (vehicles, laptops, air conditioners) will be shared with the Income Tax Department to levy new property taxes.",
    verdict: "FALSE",
    shortVerdict: "Strictly Prohibited by Law",
    explanation: "Section 15 of the Census Act, 1948 strictly prohibits sharing individual census records with any government department, tax authority, police, or judicial court. All census responses are treated as top-secret, non-admissible as evidence in courts, and aggregated solely for national planning.",
    legalReference: "Census Act 1948, Section 15 (Confidentiality of Census Records) & Section 15A",
    source: "Ministry of Home Affairs & DPDP Act 2023 Provisions"
  },
  {
    id: "myth-3",
    category: "Aadhaar",
    claim: "Self-enumeration online requires giving biometric fingerprint scans and mandatory Aadhaar authentication.",
    verdict: "PARTIALLY_TRUE",
    shortVerdict: "Voluntary OTP Verification Only",
    explanation: "Aadhaar is purely VOLUNTARY for self-enumeration. Citizens can choose mobile OTP or other standard government IDs. Biometrics (fingerprints or iris scans) are NEVER collected or required in Census 2027.",
    legalReference: "Aadhaar and Other Laws (Amendment) Act & Census Self-Enumeration Guidelines 2027",
    source: "UIDAI & ORGI Joint Gazette Notification"
  },
  {
    id: "myth-4",
    category: "Data Privacy",
    claim: "The digital census mobile app will access personal photos, contacts, and track live GPS coordinates continuously.",
    verdict: "FALSE",
    shortVerdict: "Technically False",
    explanation: "The official Jan-Gana 2027 portal and enumerator app adhere to zero-tracker security architecture governed by the Digital Personal Data Protection (DPDP) Act 2023. No background location, contact book, or media access permissions are requested or used. All data transmission is encrypted using AES-256 GCM.",
    legalReference: "Digital Personal Data Protection (DPDP) Act 2023 & CERT-In Security Clearance",
    source: "Ministry of Electronics & IT (MeitY)"
  },
  {
    id: "myth-5",
    category: "Field Enumeration",
    claim: "If you complete self-enumeration online, an enumerator will still come and ask all 31 questions again from scratch.",
    verdict: "FALSE",
    shortVerdict: "No Re-interview Needed",
    explanation: "Once you complete digital self-enumeration, you receive a 12-digit Census ID and QR Code. When the official enumerator visits, they simply scan your QR code or enter your ID to verify the geocoded building location in under 30 seconds. No repeated question survey will occur.",
    legalReference: "Standard Operating Procedure for Digital Census 2027, Rule 4B",
    source: "Directorate of Census Operations"
  },
  {
    id: "myth-6",
    category: "Languages",
    claim: "Mother tongue can only be selected from the 22 Eighth Schedule languages, and dialects will not be recorded.",
    verdict: "FALSE",
    shortVerdict: "All Dialects & Languages Allowed",
    explanation: "Citizens can declare any language or dialect as their mother tongue freely. The Census 2027 engine supports recording over 19,500 linguistic mother tongues and dialect variations, which are subsequently classified into linguistic families.",
    legalReference: "Census Schedule Q8 (Mother Tongue & Other Languages Known)",
    source: "Language Division, ORGI"
  }
];
