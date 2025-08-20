import { Cookie } from '@/types/cookies';

export const letCookieMonsterEat = (): {
  cookiesDeleted: number;
  localStorageCleared: number;
  sessionStorageCleared: number;
  message: string;
} => {
  // Get counts before deletion
  const initialCookies = document.cookie.split(';').filter(c => c.trim());
  const initialLocalStorage = localStorage.length;
  const initialSessionStorage = sessionStorage.length;
  
  // Delete all cookies
  document.cookie.split(';').forEach(cookie => {
    const [name] = cookie.trim().split('=');
    if (name) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    }
  });
  
  // Clear storage
  localStorage.clear();
  sessionStorage.clear();
  
  // Count what was deleted
  const remainingCookies = document.cookie.split(';').filter(c => c.trim());
  const cookiesDeleted = initialCookies.length - remainingCookies.length;
  
  return {
    cookiesDeleted,
    localStorageCleared: initialLocalStorage,
    sessionStorageCleared: initialSessionStorage,
    message: `Cookie Monster ate ${cookiesDeleted} cookies, ${initialLocalStorage} localStorage items, and ${initialSessionStorage} sessionStorage items! 🍪👾`
  };
};

export const analyzeCookieSecurity = (cookie: Cookie): string[] => {
  const warnings: string[] = [];
  
  if (!cookie.secure && window.location.protocol === 'https:') {
    warnings.push('Not Secure - transmitted over HTTPS without Secure flag');
  }
  
  if (cookie.isTracker) {
    warnings.push('Tracking cookie - may be used for user profiling');
  }
  
  if (cookie.value.length > 500) {
    warnings.push('Large cookie value - may impact performance');
  }
  
  return warnings;
};

export const getCookieMonsterReaction = (
  cookieCount: number, 
  trackerCount: number, 
  securityScore: number
): { emoji: string; message: string } => {
  if (cookieCount === 0) {
    return { emoji: '😱', message: "NO COOKIES?! IMPOSSIBLE! *munches on localStorage instead*" };
  }
  
  if (securityScore < 30) {
    return { emoji: '🔒', message: `SECURITY SCORE: ${securityScore}/100! These cookies need better protection!` };
  }
  
  if (trackerCount === 0) {
    return { emoji: '😋', message: `FOUND ${cookieCount} COOKIES! All look tasty and safe! OM NOM NOM!` };
  }
  
  if (trackerCount > 10) {
    return { emoji: '👾', message: `WHOA! ${trackerCount} TRACKERS! This site knows you better than Cookie Monster!` };
  }
  
  return { emoji: '🔍', message: `Found ${trackerCount} trackers among ${cookieCount} cookies. Some crumbs are suspicious!` };
};