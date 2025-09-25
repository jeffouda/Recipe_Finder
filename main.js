//
const recipesList = document.getElementById("recipes-list");
const detailsSection = document.getElementById("recipe-details");
const detailsBody = document.getElementById("details-body");
const closeBtn = document.getElementById("close-details");
const favoritesList = document.getElementById("favorites-list");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
//change
const feedbackForm = document.getElementById("feedback-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

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
  <h3>Ingredients:</h3>
    <ul>${recipe.ingredients.map((ing) => `<li>${ing}</li>`).join("")}</ul>

  <h3>Instructions:</h3>
  <p>${recipe.instructions}</p>
     <button id="add-favorite">Add to Favorites</button> `;
  detailsSection.classList.remove("hidden");

  //favorite button

  document.getElementById("add-favorite").addEventListener("click", () => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      favorites.push(recipe);
      renderFavorites();
    }
  });
}

//close button

closeBtn.addEventListener("click", () => {
  detailsSection.classList.add("hidden");
});

//render favorites

function renderFavorites() {
  favoritesList.innerHTML = "";
  favorites.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `<img src="${recipe.image}" alt="${recipe.name}">
     <button class="remove-favorite">Remove</button>`;
    card.querySelector(".remove-favorite").addEventListener("click", () => {
      favorites = favorites.filter((fav) => fav.id !== recipe.id);
      renderFavorites();
    });
    favoritesList.appendChild(card);
  });
}

//search/filter

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = searchInput.value.toLowerCase();
  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query))
  );
  renderRecipes(filtered);
});

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();
  const message = messageInput.value.trim();

  if (!username || !message) {
    alert("please fill in all fields before submitting");
    return;
  }
});
