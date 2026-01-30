import React, { useState } from 'react';
import { spoonacularApi } from '../services/spoonacularApi';

const ApiTest = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testSearch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await spoonacularApi.searchRecipes('chicken');
      console.log('Search Results:', data);
      setRecipes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testRandom = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await spoonacularApi.getRandomRecipes({ number: 5 });
      console.log('Random Recipes:', data);
      setRecipes(data.recipes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testCuisine = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await spoonacularApi.getRecipesByCuisine('Middle Eastern');
      console.log('Middle Eastern Recipes:', data);
      setRecipes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">API Test</h2>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={testSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          Test Search (chicken)
        </button>
        
        <button
          onClick={testRandom}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          Test Random Recipes
        </button>
        
        <button
          onClick={testCuisine}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          disabled={loading}
        >
          Test Middle Eastern
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-4 rounded-lg shadow">
            {recipe.image && (
              <img 
                src={recipe.image} 
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h3 className="font-semibold">{recipe.title}</h3>
            <p className="text-sm text-gray-600">ID: {recipe.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiTest;