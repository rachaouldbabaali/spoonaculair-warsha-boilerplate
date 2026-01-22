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
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <ChefHat className="w-8 h-8 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-800">Halal Recipes</h1>
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
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
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