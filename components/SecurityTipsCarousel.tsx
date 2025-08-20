"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Lightbulb, RefreshCw } from 'lucide-react';

interface SecurityTip {
  title: string;
  description: string;
  monsterMessage: string;
  category: string;
  icon: string;
}

const SECURITY_TIPS: SecurityTip[] = [
  {
    title: "Use Strong, Unique Passwords",
    description: "Create complex passwords with at least 12 characters including uppercase, lowercase, numbers, and symbols. Never reuse passwords across accounts.",
    monsterMessage: "Strong passwords protect your accounts better than a locked cookie jar! 🔐",
    category: "Authentication",
    icon: "🔑"
  },
  {
    title: "Enable Two-Factor Authentication",
    description: "Add an extra security layer by requiring a code from your phone or authenticator app when logging in.",
    monsterMessage: "Two locks are better than one - double the protection! 📱🔒",
    category: "Authentication",
    icon: "📱"
  },
  {
    title: "Keep Software Updated",
    description: "Enable automatic updates for your OS, browsers, and apps. Security patches fix vulnerabilities that hackers exploit.",
    monsterMessage: "Fresh software means fresh security - old versions have known weaknesses! ⚡",
    category: "System Security",
    icon: "🔄"
  },
  {
    title: "Use HTTPS Websites",
    description: "Look for the lock icon in your browser's address bar. HTTPS encrypts your data so others can't intercept it.",
    monsterMessage: "HTTPS keeps your data safe during transmission - no eavesdropping! 🔒",
    category: "Web Security",
    icon: "🔐"
  },
  {
    title: "Be Careful with Public Wi-Fi",
    description: "Public Wi-Fi is unsecured - avoid banking or sensitive activities. Use a VPN to encrypt your connection.",
    monsterMessage: "Public Wi-Fi is like shouting your secrets - use a VPN for privacy! 📡",
    category: "Network Security",
    icon: "📶"
  },
  {
    title: "Regular Data Backups",
    description: "Use the 3-2-1 rule: 3 copies of data, 2 different media types, 1 offsite backup. Protects against ransomware and hardware failure.",
    monsterMessage: "Multiple backups mean you never lose important data! 💾",
    category: "Data Protection",
    icon: "💾"
  },
  {
    title: "Phishing Email Awareness",
    description: "Verify sender identity before clicking links or downloading attachments. Legitimate companies won't ask for passwords via email.",
    monsterMessage: "If an email smells fishy, it probably is - verify before you click! 🎣",
    category: "Email Security",
    icon: "📧"
  },
  {
    title: "Use Privacy-Focused Browsers",
    description: "Browsers like Firefox, Brave, or Safari offer better privacy protection with built-in tracker blocking and enhanced security features.",
    monsterMessage: "Privacy browsers keep your browsing habits private! 🔍",
    category: "Privacy",
    icon: "🌐"
  }
];

export function SecurityTipsCarousel() {
  const [currentTip, setCurrentTip] = useState(0);
  const [randomTip, setRandomTip] = useState<SecurityTip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % SECURITY_TIPS.length);
  };

  const prevTip = () => {
    setCurrentTip((prev) => (prev - 1 + SECURITY_TIPS.length) % SECURITY_TIPS.length);
  };

  const getRandomTip = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const randomIndex = Math.floor(Math.random() * SECURITY_TIPS.length);
    setRandomTip(SECURITY_TIPS[randomIndex]);
    setIsLoading(false);
  };

  useEffect(() => {
    getRandomTip();
  }, []);

  const tip = SECURITY_TIPS[currentTip];

  return (
    <div className="space-y-6">
      {/* Carousel */}
      <Card className="border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-purple-800 flex items-center gap-2">
              <Lightbulb className="h-6 w-6" />
              Cookie Monster's Security Academy
            </h3>
            <div className="flex gap-2">
              <Button onClick={prevTip} variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button onClick={nextTip} variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-200">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{tip.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-purple-800">{tip.title}</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                    {tip.category}
                  </span>
                </div>
                <p className="text-gray-700 mb-3">{tip.description}</p>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                  <p className="text-blue-800 font-comic-sans italic">
                    "{tip.monsterMessage}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              {SECURITY_TIPS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTip(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTip ? 'bg-purple-600' : 'bg-purple-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Random Tip of the Day */}
      <Card className="border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
              🎲 Random Security Tip
            </h3>
            <Button 
              onClick={getRandomTip} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              New Tip
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-4xl animate-bounce mb-4">🍪</div>
              <p className="text-orange-700 font-comic-sans">
                Cookie Monster is thinking of a good tip...
              </p>
            </div>
          ) : randomTip ? (
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{randomTip.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-orange-800 mb-2">{randomTip.title}</h4>
                  <p className="text-gray-700 mb-3">{randomTip.description}</p>
                  <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded">
                    <p className="text-orange-800 font-comic-sans italic">
                      "{randomTip.monsterMessage}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}