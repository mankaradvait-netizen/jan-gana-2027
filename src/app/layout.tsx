import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JanGanaAssistant } from "@/components/chatbot/JanGanaAssistant";

export const metadata: Metadata = {
  title: "Jan-Gana 2027 | India's First 100% Digital Census Portal",
  description:
    "Official Digital Portal for Census 2027 by Registrar General & Census Commissioner, India. Complete self-enumeration, track state schedules, and verify facts with GenAI.",
  keywords: [
    "Census 2027",
    "Digital Census India",
    "Jan-Gana 2027",
    "Self-Enumeration Portal",
    "Census Schedule",
    "DPDP Act",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-obsidian-950 text-sand-50 min-h-screen flex flex-col antialiased selection:bg-saffron-500/30 selection:text-saffron-200">
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <JanGanaAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
