import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Heart, Calendar, ShoppingCart, BookOpen, Settings, ChefHat } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/meal-plan', icon: Calendar, label: 'Meal Plan' },
    { path: '/shopping', icon: ShoppingCart, label: 'Shopping List' },
    { path: '/collections', icon: BookOpen, label: 'Collections' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Recipes</h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;