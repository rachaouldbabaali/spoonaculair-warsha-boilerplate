import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Heart, ChefHat, Timer, Flame, BookOpen } from "lucide-react";
import { spoonacularApi } from "../services/spoonacularApi";
import { Calendar, Bookmark, Star } from "lucide-react";

// Import Redux hooks and actions
import { useDispatch, useSelector } from "react-redux";
import { 
  addFavorite, 
  removeFavorite, 
  selectIsFavorite,
  selectFavorites 
} from "../features/favorites/favoritesSlice";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  
  // Local state
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get favorites from Redux store
  const favorites = useSelector(selectFavorites);
  const isFavorite = useSelector(state => selectIsFavorite(state, id));

  // Fetch recipe details on component mount
  useEffect(() => {
    fetchRecipeDetails();
  }, [id]);

  const fetchRecipeDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await spoonacularApi.getRecipeById(id);
      setRecipe(data);
    } catch (err) {
      console.error('Error fetching recipe details:', err);
      setError('Failed to load recipe details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = () => {
    if (!recipe) return;
    
    if (isFavorite) {
      // Remove from favorites
      dispatch(removeFavorite(id));
      console.log('Removed from favorites:', recipe._id);
    } else {
      // Add to favorites
      dispatch(addFavorite({
        _id: recipe._id || recipe.id,
        id: recipe._id || recipe.id, // Include both for compatibility
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        cuisines: recipe.cuisines || [],
        description: recipe.description || recipe.summary || '',
        difficulty: recipe.difficulty || 'Medium',
        category: recipe.category || 'Main Course'
      }));
      console.log('Added to favorites:', recipe._id);
    }
  };

  const handleAddToMealPlan = () => {
    if (!recipe) return;
    
    console.log('Added to meal plan:', recipe._id);
    alert('Added to meal plan!');
  };

  const handleSaveToCollection = () => {
    if (!recipe) return;
    
    console.log('Saved to collection:', recipe._id);
    alert('Saved to collection!');
  };

  // Format ingredients from different data structures
  const getIngredients = () => {
    if (!recipe) return [];
    
    // Check different possible ingredient formats
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      return recipe.ingredients.map(ing => 
        `${ing.quantity || ''} ${ing.unit || ''} ${ing.name || ''}`.trim()
      );
    } else if (recipe.extendedIngredients && recipe.extendedIngredients.length > 0) {
      return recipe.extendedIngredients.map(ing => ing.original || ing.name);
    } else if (recipe.formattedIngredients) {
      return recipe.formattedIngredients;
    }
    
    return [];
  };

  // Format instructions from different data structures
  const getInstructions = () => {
    if (!recipe) return [];
    
    // Check different possible instruction formats
    if (recipe.instructions && recipe.instructions.length > 0) {
      return recipe.instructions.map(inst => inst.text || inst);
    } else if (recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0) {
      const steps = recipe.analyzedInstructions[0]?.steps || [];
      return steps.map(step => step.step);
    } else if (recipe.formattedInstructions) {
      return recipe.formattedInstructions;
    }
    
    return [];
  };

  // Get cuisine display
  const getCuisine = () => {
    if (!recipe) return '';
    
    if (recipe.cuisines && recipe.cuisines.length > 0) {
      return recipe.cuisines[0];
    } else if (recipe.cuisine) {
      return recipe.cuisine;
    }
    
    return 'International';
  };

  // Get difficulty icon
  const getDifficultyIcon = () => {
    if (!recipe) return '🍳';
    
    switch(recipe.difficulty) {
      case 'Easy': return '🥄';
      case 'Medium': return '🔪';
      case 'Hard': return '👨‍🍳';
      default: return '🍳';
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        <p className="text-gray-600 mt-4">Loading recipe details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-5xl mb-4">❌</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Error Loading Recipe
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Go back home
        </button>
      </div>
    );
  }

  // Recipe not found
  if (!recipe) {
    return (
      <div className="text-center py-12">
        <div className="text-5xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recipe not found
        </h2>
        <p className="text-gray-600 mb-6">The recipe you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Go back home
        </button>
      </div>
    );
  }

  const ingredients = getIngredients();
  const instructions = getInstructions();
  const cuisine = getCuisine();
  const difficultyIcon = getDifficultyIcon();

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Recipes</span>
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-96 md:h-[500px]">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <button 
            onClick={handleToggleFavorite}
            className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:bg-white transition-all hover:scale-110"
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                <ChefHat className="w-4 h-4" />
                {difficultyIcon} {recipe.difficulty || 'Medium'}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                <BookOpen className="w-4 h-4" />
                {recipe.category || 'Main Course'}
              </span>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                {cuisine}
              </span>
              {isFavorite && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 text-sm font-medium rounded-full">
                  <Heart className="w-4 h-4" />
                  Favorite
                </span>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {recipe.title}
              {isFavorite && (
                <span className="ml-3 text-xl" title="This recipe is in your favorites">⭐</span>
              )}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              {recipe.description || recipe.summary || 'A delicious recipe to try at home.'}
            </p>
          </div>

          {/* Meta Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 pb-10 border-b border-gray-200">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-semibold">Prep + Cook</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {recipe.readyInMinutes || recipe.totalTime || 'N/A'} min
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-semibold">Servings</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {recipe.servings || 'N/A'}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-semibold">Prep Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {recipe.prepTime || Math.floor((recipe.readyInMinutes || 0) * 0.3)} min
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Flame className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-700 font-semibold">Cook Time</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {recipe.cookTime || Math.floor((recipe.readyInMinutes || 0) * 0.7)} min
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Ingredients */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Ingredients
                </h2>
                <span className="text-gray-500">
                  {ingredients.length} items
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                      <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-medium mt-1">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Nutrition Info if available */}
              {recipe.nutrition && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Nutrition Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {recipe.nutrition.calories && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Calories</div>
                        <div className="text-lg font-semibold">{recipe.nutrition.calories} kcal</div>
                      </div>
                    )}
                    {recipe.nutrition.protein && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Protein</div>
                        <div className="text-lg font-semibold">{recipe.nutrition.protein}g</div>
                      </div>
                    )}
                    {recipe.nutrition.carbs && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Carbs</div>
                        <div className="text-lg font-semibold">{recipe.nutrition.carbs}g</div>
                      </div>
                    )}
                    {recipe.nutrition.fat && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-sm text-gray-500">Fat</div>
                        <div className="text-lg font-semibold">{recipe.nutrition.fat}g</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Instructions
                </h2>
                <span className="text-gray-500">
                  {instructions.length} steps
                </span>
              </div>
              
              <div className="space-y-4">
                {instructions.map((instruction, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Tags if available */}
              {recipe.tags && recipe.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 pt-10 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToMealPlan}
                className="flex-1 px-6 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-medium text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                Add to Meal Plan
              </button>
              <button 
                onClick={handleSaveToCollection}
                className="flex-1 px-6 py-4 border-2 border-emerald-600 text-emerald-600 rounded-xl hover:bg-emerald-50 font-medium text-lg transition-colors flex items-center justify-center gap-2"
              >
                <Bookmark className="w-5 h-5" />
                Save to Collection
              </button>
            </div>
            
            {/* Quick Favorite Button */}
            <div className="mt-4">
              <button 
                onClick={handleToggleFavorite}
                className={`w-full px-6 py-4 rounded-xl font-medium text-lg transition-colors flex items-center justify-center gap-2 ${
                  isFavorite 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>

          {/* Author and Rating */}
          {(recipe.author || recipe.rating) && (
            <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {recipe.author && (
                  <>
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <ChefHat className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Recipe by</div>
                      <div className="font-medium text-gray-800">{recipe.author}</div>
                    </div>
                  </>
                )}
              </div>
              
              {recipe.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(recipe.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {recipe.rating.toFixed(1)} ({recipe.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;