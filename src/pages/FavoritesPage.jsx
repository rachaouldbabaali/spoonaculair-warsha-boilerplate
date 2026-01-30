import React from 'react';
import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { selectFavorites, selectFavoritesCount } from '../features/favorites/favoritesSlice';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);
  const favoritesCount = useSelector(selectFavoritesCount);

  if (favoritesCount === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">My Favorites</h2>
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">No favorites yet. Start adding recipes you love!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Favorites</h2>
        <span className="text-gray-600">
          {favoritesCount} {favoritesCount === 1 ? 'recipe' : 'recipes'}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;