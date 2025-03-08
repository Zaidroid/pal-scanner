import React from 'react';
import { ThumbsUp, AlertTriangle } from 'lucide-react';

const alternatives = [
  {
    product: 'Sabra Hummus',
    classification: 'red',
    alternatives: [
      { name: 'Arz Fine Foods Hummus', classification: 'green' },
      { name: 'Cedars Hummus', classification: 'yellow' }
    ]
  },
  {
    product: 'Ahava Cosmetics',
    classification: 'red',
    alternatives: [
      { name: 'Palestinian Heritage Cosmetics', classification: 'green' },
      { name: 'Local Organic Beauty', classification: 'green' }
    ]
  },
  {
    product: 'SodaStream',
    classification: 'red',
    alternatives: [
      { name: 'DrinkMate', classification: 'yellow' },
      { name: 'Local Sparkling Water', classification: 'green' }
    ]
  }
];

const Alternatives: React.FC = () => {
  return (
    <div className="space-y-6">
      {alternatives.map((item) => (
        <div key={item.product} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.product}</h3>
            </div>
          </div>
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recommended Alternatives:</h4>
            <div className="space-y-3">
              {item.alternatives.map((alt) => (
                <div
                  key={alt.name}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    alt.classification === 'green'
                      ? 'bg-green-50 dark:bg-green-900/20'
                      : 'bg-yellow-50 dark:bg-yellow-900/20'
                  }`}
                >
                  <div className="flex items-center">
                    <ThumbsUp className={`h-4 w-4 mr-2 ${
                      alt.classification === 'green'
                        ? 'text-green-500'
                        : 'text-yellow-500'
                    }`} />
                    <span className="text-gray-900 dark:text-gray-100">{alt.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    alt.classification === 'green'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-yellow-600 dark:text-yellow-400'
                  }`}>
                    {alt.classification === 'green' ? 'Recommended' : 'Alternative'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Alternatives;
