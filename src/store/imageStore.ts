import { create } from 'zustand';

interface ImageStore {
  capturedImage: string | null;
  isProcessing: boolean;
  setCapturedImage: (image: string | null) => void;
  setIsProcessing: (processing: boolean) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  capturedImage: null,
  isProcessing: false,
  setCapturedImage: (image) => set({ capturedImage: image }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
}));
