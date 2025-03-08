import React from 'react';
import { useStore } from '../store';

const SettingsView: React.FC = () => {
  const {
    darkMode,
    language,
    notifications,
    toggleDarkMode,
    setLanguage,
    toggleNotifications,
  } = useStore();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Display Settings</h2>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Language</h2>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full p-2 border rounded-md"
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex items-center justify-between">
          <span>Enable Notifications</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Camera Permissions</h2>
        <button
          onClick={() => {
            navigator.mediaDevices.getUserMedia({ video: true })
              .then(() => alert('Camera permission granted'))
              .catch(() => alert('Camera permission denied'));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Test Camera Access
        </button>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Storage</h2>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to clear all scan history?')) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
