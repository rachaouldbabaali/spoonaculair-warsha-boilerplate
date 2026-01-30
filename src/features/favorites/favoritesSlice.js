import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Add favorite recipe
    addFavorite: (state, action) => {
      state.items.push(action.payload);
    },
    
    // Remove favorite recipe
    removeFavorite: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
    
    // Clear all favorites
    clearFavorites: (state) => {
      state.items = [];
    },
    
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    // Set error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  clearFavorites,
  setLoading,
  setError,
} = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.items;
export const selectFavoritesCount = (state) => state.favorites.items.length;
export const selectIsFavorite = (state, recipeId) =>
  state.favorites.items.some(item => item._id === recipeId);

export default favoritesSlice.reducer;