import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { MOCK_RECIPES } from '../data/mockRecipes';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const quickFilters = ['All Recipes', 'Quick Meals', 'Healthy', 'Desserts', 'Breakfast'];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      {/* Hero Section */}
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
              key={filter}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-emerald-500 hover:text-emerald-600 whitespace-nowrap transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Recipes */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Recipes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_RECIPES.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;