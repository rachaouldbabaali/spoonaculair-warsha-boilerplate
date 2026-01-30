import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, selectIsFavorite } from '../features/favorites/favoritesSlice';

const RecipeCard = ({ recipe }) => {
  const dispatch = useDispatch();
  const recipeId = recipe._id || recipe.id;
  const isFavorite = useSelector(state => selectIsFavorite(state, recipeId));
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    
    if (isFavorite) {
      dispatch(removeFavorite(recipeId));
    } else {
      dispatch(addFavorite({
        _id: recipeId,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        cuisines: recipe.cuisines,
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
          {recipe.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{recipe.readyInMinutes || 'N/A'} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings || 'N/A'} servings</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {recipe.cuisines && recipe.cuisines.length > 0 && (
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-full">
              {recipe.cuisines[0]}
            </span>
          )}
          <Link
            to={`/recipe/${recipeId}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm ml-auto"
          >
            View Recipe →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;