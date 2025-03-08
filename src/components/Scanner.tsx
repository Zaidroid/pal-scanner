import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Camera, RefreshCw, Flashlight, FlashlightOff } from 'lucide-react';

const Scanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraReady, setIsCameraReady] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [flashlightOn, setFlashlightOn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stopping, setStopping] = useState<boolean>(false); // NEW: Flag for controlled shutdown
  const codeReader = useRef<BrowserMultiFormatReader>(new BrowserMultiFormatReader());

  // Initialize camera
  useEffect(() => {
    const startCamera = async () => {
      try {
        const videoInputDevices = await codeReader.current.listVideoInputDevices();
        if (videoInputDevices.length === 0) {
          setError('No camera devices found.');
          return;
        }
        const selectedDeviceId = videoInputDevices[facingMode === 'environment' ? 0 : 1]?.deviceId || videoInputDevices[0].deviceId;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedDeviceId, facingMode },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraReady(true);
        }
      } catch (err) {
        setError('Camera access denied. Please allow camera permissions.');
      }
    };

    startCamera();

    return () => {
      const stopCameraAndScanner = async () => {
        setStopping(true); // Set stopping flag *first*

        // Stop video tracks
        if (videoRef.current && videoRef.current.srcObject) {
          (videoRef.current.srcObject as MediaStream).getTracks().forEach((track) => track.stop());
        }

        // Await stopAsync()
        if (codeReader.current) {
          try {
            await codeReader.current.stopAsync();
          } catch (err) {
            console.error("Error stopping code reader:", err);
            // Even if stopAsync() fails, we continue the cleanup.
          }
        }

        setStopping(false); // Reset stopping flag
      };

      stopCameraAndScanner();
    };
  }, [facingMode]);

  // Capture barcode
  const capture = async () => {
    if (!videoRef.current || !isCameraReady || stopping) { // Check stopping flag
      return;
    }

    try {
      const result = await codeReader.current.decodeFromVideoElement(videoRef.current);
      if (result) {
        setLastResult(result.getText());
      }
    } catch (err) {
      // Only set error if not stopping.  This prevents "expected" errors
      // during shutdown from flashing on the screen.
      if (!stopping) {
        setError('No barcode detected. Try adjusting the camera.');
      }
    }
  };

  // Switch camera
  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
    setIsCameraReady(false); // Reset camera readiness to reinitialize
  };

  // Toggle flashlight
  const toggleFlashlight = async () => {
    try {
      const track = (videoRef.current?.srcObject as MediaStream)?.getVideoTracks()[0];
      if (track && track.getCapabilities().torch) {
        await track.applyConstraints({
          advanced: [{ torch: !flashlightOn }],
        });
        setFlashlightOn((prev) => !prev);
      }
    } catch (err) {
      console.error('Flashlight not supported:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="relative">
        <motion.div
          animate={{ rotateY: facingMode === 'user' ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-lg"
        >
          <video
            ref={videoRef}
            className={`w-full h-[60vh] object-cover ${lastResult ? 'border-4 border-green-500' : 'border-4 border-transparent'}`}
          />
        </motion.div>
        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-2 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-center">
            {error}
          </div>
        )}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleFlashlight}
          className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-gray-700/80 rounded-full shadow-lg"
          disabled={!isCameraReady}
        >
          {flashlightOn ? <FlashlightOff size={24} /> : <Flashlight size={24} />}
        </motion.button>
      </div>

      <div className="flex justify-center space-x-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={capture}
          disabled={!isCameraReady}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Camera className="w-5 h-5" />
          <span>Capture</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={switchCamera}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 px-6 py-3 rounded-full flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Switch Camera</span>
        </motion.button>
      </div>

      {lastResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg text-center"
        >
          <p className="font-semibold">Scanned Barcode:</p>
          <p>{lastResult}</p>
        </motion.div>
      )}
    </div>
  );
};

export default Scanner;
