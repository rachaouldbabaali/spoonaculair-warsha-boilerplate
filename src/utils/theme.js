// Utility function to initialize theme
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('recipeAppTheme') || 'light';
  const isDark = savedTheme === 'dark' || 
    (savedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};