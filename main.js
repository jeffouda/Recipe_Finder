const recipe = {
  id: 1,
  name: "Spaghetti Carbonara",
  image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
  ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan"],
  instructions:
    "Boil pasta, fry pancetta, mix eggs and cheese, combine everything.",
};

const recipesList = document.getElementById("recipes-list");

function renderRecipeCard(recipe) {
  const card = document.createElement("div");
  card.classList.add("recipe-card");

  card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">
    <h3>${recipe.name}</h3>`;

  recipesList.appendChild(card);
}
renderRecipeCard(recipe);
