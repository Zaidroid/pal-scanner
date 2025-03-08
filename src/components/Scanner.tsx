import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Flashlight, FlashlightOff } from 'lucide-react';

const Scanner = () => {
  const videoRef = useRef(null);
  const [lastResult, setLastResult] = useState(null);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [error, setError] = useState(null);

  // Placeholder for barcode scanning logic
  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      // Simulate barcode detection
      setTimeout(() => setLastResult('123456789'), 2000);
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
    }
  };

  const toggleFlashlight = () => {
    setFlashlightOn((prev) => !prev);
    // Add flashlight toggle logic here if supported
  };

  React.useEffect(() => {
    startScanning();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative max-w-md mx-auto">
      {error ? (
        <div className="p-4 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      ) : (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-green-500 z-10"
            animate={{ y: [0, 240, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <video
            ref={videoRef}
            className={`w-full h-[60vh] object-cover rounded-lg transition-all ${
              lastResult ? 'border-4 border-green-500' : 'border-4 border-transparent'
            }`}
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleFlashlight}
            className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-gray-800/80 rounded-full shadow-lg"
          >
            {flashlightOn ? <FlashlightOff size={24} /> : <Flashlight size={24} />}
          </motion.button>
          {lastResult && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
              Scanned: {lastResult}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Scanner;
