import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ScanResult {
  barcode: string;
  timestamp: number;
  country: string;
  classification: 'red' | 'orange' | 'green' | 'grey';
  message: string;
}

interface AppState {
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

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      darkMode: false,
      language: 'en',
      notifications: true,
      scanHistory: [],
      addScan: (scan) =>
        set((state) => ({
          scanHistory: [scan, ...state.scanHistory],
        })),
      deleteScan: (barcode) =>
        set((state) => ({
          scanHistory: state.scanHistory.filter((scan) => scan.barcode !== barcode),
        })),
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
      setLanguage: (lang) =>
        set(() => ({
          language: lang,
        })),
      toggleNotifications: () =>
        set((state) => ({
          notifications: !state.notifications,
        })),
    }),
    {
      name: 'pal-scanner-storage',
    }
  )
);
