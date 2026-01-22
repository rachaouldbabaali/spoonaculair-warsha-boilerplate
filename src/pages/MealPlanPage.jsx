import React from 'react';

const MealPlanPage = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const mealTimes = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Meal Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {days.map((day) => (
          <div key={day} className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-800 mb-3">{day}</h3>
            <div className="space-y-2">
              {mealTimes.map((mealTime) => (
                <div key={mealTime}>
                  <div className="text-xs text-gray-500 uppercase mb-1">{mealTime}</div>
                  <div className="h-20 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                    Add meal
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanPage;