export interface ScanResult {
  barcode: string;
  timestamp: number;
  country: string;
  classification: 'red' | 'orange' | 'green' | 'grey';
  message: string;
}

export interface AppState {
  darkMode: boolean;
  language: string;
  notifications: boolean;
  scanHistory: ScanResult[];
  addScan: (scan: ScanResult) => void;
  deleteScan: (barcode: string) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: string) => void;
  toggleNotifications: () => void;
}
