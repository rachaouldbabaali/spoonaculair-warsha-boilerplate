import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { spoonacularApi } from '../services/spoonacularApi';
import Counter from '../components/Counter';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All Recipes');
  const navigate = useNavigate();

  const quickFilters = [
    { label: 'All Recipes', key: 'all' },
    { label: 'Quick Meals', key: 'quick' },
    { label: 'Healthy', key: 'healthy' },
    { label: 'Desserts', key: 'desserts' },
    { label: 'Breakfast', key: 'breakfast' },
  ];

  // Fetch featured recipes on component mount
  useEffect(() => {
    fetchFeaturedRecipes();
  }, []);

  const fetchFeaturedRecipes = async () => {
    setLoading(true);
    setError(null);
    setActiveFilter('All Recipes');
    
    try {
      // Get random recipes
      const data = await spoonacularApi.getRandomRecipes(12);
      setRecipes(data.recipes || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleQuickFilter = async (filter) => {
    setLoading(true);
    setError(null);
    setActiveFilter(filter.label);

    try {
      let data;
      
      switch(filter.key) {
        case 'quick':
          // Get quick recipes (under 30 minutes)
          data = await spoonacularApi.getQuickRecipes(30, 12);
          setRecipes(data.results || []);
          break;
        
        case 'healthy':
          // Get healthy recipes - use search with nutrition filters
          data = await spoonacularApi.searchRecipes('', { 
            tags: 'Healthy',
            number: 12 
          });
          setRecipes(data.results || []);
          break;
        
        case 'desserts':
          // Get dessert recipes
          data = await spoonacularApi.getRecipesByType('Dessert', 12);
          setRecipes(data.results || []);
          break;
        
        case 'breakfast':
          // Get breakfast recipes
          data = await spoonacularApi.getRecipesByType('Breakfast', 12);
          setRecipes(data.results || []);
          break;
        
        case 'all':
        default:
          await fetchFeaturedRecipes();
          return;
      }
    } catch (err) {
      console.error('Error filtering recipes:', err);
      setError(`Failed to load ${filter.label.toLowerCase()} recipes.`);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Counter />
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Find Your Perfect Recipe</h2>
        <p className="text-emerald-50 mb-6">Discover delicious halal recipes for every occasion</p>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </form>
      </div>

      {/* Quick Filters */}
      <div className="mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleQuickFilter(filter)}
              disabled={loading}
              className={`px-4 py-2 border rounded-lg whitespace-nowrap transition-colors disabled:opacity-50 ${
                activeFilter === filter.label
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-500 hover:text-emerald-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-gray-600 mt-4">
            {activeFilter === 'All Recipes' 
              ? 'Loading delicious recipes...' 
              : `Loading ${activeFilter.toLowerCase()}...`}
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchFeaturedRecipes}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back to All Recipes
          </button>
        </div>
      )}

      {/* Recipes Grid */}
      {!loading && !error && recipes.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {activeFilter === 'All Recipes' ? 'Featured Recipes' : activeFilter}
            <span className="text-gray-600 text-lg font-normal ml-2">
              ({recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'})
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {/* No Recipes State */}
      {!loading && !error && recipes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <div className="text-5xl mb-4">🍽️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No {activeFilter !== 'All Recipes' ? activeFilter.toLowerCase() : ''} recipes found
          </h3>
          <p className="text-gray-600 mb-6">
            {activeFilter !== 'All Recipes'
              ? `No ${activeFilter.toLowerCase()} recipes available. Try a different filter.`
              : 'No recipes available. Please check back later.'}
          </p>
          <button
            onClick={fetchFeaturedRecipes}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            View All Recipes
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;