"use client";

import { useEffect, useState } from 'react';

interface CookieMonsterAnimationProps {
  isScanning: boolean;
  hasResults: boolean;
}

export function CookieMonsterAnimation({ isScanning, hasResults }: CookieMonsterAnimationProps) {
  const [cookiePosition, setCookiePosition] = useState(0);
  
  useEffect(() => {
    if (isScanning) {
      const interval = setInterval(() => {
        setCookiePosition(prev => (prev + 1) % 100);
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [isScanning]);

  if (!isScanning && !hasResults) {
    return (
      <div className="text-center py-8">
        <div className="relative inline-block">
          <div className="text-8xl animate-bounce">🍪</div>
          <div className="text-4xl absolute -bottom-2 -right-2 animate-pulse">👾</div>
        </div>
        <p className="text-lg text-blue-600 mt-4 font-comic-sans">
          "ME READY TO HUNT FOR COOKIES!"
        </p>
      </div>
    );
  }

  if (isScanning) {
    return (
      <div className="text-center py-8 relative overflow-hidden">
        <div className="relative h-20">
          {/* Cookie Monster */}
          <div className="text-6xl absolute left-1/2 top-0 transform -translate-x-1/2 animate-bounce">
            👾
          </div>
          
          {/* Moving cookies */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="text-4xl absolute top-2 animate-pulse"
              style={{
                left: `${(cookiePosition + i * 30) % 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              🍪
            </div>
          ))}
        </div>
        
        <div className="space-y-2 mt-4">
          <p className="text-lg text-blue-600 font-comic-sans animate-pulse">
            "OM NOM NOM... MUNCHING THROUGH COOKIES..."
          </p>
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (hasResults) {
    return (
      <div className="text-center py-8">
        <div className="relative inline-block">
          <div className="text-8xl">👾</div>
          <div className="text-2xl absolute -top-2 -right-2">✨</div>
          <div className="text-3xl absolute -bottom-2 -left-2">🍪</div>
        </div>
        <p className="text-lg text-green-600 mt-4 font-comic-sans">
          "SCAN COMPLETE! COOKIES ANALYZED!"
        </p>
      </div>
    );
  }

  return null;
}