import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, reset } from '../features/counter/counterSlice';

function Counter() {
  // useSelector = Read from store (like checking your bank balance)
  const count = useSelector((state) => state.counter.value);
  
  // useDispatch = Send actions to store (like filling out a form)
  const dispatch = useDispatch();

  return (
    <div className="p-8 max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Counter Demo</h2>
        
        <div className="text-6xl font-bold text-emerald-600 text-center my-8">
          {count}
        </div>
        
        <div className="space-y-3">
          <button
            onClick={() => dispatch(increment())}
            className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Increment (+1)
          </button>
          
          <button
            onClick={() => dispatch(decrement())}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Decrement (-1)
          </button>
          
          <button
            onClick={() => dispatch(incrementByAmount(5))}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add 5
          </button>
          
          <button
            onClick={() => dispatch(reset())}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;