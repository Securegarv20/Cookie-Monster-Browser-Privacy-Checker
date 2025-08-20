"use client";

import { useState, useEffect } from "react";
import { DisclaimerModal } from "@/components/DisclaimerModal";
import { CookieScanner } from "@/components/CookieScanner";
import { CookieResults } from "@/components/CookieResults";
import { CookieMonsterHeader } from "@/components/CookieMonsterHeader";
import { CookieMonsterAnimation } from "@/components/CookieMonsterAnimation";
import { SecurityTipsCarousel } from "@/components/SecurityTipsCarousel";
import { InteractiveEducation } from "@/components/InteractiveEducation";
import { ScanResults } from "@/types/cookies";
import Link from "next/link";

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [scanResults, setScanResults] = useState<ScanResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  // Cookie crumb positions (to avoid SSR hydration mismatch)
  const [crumbs, setCrumbs] = useState<
    { left: string; top: string; delay: string }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 2}s`,
    }));
    setCrumbs(generated);
  }, []);

  const handleAcceptDisclaimer = () => {
    setHasAccepted(true);
    setShowDisclaimer(false);
  };

  const handleDeclineDisclaimer = () => {
    alert(
      "Cookie Monster understands! Come back anytime when you're ready to learn about cookie safety! 🍪👋"
    );
    window.location.href = "about:blank";
  };

  const handleScanComplete = (results: ScanResults) => {
    setScanResults(results);
    setIsScanning(false);
    setShowTips(true);
    setShowEducation(true);
  };

  const handleStartScan = () => {
    setIsScanning(true);
    setScanResults(null);
    setShowTips(false);
  };

  const handleReset = () => {
    setScanResults(null);
    setIsScanning(false);
    setShowTips(false);
    setShowEducation(false);
  };

  return (
    <>
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAcceptAction={handleAcceptDisclaimer}
        onDeclineAction={handleDeclineDisclaimer}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100 relative overflow-hidden">
        {/* Cookie crumbs background */}
        <div className="fixed inset-0 pointer-events-none">
          {crumbs.map((crumb, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-20 animate-pulse"
              style={{
                left: crumb.left,
                top: crumb.top,
                animationDelay: crumb.delay,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8">
          {hasAccepted && <CookieMonsterHeader />}

          {hasAccepted && (
            <div className="max-w-4xl mx-auto space-y-8">
              {/* Cookie Monster Animation */}
              <CookieMonsterAnimation
                isScanning={isScanning}
                hasResults={!!scanResults}
              />

              {/* Cookie Scanner */}
              <CookieScanner
                onScanCompleteAction={handleScanComplete}
                onStartScanAction={handleStartScan}
                isScanning={isScanning}
              />

              {/* Educational Content - Show before scanning */}
              {!scanResults && !isScanning && (
                <>
                  <InteractiveEducation />
                  <SecurityTipsCarousel />
                </>
              )}

              {/* Results */}
              {scanResults && (
                <CookieResults results={scanResults} onResetAction={handleReset} />
              )}

              {/* Educational Content - Show after scanning too */}
              {showEducation && scanResults && (
                <>
                  <InteractiveEducation />
                  <SecurityTipsCarousel />
                </>
              )}
            </div>
          )}
        </div>

        {/* Minimal Footer */}
        {hasAccepted && (
          <footer className="py-4 border-t border-gray-100 mt-5 text-center">
            <div className="container mx-auto px-4">
              <div className="text-xs text-gray-500">
                © {new Date().getFullYear()} Cookie Monster Privacy Checker •
                <Link
                  href="https://www.linkedin.com/in/garvkamra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 hover:text-blue-600"
                >
                  Made by Garv Kamra
                </Link>
              </div>
            </div>
          </footer>
        )}
      </div>
    </>
  );
}
