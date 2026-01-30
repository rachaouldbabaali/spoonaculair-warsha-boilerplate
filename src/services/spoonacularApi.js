const API_BASE_URL = "http://localhost:5000/api/recipes";

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

export const api = {
  // Recipe endpoints
  getRandomRecipes: async (number = 12) => {
    // Ensure number is a number, not an object
    const num = typeof number === 'object' ? (number.number || 12) : number;
    return apiRequest(`/random?number=${num}`);
  },

  searchRecipes: async (query, filters = {}) => {
    // Build URLSearchParams properly
    const params = new URLSearchParams();
    
    // Add query if present
    if (query && query.trim()) {
      params.append('query', query.trim());
    }
    
    // Add all filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });
    
    // Add default number if not specified
    if (!filters.number) {
      params.append('number', 12);
    }
    
    const queryString = params.toString();
    return apiRequest(`/complexSearch${queryString ? `?${queryString}` : ''}`);
  },

  getRecipeById: async (id) => {
    return apiRequest(`/${id}`);
  },

  getSimilarRecipes: async (id, number = 6) => {
    return apiRequest(`/${id}/similar?number=${number}`);
  },

  getQuickRecipes: async (maxTime = 30, number = 12) => {
    return apiRequest(`/quick/${maxTime}?number=${number}`);
  },

  getHealthyRecipes: async (number = 12) => {
    return apiRequest(`/healthy?number=${number}`);
  },

  getRecipesByType: async (type, number = 12) => {
    // Type should match your backend category enum: 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Appetizer'
    return apiRequest(`/type/${type}?number=${number}`);
  },

  getRecipesByCuisine: async (cuisine, number = 12) => {
    return apiRequest(`/cuisine/${cuisine}?number=${number}`);
  },

  // Meta endpoints
  autocompleteRecipes: async (query, number = 5) => {
    return apiRequest(`/autocomplete?query=${query}&number=${number}`);
  },

  getAllCuisines: async () => {
    return apiRequest('/cuisines');
  },

  getAllCategories: async () => {
    return apiRequest('/categories');
  },

  getAllTags: async () => {
    return apiRequest('/tags');
  },
};

// Export for compatibility
export const spoonacularApi = api;