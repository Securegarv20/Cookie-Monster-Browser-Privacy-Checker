"use client";

import { ScanResults, SessionSecurityInfo } from '@/types/cookies';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, Shield, Eye, Database, RefreshCw, Lock, 
  Fingerprint, Bug, Info, Server, Network, Cpu, HardDrive,
  AlertCircle, CheckCircle, XCircle, TrendingUp, TrendingDown,
  Key, Globe, Settings
} from 'lucide-react';

interface CookieResultsProps {
  results: ScanResults;
  onResetAction: () => void; 
}

export function CookieResults({ results, onResetAction }: CookieResultsProps) {
  const monsterMessage = results.monsterMessage || "Cookie Monster is analyzing your cookies... 🍪";
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'tracker': return 'bg-red-100 text-red-800 border-red-300';
      case 'advertising': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'analytics': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'functional': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white border-red-600';
      case 'high': return 'bg-red-200 text-red-900 border-red-300';
      case 'medium': return 'bg-yellow-200 text-yellow-900 border-yellow-300';
      case 'low': return 'bg-blue-200 text-blue-900 border-blue-300';
      default: return 'bg-gray-200 text-gray-900 border-gray-300';
    }
  };

  const getSecurityRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case 'good': return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />;
      case 'fair': return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />;
      case 'poor': return <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />;
      default: return <Info className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getSecurityRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSessionSecurityExplanation = (sessionSecurity: SessionSecurityInfo) => {
    if (sessionSecurity.securityRating === 'excellent') {
      return "Excellent! Your cookies have comprehensive security protections enabled.";
    }
    
    if (sessionSecurity.securityRating === 'good') {
      return "Good security measures, but some cookies could use additional protection.";
    }
    
    if (sessionSecurity.securityRating === 'fair') {
      return "Basic security present, but significant improvements are needed.";
    }
    
    // Poor rating
    if (sessionSecurity.sessionCookieCount > 0 && sessionSecurity.persistentCookieCount > 0) {
      return "Critical: Multiple cookies lack security flags - high risk of attacks.";
    }
    
    if (sessionSecurity.sessionCookieCount > 0) {
      return "Warning: Session cookies lack security protection - vulnerable to hijacking.";
    }
    
    if (sessionSecurity.persistentCookieCount > 0) {
      return "Warning: Persistent cookies lack security flags - potential long-term risks.";
    }
    
    return "No cookies detected - excellent security posture.";
  };

  // Browser security tips
  const browserSecurityTips = [
    {
      icon: <Settings className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Enable Automatic Updates",
      description: "Keep your browser updated with the latest security patches",
      action: "Check browser settings → Automatic updates"
    },
    {
      icon: <Shield className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Use HTTPS Everywhere",
      description: "Ensure secure connections to websites",
      action: "Install HTTPS Everywhere extension"
    },
    {
      icon: <Key className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Enable Enhanced Tracking Protection",
      description: "Block trackers and fingerprinting scripts",
      action: "Browser settings → Privacy & Security → Enhanced Tracking Protection"
    },
    {
      icon: <Globe className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Use Privacy-Focused Search Engine",
      description: "Switch to DuckDuckGo or other privacy search engines",
      action: "Change default search engine in browser settings"
    },
    {
      icon: <Lock className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Enable Password Manager",
      description: "Use strong, unique passwords for every site",
      action: "Use built-in password manager or Bitwarden/LastPass"
    },
    {
      icon: <Eye className="h-4 w-4 sm:h-5 sm:w-5" />,
      title: "Review Browser Extensions",
      description: "Remove unnecessary or suspicious extensions",
      action: "Browser settings → Extensions → Remove unused extensions"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      {/* Cookie Monster's Verdict */}
      <Card className="border-2 sm:border-4 border-blue-300 bg-gradient-to-r from-blue-50 to-yellow-50 shadow-md sm:shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🍪👾</div>
            <div className="text-lg sm:text-xl font-bold text-blue-800 mb-3 sm:mb-4">
              Cookie Monster's Security Report
            </div>
            <div className="text-base sm:text-lg font-bold text-blue-700 bg-white rounded-lg p-3 sm:p-4 border-2 border-blue-200 shadow-sm">
              "{monsterMessage}"
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <Card className="border border-blue-200">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{results.cookies.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Total Cookies</div>
          </CardContent>
        </Card>
        
        <Card className="border border-red-200">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-red-600">{results.trackers.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Tracker Cookies</div>
          </CardContent>
        </Card>
        
        <Card className="border border-orange-200">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{results.thirdPartyCookies.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Third-Party</div>
          </CardContent>
        </Card>
        
        <Card className="border border-purple-200">
          <CardContent className="p-2 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600">{results.vulnerabilities.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Vulnerabilities</div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy & Security Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="border border-blue-200 shadow-sm sm:shadow-md">
          <CardHeader className="bg-blue-50 p-3 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
              Privacy Score
              <TrendingUp className="h-4 w-4 ml-auto text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl sm:text-4xl font-bold ${getScoreColor(results.privacyScore)}`}>
                  {results.privacyScore}/100
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  {results.privacyScore >= 80 ? 'Excellent privacy protection' : 
                   results.privacyScore >= 60 ? 'Moderate privacy' : 
                   'Privacy concerns detected'}
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${getScoreBadgeColor(results.privacyScore)}`}>
                {results.privacyScore >= 80 ? 'EXCELLENT' : 
                 results.privacyScore >= 60 ? 'MODERATE' : 'POOR'}
              </Badge>
            </div>
            
            {/* Privacy Metrics */}
            <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Tracker Cookies</span>
                <span className="font-medium">{results.trackers.length} found</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Third-Party Cookies</span>
                <span className="font-medium">{results.thirdPartyCookies.length} found</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Local Storage</span>
                <span className="font-medium">{results.localStorage.length} items</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-green-200 shadow-sm sm:shadow-md">
          <CardHeader className="bg-green-50 p-3 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800 text-base sm:text-lg">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
              Security Score
              <TrendingDown className="h-4 w-4 ml-auto text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl sm:text-4xl font-bold ${getScoreColor(results.securityScore)}`}>
                  {results.securityScore}/100
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  {results.securityScore >= 80 ? 'Strong security' : 
                   results.securityScore >= 60 ? 'Adequate security' : 
                   'Security improvements needed'}
                </div>
              </div>
              <Badge variant="outline" className={`text-xs ${getScoreBadgeColor(results.securityScore)}`}>
                {results.securityScore >= 80 ? 'STRONG' : 
                 results.securityScore >= 60 ? 'ADEQUATE' : 'WEAK'}
              </Badge>
            </div>
            
            {/* Security Metrics */}
            <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Insecure Cookies</span>
                <span className="font-medium">
                  {results.cookies.filter(c => !c.secure).length} found
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Critical Vulnerabilities</span>
                <span className="font-medium text-red-600">
                  {results.vulnerabilities.filter(v => v.severity === 'critical').length} critical
                </span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span>Session Security</span>
                <span className="font-medium">
                  {results.sessionSecurity.securityRating.toUpperCase()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Data Section */}
      {results.enhancedData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* High Risk Cookies */}
          {results.enhancedData.highRiskCookies.length > 0 && (
            <Card className="border border-red-200">
              <CardHeader className="bg-red-50 p-3 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-red-800 text-base sm:text-lg">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                  High Risk Cookies ({results.enhancedData.highRiskCookies.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.enhancedData.highRiskCookies.map((cookie, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-red-50 rounded border border-red-200">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs sm:text-sm truncate">{cookie.name}</span>
                        <Badge variant="outline" className="bg-red-500 text-white text-xs">
                          {cookie.riskLevel}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(cookie.category)}`}>
                        {cookie.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Session Storage */}
          {results.enhancedData.sessionStorage.length > 0 && (
            <Card className="border border-purple-200">
              <CardHeader className="bg-purple-50 p-3 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-purple-800 text-base sm:text-lg">
                  <HardDrive className="h-4 w-4 sm:h-5 sm:w-5" />
                  Session Storage ({results.enhancedData.sessionStorage.length} items)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-3 sm:pt-4">
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {results.enhancedData.sessionStorage.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                      <span className="font-mono text-xs sm:text-sm truncate">{item.key}</span>
                      <Badge variant="outline" className="text-xs">
                        {formatBytes(item.size)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Fingerprinting Analysis */}
      <Card className="border border-blue-200">
        <CardHeader className="bg-blue-50 p-3 sm:pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
            <Fingerprint className="h-4 w-4 sm:h-5 sm:w-5" />
            Browser Fingerprinting Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-medium">Fingerprinting Risk</span>
                <Badge className={`text-xs ${getSeverityColor(results.fingerprinting.fingerprintingRisk)}`}>
                  {results.fingerprinting.fingerprintingRisk.toUpperCase()}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Screen Resolution</span>
                <span className="font-mono text-xs">{results.fingerprinting.screenResolution}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Timezone</span>
                <span className="font-mono text-xs">{results.fingerprinting.timezone}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Language</span>
                <span className="font-mono text-xs">{results.fingerprinting.language}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Platform</span>
                <span className="font-mono text-xs">{results.fingerprinting.platform}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Cookies Enabled</span>
                <span>{results.fingerprinting.cookiesEnabled ? '✅ Yes' : '❌ No'}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span>Do Not Track</span>
                <span>{results.fingerprinting.doNotTrack ? '✅ Enabled' : '❌ Disabled'}</span>
              </div>
              {/* Enhanced fingerprinting data */}
              {'hardwareConcurrency' in results.fingerprinting && (
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span>CPU Cores</span>
                  <span className="font-mono text-xs">{results.fingerprinting.hardwareConcurrency}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Security - FIXED VERSION */}
      <Card className="border border-green-200">
        <CardHeader className="bg-green-50 p-3 sm:pb-3">
          <CardTitle className="flex items-center gap-2 text-green-800 text-base sm:text-lg">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5" />
            Session Security Analysis
            {getSecurityRatingIcon(results.sessionSecurity.securityRating)}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
            <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{results.sessionSecurity.sessionCookieCount}</div>
              <div className="text-xs sm:text-sm text-gray-600">Session Cookies</div>
              <div className="text-xs text-blue-500 mt-1">
                {results.sessionSecurity.sessionCookieCount > 0 ? '⚠️ Expire on browser close' : '✅ No session cookies'}
              </div>
            </div>
            
            <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{results.sessionSecurity.persistentCookieCount}</div>
              <div className="text-xs sm:text-sm text-gray-600">Persistent Cookies</div>
              <div className="text-xs text-purple-500 mt-1">
                {results.sessionSecurity.persistentCookieCount > 0 ? '⚠️ Have expiration dates' : '✅ No persistent cookies'}
              </div>
            </div>
            
            <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-green-600">
                {results.sessionSecurity.secureCookieCount || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Secure Cookies</div>
              <div className="text-xs text-green-500 mt-1">
                {results.sessionSecurity.secureCookieCount > 0 ? '✅ HTTPS only' : '❌ Not secure'}
              </div>
            </div>
            
            <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">
                {results.sessionSecurity.httpOnlyCookieCount || 0}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">HttpOnly Cookies</div>
              <div className="text-xs text-orange-500 mt-1">
                {results.sessionSecurity.httpOnlyCookieCount > 0 ? '✅ JS inaccessible' : '❌ JS accessible'}
              </div>
            </div>
          </div>
          
          {/* Security Rating with Detailed Explanation */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Overall Session Security Rating</span>
              <Badge className={`text-xs ${
                results.sessionSecurity.securityRating === 'excellent' ? 'bg-green-100 text-green-800 border-green-300' :
                results.sessionSecurity.securityRating === 'good' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                results.sessionSecurity.securityRating === 'fair' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                'bg-red-100 text-red-800 border-red-300'
              }`}>
                {results.sessionSecurity.securityRating.toUpperCase()}
              </Badge>
            </div>
            
            <div className="text-xs sm:text-sm text-gray-700">
              {getSessionSecurityExplanation(results.sessionSecurity)}
            </div>
            
            {/* Security Features Summary */}
            <div className="mt-2 sm:mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                {results.sessionSecurity.hasSecureCookies ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500" />
                )}
                <span>Secure Flag: {results.sessionSecurity.hasSecureCookies ? 'Enabled' : 'Missing'}</span>
              </div>
              <div className="flex items-center gap-2">
                {results.sessionSecurity.hasHttpOnlyCookies ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500" />
                )}
                <span>HttpOnly Flag: {results.sessionSecurity.hasHttpOnlyCookies ? 'Enabled' : 'Missing'}</span>
              </div>
              <div className="flex items-center gap-2">
                {results.sessionSecurity.hasSameSiteCookies ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500" />
                )}
                <span>SameSite Attribute: {results.sessionSecurity.hasSameSiteCookies ? 'Present' : 'Missing'}</span>
              </div>
              <div className="flex items-center gap-2">
                {results.sessionSecurity.sessionCookieCount === 0 ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertCircle className="h-3 w-3 text-yellow-500" />
                )}
                <span>Session Cookies: {results.sessionSecurity.sessionCookieCount} found</span>
              </div>
            </div>
          </div>

          {/* Session Security Recommendations */}
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2 text-sm sm:text-base">
              <Info className="h-3 w-3 sm:h-4 sm:w-4" />
              Session Security Recommendations
            </h4>
            <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
              {!results.sessionSecurity.hasSecureCookies && (
                <li>• Enable Secure flag on all cookies (HTTPS only)</li>
              )}
              {!results.sessionSecurity.hasHttpOnlyCookies && (
                <li>• Enable HttpOnly flag to prevent JavaScript access</li>
              )}
              {!results.sessionSecurity.hasSameSiteCookies && (
                <li>• Set SameSite attribute to prevent CSRF attacks</li>
              )}
              {results.sessionSecurity.sessionCookieCount > 10 && (
                <li>• Reduce number of session cookies where possible</li>
              )}
              {results.sessionSecurity.persistentCookieCount > 5 && (
                <li>• Review persistent cookies and set appropriate expiration</li>
              )}
              {(results.sessionSecurity.hasSecureCookies && results.sessionSecurity.hasHttpOnlyCookies && results.sessionSecurity.hasSameSiteCookies) && (
                <li>• Excellent! Maintain current security practices</li>
              )}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Security Vulnerabilities */}
      {results.vulnerabilities.length > 0 && (
        <Card className="border border-red-200 shadow-md sm:shadow-lg">
          <CardHeader className="bg-red-50 p-3 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-red-800 text-base sm:text-lg">
              <Bug className="h-4 w-4 sm:h-5 sm:w-5" />
              Security Vulnerabilities ({results.vulnerabilities.length})
              <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 ml-auto" />
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4">
            <div className="space-y-3 sm:space-y-4">
              {results.vulnerabilities.map((vuln, index) => (
                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-red-200 shadow-sm">
                  <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-2 flex-1">
                      <AlertTriangle className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        vuln.severity === 'critical' ? 'text-red-500' :
                        vuln.severity === 'high' ? 'text-orange-500' :
                        vuln.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                      }`} />
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{vuln.description}</span>
                    </div>
                    <Badge className={`text-xs ${getSeverityColor(vuln.severity)}`}>
                      {vuln.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 bg-gray-50 p-2 rounded">
                    💡 {vuln.recommendation}
                  </p>
                  <p className="text-xs text-gray-500 italic">{vuln.learnMore}</p>
                  {vuln.cookieName && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs bg-blue-50">
                        Cookie: {vuln.cookieName}
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cookie Details */}
      {results.cookies.length > 0 && (
        <Card className="border border-gray-200">
          <CardHeader className="bg-gray-50 p-3 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-800 text-base sm:text-lg">
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              Detailed Cookie Analysis ({results.cookies.length} cookies found)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4">
            <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
              {results.cookies.map((cookie, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 flex-1 min-w-0 mb-2 sm:mb-0">
                    <div className="font-mono text-xs sm:text-sm bg-white px-2 py-1 rounded border truncate flex-1">
                      {cookie.name}
                    </div>
                    <div className="text-xs text-gray-500 hidden sm:block">
                      {cookie.domain}
                    </div>
                    {cookie.isTracker && (
                      <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    )}
                    {!cookie.secure && (
                      <Lock className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {cookie.isTracker && (
                      <Badge variant="destructive" className="text-xs">
                        Tracker
                      </Badge>
                    )}
                    {cookie.riskLevel === 'high' && (
                      <Badge variant="outline" className="bg-red-100 text-red-800 text-xs">
                        High Risk
                      </Badge>
                    )}
                    <Badge className={`text-xs ${getCategoryColor(cookie.category)}`}>
                      {cookie.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Browser Security Tips Section */}
      <Card className="border border-blue-200 bg-blue-50">
        <CardHeader className="p-3 sm:pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            Browser Security Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-3 sm:pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {browserSecurityTips.map((tip, index) => (
              <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-1 sm:p-2 bg-blue-100 rounded-full">
                    {tip.icon}
                  </div>
                  <h4 className="font-semibold text-blue-800 text-sm sm:text-base">{tip.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{tip.description}</p>
                <p className="text-xs bg-blue-50 text-blue-700 p-1 sm:p-2 rounded border border-blue-200">
                  🛠️ {tip.action}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {results.recommendations.length > 0 && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardHeader className="p-3 sm:pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800 text-base sm:text-lg">
              <Info className="h-4 w-4 sm:h-5 sm:w-5" />
              Cookie Monster's Recommendations ({results.recommendations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-3 sm:pt-4">
            <div className="space-y-2 sm:space-y-3">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="bg-white rounded-lg p-3 sm:p-4 border border-blue-200">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 sm:mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 text-sm sm:text-base">{rec.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{rec.description}</p>
                    </div>
                    <Badge className={`mt-2 sm:mt-0 sm:ml-2 text-xs ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-green-700 mb-2">✅ {rec.action}</p>
                  <p className="text-xs text-blue-600 italic">"{rec.monsterMessage}"</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2 mb-0">
            💡 <strong>Pro Tip:</strong> Use incognito/private browsing for sensitive activities
          </p>
          
          <p className="text-xs text-gray-500 text-center mt-1 mb-0">
            ⚠️ Clearing cookies will log you out of websites and reset preferences
          </p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
        <Button 
          onClick={onResetAction}
          variant="outline"
          className="px-4 sm:px-6 py-2 border-blue-300 text-blue-700 hover:bg-blue-50 text-sm sm:text-base"
        >
          <RefreshCw className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Scan Again
        </Button>
        
        <Button 
          onClick={() => {
            // Functionality to clear cookies
            if (confirm('Let Cookie Monster eat all cookies and clear storage?')) {
              // Clear cookies and storage
              document.cookie.split(';').forEach(cookie => {
                const [name] = cookie.trim().split('=');
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
              });
              localStorage.clear();
              sessionStorage.clear();
              alert('🍪 Cookie Monster ate all the cookies! Scanning again...');
              onResetAction();
            }
          }}
          className="px-4 sm:px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base"
        >
          🍪 Let Cookie Monster Eat All Cookies!
        </Button>
      </div>

      {/* Scan Info Footer */}
      <div className="text-center text-xs text-gray-500 pt-3 sm:pt-4 border-t">
        <p>Scan completed in {results.scanTime}ms • Total data: {formatBytes(results.totalSize)}</p>
        {results.enhancedData && 'threatLevel' in results.enhancedData && (
          <p className="mt-1">
            Threat level: <span className={
              results.enhancedData.threatLevel === 'high' ? 'text-red-600 font-medium' :
              results.enhancedData.threatLevel === 'medium' ? 'text-yellow-600 font-medium' :
              'text-green-600 font-medium'
            }>
              {results.enhancedData.threatLevel.toUpperCase()}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}