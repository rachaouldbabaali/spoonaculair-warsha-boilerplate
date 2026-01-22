import React from 'react';
import { BookOpen } from 'lucide-react';

const CollectionsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Collections</h2>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">
          No collections yet. Create collections to organize your recipes!
        </p>
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          Create Collection
        </button>
      </div>
    </div>
  );
};

export default CollectionsPage;