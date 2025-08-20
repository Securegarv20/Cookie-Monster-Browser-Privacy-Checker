"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Shield, Eye, X } from "lucide-react";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAcceptAction: () => void;
  onDeclineAction: () => void;
}

export function DisclaimerModal({ isOpen, onAcceptAction, onDeclineAction }: DisclaimerModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAccept = () => {
    localStorage.setItem("cookieMonsterConsent", "true");
    onAcceptAction();
  };

  const handleDecline = () => {
    localStorage.removeItem("cookieMonsterConsent");
    onDeclineAction();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="max-w-lg w-full my-auto">
        <Card className="rounded-2xl shadow-2xl border border-gray-200 bg-white mx-auto">
          <CardHeader className="text-center space-y-2 p-4 sm:p-6">
            <div className="text-4xl sm:text-6xl">🍪⚠️</div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Cookie Monster Privacy Notice
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 p-4 sm:p-6 sm:space-y-5">
            {/* Yellow Section */}
            <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    What Cookie Monster Will Do
                  </h3>
                  <ul className="text-yellow-700 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                    <li>• Read your browser cookies</li>
                    <li>• Scan your localStorage for stored data</li>
                    <li>• Analyze cookies for trackers & risks</li>
                    <li>• Generate a browser fingerprint</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Blue Section */}
            <div className="bg-blue-50 border border-blue-300 rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Your Privacy is Safe
                  </h3>
                  <ul className="text-blue-700 text-xs sm:text-sm space-y-0.5 sm:space-y-1">
                    <li>• Analysis happens locally in your browser</li>
                    <li>• No data is sent to servers</li>
                    <li>• Cookie Monster only reads, never changes</li>
                    <li>• You can clear cookies anytime</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Green Section */}
            <div className="bg-green-50 border border-green-300 rounded-xl p-3 sm:p-4">
              <div className="flex items-start gap-2 sm:gap-3">
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-0.5 sm:mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    Educational Purpose
                  </h3>
                  <p className="text-green-700 text-xs sm:text-sm">
                    This tool helps you learn about cookies and browser
                    security. Cookie Monster only teaches 🍪📚
                  </p>
                </div>
              </div>
            </div>

            {/* Fun Quote */}
            <div className="text-center bg-blue-100 rounded-xl p-3 sm:p-4">
              <p className="text-sm sm:text-base font-semibold text-blue-800">
                "ME PROMISE TO BE GOOD COOKIE MONSTER! 🍪👾"
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 sm:gap-3 justify-center">
              <Button
                onClick={handleAccept}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 sm:px-6 sm:py-3 font-bold w-full"
              >
                <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                ME TRUST COOKIE MONSTER!
              </Button>
              <Button
                onClick={handleDecline}
                variant="destructive"
                className="px-4 py-2 sm:px-6 sm:py-3 font-bold w-full"
              >
                <X className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                NO THANKS
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-2 sm:mt-0">
              By clicking, you consent to local browser analysis for educational
              purposes.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}