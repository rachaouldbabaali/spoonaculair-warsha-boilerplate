import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, Heart } from "lucide-react";
import { MOCK_RECIPES } from "../data/mockRecipes";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe = MOCK_RECIPES.find((r) => r.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recipe not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-emerald-600 hover:text-emerald-700"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-96">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <button className="absolute top-6 right-6 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50">
            <Heart className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              {recipe.title}
            </h1>
            <p className="text-gray-600">{recipe.description}</p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">
                {recipe.readyInMinutes} minutes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{recipe.servings} servings</span>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
              {recipe.cuisine}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 pt-0.5">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-8 border-t border-gray-200 flex gap-4">
            <button className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
              Add to Meal Plan
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Save to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
