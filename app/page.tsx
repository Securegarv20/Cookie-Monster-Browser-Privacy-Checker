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
                <a
                  href="https://securegarv.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 hover:text-blue-600"
                >
                  Made by Garv Kamra
                </a>
              </div>
              
              {/* GitHub and LinkedIn links */}
              <div className="flex justify-center space-x-4 mt-2">
                <a
                  href="https://github.com/Securegarv20/Cookie-Monster-Browser-Privacy-Checker"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="GitHub repository"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/garvkamra/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
        </footer>
        )}
      </div>
    </>
  );
}
