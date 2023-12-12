let recipesList = [];

async function getRecipes() {
    let response = await fetch("data/recipes.json");

    if (!response.ok) {
        alert("HTTP-Error: "+ response.statut);
    } else {
        let data = await response.json();
        let recipes = data.recipes;
        // console.log(recipes);
        recipesList = [...recipes];
        // console.log(recipes[2].ingredients)
        return {
          recipes: [...recipes],
        };
    };
};


async function displayData(recipes) {
    const recipesSection = document.querySelector(".card-recipe-container");

    recipes.forEach((recipe) => {
        const recipeModel = recipesTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipesSection.appendChild(recipeCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { recipes } = await getRecipes();
    displayData(recipes);
}

init();


function searchInRecipes(arrayOfRecipes, input) {
    const temporyRecipesArr = [];
    if (input.length >= 3) {
        const searchIcon = document.getElementById("search-icon");
        const recipesSection = document.querySelector(".card-recipe-container");
        // searchIcon.addEventListener("click", function() {
            recipesSection.innerHTML = "";
            arrayOfRecipes.forEach(recipe => {
                const lowerInput = input.toLowerCase();
                if (recipe.name.toLowerCase().includes(lowerInput) ||
                    recipe.description.toLowerCase().includes(lowerInput) ||
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))
                ) {
                    temporyRecipesArr.push(recipe);
                }
            });
            displayData(temporyRecipesArr);
        // });
    }
}

const searchBar = document.getElementById("searchbar");
searchBar.addEventListener("click", function(){
    searchBar.value = "";
    searchBar.addEventListener("input", function(){
        console.log("Input event triggered");
        searchBar.textContent = "";
        searchInRecipes(recipesList, searchBar.value);
    });
});



function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


function setupFilter(filterElement, iconElement, hiddenElement, listElement, dataArr, property) {
  filterElement.addEventListener("click", function() {
    iconElement.classList.toggle("fa-angle-down");
    iconElement.classList.toggle("fa-angle-up");
    hiddenElement.classList.toggle(`filter-hidden-${property}`);
    hiddenElement.classList.toggle(`filter-visible-${property}`);
    listElement.innerHTML = "";

    recipesList.forEach((recipe) => {
        const name = recipe.name;
        if (property === "ingredients") {
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
                    recipe.ingredients.forEach((ingredient) => {
                        if (ingredient && ingredient.ingredient) {
                          dataArr.push(ingredient.ingredient);
                        }
                    });
            }
        } else {
            if (recipe[property]) {
                dataArr.push(recipe[property]);
            }
        }
    });

    const flattenedData = dataArr.flat();
    const arrayDataUniques = [...new Set(flattenedData)];

    for (let i = 0; i < arrayDataUniques.length; i++) {
      listElement.innerHTML += `<span>${capitalize(arrayDataUniques[i])}</span>`;
    }
  });
}

// Utilisation pour les ustensiles
const filterUstensils = document.getElementById("filter-ustensils");
const ustensilsIcon = document.getElementById("ustensils-icon");
const filterListUstensils = document.querySelector(".filter-list-ustensils");
const filterHiddenUstensils = document.querySelector(".filter-hidden-ustensils");
const ustensilsArr = [];
setupFilter(filterUstensils, ustensilsIcon, filterHiddenUstensils, filterListUstensils, ustensilsArr, "ustensils");

// Utilisation pour les appareils
const filterAppareils = document.getElementById("filter-appliance");
const appareilsIcon = document.getElementById("appliance-icon");
const filterListAppareils = document.querySelector(".filter-list-appliance");
const filterHiddenAppareils = document.querySelector(".filter-hidden-appliance");
const appareilsArr = [];
setupFilter(filterAppareils, appareilsIcon, filterHiddenAppareils, filterListAppareils, appareilsArr, "appliance");

// Utilisation pour les ingrédients
const filterIngredients = document.getElementById("filter-ingredients");
const ingredientsIcon = document.getElementById("ingredients-icon");
const filterHiddenIngredients = document.querySelector(".filter-hidden-ingredients");
const filterListIngredients = document.querySelector(".filter-list-ingredients");
const ingredientsArr = [];
setupFilter(filterIngredients, ingredientsIcon, filterHiddenIngredients, filterListIngredients, ingredientsArr, "ingredients");
