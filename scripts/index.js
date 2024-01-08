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

const searchBar = document.getElementById("searchbar");
const searchIcon = document.getElementById("search-icon");
let temporyRecipesArr = [];

function searchInRecipes(arrayOfRecipes, input) {
  const reset = document.querySelector(".fa-xmark");
    const recipesSection = document.querySelector(".card-recipe-container");
    if (input.length >= 1) {
        reset.style.display = "inline";
        reset.addEventListener("click", function() {
          console.log(searchBar.textContent)
            searchBar.value = "";
            reset.style.display = "none";
            recipesSection.innerHTML = "";
            temporyRecipesArr = [];
            displayData(arrayOfRecipes);
        })
    } else {
        reset.style.display = "none";
    }
    if (input.length >= 3) {
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
        // });
        displayData(temporyRecipesArr);
        const recipesList = [...temporyRecipesArr];
        filterRecipesByTags();
    }
}



searchBar.addEventListener("click", function(){
    const recipesSection = document.querySelector(".card-recipe-container");
    const reset = document.querySelector(".fa-xmark");
    reset.style.display = "none";
    searchBar.value = "";
    recipesSection.innerHTML = "";
    init();
    searchBar.addEventListener("input", function(){
        console.log("Input event triggered");
        searchBar.textContent = "";
        temporyRecipesArr = [];
        searchInRecipes(recipesList, searchBar.value);
    });
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function setupFilter(filterElement, iconElement, hiddenElement, listElement, selectedTagsElement, dataObj, property) {
  filterElement.addEventListener("click", function() {
    iconElement.classList.toggle("fa-angle-down");
    iconElement.classList.toggle("fa-angle-up");
    hiddenElement.classList.toggle(`filter-hidden-${property}`);
    hiddenElement.classList.toggle(`filter-visible-${property}`);
    let temporyRecipeHolderFilter = [];
    let temporySecondaryRecipeHolderFilter = [];

    listElement.innerHTML = "";
    if (temporyRecipesArr.length !== 0) {
      console.log("test 1")
        temporyRecipesArr.forEach((recipe) => {
          if (property === "ingredients") {
            if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
              recipe.ingredients.forEach((ingredient) => {
                if (ingredient && ingredient.ingredient) {
                  dataObj[property].push(ingredient.ingredient);
                }
              });
            }
          } else {
            if (recipe[property]) {
              dataObj[property].push(recipe[property]);
            }
          }
        });
    } else {
      recipesList.forEach((recipe) => {
        if (property === "ingredients") {
          console.log("test 2")
          if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
            recipe.ingredients.forEach((ingredient) => {
              if (ingredient && ingredient.ingredient) {
                dataObj[property].push(ingredient.ingredient);
              }
            });
          }
        } else {
          if (recipe[property]) {
            dataObj[property].push(recipe[property]);
          }
        }
      });
    }

    const flattenedData = dataObj[property].flat();
    const arrayDataUniques = [...new Set(flattenedData)];

    for (let i = 0; i < arrayDataUniques.length; i++) {
      listElement.innerHTML += `<span class="backgroundElement tag">${capitalize(arrayDataUniques[i])}</span>`;
    }

    const tags = document.querySelectorAll(".tag");
    tags.forEach((tag) => {
        tag.addEventListener("click", function (){
        const input = tag.textContent;
        const lowerInput = input.toLowerCase();
        const recipesSection = document.querySelector(".card-recipe-container");
        if (temporyRecipeHolderFilter.length == 0) {
            if (tag.parentElement.classList.contains("filter-list-ingredients")) {
                tagsList.ing.push(tag.textContent)
                recipesList.forEach((recipe) => {
                  if (recipe.name.includes(lowerInput) || recipe.description.includes(lowerInput) ||
                  recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(lowerInput))) {
                      recipesSection.innerHTML = "";
                      temporyRecipeHolderFilter.push(recipe);
                    }
                  })
            }
            if (tag.parentElement.classList.contains("filter-list-appliance")){
                tagsList.app.push(tag.textContent)
                recipesList.forEach((recipe) => {
                    if (recipe.appliance.includes(lowerInput) || recipe.description.includes(lowerInput)) {
                      recipesSection.innerHTML = "";
                        temporyRecipeHolderFilter.push(recipe);
                    }
                })
            }
            if (tag.parentElement.classList.contains("filter-list-ustensils")) {
                tagsList.ust.push(tag.textContent)
                recipesList.forEach((recipe) => {
                    if (recipe.name.includes(lowerInput) || recipe.description.includes(lowerInput) || recipe.ustensils.includes(lowerInput)) {
                      recipesSection.innerHTML = "";
                        temporyRecipeHolderFilter.push(recipe);
                    }
                })
            }
            temporyRecipesArr = [...temporyRecipeHolderFilter];
            console.log(temporySecondaryRecipeHolderFilter)
            console.log(temporyRecipesArr)
            showTagsList(tagsList);
            filterRecipesByTags();
          }
          console.log(temporyRecipesArr)

        });

  });

  });
}

// Utilisation pour les ustensiles
const filterUstensils = document.getElementById("filter-ustensils");
const ustensilsIcon = document.getElementById("ustensils-icon");
const filterListUstensils = document.querySelector(".filter-list-ustensils");
const filterHiddenUstensils = document.querySelector(".filter-hidden-ustensils");
const selectedTagsUstensils = document.querySelector(".selectedTags-ustensils");
const ustensilsData = { ustensils: [] };
setupFilter(filterUstensils, ustensilsIcon, filterHiddenUstensils, filterListUstensils, selectedTagsUstensils, ustensilsData, "ustensils");

// Utilisation pour les appareils
const filterAppareils = document.getElementById("filter-appliance");
const appareilsIcon = document.getElementById("appliance-icon");
const filterListAppareils = document.querySelector(".filter-list-appliance");
const filterHiddenAppareils = document.querySelector(".filter-hidden-appliance");
const selectedTagsAppareils = document.querySelector(".selectedTags-appliance");
const appareilsData = { appliance: [] };
setupFilter(filterAppareils, appareilsIcon, filterHiddenAppareils, filterListAppareils, selectedTagsAppareils, appareilsData, "appliance");

// Utilisation pour les ingrédients
const filterIngredients = document.getElementById("filter-ingredients");
const ingredientsIcon = document.getElementById("ingredients-icon");
const filterHiddenIngredients = document.querySelector(".filter-hidden-ingredients");
const filterListIngredients = document.querySelector(".filter-list-ingredients");
const selectedTagsIngredients = document.querySelector(".selectedTags-ingredients");
const ingredientsData = { ingredients: [] };
setupFilter(filterIngredients, ingredientsIcon, filterHiddenIngredients, filterListIngredients, selectedTagsIngredients, ingredientsData, "ingredients");
