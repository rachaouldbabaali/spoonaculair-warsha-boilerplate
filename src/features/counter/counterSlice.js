import { createSlice } from '@reduxjs/toolkit';

// A "slice" is a piece of your Redux state + reducers
// Think of it as one department in the bank

const counterSlice = createSlice({
  name: 'counter',           // Name of this slice
  initialState: {            // Starting state
    value: 0
  },
  reducers: {                // Your reducer functions
    increment: (state) => {
      // Redux Toolkit allows us to "mutate" state
      // (It uses Immer library behind the scenes)
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

// Export actions (these create action objects automatically)
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export reducer (this goes into the store)
export default counterSlice.reducer;
