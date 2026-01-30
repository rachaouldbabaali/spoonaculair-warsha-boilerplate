// API Configuration
export const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
// export const BASE_URL = 'https://api.spoonacular.com';
export const BASE_URL = 'http://localhost:5000';
export const IMAGE_BASE_URL = 'https://spoonacular.com/recipeImages/';

// API Endpoints
export const ENDPOINTS = {
  SEARCH: '/recipes/complexSearch',
  RECIPE_DETAILS: '/recipes/{id}/information',
  SIMILAR: '/recipes/{id}/similar',
  RANDOM: '/recipes/random',
  BY_INGREDIENTS: '/recipes/findByIngredients',
  AUTOCOMPLETE: '/recipes/autocomplete',
};

// Default parameters
export const DEFAULT_PARAMS = {
  number: 12,     // Results per page
  addRecipeInformation: true,
  fillIngredients: true,
};

// Cuisine types
export const CUISINES = [
  'African',
  'Asian',
  'American',
  'British',
  'Chinese',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Spanish',
  'Thai',
  'Vietnamese',
];

// Meal types
export const MEAL_TYPES = [
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'dessert',
];

// Diet options
export const DIET_OPTIONS = [
  'halal',
  'vegetarian',
  'vegan',
  'gluten free',
  'ketogenic',
  'paleo',
];

export const TIME_FILTERS = [
  { label: 'Any Time', value: '' },
  { label: '15 min or less', value: 15 },
  { label: '30 min or less', value: 30 },
  { label: '45 min or less', value: 45 },
  { label: '60 min or less', value: 60 },
];