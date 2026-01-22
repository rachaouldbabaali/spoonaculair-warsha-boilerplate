import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users } from 'lucide-react';

const RecipeCard = ({ recipe, onFavoriteClick, isFavorite = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteClick && onFavoriteClick(recipe.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.readyInMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
            {recipe.cuisine}
          </span>
          <Link
            to={`/recipe/${recipe.id}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;