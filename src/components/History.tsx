import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([
    { barcode: '123456789', timestamp: Date.now(), message: 'Product A', classification: 'green' },
    { barcode: '987654321', timestamp: Date.now() - 3600000, message: 'Product B', classification: 'orange' },
  ]);
  const [dateFilter, setDateFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');

  const filteredHistory = history.filter((scan) => {
    const dateMatch = new Date(scan.timestamp).toLocaleString().includes(dateFilter);
    const countryMatch = scan.message.toLowerCase().includes(countryFilter.toLowerCase());
    return dateMatch && countryMatch;
  });

  const deleteScan = (barcode) => {
    setHistory(history.filter((scan) => scan.barcode !== barcode));
  };

  const exportData = () => {
    const json = JSON.stringify(history, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'scan-history.json';
    link.click();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by date"
          className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by country"
          className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
        <button
          onClick={exportData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Export Data
        </button>
      </div>

      <div className="space-y-4">
        {filteredHistory.map((scan, index) => (
          <motion.div
            key={`${scan.barcode}-${scan.timestamp}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-4 rounded-lg border ${
              scan.classification === 'red'
                ? 'bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-700'
                : scan.classification === 'orange'
                ? 'bg-orange-50 border-orange-200 dark:bg-orange-900 dark:border-orange-700'
                : scan.classification === 'green'
                ? 'bg-green-50 border-green-200 dark:bg-green-900 dark:border-green-700'
                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{scan.barcode}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(scan.timestamp).toLocaleString()}
                </p>
                <p className="mt-2">{scan.message}</p>
              </div>
              <button
                onClick={() => deleteScan(scan.barcode)}
                className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default History;
