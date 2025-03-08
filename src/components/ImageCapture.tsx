import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Camera, RefreshCw } from 'lucide-react';
import ImageProcessor from './ImageProcessor';

const ImageCapture = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [isCameraReady, setIsCameraReady] = useState(false);

  const videoConstraints = {
    facingMode: facingMode,
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === 'user' ? 'environment' : 'user'));
  };

  const retake = () => {
    setCapturedImage(null);
  };

  const handleUserMedia = () => {
    setIsCameraReady(true);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {!capturedImage ? (
          <div className="relative">
            <motion.div
              animate={{ rotateY: facingMode === 'user' ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={handleUserMedia}
                className="w-full aspect-video"
                mirrored={facingMode === 'user'}
              />
            </motion.div>
            {!isCameraReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <img src={capturedImage} alt="Captured" className="w-full h-auto" />
          </div>
        )}

        <div className="p-4 flex justify-center space-x-4">
          {!capturedImage ? (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={capture}
                disabled={!isCameraReady}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 disabled:opacity-50"
              >
                <Camera className="w-5 h-5" />
                <span>Capture</span>
              </motion.button>
              <button
                onClick={switchCamera}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-full flex items-center space-x-2"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Switch Camera</span>
              </button>
            </>
          ) : (
            <button
              onClick={retake}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-6 py-3 rounded-full flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Retake</span>
            </button>
          )}
        </div>
      </div>

      {capturedImage && <ImageProcessor capturedImage={capturedImage} />}
    </div>
  );
};

export default ImageCapture;
