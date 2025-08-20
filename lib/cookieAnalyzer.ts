import { Cookie, LocalStorageItem, ScanResults, SecurityVulnerability, FingerprintingData, SessionSecurityInfo, SecurityRecommendation } from '@/types/cookies';

// Enhanced tracker domains and patterns
const TRACKER_DOMAINS = [
  'google-analytics.com', 'googletagmanager.com', 'facebook.com', 'doubleclick.net',
  'googlesyndication.com', 'amazon-adsystem.com', 'adsystem.amazon.com', 'scorecardresearch.com',
  'quantserve.com', 'outbrain.com', 'taboola.com', 'hotjar.com', 'mixpanel.com', 'segment.com',
  'intercom.io', 'twitter.com', 'linkedin.com', 'pinterest.com', 'tiktok.com', 'snapchat.com',
  'bing.com', 'yandex.com', 'baidu.com', 'adnxs.com', 'criteo.com', 'rubiconproject.com'
];

const TRACKER_PATTERNS = [
  /_ga/, /_gid/, /_gat/, /_gac_/, /_gcl/,
  /fbp/, /fbc/, /_fbp/, /tr_/, /fr_/,
  /__utm/, /utm_/, /gclid/, /dclid/,
  /_hjid/, /_hjSession/, /_hjAbsoluteSessionInProgress/,
  /mp_/, /amplitude_/, /mixpanel/,
  /_dc_gtm_/, /gtm_/, /ga_/,
  /IDE/, /DSID/, /NID/, /SID/, /HSID/, /SSID/, /APISID/, /SAPISID/,
  /personalization_id/, /guest_id/, /ct0/, /muc_ads/,
  /_pin_/, /_pinterest_/, /_rdt/,
  /li_/, /lang/, /bcookie/, /bscookie/,
  /_scid/, /_sctr/, /_derived_epik/,
  /optimizely/, /vuid/, /_vwo_/, /_vis_opt/
];

// Security patterns
const SECURITY_PATTERNS = {
  sessionTokens: [/JSESSIONID/, /PHPSESSID/, /ASP\.NET_SessionId/, /session/, /sess/i, /sid/i],
  authTokens: [/auth/, /token/, /jwt/, /bearer/i, /access/, /refresh/, /oauth/, /identity/, /credential/i],
  personalData: [/user/, /email/, /name/, /id/, /profile/, /address/, /phone/, /birth/, /gender/i],
  sensitiveData: [/password/, /secret/, /key/, /credit/, /card/, /ssn/, /social.?security/, /bank/i],
  trackingIds: [/uid/, /userid/, /visitor/, /client/, /track/, /campaign/, /affiliate/i]
};

export class CookieAnalyzer {
  static scanCookies(): Cookie[] {
    const cookies: Cookie[] = [];
    const cookieString = document.cookie;
    
    if (!cookieString) return cookies;

    const cookiePairs = cookieString.split(';');
    
    cookiePairs.forEach(pair => {
      const [name, value] = pair.trim().split('=');
      if (name && value) {
        const cookie: Cookie = {
          name: name.trim(),
          value: value.trim(),
          domain: window.location.hostname,
          path: '/',
          secure: window.location.protocol === 'https:',
          isThirdParty: this.isThirdPartyCookie(name),
          isTracker: this.isTracker(name),
          category: this.categorize(name),
          riskLevel: this.assessCookieRisk(name, value)
        };
        cookies.push(cookie);
      }
    });

    return cookies;
  }

  static scanLocalStorage(): LocalStorageItem[] {
    const items: LocalStorageItem[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key) || '';
        items.push({
          key,
          value,
          size: new Blob([value]).size,
          isTracker: this.isTracker(key),
          containsPII: this.containsPII(key) || this.containsPII(value)
        });
      }
    }

    return items;
  }

  static scanSessionStorage(): LocalStorageItem[] {
    const items: LocalStorageItem[] = [];
    
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        const value = sessionStorage.getItem(key) || '';
        items.push({
          key,
          value,
          size: new Blob([value]).size,
          isTracker: this.isTracker(key),
          containsPII: this.containsPII(key) || this.containsPII(value)
        });
      }
    }

    return items;
  }

  static analyzeCookies(): ScanResults {
    const startTime = Date.now();
    
    const cookies = this.scanCookies();
    const localStorageItems = this.scanLocalStorage();
    const sessionStorageItems = this.scanSessionStorage();
    
    const trackers = cookies.filter(cookie => cookie.isTracker);
    const thirdPartyCookies = cookies.filter(cookie => cookie.isThirdParty);
    const highRiskCookies = cookies.filter(cookie => cookie.riskLevel === 'high');
    
    const totalSize = cookies.reduce((acc, cookie) => 
      acc + new Blob([cookie.value]).size, 0) +
      localStorageItems.reduce((acc, item) => acc + item.size, 0) +
      sessionStorageItems.reduce((acc, item) => acc + item.size, 0);
    
    const scanTime = Date.now() - startTime;
    
    // Enhanced analysis
    const privacyScore = this.calculateEnhancedPrivacyScore(cookies, localStorageItems, sessionStorageItems);
    const securityScore = this.calculateEnhancedSecurityScore(cookies);
    const vulnerabilities = this.detectAdvancedVulnerabilities(cookies, localStorageItems, sessionStorageItems);
    const fingerprinting = this.enhancedFingerprintingAnalysis();
    const sessionSecurity = this.analyzeSessionSecurity(cookies);
    const recommendations = this.generateEnhancedRecommendations(cookies, localStorageItems, vulnerabilities);

    return {
      cookies,
      localStorage: localStorageItems,
      trackers,
      thirdPartyCookies,
      totalSize,
      scanTime,
      privacyScore,
      securityScore,
      vulnerabilities,
      fingerprinting,
      sessionSecurity,
      recommendations,
      monsterMessage: this.getMonsterMessage(cookies.length, trackers.length, securityScore, vulnerabilities),
      enhancedData: {
        highRiskCookies,
        sessionStorage: sessionStorageItems,
        browserHardening: this.checkBrowserHardening(),
        threatLevel: this.calculateThreatLevel(vulnerabilities, trackers.length),
        cookieSecurity: {},
        localStorageRisk: {},
        sessionStorageRisk: {},
        networkSecurity: {},
        threatIntelligence: {}
      }
    };
  }

  // Enhanced analysis methods
  private static calculateEnhancedPrivacyScore(cookies: Cookie[], localStorageItems: LocalStorageItem[], sessionStorageItems: LocalStorageItem[]): number {
    let score = 100;
    const trackerCount = cookies.filter(c => c.isTracker).length;
    const thirdPartyCount = cookies.filter(c => c.isThirdParty).length;
    const totalItems = cookies.length + localStorageItems.length + sessionStorageItems.length;
    
    score -= Math.min(trackerCount * 8, 60);
    score -= Math.min(thirdPartyCount * 4, 40);
    score -= Math.min(totalItems * 1.5, 25);
    
    const sensitiveCookies = cookies.filter(c => c.riskLevel === 'high');
    const sensitiveStorage = [...localStorageItems, ...sessionStorageItems].filter(item => item.containsPII);
    
    score -= Math.min(sensitiveCookies.length * 12, 40);
    score -= Math.min(sensitiveStorage.length * 15, 45);
    
    return Math.max(score, 0);
  }

  private static calculateEnhancedSecurityScore(cookies: Cookie[]): number {
    let score = 100;
    
    const insecureCookies = cookies.filter(c => !c.secure);
    const sessionCookies = cookies.filter(c => this.isSessionCookie(c));
    const insecureSessionCookies = sessionCookies.filter(c => !c.secure);
    
    score -= Math.min(insecureCookies.length * 6, 35);
    score -= Math.min(insecureSessionCookies.length * 15, 40);
    
    const authCookies = cookies.filter(c => this.containsAuthData(c.name) || this.containsAuthData(c.value));
    score -= Math.min(authCookies.length * 10, 30);
    
    return Math.max(score, 0);
  }

  private static detectAdvancedVulnerabilities(cookies: Cookie[], localStorage: LocalStorageItem[], sessionStorage: LocalStorageItem[]): SecurityVulnerability[] {
    const vulnerabilities: SecurityVulnerability[] = [];
    const allStorage = [...localStorage, ...sessionStorage];
    
    // Cookie vulnerabilities
    cookies.forEach(cookie => {
      if (!cookie.secure && window.location.protocol === 'https:') {
        vulnerabilities.push({
          type: 'insecure-cookie',
          severity: 'medium',
          description: `Cookie "${cookie.name}" is not marked as secure on HTTPS site`,
          cookieName: cookie.name,
          recommendation: 'Enable Secure flag for all cookies on HTTPS sites',
          learnMore: 'Insecure cookies can be intercepted by attackers'
        });
      }
      
      if (this.containsAuthData(cookie.name) || this.containsAuthData(cookie.value)) {
        vulnerabilities.push({
          type: 'data-exposure',
          severity: 'high',
          description: `Authentication token found in cookie "${cookie.name}"`,
          cookieName: cookie.name,
          recommendation: 'Store auth tokens in secure, HttpOnly cookies',
          learnMore: 'Auth tokens in cookies should be properly secured'
        });
      }
    });
    
    // Storage vulnerabilities
    allStorage.forEach(item => {
      if (this.containsAuthData(item.key) || this.containsAuthData(item.value)) {
        vulnerabilities.push({
          type: 'data-exposure',
          severity: 'critical',
          description: `Authentication token found in storage: "${item.key}"`,
          recommendation: 'Never store sensitive tokens in browser storage',
          learnMore: 'Browser storage is vulnerable to XSS attacks'
        });
      }
      
      if (this.containsSensitiveData(item.key) || this.containsSensitiveData(item.value)) {
        vulnerabilities.push({
          type: 'data-exposure',
          severity: 'high',
          description: `Sensitive data detected in storage: "${item.key}"`,
          recommendation: 'Avoid storing personal data in browser storage',
          learnMore: 'Personal data in browser storage can be accessed by malicious scripts'
        });
      }
    });
    
    return vulnerabilities;
  }

  private static enhancedFingerprintingAnalysis(): FingerprintingData {
    const basicAnalysis = this.analyzeFingerprintingRisk();
    
    // Additional fingerprinting data
    const additionalData = {
      hardwareConcurrency: navigator.hardwareConcurrency || 0,
      deviceMemory: (navigator as any).deviceMemory || 0,
      riskFactors: this.calculateFingerprintRiskFactors()
    };
    
    return {
      ...basicAnalysis,
      ...additionalData
    };
  }

  private static analyzeFingerprintingRisk(): FingerprintingData {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.fillText('Cookie Monster Test', 10, 10);
    const canvasFingerprint = canvas.toDataURL();
    
    const fingerprint = btoa(
      navigator.userAgent + 
      screen.width + 'x' + screen.height + 
      navigator.language + 
      Intl.DateTimeFormat().resolvedOptions().timeZone
    ).slice(0, 16);
    
    const riskFactors = this.calculateFingerprintRiskFactors();
    const fingerprintingRisk = riskFactors >= 4 ? 'high' : riskFactors >= 2 ? 'medium' : 'low';
    
    return {
      browserFingerprint: fingerprint,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack === '1',
      fingerprintingRisk
    };
  }

  private static analyzeSessionSecurity(cookies: Cookie[]): SessionSecurityInfo {
    const sessionCookies = cookies.filter(c => this.isSessionCookie(c));
    const persistentCookies = cookies.filter(c => c.expires);
    
    // Count security features
    const secureCookies = cookies.filter(c => c.secure);
    const httpOnlyCookies = cookies.filter(c => c.httpOnly);
    const sameSiteCookies = cookies.filter(c => c.sameSite);
    
    // Calculate security score based on multiple factors
    let securityScore = 0;
    let securityRating: SessionSecurityInfo['securityRating'] = 'poor';
    
    if (cookies.length === 0) {
      // No cookies = excellent security (nothing to exploit)
      securityRating = 'excellent';
    } else {
      // Score based on security features
      if (secureCookies.length > 0) securityScore += 30;
      if (httpOnlyCookies.length > 0) securityScore += 30;
      if (sameSiteCookies.length > 0) securityScore += 20;
      
      // Bonus for comprehensive protection
      const hasComprehensiveSecurity = secureCookies.length > 0 && 
                                    httpOnlyCookies.length > 0 && 
                                    sameSiteCookies.length > 0;
      if (hasComprehensiveSecurity) securityScore += 20;
      
      // Determine rating
      if (securityScore >= 80) {
        securityRating = 'excellent';
      } else if (securityScore >= 60) {
        securityRating = 'good';
      } else if (securityScore >= 30) {
        securityRating = 'fair';
      } else {
        securityRating = 'poor';
      }
    }
    
    return {
      hasSecureCookies: secureCookies.length > 0,
      hasHttpOnlyCookies: httpOnlyCookies.length > 0,
      hasSameSiteCookies: sameSiteCookies.length > 0,
      sessionCookieCount: sessionCookies.length,
      persistentCookieCount: persistentCookies.length,
      secureCookieCount: secureCookies.length,
      httpOnlyCookieCount: httpOnlyCookies.length,
      sameSiteCookieCount: sameSiteCookies.length,
      securityRating,
      securityScore
    };
  }

  private static generateEnhancedRecommendations(cookies: Cookie[], localStorage: LocalStorageItem[], vulnerabilities: SecurityVulnerability[]): SecurityRecommendation[] {
    const recommendations: SecurityRecommendation[] = [];
    
    if (vulnerabilities.some(v => v.type === 'insecure-cookie')) {
      recommendations.push({
        category: 'security',
        priority: 'high',
        title: 'Enable Secure Cookies',
        description: 'Some cookies are not marked as secure on HTTPS site',
        action: 'Contact website to enable secure cookie flags',
        monsterMessage: 'ME WANT SECURE COOKIES! Insecure cookies are dangerous! 🍪🔒'
      });
    }
    
    if (vulnerabilities.some(v => v.severity === 'critical')) {
      recommendations.push({
        category: 'security',
        priority: 'high',
        title: 'Critical Security Issues',
        description: 'Critical vulnerabilities detected that need immediate attention',
        action: 'Review and address these security issues immediately',
        monsterMessage: 'CRITICAL ALERT! Cookie Monster found dangerous security holes! 🍪🚨'
      });
    }
    
    if (cookies.filter(c => c.isTracker).length > 5) {
      recommendations.push({
        category: 'privacy',
        priority: 'high',
        title: 'Enable Tracking Protection',
        description: 'Multiple tracking cookies detected',
        action: 'Use browser tracking protection and privacy extensions',
        monsterMessage: 'TOO MANY TRACKER COOKIES! They follow you everywhere! 🍪👃'
      });
    }
    
    recommendations.push({
      category: 'browser',
      priority: 'medium',
      title: 'Keep Browser Updated',
      description: 'Regular updates include important security fixes',
      action: 'Enable automatic browser updates',
      monsterMessage: 'FRESH BROWSER LIKE FRESH COOKIES! Old browsers have stale security! 🍪⚡'
    });
    
    return recommendations;
  }

  // Helper methods
  private static isThirdPartyCookie(name: string): boolean {
    return TRACKER_PATTERNS.some(pattern => pattern.test(name)) ||
           TRACKER_DOMAINS.some(domain => name.includes(domain));
  }

  private static isTracker(name: string): boolean {
    return TRACKER_PATTERNS.some(pattern => pattern.test(name)) ||
           TRACKER_DOMAINS.some(domain => name.includes(domain));
  }

  private static categorize(name: string): Cookie['category'] {
    if (/_ga|_gid|_gat|_gac|_gcl/.test(name)) return 'analytics';
    if (/fbp|fbc|_fbp|tr|fr/.test(name)) return 'advertising';
    if (/__utm|utm_|gclid|dclid/.test(name)) return 'analytics';
    if (this.isTracker(name)) return 'tracker';
    return 'functional';
  }

  private static assessCookieRisk(name: string, value: string): 'low' | 'medium' | 'high' {
    if (this.containsSensitiveData(name) || this.containsSensitiveData(value)) return 'high';
    if (this.containsAuthData(name) || this.containsAuthData(value)) return 'high';
    if (this.isTracker(name)) return 'medium';
    return 'low';
  }

  private static containsSensitiveData(text: string): boolean {
    const patterns = [/password/i, /credit.?card/i, /ssn/i, /social.?security/i, /bank/i];
    return patterns.some(pattern => pattern.test(text));
  }

  private static containsAuthData(text: string): boolean {
    const patterns = [/token/i, /auth/i, /jwt/i, /bearer/i, /session/i, /access/i, /refresh/i];
    return patterns.some(pattern => pattern.test(text));
  }

  private static containsPII(text: string): boolean {
    const patterns = [/email/i, /name/i, /address/i, /phone/i, /birth/i, /gender/i];
    return patterns.some(pattern => pattern.test(text));
  }

  private static isSessionCookie(cookie: Cookie): boolean {
    const patterns = [/session/i, /sess/i, /jsessionid/i, /phpsessid/i];
    return patterns.some(pattern => pattern.test(cookie.name)) || !cookie.expires;
  }

  private static calculateFingerprintRiskFactors(): number {
    let factors = 0;
    if (navigator.plugins.length > 5) factors++;
    if (screen.width * screen.height > 1920 * 1080) factors++;
    if (navigator.languages && navigator.languages.length > 2) factors++;
    if (navigator.hardwareConcurrency > 4) factors++;
    return factors;
  }

  private static checkBrowserHardening(): any {
    return {
      doNotTrack: navigator.doNotTrack === '1',
      cookiesEnabled: navigator.cookieEnabled,
      hasSecureContext: window.isSecureContext,
      isHTTPS: window.location.protocol === 'https:'
    };
  }

  private static calculateThreatLevel(vulnerabilities: SecurityVulnerability[], trackerCount: number): 'low' | 'medium' | 'high' {
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
    const highVulns = vulnerabilities.filter(v => v.severity === 'high').length;
    
    if (criticalVulns > 0) return 'high';
    if (highVulns > 0 || trackerCount > 10) return 'medium';
    return 'low';
  }

  private static getMonsterMessage(cookieCount: number, trackerCount: number, securityScore: number, vulnerabilities: SecurityVulnerability[]): string {
    const criticalVulns = vulnerabilities.filter(v => v.severity === 'critical').length;
    
    if (cookieCount === 0) {
      return "NO COOKIES?! IMPOSSIBLE! *munches on localStorage instead* 🍪😱";
    }
    
    if (criticalVulns > 0) {
      return `CRITICAL SECURITY ISSUE! ${criticalVulns} dangerous problems found! Cookie Monster is worried! 🍪🚨`;
    }
    
    if (securityScore < 30) {
      return `SECURITY SCORE: ${securityScore}/100! These cookies need better protection! 🍪🔒`;
    }
    
    if (trackerCount === 0) {
      return `FOUND ${cookieCount} COOKIES! All look tasty and safe! OM NOM NOM! 🍪😋`;
    }
    
    if (trackerCount > 10) {
      return `WHOA! ${trackerCount} TRACKERS! This site knows you better than Cookie Monster knows cookies! 🍪👾`;
    }
    
    return `Found ${trackerCount} trackers among ${cookieCount} cookies. Some crumbs are suspicious! 🍪🔍`;
  }
}