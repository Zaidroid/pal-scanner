import React, { useState } from 'react';
import { useStore } from '../store';
import { Trash2 } from 'lucide-react';

const HistoryView: React.FC = () => {
  const { scanHistory, deleteScan } = useStore();
  const [dateFilter, setDateFilter] = useState<string>('');
  const [countryFilter, setCountryFilter] = useState<string>('');

  const filteredHistory = scanHistory.filter((scan) => {
    const matchesDate = dateFilter
      ? new Date(scan.timestamp).toLocaleDateString().includes(dateFilter)
      : true;
    const matchesCountry = countryFilter
      ? scan.country.toLowerCase().includes(countryFilter.toLowerCase())
      : true;
    return matchesDate && matchesCountry;
  });

  const exportData = () => {
    const data = JSON.stringify(scanHistory, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scan-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Filter by date"
          className="px-4 py-2 border rounded-lg"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by country"
          className="px-4 py-2 border rounded-lg"
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
        {filteredHistory.map((scan) => (
          <div
            key={`${scan.barcode}-${scan.timestamp}`}
            className={`p-4 rounded-lg border ${
              scan.classification === 'red'
                ? 'bg-red-50 border-red-200'
                : scan.classification === 'orange'
                ? 'bg-orange-50 border-orange-200'
                : scan.classification === 'green'
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{scan.barcode}</p>
                <p className="text-sm text-gray-600">
                  {new Date(scan.timestamp).toLocaleString()}
                </p>
                <p className="mt-2">{scan.message}</p>
              </div>
              <button
                onClick={() => deleteScan(scan.barcode)}
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;
