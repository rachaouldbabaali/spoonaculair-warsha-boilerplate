import React from 'react';

const SettingsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      {/* Dietary Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Dietary Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-emerald-600 rounded" />
            <span className="text-gray-700">Halal Only</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
            <span className="text-gray-700">Vegetarian</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-emerald-600 rounded" />
            <span className="text-gray-700">Gluten Free</span>
          </label>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Appearance</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Theme</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </label>
        </div>
      </div>

      {/* Measurements */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Measurements</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Unit System</span>
            <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
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