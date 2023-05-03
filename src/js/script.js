"use strict";

const container = document.querySelector(".container");
const search = document.querySelector(".searchInput");
let myrecipe = [];

function render(recipes) {
  recipes.forEach((recipe, index) => {
    const el = `
    <a href="recipe.html#${index}" class="link">
    <div class="card">
    <h2 class="cardTitle">${recipe.title}</h2>
    <div class="cardSubBox">
    <span>${recipe.emoji}</span>
    <p class="cardPara">You will need ${recipe.ingredients.length} ingredients for this!!</p>
    </div>
    </div>
    `;

    container.insertAdjacentHTML("beforeend", el);
  });
}

function init() {
  localStorage.setItem("recipes", JSON.stringify(recipeData));

  let value = JSON.parse(localStorage.getItem("recipes"));

  myrecipe = value != null ? value : recipeData;
  render(myrecipe);

  search.addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
      container.innerHTML = "";
      let tokens = e.target.value
        .toLowerCase()
        .split(" ")
        .filter(function (token) {
          return token.trim() !== "";
        });

      let searchTermRegex = new RegExp(tokens.join("|"), "gim");

      let filteredList = myrecipe.filter(function (recipe) {
        let recipeString =
          recipe.title.toLowerCase() + " " + recipe.description.toLowerCase();
        for (let ingredient in recipe.ingredients) {
          recipeString +=
            " " + recipe.ingredients[ingredient].name.toLowerCase();
        }
        return recipeString.match(searchTermRegex);
      });
      render(filteredList);
    } else {
      render(myrecipe);
    }
  });
}

init();
