import React from 'react';
import { ShoppingCart } from 'lucide-react';

const ShoppingListPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shopping List</h2>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600">
          Your shopping list is empty. Add meals to your plan to generate a list!
        </p>
      </div>
    </div>
  );
};

export default ShoppingListPage;