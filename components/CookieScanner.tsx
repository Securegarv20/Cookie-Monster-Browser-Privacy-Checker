"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CookieAnalyzer } from '@/lib/cookieAnalyzer';
import { ScanResults } from '@/types/cookies';
import { Cookie, Zap, Shield, AlertTriangle } from 'lucide-react';

interface CookieScannerProps {
  onScanCompleteAction: (results: ScanResults) => void;
  onStartScanAction: () => void;
  isScanning: boolean;
}

export function CookieScanner({ onScanCompleteAction, onStartScanAction, isScanning }: CookieScannerProps) {
  const [progress, setProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('');

  const handleScan = async () => {
    onStartScanAction();
    
    // Scanning phases
    const phases = [
      { phase: 'Cookie Detection', progress: 20 },
      { phase: 'Storage Analysis', progress: 40 },
      { phase: 'Security Audit', progress: 60 },
      { phase: 'Fingerprinting Check', progress: 80 },
      { phase: 'Threat Assessment', progress: 100 }
    ];
    
    for (const { phase, progress: phaseProgress } of phases) {
      setScanPhase(phase);
      await new Promise(resolve => setTimeout(resolve, 400));
      setProgress(phaseProgress);
    }
    
    // Perform the scan
    const results = CookieAnalyzer.analyzeCookies();
    
    setProgress(0);
    setScanPhase('');
    onScanCompleteAction(results);
  };

  const getPhaseIcon = () => {
    switch (scanPhase) {
      case 'Security Audit': return <Shield className="h-5 w-5 mr-2" />;
      case 'Threat Assessment': return <AlertTriangle className="h-5 w-5 mr-2" />;
      default: return <Cookie className="h-5 w-5 mr-2" />;
    }
  };

  const getPhaseMessage = () => {
    switch (scanPhase) {
      case 'Cookie Detection': return "Finding all the cookies... 🍪";
      case 'Storage Analysis': return "Checking browser storage... 📦";
      case 'Security Audit': return "Running security checks... 🔒";
      case 'Fingerprinting Check': return "Analyzing fingerprinting risk... 👆";
      case 'Threat Assessment': return "Assessing threats... ⚠️";
      default: return "Cookie Monster is munching through your cookies... 🍪";
    }
  };

  return (
    <div className="text-center space-y-6 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 border-4 border-blue-200 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-2 font-comic-sans">
            Advanced Cookie Security Scan
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Comprehensive analysis of cookies, trackers, and browser security
          </p>
        </div>

        {!isScanning ? (
          <Button 
            onClick={handleScan}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-8 py-3 md:py-4 text-lg md:text-xl rounded-xl font-bold transform hover:scale-105 transition-all duration-200 shadow-lg w-full max-w-md"
          >
            <Shield className="mr-3 h-6 w-6" />
            START SECURITY SCAN
            <Zap className="ml-3 h-6 w-6" />
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-lg md:text-xl font-comic-sans text-blue-700 flex items-center justify-center">
              {getPhaseIcon()}
              {getPhaseMessage()}
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden max-w-md mx-auto">
              <div 
                className="bg-gradient-to-r from-blue-500 to-yellow-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="text-sm md:text-base text-gray-500">
              {scanPhase && <div className="font-medium mb-1">{scanPhase}</div>}
              <div className="text-xs opacity-75">
                {progress < 30 ? "Initializing scanner..." : 
                 progress < 60 ? "Analyzing data..." : 
                 progress < 90 ? "Checking security..." : 
                 "Finalizing report..."}
              </div>
            </div>

            {/* Security badges */}
            {progress > 30 && (
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  🍪 Cookie Scan
                </span>
                {progress > 50 && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    🔍 Security Check
                  </span>
                )}
                {progress > 80 && (
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                    📊 Threat Analysis
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}