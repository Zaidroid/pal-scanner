import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');
  const [notifications, setNotifications] = useState<boolean>(true);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const toggleNotifications = () => setNotifications((prev) => !prev);

  return (
    <div className="space-y-6 max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Display Settings</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 dark:text-gray-200">Dark Mode</span>
          <motion.label
            className="relative inline-flex items-center cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </motion.label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full p-2 border rounded-md bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-800"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Notifications</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-900 dark:text-gray-200">Enable Notifications</span>
          <motion.label
            className="relative inline-flex items-center cursor-pointer"
            whileTap={{ scale: 0.9 }}
          >
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </motion.label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Camera Permissions</h2>
        <button
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ video: true })
              .then(() => alert('Camera permission granted'))
              .catch(() => alert('Camera permission denied'));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-800"
        >
          Test Camera Access
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200">Storage</h2>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all scan history?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-800"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default Settings;