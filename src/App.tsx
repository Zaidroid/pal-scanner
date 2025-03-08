import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Camera, History, Settings, Sun, Moon, ListFilter } from 'lucide-react';
import Scanner from './components/Scanner';
import HistoryView from './components/History';
import SettingsView from './components/Settings';
import Alternatives from './components/Alternatives';
import { useStore } from './store';

function App() {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
          <header className="bg-white dark:bg-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-3">
                  <Camera className="h-8 w-8 text-green-600 dark:text-green-500" />
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Pal Scanner
                  </h1>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {darkMode ? (
                    <Sun className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <Moon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </header>

          <nav className="bg-white dark:bg-gray-800 shadow-md mt-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-3 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-green-500 text-green-600 dark:text-green-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  <Camera className="h-5 w-5" />
                  <span>Scanner</span>
                </NavLink>

                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-3 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-green-500 text-green-600 dark:text-green-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  <History className="h-5 w-5" />
                  <span>History</span>
                </NavLink>

                <NavLink
                  to="/alternatives"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-3 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-green-500 text-green-600 dark:text-green-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  <ListFilter className="h-5 w-5" />
                  <span>Alternatives</span>
                </NavLink>

                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex items-center space-x-2 py-4 px-3 border-b-2 text-sm font-medium ${
                      isActive
                        ? 'border-green-500 text-green-600 dark:text-green-500'
                        : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                    }`
                  }
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </NavLink>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Scanner />} />
              <Route path="/history" element={<HistoryView />} />
              <Route path="/alternatives" element={<Alternatives />} />
              <Route path="/settings" element={<SettingsView />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
