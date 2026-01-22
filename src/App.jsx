import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/Homepage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import MealPlanPage from './pages/MealPlanPage';
import ShoppingListPage from './pages/ShoppingListPage';
import CollectionsPage from './pages/CollectionsPage';
import SettingsPage from './pages/SettingsPage';
import RecipeDetailPage from './pages/RecipeDetailPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen">
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/meal-plan" element={<MealPlanPage />} />
              <Route path="/shopping" element={<ShoppingListPage />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;