import React, { useState } from 'react';
import { Sliders, Download, RefreshCw } from 'lucide-react';
import { useImageStore } from '../store/imageStore';

const ImageProcessor: React.FC = () => {
  const { capturedImage, isProcessing, setIsProcessing } = useImageStore();
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);

  const handleDownload = () => {
    if (capturedImage) {
      const link = document.createElement('a');
      link.href = capturedImage;
      link.download = `processed-image-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleProcessing = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Brightness
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Contrast
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
            Saturation
          </label>
          <input
            type="range"
            min="0"
            max="200"
            value={saturation}
            onChange={(e) => setSaturation(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={handleProcessing}
          disabled={isProcessing}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <Sliders className="w-5 h-5" />
          )}
          <span>{isProcessing ? 'Processing...' : 'Process Image'}</span>
        </button>

        <button
          onClick={handleDownload}
          disabled={isProcessing}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 disabled:opacity-50"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ImageProcessor;
