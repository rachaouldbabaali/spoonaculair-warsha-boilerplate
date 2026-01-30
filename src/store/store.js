import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

// The store = The bank vault that holds all state
export const store = configureStore({
  reducer: {
    counter: counterReducer,  // Add your slice here
    // Later we'll add: favorites, mealPlan, etc.
    favorites: favoritesReducer,
  },
});
