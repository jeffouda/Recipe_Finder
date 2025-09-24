//
const recipesList = document.getElementById("recipes-list");
const detailsSection = document.getElementById("recipe-details");
const detailsBody = document.getElementById("details-body");
const closeBtn = document.getElementById("close-details");
const favoritesList = document.getElementById("favorites-list");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

let recipes = [];
let favorites = [];

// fetch from jsno-server

fetch("http://localhost:5000/recipes")
  .then((res) => res.json())
  .then((data) => {
    recipes = data;
    renderRecipes(recipes);
  })
  .catch((err) => console.error("error fetching recipes:", err));

//recipe cards

function renderRecipes(list) {
  recipesList.innerHTML = "";
  list.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>`;
    card.addEventListener("click", () => showRecipeDetails(recipe));
    recipesList.appendChild(card);
  });
}

//recipe details

function showRecipeDetails(recipe) {
  detailsBody.innerHTML = `<h2>${recipe.name}</h2>
  <img src="${recipe.image}" alt="${recipe.name} class="details-img">
  <h3>Instructions:</h3>
  <p>${recipe.instructions}</p>
     <button id="add-favorite">Add to Favorites</button> `;
  detailsSection.classList.remove("hidden");
}
