// API utilities for backend integration
// This will be used when you add your Express.js backend

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class CookieApi {
  private static baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';

  static async sendScanData(scanData: {
    cookies: any[];
    localStorage: any[];
    userAgent: string;
    domain: string;
  }): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scanData),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to send scan data to backend'
      };
    }
  }

  static async getTrackerDatabase(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/trackers`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch tracker database'
      };
    }
  }

  static async getPrivacyReport(domain: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/privacy-report/${domain}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch privacy report'
      };
    }
  }
}