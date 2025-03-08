import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { useStore } from '../store';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics: React.FC = () => {
  const { scanHistory } = useStore();

  const countryData = scanHistory.reduce((acc, scan) => {
    acc[scan.country] = (acc[scan.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const classificationData = scanHistory.reduce((acc, scan) => {
    acc[scan.classification] = (acc[scan.classification] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const countryChartData = {
    labels: Object.keys(countryData),
    datasets: [
      {
        label: 'Scans by Country',
        data: Object.values(countryData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  const classificationChartData = {
    labels: Object.keys(classificationData),
    datasets: [
      {
        data: Object.values(classificationData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(201, 203, 207, 0.5)',
        ],
      },
    ],
  };

  const palestineSupport = scanHistory.filter(
    (scan) => scan.country === 'Palestine'
  ).length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Scans by Country</h3>
          <Bar data={countryChartData} />
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Classification Distribution</h3>
          <Pie data={classificationChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Total Scans</h3>
          <p className="text-3xl font-bold">{scanHistory.length}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Palestine Support</h3>
          <p className="text-3xl font-bold">{palestineSupport}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Avoided Products</h3>
          <p className="text-3xl font-bold">
            {scanHistory.filter((scan) => ['red', 'orange'].includes(scan.classification)).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
