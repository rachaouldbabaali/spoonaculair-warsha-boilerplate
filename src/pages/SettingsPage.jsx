import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, setTheme } from '../features/theme/themeSlice';

const SettingsPage = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector(selectThemeMode);

  const handleThemeChange = (e) => {
    dispatch(setTheme(e.target.value));
  };

  return (
    <div> {/* REMOVE pl-64 here - App component already handles it */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Settings</h2>

      {/* Dietary Preferences */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/30 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Dietary Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              defaultChecked 
              className="w-4 h-4 text-emerald-600 dark:text-emerald-500 rounded focus:ring-emerald-500 dark:focus:ring-emerald-400" 
            />
            <span className="text-gray-700 dark:text-gray-300">Halal Only</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-emerald-600 dark:text-emerald-500 rounded focus:ring-emerald-500 dark:focus:ring-emerald-400" 
            />
            <span className="text-gray-700 dark:text-gray-300">Vegetarian</span>
          </label>
          <label className="flex items-center gap-3">
            <input 
              type="checkbox" 
              className="w-4 h-4 text-emerald-600 dark:text-emerald-500 rounded focus:ring-emerald-500 dark:focus:ring-emerald-400" 
            />
            <span className="text-gray-700 dark:text-gray-300">Gluten Free</span>
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/30 p-6 mb-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Appearance</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Theme</span>
            <select 
              value={themeMode}
              onChange={handleThemeChange}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </label>
        </div>
      </div>

      {/* Measurements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-700/30 p-6">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Measurements</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Unit System</span>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <option>Metric</option>
              <option>Imperial</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;