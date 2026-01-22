export const MOCK_RECIPES = [
  {
    id: 1,
    title: "Chicken Biryani",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    readyInMinutes: 60,
    servings: 4,
    cuisine: "Middle Eastern",
    description: "Fragrant basmati rice layered with spiced chicken",
    ingredients: [
      "2 cups basmati rice",
      "500g chicken",
      "2 onions",
      "Biryani masala",
    ],
    instructions: ["Marinate chicken", "Cook rice", "Layer and cook"],
  },
  {
    id: 2,
    title: "Falafel Wrap",
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
    readyInMinutes: 30,
    servings: 2,
    cuisine: "Middle Eastern",
    description: "Crispy falafel with fresh vegetables in pita bread",
    ingredients: ["Chickpeas", "Parsley", "Pita bread", "Tahini sauce"],
    instructions: ["Blend chickpeas", "Form balls", "Fry until golden"],
  },
  {
    id: 3,
    title: "Grilled Salmon",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
    readyInMinutes: 25,
    servings: 2,
    cuisine: "International",
    description: "Perfectly grilled salmon with lemon butter sauce",
    ingredients: ["2 salmon fillets", "Lemon", "Butter", "Herbs"],
    instructions: [
      "Season salmon",
      "Grill 4-5 minutes per side",
      "Add butter sauce",
    ],
  },
  {
    id: 4,
    title: "Vegetable Curry",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
    readyInMinutes: 40,
    servings: 4,
    cuisine: "Asian",
    description: "Rich and creamy vegetable curry with aromatic spices",
    ingredients: ["Mixed vegetables", "Coconut milk", "Curry paste", "Rice"],
    instructions: [
      "Sauté vegetables",
      "Add curry paste",
      "Simmer with coconut milk",
    ],
  },
  {
    id: 5,
    title: "Pasta Primavera",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    readyInMinutes: 20,
    servings: 3,
    cuisine: "Italian",
    description: "Light pasta with fresh seasonal vegetables",
    ingredients: ["Pasta", "Bell peppers", "Zucchini", "Cherry tomatoes"],
    instructions: ["Boil pasta", "Sauté vegetables", "Toss together"],
  },
  {
    id: 6,
    title: "Beef Tacos",
    image:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    readyInMinutes: 30,
    servings: 4,
    cuisine: "Mexican",
    description: "Seasoned ground beef in crispy taco shells",
    ingredients: ["Ground beef", "Taco shells", "Lettuce", "Cheese", "Salsa"],
    instructions: ["Brown beef", "Add taco seasoning", "Assemble tacos"],
  },
];

export const CUISINES = [
  "All Cuisines",
  "Middle Eastern",
  "Asian",
  "Italian",
  "Mexican",
  "Mediterranean",
  "Indian",
];

export const MEAL_TYPES = [
  "All Types",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
];

export const TIME_FILTERS = [
  { label: "Any", value: null },
  { label: "Under 30 min", value: 30 },
  { label: "Under 60 min", value: 60 },
  { label: "Over 60 min", value: 61 },
];
