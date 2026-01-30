import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { spoonacularApi } from '../services/spoonacularApi';
import { TIME_FILTERS } from '../utils/constants';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCuisine, setSelectedCuisine] = useState('All Cuisines');
  const [selectedCategory, setSelectedCategory] = useState('All Types');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch cuisines and categories on component mount
  useEffect(() => {
    fetchCuisinesAndCategories();
  }, []);

  // Search when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCuisine, selectedCategory, selectedTimeFilter]);

  const fetchCuisinesAndCategories = async () => {
    try {
      const [cuisinesData, categoriesData] = await Promise.all([
        spoonacularApi.getAllCuisines(),
        spoonacularApi.getAllCategories()
      ]);
      
      setCuisines(['All Cuisines', ...cuisinesData]);
      setCategories(['All Types', ...categoriesData]);
    } catch (err) {
      console.error('Error fetching filters:', err);
    }
  };

  const performSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      // Build filters object
      const filters = {};

      if (selectedCuisine !== 'All Cuisines') {
        filters.cuisine = selectedCuisine;
      }

      if (selectedCategory !== 'All Types') {
        filters.type = selectedCategory;
      }

      if (selectedTimeFilter) {
        filters.maxReadyTime = selectedTimeFilter;
      }

      // If there's a search query or filters, perform search
      if (searchQuery.trim() || Object.keys(filters).length > 0) {
        const data = await spoonacularApi.searchRecipes(searchQuery, filters);
        setRecipes(data.results || []);
      } else {
        // If no query or filters, show random recipes
        const data = await spoonacularApi.getRandomRecipes(12);
        setRecipes(data.recipes || []);
      }
    } catch (err) {
      console.error('Error searching recipes:', err);
      setError('Failed to search recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ q: value });
    } else {
      setSearchParams({});
    }
  };

  const handleFilterChange = () => {
    // Reset to first page when filters change
    performSearch();
  };


  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Search Recipes</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for recipes by name or ingredient..."
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">Filters</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
            <select
              value={selectedCuisine}
              onChange={(e) => {
                setSelectedCuisine(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Time</label>
            <select
              value={selectedTimeFilter}
              onChange={(e) => {
                setSelectedTimeFilter(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {TIME_FILTERS.map((filter) => (
                <option key={filter.label} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meal Type</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                handleFilterChange();
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="text-gray-600 mt-4">Searching recipes...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button
            onClick={performSearch}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          {recipes.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  {searchQuery ? `Results for "${searchQuery}"` : 'Featured Recipes'}
                  <span className="text-gray-600 text-lg font-normal ml-2">
                    ({recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'})
                  </span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard 
                    key={recipe._id || recipe.id} 
                    recipe={recipe} 
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No recipes found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? `No recipes found for "${searchQuery}". Try a different search term or adjust your filters.`
                  : 'No recipes available. Try adjusting your filters or check back later.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('All Cuisines');
                  setSelectedCategory('All Types');
                  setSelectedTimeFilter('');
                  performSearch();
                }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;