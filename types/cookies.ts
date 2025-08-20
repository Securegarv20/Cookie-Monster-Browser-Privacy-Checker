export interface Cookie {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string;
  isThirdParty?: boolean;
  isTracker?: boolean;
  category: 'tracker' | 'functional' | 'analytics' | 'advertising' | 'unknown';
  riskLevel?: 'low' | 'medium' | 'high';
}

export interface LocalStorageItem {
  key: string;
  value: string;
  size: number;
  isTracker?: boolean;
  containsPII?: boolean;
}

export interface ScanResults {
  cookies: Cookie[];
  localStorage: LocalStorageItem[];
  trackers: Cookie[];
  thirdPartyCookies: Cookie[];
  totalSize: number;
  scanTime: number;
  privacyScore: number;
  securityScore: number;
  vulnerabilities: SecurityVulnerability[];
  fingerprinting: FingerprintingData;
  sessionSecurity: SessionSecurityInfo;
  recommendations: SecurityRecommendation[];
  // Optional enhanced fields
  monsterMessage?: string;
   enhancedData: {
    highRiskCookies: Cookie[];
    sessionStorage: LocalStorageItem[];
    cookieSecurity: any;
    localStorageRisk: any;
    sessionStorageRisk: any;
    browserHardening: any;
    networkSecurity: any;
    threatIntelligence: any;
    threatLevel: 'low' | 'medium' | 'high';
  };
}

export interface TrackerInfo {
  domain: string;
  name: string;
  category: string;
  description: string;
}

export type SecurityVulnerability = {
  type: 
    | "insecure-cookie"
    | "xss-risk"
    | "csrf-risk"
    | "session-fixation"
    | "data-exposure"
    | "weak-encryption"
    | "malicious"           // <-- add this
    | "cryptojacking";      // <-- add this
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  cookieName?: string;
  recommendation: string;
  learnMore?: string;
};

export interface FingerprintingData {
  browserFingerprint: string;
  screenResolution: string;
  timezone: string;
  language: string;
  platform: string;
  cookiesEnabled: boolean;
  doNotTrack: boolean;
  fingerprintingRisk: 'low' | 'medium' | 'high';
  canvasFingerprint?: string;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  riskFactors?: number;
}

export interface SessionSecurityInfo {
  hasSecureCookies: boolean;
  hasHttpOnlyCookies: boolean;
  hasSameSiteCookies: boolean;
  sessionCookieCount: number;
  persistentCookieCount: number;
  secureCookieCount: number;       
  httpOnlyCookieCount: number;      
  sameSiteCookieCount: number;      
  securityRating: 'poor' | 'fair' | 'good' | 'excellent';
  securityScore?: number; 
}

export interface SecurityRecommendation {
  category: 'cookies' | 'browser' | 'privacy' | 'security';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  action: string;
  monsterMessage: string;
}