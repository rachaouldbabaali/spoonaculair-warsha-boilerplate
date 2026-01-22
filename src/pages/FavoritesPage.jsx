import React from 'react';
import { Heart } from 'lucide-react';

const FavoritesPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">No favorites yet. Start adding recipes you love!</p>
      </div>
    </div>
  );
};

export default FavoritesPage;