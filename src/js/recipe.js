const recipedata = JSON.parse(localStorage.getItem("recipes"));
let recipeindex = window.location.hash.split("#")[1];
console.log(recipedata[recipeindex]);
const container = document.querySelector(".container");
function render(recipe) {
  let el = `<a href="./index.html" class="href">Back</a>
    <header class="header">
        <div class="emojiBox"><span class="emoji">${recipe.emoji}</span></div>
        <h1>${recipe.title}</h1>
    </header>
    <p class="describe">${recipe.description}</p>
    <div class="descriptions">
        <div class="description">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd" />
            </svg>
            <p class="description-text">${recipe.calories}</p>
        </div>
        <div class="description">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox=" 0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd" />
            </svg>
            <p class="description-text">Total: ${recipe.preptime}</p>
        </div>
        <div class="description">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox=" 0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd" />
            </svg>
            <p class="description-text">Prep: ${recipe.totaltime}</p>
        </div>
    </div>
    <div class="ingredients">
        <h3 class="ingredients-text">Ingredients</h3>
        <p class="ingredient-needed">Total ${recipe.ingredients.length} ingredients needed</p>
        <ul class="ingredientlist grid-col-2">
        `;
  recipe.ingredients.forEach((r) => {
    let el2;
    if (r.changable === true) {
      el2 = `<li class="ingredient"><input type="checkbox">
              <p class="ingredientlist-text"><span>${r.quantity + " "}</span> ${
        r.unit
      } ${" " + r.name}</p>
              <button class="btn" id="delete" onclick="onDeleteHandler(event);">Delete</button>
          </li>`;
    } else {
      el2 = `<li class="ingredient"><input type="checkbox">
              <p class="ingredientlist-text">${r.name} as required </p>
              <button class="btn" onclick="onDeleteHandler(event);">Delete</button>
          </li>`;
    }
    el += " " + el2;
  });

  const el3 = `
        </ul>
        <form class="add-ingredient" onsubmit="onSubmit(event);">
            <input type="text" class="ingrdient-input" placeholder="Format qty,unit,name">
            <button type="submit" class="btn">ADD</button>
        </form>
    </div>
    <div class="steps">
        <h3 class="steps-text">Direction</h3>
        <ul >`;
  el += el3;
  recipe.stepsToMake.forEach((step, index) => {
    const el4 = `<li>Steps ${index + 1}:${step.description} </li>`;
    el += " " + el4;
  });
  const el5 = `
        </ul>
    </div>
    <a href="./index.html" class="href">Back</a>`;
  el += " " + el5;
  container.insertAdjacentHTML("beforeend", el);
}

render(recipedata[recipeindex]);
let ingredient = recipedata[recipeindex].ingredients.length;
const ingredientnumberEl = document.querySelector(".ingredient-needed");
// delete functionality
function onDeleteHandler(event) {
  event.currentTarget.parentElement.classList.add("remove");
  ingredientnumberEl.textContent = `Total ${(ingredient -= 1)} ingredients needed`;
}
// add ingredient
function onSubmit(e) {
  e.preventDefault();
  const inputEl = document.querySelector(".ingrdient-input");
  if (
    inputEl.value.trim().length !== 0 &&
    inputEl.value.split(",").length === 3
  ) {
    const [qty, unit, name] = inputEl.value.split(",");
    const el = `<li class="ingredient"><input type="checkbox">
    <p class="ingredientlist-text"><span>${qty + " "}</span> ${unit} ${
      " " + name
    }</p>
    <button class="btn" id="delete" onclick="onDeleteHandler(event);">Delete</button>
</li>`;
    const ingredients = document.querySelector(".ingredientlist");
    ingredients.insertAdjacentHTML("beforeend", el);
    inputEl.value = "";
    inputEl.blur();
    ingredientnumberEl.textContent = `Total ${(ingredient += 1)} ingredients needed`;
  } else {
    alert(
      "enter value in comma sperated way qty,unit,name \nlike: 12,pieces,badam  "
    );
  }
}
