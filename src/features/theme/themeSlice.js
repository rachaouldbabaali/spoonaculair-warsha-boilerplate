import { createSlice } from '@reduxjs/toolkit';

// Check system preference and localStorage
const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('recipeAppTheme');
  if (savedTheme) return savedTheme;
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to light
  return 'light';
};

const initialState = {
  mode: getInitialTheme(), // 'light', 'dark', or 'system'
  isDark: getInitialTheme() === 'dark' || 
          (getInitialTheme() === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      
      // Determine if dark mode should be applied
      if (action.payload === 'system') {
        const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.isDark = systemIsDark;
      } else {
        state.isDark = action.payload === 'dark';
      }
      
      // Save to localStorage
      localStorage.setItem('recipeAppTheme', action.payload);
      
      // Apply theme to document
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    toggleTheme: (state) => {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      state.mode = newMode;
      state.isDark = newMode === 'dark';
      
      // Save to localStorage
      localStorage.setItem('recipeAppTheme', newMode);
      
      // Apply theme to document
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

// Selectors
export const selectThemeMode = (state) => state.theme.mode;
export const selectIsDarkMode = (state) => state.theme.isDark;
export const selectThemeIcon = (state) => {
  const mode = state.theme.mode;
  if (mode === 'system') return '💻';
  return mode === 'dark' ? '🌙' : '☀️';
};

export default themeSlice.reducer;