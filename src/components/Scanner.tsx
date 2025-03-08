import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Flashlight, FlashlightOff } from 'lucide-react';
import { useStore } from '../store';
import { classifyProduct } from '../utils/classification';

const Scanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const addScan = useStore((state) => state.addScan);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        const selectedDeviceId = videoInputDevices[0].deviceId;

        setScanning(true);
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result) => {
            if (result && result.getText() !== lastResult) {
              const barcode = result.getText();
              setLastResult(barcode);
              const classification = classifyProduct(barcode);
              addScan({
                barcode,
                timestamp: Date.now(),
                ...classification,
              });
            }
          }
        );
      } catch (err) {
        console.error('Error accessing camera:', err);
        setScanning(false); // Ensure scanning is set to false on error
      }
    };

    if (!scanning) {
      startScanning();
    }

    return () => {
      if (scanning) {
        codeReader.reset();
        setScanning(false);
      }
    };
  }, [addScan, lastResult, scanning]); // Add 'scanning' to dependency array

  const toggleFlashlight = async () => {
    try {
      const track = videoRef.current?.srcObject
        ?.getTracks()
        .find((track) => track.kind === 'video');

      if (track) {
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: !flashlightOn }],
          });
          setFlashlightOn(!flashlightOn);
        }
      }
    } catch (err) {
      console.error('Error toggling flashlight:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-[60vh] object-cover rounded-lg"
        />
        <button
          onClick={toggleFlashlight}
          className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg"
        >
          {flashlightOn ? <FlashlightOff size={24} /> : <Flashlight size={24} />}
        </button>
      </div>

      {lastResult && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Last Scan Result:</h3>
          <p className="text-gray-600 dark:text-gray-300">{lastResult}</p>
        </div>
      )}

      {!scanning && (
        <div className="text-center p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
          <p className="text-red-600 dark:text-red-200">
            Camera access is required for barcode scanning
          </p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
